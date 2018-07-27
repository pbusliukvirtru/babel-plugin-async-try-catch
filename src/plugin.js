import 'source-map-support/register';
import wrap from './wrap.js';

export default function ({ Plugin, types: t }) {
    function alreadyWrapped (node) {
        let body = node.body.body;
        return body && body.length === 1 && t.isTryStatement(body[0]);
    }

    return new Plugin('wrap-functions-in-try-catch', {
        visitor: {
            Function (node) {
                if (!alreadyWrapped(node)) {
                    node.body = wrap(node.body, function (error) {
                        console.error('IN babel try catch wrapper, error is :' +
                            ' ' + error)
                    });
                }
            }
        }
    });
}
