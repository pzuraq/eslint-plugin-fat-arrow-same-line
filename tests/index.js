'use strict';

var rule = require('../lib/fat-arrow-same-line.js');
var RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  ecmaFeatures: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true
    }
  }
});

var ruleTester = new RuleTester();
ruleTester.run('fat-arrow-same-line', rule, {
  valid: [
    {
      code: '[1, 2, 3].map(i => i)',
    },
    {
      code: [
        '[1, 2, 3].map(i => {',
        '  return i;',
        '});'
      ].join('\n'),
    },
    {
      code: [
        '[1, 2, 3].map(i => `',
        '  ${i}',
        '  ${i}',
        '`);'
      ].join('\n'),
    },
    {
      code: [
        '[1, 2, 3].map(i => (',
        '  <span>',
        '    {i}',
        '  </span>',
        '));'
      ].join('\n'),
    }
  ],

  invalid: [
    {
      code: [
        '[1, 2, 3].map(i =>',
        '  i',
        ')'
      ].join('\n'),
      errors: [ { message: 'fat arrow body must start on the same line' } ]
    },
    {
      code: [
        '[1, 2, 3].map(i =>',
        '  (',
        '    <span>',
        '      {i}',
        '    </span>',
        '  )',
        ');'
      ].join('\n'),
      errors: [ { message: 'fat arrow body must start on the same line' } ]
    }
  ]
});
