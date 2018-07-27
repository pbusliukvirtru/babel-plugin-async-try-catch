'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (_ref) {
    var t = _ref.types;

    function alreadyWrapped(node) {
        var body = node.body.body;
        return body && body.length === 1 && t.isTryStatement(body[0]);
    }

    return {
        visitor: {
            Function: function Function(node) {
                if (!alreadyWrapped(node)) {
                    node.body = (0, _wrap2.default)(node.body, function (error) {
                        console.error('IN babel try catch wrapper, error:' + error);
                    });
                }
            }
        }
    };
};

require('source-map-support/register');

var _wrap = require('./wrap.js');

var _wrap2 = _interopRequireDefault(_wrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wbHVnaW4uanMiXSwibmFtZXMiOlsidCIsInR5cGVzIiwiYWxyZWFkeVdyYXBwZWQiLCJub2RlIiwiYm9keSIsImxlbmd0aCIsImlzVHJ5U3RhdGVtZW50IiwidmlzaXRvciIsIkZ1bmN0aW9uIiwiZXJyb3IiLCJjb25zb2xlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7a0JBR2UsZ0JBQXdCO0FBQUEsUUFBTEEsQ0FBSyxRQUFaQyxLQUFZOztBQUNuQyxhQUFTQyxjQUFULENBQXlCQyxJQUF6QixFQUErQjtBQUMzQixZQUFJQyxPQUFPRCxLQUFLQyxJQUFMLENBQVVBLElBQXJCO0FBQ0EsZUFBT0EsUUFBUUEsS0FBS0MsTUFBTCxLQUFnQixDQUF4QixJQUE2QkwsRUFBRU0sY0FBRixDQUFpQkYsS0FBSyxDQUFMLENBQWpCLENBQXBDO0FBQ0g7O0FBRUQsV0FBTztBQUNIRyxpQkFBUztBQUNMQyxvQkFESyxvQkFDS0wsSUFETCxFQUNXO0FBQ1osb0JBQUksQ0FBQ0QsZUFBZUMsSUFBZixDQUFMLEVBQTJCO0FBQ3ZCQSx5QkFBS0MsSUFBTCxHQUFZLG9CQUNSRCxLQUFLQyxJQURHLEVBRVIsVUFBVUssS0FBVixFQUFpQjtBQUNiQyxnQ0FBUUQsS0FBUixDQUFjLHVDQUF1Q0EsS0FBckQ7QUFDSCxxQkFKTyxDQUFaO0FBTUg7QUFDSjtBQVZJO0FBRE4sS0FBUDtBQWNILEM7O0FBdkJEOztBQUNBIiwiZmlsZSI6InBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJztcbmltcG9ydCB3cmFwIGZyb20gJy4vd3JhcC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7IHR5cGVzOiB0IH0pIHtcbiAgICBmdW5jdGlvbiBhbHJlYWR5V3JhcHBlZCAobm9kZSkge1xuICAgICAgICBsZXQgYm9keSA9IG5vZGUuYm9keS5ib2R5O1xuICAgICAgICByZXR1cm4gYm9keSAmJiBib2R5Lmxlbmd0aCA9PT0gMSAmJiB0LmlzVHJ5U3RhdGVtZW50KGJvZHlbMF0pO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHZpc2l0b3I6IHtcbiAgICAgICAgICAgIEZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhbHJlYWR5V3JhcHBlZChub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmJvZHkgPSB3cmFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5ib2R5LFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignSU4gYmFiZWwgdHJ5IGNhdGNoIHdyYXBwZXIsIGVycm9yOicgKyBlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
