"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = wrap;
function wrap(node) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'asyncError';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93cmFwLmpzIl0sIm5hbWVzIjpbIndyYXAiLCJub2RlIiwiY2FsbGJhY2siXSwibWFwcGluZ3MiOiI7Ozs7O2tCQUF3QkEsSTtBQUFULFNBQVNBLElBQVQsQ0FBZUMsSUFBZixFQUE4QztBQUFBLFFBQXpCQyxRQUF5Qix1RUFBZCxZQUFjOztBQUN6RCxXQUFPO0FBQ0gsZ0JBQVEsQ0FDSjtBQUNJLHFCQUFTRCxJQURiO0FBRUkseUJBQWEsSUFGakI7QUFHSSx1QkFBVztBQUNQLHdCQUFRO0FBQ0osNEJBQVEsQ0FDSjtBQUNJLHNDQUFjO0FBQ1YseUNBQWEsQ0FDVDtBQUNJLHdDQUFRO0FBRFosNkJBRFMsRUFJVDtBQUNJLHdDQUFRLE9BRFo7QUFFSSx3Q0FBUTtBQUZaLDZCQUpTLENBREg7QUFVVixzQ0FBVTtBQUNOLDRDQUFZLEtBRE47QUFFTiwwQ0FBVTtBQUNOLDRDQUFRQyxRQURGO0FBRU4sNENBQVE7QUFGRixpQ0FGSjtBQU1OLDRDQUFZO0FBQ1IsNENBQVEsTUFEQTtBQUVSLDRDQUFRO0FBRkEsaUNBTk47QUFVTix3Q0FBUTtBQVZGLDZCQVZBO0FBc0JWLG9DQUFRO0FBdEJFLHlCQURsQjtBQXlCSSxnQ0FBUTtBQXpCWixxQkFESSxDQURKO0FBOEJKLDRCQUFRO0FBOUJKLGlCQUREO0FBaUNQLHlCQUFTO0FBQ0wsNEJBQVEsT0FESDtBQUVMLDRCQUFRO0FBRkgsaUJBakNGO0FBcUNQLHdCQUFRO0FBckNELGFBSGY7QUEwQ0ksb0JBQVE7QUExQ1osU0FESSxDQURMO0FBK0NILGdCQUFRO0FBL0NMLEtBQVA7QUFpREgiLCJmaWxlIjoid3JhcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdyYXAgKG5vZGUsIGNhbGxiYWNrID0gJ2FzeW5jRXJyb3InKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgXCJib2R5XCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImJsb2NrXCI6IG5vZGUsXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZXJcIjogbnVsbCxcbiAgICAgICAgICAgICAgICBcImhhbmRsZXJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImJvZHlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJib2R5XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXhwcmVzc2lvblwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFyZ3VtZW50c1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJUaGlzRXhwcmVzc2lvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIklkZW50aWZpZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNhbGxlZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wdXRlZFwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9iamVjdFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBjYWxsYmFjayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb3BlcnR5XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiY2FsbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJJZGVudGlmaWVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIk1lbWJlckV4cHJlc3Npb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkNhbGxFeHByZXNzaW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiRXhwcmVzc2lvblN0YXRlbWVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkJsb2NrU3RhdGVtZW50XCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJwYXJhbVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiSWRlbnRpZmllclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIkNhdGNoQ2xhdXNlXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIlRyeVN0YXRlbWVudFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwidHlwZVwiOiBcIkJsb2NrU3RhdGVtZW50XCJcbiAgICB9XG59XG4iXX0=
