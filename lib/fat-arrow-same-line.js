'use strict';

module.exports = function (context) {
  let allowParens = false;
  let allowObjects = false;
  let allowArrays = false;
  let allowBoolExpressions = false;
  let allowNew = false;
  let allowTemplates = false;
  let allowMembers = false;

  if (context.options.length) {
    allowParens = context.options[0].allowParens;
    allowObjects = context.options[0].allowObjects;
    allowArrays = context.options[0].allowArrays;
    allowBoolExpressions = context.options[0].allowBoolExpressions;
    allowNew = context.options[0].allowNew;
    allowTemplates = context.options[0].allowTemplates;
    allowMembers = context.options[0].allowMembers;
  }

  const addendumMessages = [];

  if (allowObjects) addendumMessages.push('object expressions');
  if (allowArrays) addendumMessages.push('array expressions');
  if (allowBoolExpressions) addendumMessages.push('logical expressions');
  if (allowNew) addendumMessages.push('new statements');
  if (allowTemplates) addendumMessages.push('template strings');
  if (allowMembers) addendumMessages.push('whitelisted member functions');

  const standardMessage = `arrow functions with implicit returns must start and end on the same line (except ${addendumMessages.join(', ')})`;

  function reportError(node, message) {
    context.report(node, message, { identifier: node.name });
  }

  function checkNoNewlineAfterArrow(node) {
    const bodyType = node.body.type;
    const arrowLine = node.loc.start.line;
    const bodyStartLine = node.body.loc.start.line;
    const bodyEndLine = node.body.loc.end.line;

    let memberIsAllowed = false;

    if (!allowParens && bodyType !== 'ObjectExpression' && node.body.extra && node.body.extra.parenthesized) {
      reportError(node.body, 'arrow functions with implicit returns must not have parenthesized statements');
    }

    if (allowMembers && bodyType === 'CallExpression' && node.body.callee.type === 'MemberExpression') {
      if (allowMembers === true) {
        memberIsAllowed = true;
      } else {
        memberIsAllowed = allowMembers.includes(node.body.callee.property.name);
      }
    }

    if (
      bodyType !== 'BlockStatement'
      && !(
        (allowObjects && bodyType === 'ObjectExpression')
        || (allowArrays && bodyType === 'ArrayExpression')
        || (allowBoolExpressions && (bodyType === 'LogicalExpression' || bodyType === 'BinaryExpression'))
        || (allowNew && bodyType === 'NewExpression')
        || (allowTemplates && (bodyType === 'TemplateLiteral' || bodyType === 'TaggedTemplateExpression'))
        || memberIsAllowed
      )
    ) {
      if (bodyStartLine > arrowLine || bodyEndLine > arrowLine) {
        reportError(node.body, standardMessage);
      }
    } else if (allowBoolExpressions && bodyType === 'LogicalExpression') {
      if (bodyEndLine > arrowLine && bodyStartLine === arrowLine) {
        reportError(node.body, 'logical expressions that span multiple lines should begin on their own line');
      }
    }
  }

  return {
    ArrowFunctionExpression: checkNoNewlineAfterArrow
  };
};
