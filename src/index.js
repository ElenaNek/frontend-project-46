import process from 'node:process';
import fs from 'node:fs';
import * as path from 'path';
import parse from './parsers.js';
import format from './formatters/index.js';
import makeTree from './buildtree.js';

export default (path1, path2, formatName = 'stylish') => {
  const fileContent1 = fs.readFileSync(path.resolve(process.cwd(), path1));
  const fileContent2 = fs.readFileSync(path.resolve(process.cwd(), path2));

  const fileExtension1 = path.extname(path1).slice(1);
  const fileExtension2 = path.extname(path2).slice(1);

  const data1 = parse(fileContent1, fileExtension1);
  const data2 = parse(fileContent2, fileExtension2);

  const tree = makeTree(data1, data2);
  return format(tree, formatName);
};
