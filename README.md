# eslint-plugin-fat-arrow-same-line
Force fat-arrow functions body to start on the same line as the arrow

[![Build Status](https://travis-ci.org/buildo/eslint-plugin-fat-arrow-same-line.svg?branch=master)](https://travis-ci.org/buildo/eslint-plugin-fat-arrow-same-line)

## Installation
```sh
npm install --save-dev eslint-plugin-fat-arrow-same-line
```

## Usage
In your `.eslintrc`:

```javascript
{
  "plugins": [
    "fat-arrow-same-line"
  ]
}
```

## Rule

### Good cases

```js
[1, 2, 3].map(i => i);
```
```js
[1, 2, 3].map(i => {
  return i;
});
```

```
[1, 2, 3].map(i => `
  ${i}
`);
```
```js
[1, 2, 3].map(i => (
  <span>
    ${i}
  </span>
);
```

### Bad cases

```js
[1, 2, 3].map(i =>
  i
);
```

```js
[1, 2, 3].map(i =>
  (
    <span>
      {i}
    </span>
  )
);
```
