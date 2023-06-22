import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const plain = (data, key = '') => {
  const lines = data.flatMap((item) => {
    const currentKey = key ? `${key}.${item.key}` : item.key;
    switch (item.type) {
      case 'added':
        return `Property '${currentKey}' was added with value: ${stringify(item.value)}`;
      case 'deleted':
        return `Property '${currentKey}' was removed`;
      case 'changed':
        return `Property '${currentKey}' was updated. From ${stringify(item.valueOld)} to ${stringify(item.valueNew)}`;
      case 'unchanged':
        return [];
      case 'nested':
        return plain(item.children, currentKey);
      default:
        throw new Error(`Unknown type: '${item.type}'!`);
    }
  });
  return lines.join('\n');
};

export default plain;
