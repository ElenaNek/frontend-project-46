import _ from 'lodash';

const getIndent = (depth, replacer = ' ', count = 4) => replacer.repeat((depth + 1) * count);
const getBracketIndent = (depth, replacer = ' ', count = 4) => replacer.repeat(depth * count);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const indent = getIndent(depth);
  const bracketIndent = getBracketIndent(depth);

  const lines = Object
    .entries(value)
    .map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    const indent = getIndent(depth).slice(0, -2);
    const bracketIndent = getBracketIndent(depth);
    const lines = node.map((item) => {
      switch (item.type) {
        case 'nested':
          return `${indent}  ${item.key}: ${iter(item.children, depth + 1)}`;
        case 'added':
          return `${indent}+ ${item.key}: ${stringify(item.value, depth + 1)}`;
        case 'deleted':
          return `${indent}- ${item.key}: ${stringify(item.value, depth + 1)}`;
        case 'changed':
          return [
            `${indent}- ${item.key}: ${stringify(item.valueOld, depth + 1)}`,
            `${indent}+ ${item.key}: ${stringify(item.valueNew, depth + 1)}`,
          ].join('\n');
        case 'unchanged':
          return `${indent}  ${item.key}: ${stringify(item.value, depth + 1)}`;
        default:
          throw new Error(`Unknown property type: '${type}'!`);
      }
    });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(tree, 0);
};

export default stylish;