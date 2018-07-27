"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = wrap;

function wrap(node) {
    var callback = arguments.length <= 1 || arguments[1] === undefined ? 'asyncError' : arguments[1];

    return {
        "body": [{
            "block": node,
            "finalizer": null,
            "handler": {
                "body": {
                    "body": [{
                        "expression": {
                            "arguments": [{
                                "type": "ThisExpression"
                            }, {
                                "name": "error",
                                "type": "Identifier"
                            }],
                            "callee": {
                                "computed": false,
                                "object": {
                                    "name": callback,
                                    "type": "Identifier"
                                },
                                "property": {
                                    "name": "call",
                                    "type": "Identifier"
                                },
                                "type": "MemberExpression"
                            },
                            "type": "CallExpression"
                        },
                        "type": "ExpressionStatement"
                    }],
                    "type": "BlockStatement"
                },
                "param": {
                    "name": "error",
                    "type": "Identifier"
                },
                "type": "CatchClause"
            },
            "type": "TryStatement"
        }],
        "type": "BlockStatement"
    };
}

module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93cmFwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O3FCQUF3QixJQUFJOztBQUFiLFNBQVMsSUFBSSxDQUFFLElBQUksRUFBMkI7UUFBekIsUUFBUSx5REFBRyxZQUFZOztBQUN2RCxXQUFPO0FBQ0gsY0FBTSxFQUFFLENBQ0o7QUFDSSxtQkFBTyxFQUFFLElBQUk7QUFDYix1QkFBVyxFQUFFLElBQUk7QUFDakIscUJBQVMsRUFBRTtBQUNQLHNCQUFNLEVBQUU7QUFDSiwwQkFBTSxFQUFFLENBQ0o7QUFDSSxvQ0FBWSxFQUFFO0FBQ1YsdUNBQVcsRUFBRSxDQUNUO0FBQ0ksc0NBQU0sRUFBRSxnQkFBZ0I7NkJBQzNCLEVBQ0Q7QUFDSSxzQ0FBTSxFQUFFLE9BQU87QUFDZixzQ0FBTSxFQUFFLFlBQVk7NkJBQ3ZCLENBQ0o7QUFDRCxvQ0FBUSxFQUFFO0FBQ04sMENBQVUsRUFBRSxLQUFLO0FBQ2pCLHdDQUFRLEVBQUU7QUFDTiwwQ0FBTSxFQUFFLFFBQVE7QUFDaEIsMENBQU0sRUFBRSxZQUFZO2lDQUN2QjtBQUNELDBDQUFVLEVBQUU7QUFDUiwwQ0FBTSxFQUFFLE1BQU07QUFDZCwwQ0FBTSxFQUFFLFlBQVk7aUNBQ3ZCO0FBQ0Qsc0NBQU0sRUFBRSxrQkFBa0I7NkJBQzdCO0FBQ0Qsa0NBQU0sRUFBRSxnQkFBZ0I7eUJBQzNCO0FBQ0QsOEJBQU0sRUFBRSxxQkFBcUI7cUJBQ2hDLENBQ0o7QUFDRCwwQkFBTSxFQUFFLGdCQUFnQjtpQkFDM0I7QUFDRCx1QkFBTyxFQUFFO0FBQ0wsMEJBQU0sRUFBRSxPQUFPO0FBQ2YsMEJBQU0sRUFBRSxZQUFZO2lCQUN2QjtBQUNELHNCQUFNLEVBQUUsYUFBYTthQUN4QjtBQUNELGtCQUFNLEVBQUUsY0FBYztTQUN6QixDQUNKO0FBQ0QsY0FBTSxFQUFFLGdCQUFnQjtLQUMzQixDQUFBO0NBQ0oiLCJmaWxlIjoid3JhcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdyYXAgKG5vZGUsIGNhbGxiYWNrID0gJ2FzeW5jRXJyb3InKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgXCJib2R5XCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImJsb2NrXCI6IG5vZGUsXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZXJcIjogbnVsbCxcbiAgICAgICAgICAgICAgICBcImhhbmRsZXJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImJvZHlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJib2R5XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXhwcmVzc2lvblwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFyZ3VtZW50c1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJUaGlzRXhwcmVzc2lvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIklkZW50aWZpZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNhbGxlZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wdXRlZFwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9iamVjdFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBjYWxsYmFjayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb3BlcnR5XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiY2FsbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJJZGVudGlmaWVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIk1lbWJlckV4cHJlc3Npb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkNhbGxFeHByZXNzaW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiRXhwcmVzc2lvblN0YXRlbWVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkJsb2NrU3RhdGVtZW50XCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJwYXJhbVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkNhdGNoQ2xhdXNlXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIlRyeVN0YXRlbWVudFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwidHlwZVwiOiBcIkJsb2NrU3RhdGVtZW50XCJcbiAgICB9XG59XG4iXX0=
