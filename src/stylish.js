import _ from 'lodash';

const getIndent = (depth, replacer = ' ', spaceCount = 4) => replacer.repeat(depth * spaceCount);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const indent = getIndent(depth);
  const bracketIndent = getIndent(depth - 1);

  const lines = Object
    .entries(value)
    .map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (tree, depth = 1) => {
  const indent = getIndent(depth).slice(0, -2);
  const bracketIndent = getIndent(depth - 1);
  const lines = tree.flatMap((item) => {
    switch (item.type) {
      case 'nested':
        return `${indent}  ${item.key}: ${stylish(item.children, depth + 1)}`;
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
        throw new Error(`Unknown type: '${item.type}'!`);
    }
  });
  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

export default stylish;
