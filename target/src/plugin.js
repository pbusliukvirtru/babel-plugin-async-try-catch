"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = wrapFunction;

require("source-map-support/register");

var _babelHelperFunctionName = require("babel-helper-function-name");

var _babelHelperFunctionName2 = _interopRequireDefault(_babelHelperFunctionName);

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildWrapper = (0, _babelTemplate2.default)("\n  (() => {\n    var REF = FUNCTION;\n    return function NAME(PARAMS) {\n      return REF.apply(this, arguments);\n    };\n  })\n");
// import wrap from './wrap.js';
//
// export default function ({ types: t }) {
//     function alreadyWrapped (node) {
//         let body = node.body.body;
//         return body && body.length === 1 && t.isTryStatement(body[0]);
//     }
//
//     return {
//         visitor: {
//             Function (node) {
//                 if (!alreadyWrapped(node)) {
//                     node.body = wrap(
//                         node.body,
//                         function (error) {
//                             console.error('IN babel try catch wrapper, error:' + error)
//                         }
//                     );
//                 }
//             }
//         }
//     }
// }

// import { types as t } from "@babel/core";
//
// export default () => {
//
//     function statementList(key, path) {
//         const paths = path.get(key);
//
//         for (const path of paths) {
//             const func = path.node;
//             if (!path.isFunctionDeclaration()) continue;
//
//             const declar = t.variableDeclaration("let", [
//                 t.variableDeclarator(func.id, t.toExpression(func)),
//             ]);
//
//             // hoist it up above everything else
//             declar._blockHoist = 2;
//
//             // todo: name this
//             func.id = null;
//
//             path.replaceWith(declar);
//         }
//     }
//
//     return {
//         visitor: {
//             BlockStatement(path) {
//                 const { node, parent } = path;
//                 if (
//                     t.isFunction(parent, { body: node }) ||
//                     t.isExportDeclaration(parent)
//                 ) {
//                     return;
//                 }
//
//                 statementList("body", path);
//             }
//         },
//     };
// });


/* @flow */

var namedBuildWrapper = (0, _babelTemplate2.default)("\n  (() => {\n    var REF = FUNCTION;\n    function NAME(PARAMS) {\n      return REF.apply(this, arguments);\n    }\n    return NAME;\n  })\n");

function classOrObjectMethod(path, callId) {
    var node = path.node;
    var body = node.body;

    var container = t.functionExpression(null, [], t.blockStatement(body.body), true);
    body.body = [t.returnStatement(t.callExpression(t.callExpression(callId, [container]), []))];

    // Regardless of whether or not the wrapped function is a an async method
    // or generator the outer function should not be
    node.async = false;
    node.generator = false;

    // Unwrap the wrapper IIFE's environment so super and this and such still work.
    path.get("body.body.0.argument.callee.arguments.0").unwrapFunctionEnvironment();
}

function plainFunction(path, callId) {
    var node = path.node;
    var isDeclaration = path.isFunctionDeclaration();
    var functionId = node.id;
    var wrapper = buildWrapper;

    if (path.isArrowFunctionExpression()) {
        path.arrowFunctionToExpression();
    } else if (!isDeclaration && functionId) {
        wrapper = namedBuildWrapper;
    }

    node.id = null;

    if (isDeclaration) {
        node.type = "FunctionExpression";
    }

    var built = t.callExpression(callId, [node]);
    var container = wrapper({
        NAME: functionId || null,
        REF: path.scope.generateUidIdentifier("ref"),
        FUNCTION: built,
        PARAMS: node.params.reduce(function (acc, param) {
            acc.done = acc.done || t.isAssignmentPattern(param) || t.isRestElement(param);

            if (!acc.done) {
                acc.params.push(path.scope.generateUidIdentifier("x"));
            }

            return acc;
        }, {
            params: [],
            done: false
        }).params
    }).expression;

    if (isDeclaration && functionId) {
        var declar = t.variableDeclaration("let", [t.variableDeclarator(t.identifier(functionId.name), t.callExpression(container, []))]);
        declar._blockHoist = true;

        if (path.parentPath.isExportDefaultDeclaration()) {
            // change the path type so that replaceWith() does not wrap
            // the identifier into an expressionStatement
            path.parentPath.insertBefore(declar);
            path.parentPath.replaceWith(t.exportNamedDeclaration(null, [t.exportSpecifier(t.identifier(functionId.name), t.identifier("default"))]));
            return;
        }

        path.replaceWith(declar);
    } else {
        var retFunction = container.body.body[1].argument;
        if (!functionId) {
            (0, _babelHelperFunctionName2.default)({
                node: retFunction,
                parent: path.parent,
                scope: path.scope
            });
        }

        if (!retFunction || retFunction.id || node.params.length) {
            // we have an inferred function id or params so we need this wrapper
            path.replaceWith(t.callExpression(container, []));
        } else {
            // we can omit this wrapper as the conditions it protects for do not apply
            path.replaceWith(built);
        }
    }
}

