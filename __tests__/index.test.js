import fs from 'node:fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import fileDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getPathToFixture = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

test.each([
  ['file1.json', 'file2.json', 'expected_file_stylish.txt', 'stylish'],
  ['file1.json', 'file2.json', 'expected_file_stylish.txt', undefined],
  ['file1.json', 'file2.json', 'expected_file_plain.txt', 'plain'],
  ['file1.json', 'file2.json', 'expected_file_json.json', 'json'],
])('test json format %s, %s', (file1, file2, expected, format) => {
  const data1 = fileDiff(getPathToFixture(file1), getPathToFixture(file2), format);
  const result1 = fs.readFileSync(getPathToFixture(expected), { encoding: 'utf-8' });
  expect(data1).toEqual(result1);
});

test.each([
  ['file1.yml', 'file2.yml', 'expected_file_stylish.txt', 'stylish'],
  ['file1.yml', 'file2.yaml', 'expected_file_stylish.txt', 'stylish'],
  ['file1.yml', 'file2.yml', 'expected_file_stylish.txt', undefined],
  ['file1.yml', 'file2.yml', 'expected_file_plain.txt', 'plain'],
  ['file1.yml', 'file2.yml', 'expected_file_json.json', 'json'],
])('test yml/yaml format %s, %s', (file1, file2, expected, format) => {
  const data1 = fileDiff(getPathToFixture(file1), getPathToFixture(file2), format);
  const result1 = fs.readFileSync(getPathToFixture(expected), { encoding: 'utf-8' });
  expect(data1).toEqual(result1);
});

test('parsers error, incorrect extension', () => {
  expect(() => {
    fileDiff(getPathToFixture('file1.json'), getPathToFixture('file2.json'), 'word');
  }).toThrow();
});
