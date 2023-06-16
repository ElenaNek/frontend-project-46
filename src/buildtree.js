import _ from 'lodash';

const makeTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  return sortedKeys.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return { key, value: obj2[key], type: 'added' };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { key, value: obj1[key], type: 'deleted' };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { key, children: makeTree(obj1[key], obj2[key]), type: 'nested' };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        key,
        valueOld: obj1[key],
        valueNew: obj2[key],
        type: 'changed',
      };
    }
    return { key, value: obj1[key], type: 'unchanged' };
  });
};

export default makeTree;