function wrapFunction(path, callId) {
    if (path.isClassMethod() || path.isObjectMethod()) {
        classOrObjectMethod(path, callId);
    } else {
        plainFunction(path, callId);
    }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wbHVnaW4uanMiXSwibmFtZXMiOlsid3JhcEZ1bmN0aW9uIiwidCIsImJ1aWxkV3JhcHBlciIsIm5hbWVkQnVpbGRXcmFwcGVyIiwiY2xhc3NPck9iamVjdE1ldGhvZCIsInBhdGgiLCJjYWxsSWQiLCJub2RlIiwiYm9keSIsImNvbnRhaW5lciIsImZ1bmN0aW9uRXhwcmVzc2lvbiIsImJsb2NrU3RhdGVtZW50IiwicmV0dXJuU3RhdGVtZW50IiwiY2FsbEV4cHJlc3Npb24iLCJhc3luYyIsImdlbmVyYXRvciIsImdldCIsInVud3JhcEZ1bmN0aW9uRW52aXJvbm1lbnQiLCJwbGFpbkZ1bmN0aW9uIiwiaXNEZWNsYXJhdGlvbiIsImlzRnVuY3Rpb25EZWNsYXJhdGlvbiIsImZ1bmN0aW9uSWQiLCJpZCIsIndyYXBwZXIiLCJpc0Fycm93RnVuY3Rpb25FeHByZXNzaW9uIiwiYXJyb3dGdW5jdGlvblRvRXhwcmVzc2lvbiIsInR5cGUiLCJidWlsdCIsIk5BTUUiLCJSRUYiLCJzY29wZSIsImdlbmVyYXRlVWlkSWRlbnRpZmllciIsIkZVTkNUSU9OIiwiUEFSQU1TIiwicGFyYW1zIiwicmVkdWNlIiwiYWNjIiwicGFyYW0iLCJkb25lIiwiaXNBc3NpZ25tZW50UGF0dGVybiIsImlzUmVzdEVsZW1lbnQiLCJwdXNoIiwiZXhwcmVzc2lvbiIsImRlY2xhciIsInZhcmlhYmxlRGVjbGFyYXRpb24iLCJ2YXJpYWJsZURlY2xhcmF0b3IiLCJpZGVudGlmaWVyIiwibmFtZSIsIl9ibG9ja0hvaXN0IiwicGFyZW50UGF0aCIsImlzRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uIiwiaW5zZXJ0QmVmb3JlIiwicmVwbGFjZVdpdGgiLCJleHBvcnROYW1lZERlY2xhcmF0aW9uIiwiZXhwb3J0U3BlY2lmaWVyIiwicmV0RnVuY3Rpb24iLCJhcmd1bWVudCIsInBhcmVudCIsImxlbmd0aCIsImlzQ2xhc3NNZXRob2QiLCJpc09iamVjdE1ldGhvZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBOE13QkEsWTs7QUE5TXhCOztBQXNFQTs7OztBQUNBOzs7O0FBQ0E7O0lBQVlDLEM7Ozs7OztBQUVaLElBQU1DLGVBQWUsbUtBQXJCO0FBekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBZUEsSUFBTUMsb0JBQW9CLDZLQUExQjs7QUFVQSxTQUFTQyxtQkFBVCxDQUE2QkMsSUFBN0IsRUFBbUNDLE1BQW5DLEVBQTJDO0FBQ3ZDLFFBQU1DLE9BQU9GLEtBQUtFLElBQWxCO0FBQ0EsUUFBTUMsT0FBT0QsS0FBS0MsSUFBbEI7O0FBRUEsUUFBTUMsWUFBWVIsRUFBRVMsa0JBQUYsQ0FDZCxJQURjLEVBRWQsRUFGYyxFQUdkVCxFQUFFVSxjQUFGLENBQWlCSCxLQUFLQSxJQUF0QixDQUhjLEVBSWQsSUFKYyxDQUFsQjtBQU1BQSxTQUFLQSxJQUFMLEdBQVksQ0FDUlAsRUFBRVcsZUFBRixDQUNJWCxFQUFFWSxjQUFGLENBQWlCWixFQUFFWSxjQUFGLENBQWlCUCxNQUFqQixFQUF5QixDQUFDRyxTQUFELENBQXpCLENBQWpCLEVBQXdELEVBQXhELENBREosQ0FEUSxDQUFaOztBQU1BO0FBQ0E7QUFDQUYsU0FBS08sS0FBTCxHQUFhLEtBQWI7QUFDQVAsU0FBS1EsU0FBTCxHQUFpQixLQUFqQjs7QUFFQTtBQUNBVixTQUNLVyxHQURMLENBQ1MseUNBRFQsRUFFS0MseUJBRkw7QUFHSDs7QUFFRCxTQUFTQyxhQUFULENBQXVCYixJQUF2QixFQUE2QkMsTUFBN0IsRUFBcUM7QUFDakMsUUFBTUMsT0FBT0YsS0FBS0UsSUFBbEI7QUFDQSxRQUFNWSxnQkFBZ0JkLEtBQUtlLHFCQUFMLEVBQXRCO0FBQ0EsUUFBTUMsYUFBYWQsS0FBS2UsRUFBeEI7QUFDQSxRQUFJQyxVQUFVckIsWUFBZDs7QUFFQSxRQUFJRyxLQUFLbUIseUJBQUwsRUFBSixFQUFzQztBQUNsQ25CLGFBQUtvQix5QkFBTDtBQUNILEtBRkQsTUFFTyxJQUFJLENBQUNOLGFBQUQsSUFBa0JFLFVBQXRCLEVBQWtDO0FBQ3JDRSxrQkFBVXBCLGlCQUFWO0FBQ0g7O0FBRURJLFNBQUtlLEVBQUwsR0FBVSxJQUFWOztBQUVBLFFBQUlILGFBQUosRUFBbUI7QUFDZlosYUFBS21CLElBQUwsR0FBWSxvQkFBWjtBQUNIOztBQUVELFFBQU1DLFFBQVExQixFQUFFWSxjQUFGLENBQWlCUCxNQUFqQixFQUF5QixDQUFDQyxJQUFELENBQXpCLENBQWQ7QUFDQSxRQUFNRSxZQUFZYyxRQUFRO0FBQ3RCSyxjQUFNUCxjQUFjLElBREU7QUFFdEJRLGFBQUt4QixLQUFLeUIsS0FBTCxDQUFXQyxxQkFBWCxDQUFpQyxLQUFqQyxDQUZpQjtBQUd0QkMsa0JBQVVMLEtBSFk7QUFJdEJNLGdCQUFRMUIsS0FBSzJCLE1BQUwsQ0FBWUMsTUFBWixDQUNKLFVBQUNDLEdBQUQsRUFBTUMsS0FBTixFQUFnQjtBQUNaRCxnQkFBSUUsSUFBSixHQUNJRixJQUFJRSxJQUFKLElBQVlyQyxFQUFFc0MsbUJBQUYsQ0FBc0JGLEtBQXRCLENBQVosSUFBNENwQyxFQUFFdUMsYUFBRixDQUFnQkgsS0FBaEIsQ0FEaEQ7O0FBR0EsZ0JBQUksQ0FBQ0QsSUFBSUUsSUFBVCxFQUFlO0FBQ1hGLG9CQUFJRixNQUFKLENBQVdPLElBQVgsQ0FBZ0JwQyxLQUFLeUIsS0FBTCxDQUFXQyxxQkFBWCxDQUFpQyxHQUFqQyxDQUFoQjtBQUNIOztBQUVELG1CQUFPSyxHQUFQO0FBQ0gsU0FWRyxFQVdKO0FBQ0lGLG9CQUFRLEVBRFo7QUFFSUksa0JBQU07QUFGVixTQVhJLEVBZU5KO0FBbkJvQixLQUFSLEVBb0JmUSxVQXBCSDs7QUFzQkEsUUFBSXZCLGlCQUFpQkUsVUFBckIsRUFBaUM7QUFDN0IsWUFBTXNCLFNBQVMxQyxFQUFFMkMsbUJBQUYsQ0FBc0IsS0FBdEIsRUFBNkIsQ0FDeEMzQyxFQUFFNEMsa0JBQUYsQ0FDSTVDLEVBQUU2QyxVQUFGLENBQWF6QixXQUFXMEIsSUFBeEIsQ0FESixFQUVJOUMsRUFBRVksY0FBRixDQUFpQkosU0FBakIsRUFBNEIsRUFBNUIsQ0FGSixDQUR3QyxDQUE3QixDQUFmO0FBTUFrQyxlQUFPSyxXQUFQLEdBQXFCLElBQXJCOztBQUVBLFlBQUkzQyxLQUFLNEMsVUFBTCxDQUFnQkMsMEJBQWhCLEVBQUosRUFBa0Q7QUFDOUM7QUFDQTtBQUNBN0MsaUJBQUs0QyxVQUFMLENBQWdCRSxZQUFoQixDQUE2QlIsTUFBN0I7QUFDQXRDLGlCQUFLNEMsVUFBTCxDQUFnQkcsV0FBaEIsQ0FDSW5ELEVBQUVvRCxzQkFBRixDQUF5QixJQUF6QixFQUErQixDQUMzQnBELEVBQUVxRCxlQUFGLENBQ0lyRCxFQUFFNkMsVUFBRixDQUFhekIsV0FBVzBCLElBQXhCLENBREosRUFFSTlDLEVBQUU2QyxVQUFGLENBQWEsU0FBYixDQUZKLENBRDJCLENBQS9CLENBREo7QUFRQTtBQUNIOztBQUVEekMsYUFBSytDLFdBQUwsQ0FBaUJULE1BQWpCO0FBQ0gsS0F6QkQsTUF5Qk87QUFDSCxZQUFNWSxjQUFjOUMsVUFBVUQsSUFBVixDQUFlQSxJQUFmLENBQW9CLENBQXBCLEVBQXVCZ0QsUUFBM0M7QUFDQSxZQUFJLENBQUNuQyxVQUFMLEVBQWlCO0FBQ2IsbURBQWE7QUFDVGQsc0JBQU1nRCxXQURHO0FBRVRFLHdCQUFRcEQsS0FBS29ELE1BRko7QUFHVDNCLHVCQUFPekIsS0FBS3lCO0FBSEgsYUFBYjtBQUtIOztBQUVELFlBQUksQ0FBQ3lCLFdBQUQsSUFBZ0JBLFlBQVlqQyxFQUE1QixJQUFrQ2YsS0FBSzJCLE1BQUwsQ0FBWXdCLE1BQWxELEVBQTBEO0FBQ3REO0FBQ0FyRCxpQkFBSytDLFdBQUwsQ0FBaUJuRCxFQUFFWSxjQUFGLENBQWlCSixTQUFqQixFQUE0QixFQUE1QixDQUFqQjtBQUNILFNBSEQsTUFHTztBQUNIO0FBQ0FKLGlCQUFLK0MsV0FBTCxDQUFpQnpCLEtBQWpCO0FBQ0g7QUFDSjtBQUNKOztBQUVjLFNBQVMzQixZQUFULENBQXNCSyxJQUF0QixFQUE0QkMsTUFBNUIsRUFBb0M7QUFDL0MsUUFBSUQsS0FBS3NELGFBQUwsTUFBd0J0RCxLQUFLdUQsY0FBTCxFQUE1QixFQUFtRDtBQUMvQ3hELDRCQUFvQkMsSUFBcEIsRUFBMEJDLE1BQTFCO0FBQ0gsS0FGRCxNQUVPO0FBQ0hZLHNCQUFjYixJQUFkLEVBQW9CQyxNQUFwQjtBQUNIO0FBQ0oiLCJmaWxlIjoicGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuLy8gaW1wb3J0IHdyYXAgZnJvbSAnLi93cmFwLmpzJztcbi8vXG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoeyB0eXBlczogdCB9KSB7XG4vLyAgICAgZnVuY3Rpb24gYWxyZWFkeVdyYXBwZWQgKG5vZGUpIHtcbi8vICAgICAgICAgbGV0IGJvZHkgPSBub2RlLmJvZHkuYm9keTtcbi8vICAgICAgICAgcmV0dXJuIGJvZHkgJiYgYm9keS5sZW5ndGggPT09IDEgJiYgdC5pc1RyeVN0YXRlbWVudChib2R5WzBdKTtcbi8vICAgICB9XG4vL1xuLy8gICAgIHJldHVybiB7XG4vLyAgICAgICAgIHZpc2l0b3I6IHtcbi8vICAgICAgICAgICAgIEZ1bmN0aW9uIChub2RlKSB7XG4vLyAgICAgICAgICAgICAgICAgaWYgKCFhbHJlYWR5V3JhcHBlZChub2RlKSkge1xuLy8gICAgICAgICAgICAgICAgICAgICBub2RlLmJvZHkgPSB3cmFwKFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5ib2R5LFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignSU4gYmFiZWwgdHJ5IGNhdGNoIHdyYXBwZXIsIGVycm9yOicgKyBlcnJvcilcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgKTtcbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyB9XG5cbi8vIGltcG9ydCB7IHR5cGVzIGFzIHQgfSBmcm9tIFwiQGJhYmVsL2NvcmVcIjtcbi8vXG4vLyBleHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4vL1xuLy8gICAgIGZ1bmN0aW9uIHN0YXRlbWVudExpc3Qoa2V5LCBwYXRoKSB7XG4vLyAgICAgICAgIGNvbnN0IHBhdGhzID0gcGF0aC5nZXQoa2V5KTtcbi8vXG4vLyAgICAgICAgIGZvciAoY29uc3QgcGF0aCBvZiBwYXRocykge1xuLy8gICAgICAgICAgICAgY29uc3QgZnVuYyA9IHBhdGgubm9kZTtcbi8vICAgICAgICAgICAgIGlmICghcGF0aC5pc0Z1bmN0aW9uRGVjbGFyYXRpb24oKSkgY29udGludWU7XG4vL1xuLy8gICAgICAgICAgICAgY29uc3QgZGVjbGFyID0gdC52YXJpYWJsZURlY2xhcmF0aW9uKFwibGV0XCIsIFtcbi8vICAgICAgICAgICAgICAgICB0LnZhcmlhYmxlRGVjbGFyYXRvcihmdW5jLmlkLCB0LnRvRXhwcmVzc2lvbihmdW5jKSksXG4vLyAgICAgICAgICAgICBdKTtcbi8vXG4vLyAgICAgICAgICAgICAvLyBob2lzdCBpdCB1cCBhYm92ZSBldmVyeXRoaW5nIGVsc2Vcbi8vICAgICAgICAgICAgIGRlY2xhci5fYmxvY2tIb2lzdCA9IDI7XG4vL1xuLy8gICAgICAgICAgICAgLy8gdG9kbzogbmFtZSB0aGlzXG4vLyAgICAgICAgICAgICBmdW5jLmlkID0gbnVsbDtcbi8vXG4vLyAgICAgICAgICAgICBwYXRoLnJlcGxhY2VXaXRoKGRlY2xhcik7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vL1xuLy8gICAgIHJldHVybiB7XG4vLyAgICAgICAgIHZpc2l0b3I6IHtcbi8vICAgICAgICAgICAgIEJsb2NrU3RhdGVtZW50KHBhdGgpIHtcbi8vICAgICAgICAgICAgICAgICBjb25zdCB7IG5vZGUsIHBhcmVudCB9ID0gcGF0aDtcbi8vICAgICAgICAgICAgICAgICBpZiAoXG4vLyAgICAgICAgICAgICAgICAgICAgIHQuaXNGdW5jdGlvbihwYXJlbnQsIHsgYm9keTogbm9kZSB9KSB8fFxuLy8gICAgICAgICAgICAgICAgICAgICB0LmlzRXhwb3J0RGVjbGFyYXRpb24ocGFyZW50KVxuLy8gICAgICAgICAgICAgICAgICkge1xuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4vLyAgICAgICAgICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgICAgICAgICBzdGF0ZW1lbnRMaXN0KFwiYm9keVwiLCBwYXRoKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSxcbi8vICAgICB9O1xuLy8gfSk7XG5cblxuLyogQGZsb3cgKi9cblxuaW1wb3J0IG5hbWVGdW5jdGlvbiBmcm9tIFwiYmFiZWwtaGVscGVyLWZ1bmN0aW9uLW5hbWVcIjtcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tIFwiYmFiZWwtdGVtcGxhdGVcIjtcbmltcG9ydCAqIGFzIHQgZnJvbSBcImJhYmVsLXR5cGVzXCI7XG5cbmNvbnN0IGJ1aWxkV3JhcHBlciA9IHRlbXBsYXRlKGBcbiAgKCgpID0+IHtcbiAgICB2YXIgUkVGID0gRlVOQ1RJT047XG4gICAgcmV0dXJuIGZ1bmN0aW9uIE5BTUUoUEFSQU1TKSB7XG4gICAgICByZXR1cm4gUkVGLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSlcbmApO1xuXG5jb25zdCBuYW1lZEJ1aWxkV3JhcHBlciA9IHRlbXBsYXRlKGBcbiAgKCgpID0+IHtcbiAgICB2YXIgUkVGID0gRlVOQ1RJT047XG4gICAgZnVuY3Rpb24gTkFNRShQQVJBTVMpIHtcbiAgICAgIHJldHVybiBSRUYuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgcmV0dXJuIE5BTUU7XG4gIH0pXG5gKTtcblxuZnVuY3Rpb24gY2xhc3NPck9iamVjdE1ldGhvZChwYXRoLCBjYWxsSWQpIHtcbiAgICBjb25zdCBub2RlID0gcGF0aC5ub2RlO1xuICAgIGNvbnN0IGJvZHkgPSBub2RlLmJvZHk7XG5cbiAgICBjb25zdCBjb250YWluZXIgPSB0LmZ1bmN0aW9uRXhwcmVzc2lvbihcbiAgICAgICAgbnVsbCxcbiAgICAgICAgW10sXG4gICAgICAgIHQuYmxvY2tTdGF0ZW1lbnQoYm9keS5ib2R5KSxcbiAgICAgICAgdHJ1ZSxcbiAgICApO1xuICAgIGJvZHkuYm9keSA9IFtcbiAgICAgICAgdC5yZXR1cm5TdGF0ZW1lbnQoXG4gICAgICAgICAgICB0LmNhbGxFeHByZXNzaW9uKHQuY2FsbEV4cHJlc3Npb24oY2FsbElkLCBbY29udGFpbmVyXSksIFtdKSxcbiAgICAgICAgKSxcbiAgICBdO1xuXG4gICAgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIG9yIG5vdCB0aGUgd3JhcHBlZCBmdW5jdGlvbiBpcyBhIGFuIGFzeW5jIG1ldGhvZFxuICAgIC8vIG9yIGdlbmVyYXRvciB0aGUgb3V0ZXIgZnVuY3Rpb24gc2hvdWxkIG5vdCBiZVxuICAgIG5vZGUuYXN5bmMgPSBmYWxzZTtcbiAgICBub2RlLmdlbmVyYXRvciA9IGZhbHNlO1xuXG4gICAgLy8gVW53cmFwIHRoZSB3cmFwcGVyIElJRkUncyBlbnZpcm9ubWVudCBzbyBzdXBlciBhbmQgdGhpcyBhbmQgc3VjaCBzdGlsbCB3b3JrLlxuICAgIHBhdGhcbiAgICAgICAgLmdldChcImJvZHkuYm9keS4wLmFyZ3VtZW50LmNhbGxlZS5hcmd1bWVudHMuMFwiKVxuICAgICAgICAudW53cmFwRnVuY3Rpb25FbnZpcm9ubWVudCgpO1xufVxuXG5mdW5jdGlvbiBwbGFpbkZ1bmN0aW9uKHBhdGgsIGNhbGxJZCkge1xuICAgIGNvbnN0IG5vZGUgPSBwYXRoLm5vZGU7XG4gICAgY29uc3QgaXNEZWNsYXJhdGlvbiA9IHBhdGguaXNGdW5jdGlvbkRlY2xhcmF0aW9uKCk7XG4gICAgY29uc3QgZnVuY3Rpb25JZCA9IG5vZGUuaWQ7XG4gICAgbGV0IHdyYXBwZXIgPSBidWlsZFdyYXBwZXI7XG5cbiAgICBpZiAocGF0aC5pc0Fycm93RnVuY3Rpb25FeHByZXNzaW9uKCkpIHtcbiAgICAgICAgcGF0aC5hcnJvd0Z1bmN0aW9uVG9FeHByZXNzaW9uKCk7XG4gICAgfSBlbHNlIGlmICghaXNEZWNsYXJhdGlvbiAmJiBmdW5jdGlvbklkKSB7XG4gICAgICAgIHdyYXBwZXIgPSBuYW1lZEJ1aWxkV3JhcHBlcjtcbiAgICB9XG5cbiAgICBub2RlLmlkID0gbnVsbDtcblxuICAgIGlmIChpc0RlY2xhcmF0aW9uKSB7XG4gICAgICAgIG5vZGUudHlwZSA9IFwiRnVuY3Rpb25FeHByZXNzaW9uXCI7XG4gICAgfVxuXG4gICAgY29uc3QgYnVpbHQgPSB0LmNhbGxFeHByZXNzaW9uKGNhbGxJZCwgW25vZGVdKTtcbiAgICBjb25zdCBjb250YWluZXIgPSB3cmFwcGVyKHtcbiAgICAgICAgTkFNRTogZnVuY3Rpb25JZCB8fCBudWxsLFxuICAgICAgICBSRUY6IHBhdGguc2NvcGUuZ2VuZXJhdGVVaWRJZGVudGlmaWVyKFwicmVmXCIpLFxuICAgICAgICBGVU5DVElPTjogYnVpbHQsXG4gICAgICAgIFBBUkFNUzogbm9kZS5wYXJhbXMucmVkdWNlKFxuICAgICAgICAgICAgKGFjYywgcGFyYW0pID0+IHtcbiAgICAgICAgICAgICAgICBhY2MuZG9uZSA9XG4gICAgICAgICAgICAgICAgICAgIGFjYy5kb25lIHx8IHQuaXNBc3NpZ25tZW50UGF0dGVybihwYXJhbSkgfHwgdC5pc1Jlc3RFbGVtZW50KHBhcmFtKTtcblxuICAgICAgICAgICAgICAgIGlmICghYWNjLmRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjLnBhcmFtcy5wdXNoKHBhdGguc2NvcGUuZ2VuZXJhdGVVaWRJZGVudGlmaWVyKFwieFwiKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGFyYW1zOiBbXSxcbiAgICAgICAgICAgICAgICBkb25lOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICkucGFyYW1zLFxuICAgIH0pLmV4cHJlc3Npb247XG5cbiAgICBpZiAoaXNEZWNsYXJhdGlvbiAmJiBmdW5jdGlvbklkKSB7XG4gICAgICAgIGNvbnN0IGRlY2xhciA9IHQudmFyaWFibGVEZWNsYXJhdGlvbihcImxldFwiLCBbXG4gICAgICAgICAgICB0LnZhcmlhYmxlRGVjbGFyYXRvcihcbiAgICAgICAgICAgICAgICB0LmlkZW50aWZpZXIoZnVuY3Rpb25JZC5uYW1lKSxcbiAgICAgICAgICAgICAgICB0LmNhbGxFeHByZXNzaW9uKGNvbnRhaW5lciwgW10pLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgXSk7XG4gICAgICAgIGRlY2xhci5fYmxvY2tIb2lzdCA9IHRydWU7XG5cbiAgICAgICAgaWYgKHBhdGgucGFyZW50UGF0aC5pc0V4cG9ydERlZmF1bHREZWNsYXJhdGlvbigpKSB7XG4gICAgICAgICAgICAvLyBjaGFuZ2UgdGhlIHBhdGggdHlwZSBzbyB0aGF0IHJlcGxhY2VXaXRoKCkgZG9lcyBub3Qgd3JhcFxuICAgICAgICAgICAgLy8gdGhlIGlkZW50aWZpZXIgaW50byBhbiBleHByZXNzaW9uU3RhdGVtZW50XG4gICAgICAgICAgICBwYXRoLnBhcmVudFBhdGguaW5zZXJ0QmVmb3JlKGRlY2xhcik7XG4gICAgICAgICAgICBwYXRoLnBhcmVudFBhdGgucmVwbGFjZVdpdGgoXG4gICAgICAgICAgICAgICAgdC5leHBvcnROYW1lZERlY2xhcmF0aW9uKG51bGwsIFtcbiAgICAgICAgICAgICAgICAgICAgdC5leHBvcnRTcGVjaWZpZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICB0LmlkZW50aWZpZXIoZnVuY3Rpb25JZC5uYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHQuaWRlbnRpZmllcihcImRlZmF1bHRcIiksXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcGF0aC5yZXBsYWNlV2l0aChkZWNsYXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHJldEZ1bmN0aW9uID0gY29udGFpbmVyLmJvZHkuYm9keVsxXS5hcmd1bWVudDtcbiAgICAgICAgaWYgKCFmdW5jdGlvbklkKSB7XG4gICAgICAgICAgICBuYW1lRnVuY3Rpb24oe1xuICAgICAgICAgICAgICAgIG5vZGU6IHJldEZ1bmN0aW9uLFxuICAgICAgICAgICAgICAgIHBhcmVudDogcGF0aC5wYXJlbnQsXG4gICAgICAgICAgICAgICAgc2NvcGU6IHBhdGguc2NvcGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcmV0RnVuY3Rpb24gfHwgcmV0RnVuY3Rpb24uaWQgfHwgbm9kZS5wYXJhbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyB3ZSBoYXZlIGFuIGluZmVycmVkIGZ1bmN0aW9uIGlkIG9yIHBhcmFtcyBzbyB3ZSBuZWVkIHRoaXMgd3JhcHBlclxuICAgICAgICAgICAgcGF0aC5yZXBsYWNlV2l0aCh0LmNhbGxFeHByZXNzaW9uKGNvbnRhaW5lciwgW10pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHdlIGNhbiBvbWl0IHRoaXMgd3JhcHBlciBhcyB0aGUgY29uZGl0aW9ucyBpdCBwcm90ZWN0cyBmb3IgZG8gbm90IGFwcGx5XG4gICAgICAgICAgICBwYXRoLnJlcGxhY2VXaXRoKGJ1aWx0KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd3JhcEZ1bmN0aW9uKHBhdGgsIGNhbGxJZCkge1xuICAgIGlmIChwYXRoLmlzQ2xhc3NNZXRob2QoKSB8fCBwYXRoLmlzT2JqZWN0TWV0aG9kKCkpIHtcbiAgICAgICAgY2xhc3NPck9iamVjdE1ldGhvZChwYXRoLCBjYWxsSWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHBsYWluRnVuY3Rpb24ocGF0aCwgY2FsbElkKTtcbiAgICB9XG59XG4iXX0=
