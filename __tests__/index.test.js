import fs from 'node:fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import fileDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getPathToFixture = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

test.each([
  ['file1.json', 'file2.json', 'result.txt'],
  ['file1.1.yml', 'file1.2.yml', 'result2.txt'],
])('gendiff((%s, %s))', (file1, file2, expected) => {
  const data1 = fileDiff(getPathToFixture(file1), getPathToFixture(file2));
  const result1 = fs.readFileSync(getPathToFixture(expected), { encoding: 'utf-8' });
  expect(data1).toEqual(result1);
});