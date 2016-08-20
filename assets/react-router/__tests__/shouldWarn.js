"use strict";

exports.__esModule = true;
exports.default = shouldWarn;
function shouldWarn(about) {
  console.error.expected.push(about); // eslint-disable-line no-console
}
module.exports = exports["default"];