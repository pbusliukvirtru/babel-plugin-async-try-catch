import 'source-map-support/register';
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

import nameFunction from "babel-helper-function-name";
import template from "babel-template";
import * as t from "babel-types";

const buildWrapper = template(`
  (() => {
    var REF = FUNCTION;
    return function NAME(PARAMS) {
      return REF.apply(this, arguments);
    };
  })
`);

const namedBuildWrapper = template(`
  (() => {
    var REF = FUNCTION;
    function NAME(PARAMS) {
      return REF.apply(this, arguments);
    }
    return NAME;
  })
`);

function classOrObjectMethod(path, callId) {
    const node = path.node;
    const body = node.body;

    const container = t.functionExpression(
        null,
        [],
        t.blockStatement(body.body),
        true,
    );
    body.body = [
        t.returnStatement(
            t.callExpression(t.callExpression(callId, [container]), []),
        ),
    ];

    // Regardless of whether or not the wrapped function is a an async method
    // or generator the outer function should not be
    node.async = false;
    node.generator = false;

    // Unwrap the wrapper IIFE's environment so super and this and such still work.
    path
        .get("body.body.0.argument.callee.arguments.0")
        .unwrapFunctionEnvironment();
}

function plainFunction(path, callId) {
    const node = path.node;
    const isDeclaration = path.isFunctionDeclaration();
    const functionId = node.id;
    let wrapper = buildWrapper;

    if (path.isArrowFunctionExpression()) {
        path.arrowFunctionToExpression();
    } else if (!isDeclaration && functionId) {
        wrapper = namedBuildWrapper;
    }

    node.id = null;

    if (isDeclaration) {
        node.type = "FunctionExpression";
    }

    const built = t.callExpression(callId, [node]);
    const container = wrapper({
        NAME: functionId || null,
        REF: path.scope.generateUidIdentifier("ref"),
        FUNCTION: built,
        PARAMS: node.params.reduce(
            (acc, param) => {
                acc.done =
                    acc.done || t.isAssignmentPattern(param) || t.isRestElement(param);

                if (!acc.done) {
                    acc.params.push(path.scope.generateUidIdentifier("x"));
                }

                return acc;
            },
            {
                params: [],
                done: false,
            },
        ).params,
    }).expression;

    if (isDeclaration && functionId) {
        const declar = t.variableDeclaration("let", [
            t.variableDeclarator(
                t.identifier(functionId.name),
                t.callExpression(container, []),
            ),
        ]);
        declar._blockHoist = true;

        if (path.parentPath.isExportDefaultDeclaration()) {
            // change the path type so that replaceWith() does not wrap
            // the identifier into an expressionStatement
            path.parentPath.insertBefore(declar);
            path.parentPath.replaceWith(
                t.exportNamedDeclaration(null, [
                    t.exportSpecifier(
                        t.identifier(functionId.name),
                        t.identifier("default"),
                    ),
                ]),
            );
            return;
        }

        path.replaceWith(declar);
    } else {
        const retFunction = container.body.body[1].argument;
        if (!functionId) {
            nameFunction({
                node: retFunction,
                parent: path.parent,
                scope: path.scope,
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

export default function wrapFunction(path, callId) {
    if (path.isClassMethod() || path.isObjectMethod()) {
        classOrObjectMethod(path, callId);
    } else {
        plainFunction(path, callId);
    }
}
