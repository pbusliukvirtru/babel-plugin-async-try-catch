'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

require('source-map-support/register');

var _wrapJs = require('./wrap.js');

var _wrapJs2 = _interopRequireDefault(_wrapJs);

exports['default'] = function (_ref) {
    var Plugin = _ref.Plugin;
    var t = _ref.types;

    function alreadyWrapped(node) {
        var body = node.body.body;
        return body && body.length === 1 && t.isTryStatement(body[0]);
    }

    return new Plugin('wrap-functions-in-try-catch', {
        visitor: {
            Function: function Function(node) {
                if (!alreadyWrapped(node)) {
                    node.body = (0, _wrapJs2['default'])(node.body, function (error) {
                        console.error('IN babel try catch wrapper, error:' + error);
                    });
                }
            }
        }
    });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7UUFBTyw2QkFBNkI7O3NCQUNuQixXQUFXOzs7O3FCQUViLFVBQVUsSUFBb0IsRUFBRTtRQUFwQixNQUFNLEdBQVIsSUFBb0IsQ0FBbEIsTUFBTTtRQUFTLENBQUMsR0FBbEIsSUFBb0IsQ0FBVixLQUFLOztBQUNwQyxhQUFTLGNBQWMsQ0FBRSxJQUFJLEVBQUU7QUFDM0IsWUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDMUIsZUFBTyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqRTs7QUFFRCxXQUFPLElBQUksTUFBTSxDQUFDLDZCQUE2QixFQUFFO0FBQzdDLGVBQU8sRUFBRTtBQUNMLG9CQUFRLEVBQUMsa0JBQUMsSUFBSSxFQUFFO0FBQ1osb0JBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDdkIsd0JBQUksQ0FBQyxJQUFJLEdBQUcseUJBQ1IsSUFBSSxDQUFDLElBQUksRUFDVCxVQUFVLEtBQUssRUFBRTtBQUNiLCtCQUFPLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxHQUFHLEtBQUssQ0FBQyxDQUFBO3FCQUM5RCxDQUNKLENBQUM7aUJBQ0w7YUFDSjtTQUNKO0tBQ0osQ0FBQyxDQUFDO0NBQ04iLCJmaWxlIjoicGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuaW1wb3J0IHdyYXAgZnJvbSAnLi93cmFwLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHsgUGx1Z2luLCB0eXBlczogdCB9KSB7XG4gICAgZnVuY3Rpb24gYWxyZWFkeVdyYXBwZWQgKG5vZGUpIHtcbiAgICAgICAgbGV0IGJvZHkgPSBub2RlLmJvZHkuYm9keTtcbiAgICAgICAgcmV0dXJuIGJvZHkgJiYgYm9keS5sZW5ndGggPT09IDEgJiYgdC5pc1RyeVN0YXRlbWVudChib2R5WzBdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFBsdWdpbignd3JhcC1mdW5jdGlvbnMtaW4tdHJ5LWNhdGNoJywge1xuICAgICAgICB2aXNpdG9yOiB7XG4gICAgICAgICAgICBGdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgICAgIGlmICghYWxyZWFkeVdyYXBwZWQobm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5ib2R5ID0gd3JhcChcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuYm9keSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0lOIGJhYmVsIHRyeSBjYXRjaCB3cmFwcGVyLCBlcnJvcjonICsgZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG4iXX0=
