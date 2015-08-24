'use strict';

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = traverse;
function transformToken(token) {
  var children = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  return _Object$assign({}, token, {
    type: token.type.replace('_open', ''),
    children: children
  });
}

function traverse() {
  var tokens = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

  var openToken = null;
  var children = [];
  var result = [];

  tokens.map(function (token, index) {
    if (openToken) {
      if (openToken.tag === token.tag && openToken.level === token.level && token.nesting === -1) {
        result.push(transformToken(openToken, traverse(children)));
        children = [];
        openToken = null;
      } else {
        children.push(token);
      }
    } else if (token.nesting === 0) {
      if (token.children && token.children.length > 0) {
        result.push(transformToken(token, traverse(token.children)));
      } else {
        result.push(transformToken(token));
      }
    }

    if (!openToken && token.nesting === 1) {
      openToken = token;
    }
  });

  return result;
}

module.exports = exports['default'];