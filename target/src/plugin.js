'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (_ref) {
    var Plugin = _ref.Plugin,
        t = _ref.types;

    function alreadyWrapped(node) {
        var body = node.body.body;
        return body && body.length === 1 && t.isTryStatement(body[0]);
    }

    return new Plugin('wrap-functions-in-try-catch', {
        visitor: {
            Function: function Function(node) {
                if (!alreadyWrapped(node)) {
                    node.body = (0, _wrap2.default)(node.body, function (error) {
                        console.error('IN babel try catch wrapper, error:' + error);
                    });
                }
            }
        }
    });
};

require('source-map-support/register');

var _wrap = require('./wrap.js');

var _wrap2 = _interopRequireDefault(_wrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wbHVnaW4uanMiXSwibmFtZXMiOlsiUGx1Z2luIiwidCIsInR5cGVzIiwiYWxyZWFkeVdyYXBwZWQiLCJub2RlIiwiYm9keSIsImxlbmd0aCIsImlzVHJ5U3RhdGVtZW50IiwidmlzaXRvciIsIkZ1bmN0aW9uIiwiZXJyb3IiLCJjb25zb2xlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7a0JBR2UsZ0JBQWdDO0FBQUEsUUFBcEJBLE1BQW9CLFFBQXBCQSxNQUFvQjtBQUFBLFFBQUxDLENBQUssUUFBWkMsS0FBWTs7QUFDM0MsYUFBU0MsY0FBVCxDQUF5QkMsSUFBekIsRUFBK0I7QUFDM0IsWUFBSUMsT0FBT0QsS0FBS0MsSUFBTCxDQUFVQSxJQUFyQjtBQUNBLGVBQU9BLFFBQVFBLEtBQUtDLE1BQUwsS0FBZ0IsQ0FBeEIsSUFBNkJMLEVBQUVNLGNBQUYsQ0FBaUJGLEtBQUssQ0FBTCxDQUFqQixDQUFwQztBQUNIOztBQUVELFdBQU8sSUFBSUwsTUFBSixDQUFXLDZCQUFYLEVBQTBDO0FBQzdDUSxpQkFBUztBQUNMQyxvQkFESyxvQkFDS0wsSUFETCxFQUNXO0FBQ1osb0JBQUksQ0FBQ0QsZUFBZUMsSUFBZixDQUFMLEVBQTJCO0FBQ3ZCQSx5QkFBS0MsSUFBTCxHQUFZLG9CQUNSRCxLQUFLQyxJQURHLEVBRVIsVUFBVUssS0FBVixFQUFpQjtBQUNiQyxnQ0FBUUQsS0FBUixDQUFjLHVDQUF1Q0EsS0FBckQ7QUFDSCxxQkFKTyxDQUFaO0FBTUg7QUFDSjtBQVZJO0FBRG9DLEtBQTFDLENBQVA7QUFjSCxDOztBQXZCRDs7QUFDQSIsImZpbGUiOiJwbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG5pbXBvcnQgd3JhcCBmcm9tICcuL3dyYXAuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoeyBQbHVnaW4sIHR5cGVzOiB0IH0pIHtcbiAgICBmdW5jdGlvbiBhbHJlYWR5V3JhcHBlZCAobm9kZSkge1xuICAgICAgICBsZXQgYm9keSA9IG5vZGUuYm9keS5ib2R5O1xuICAgICAgICByZXR1cm4gYm9keSAmJiBib2R5Lmxlbmd0aCA9PT0gMSAmJiB0LmlzVHJ5U3RhdGVtZW50KGJvZHlbMF0pO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUGx1Z2luKCd3cmFwLWZ1bmN0aW9ucy1pbi10cnktY2F0Y2gnLCB7XG4gICAgICAgIHZpc2l0b3I6IHtcbiAgICAgICAgICAgIEZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhbHJlYWR5V3JhcHBlZChub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmJvZHkgPSB3cmFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5ib2R5LFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignSU4gYmFiZWwgdHJ5IGNhdGNoIHdyYXBwZXIsIGVycm9yOicgKyBlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiJdfQ==
