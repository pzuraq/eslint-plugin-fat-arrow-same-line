'use strict';

module.exports = function (context) {

  function reportError(node) {
    context.report(node, 'fat arrow body must start on the same line', { identifier: node.name });
  }

  function checkNoNewlineAfterArrow(node) {
    var arrowLine = node.loc.start.line;
    var bodyStartLine = node.body.loc.start.line;
    if (node.body.extra && node.body.extra.parenthesized) {
      if (bodyStartLine - 1 > arrowLine) {
        reportError(node.body);
      }
    } else {
      if (bodyStartLine > arrowLine) {
        reportError(node.body);
      }
    }
  }

  return {
    ArrowFunctionExpression: checkNoNewlineAfterArrow
  };
};
