import process from 'node:process';
import fs from 'node:fs';
import * as path from 'path';
import _ from 'lodash';
import { type } from 'node:os';
import parse from './parsers.js';

export default (path1, path2) => {
  const fileContent1 = fs.readFileSync(path.resolve(process.cwd(), path1));
  const fileContent2 = fs.readFileSync(path.resolve(process.cwd(), path2));

  const fileExtension1 = path.extname(path1).slice(1);
  const fileExtension2 = path.extname(path2).slice(1);

  const data1 = parse(fileContent1, fileExtension1);
  const data2 = parse(fileContent2, fileExtension2);

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));
  const indent = ' '.repeat(4);

  const buildTree = sortedKeys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return { key, value: data2[key], type: 'added' };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, value: data1[key], type: 'deleted' };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return { key, value1: data1[key], value2: data2[key], type: 'changed' };
    }
    return { key, value: data1[key], type: 'unchanged' };
  });

  const lines = buildTree.map((item) => {
    if (item.type === 'added') {
      return `  + ${item.key}: ${item.value}`;
    }
    if (item.type === 'deleted') {
      return `  - ${item.key}: ${item.value}`;
    }
    if (item.type === 'changed') {
      return `  - ${item.key}: ${item.value1}\n  + ${item.key}: ${item.value2}`;
    }
    return `${indent}${item.key}: ${item.value}`;
  });
  return ['{', ...lines, '}'].join('\n');
};
