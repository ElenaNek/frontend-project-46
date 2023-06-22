import fs from 'node:fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import fileDiff from '../src/index.js';
import plain from '../src/formatters/plain.js';
import stylish from '../src/formatters/stylish.js';

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
    fileDiff(getPathToFixture('expected_file_plain.txt'), getPathToFixture('file2.json'));
  }).toThrow();
});

test('format error', () => {
  const format = 'word';
  const error = new Error(`Format not supported: ${format}`);
  const checkFormat = () => fileDiff(getPathToFixture('file1.json'), getPathToFixture('file2.json'), format);
  expect(checkFormat).toThrow(error);
});

test('plain default error', () => {
  const data = [['abc', 12345, 'added'], ['idd', 45, 'deleted'], ['id', 459, 'moved']];
  const checkType = () => plain(data);
  const type = 'undefined';
  const error = new Error(`Unknown type: '${type}'!`);
  expect(checkType).toThrow(error);
});

test('stylish default error', () => {
  const data = [['abc', 12345, 'added'], ['idd', 45, 'deleted'], ['id', 459, 'moved']];
  expect(() => {
    stylish(data);
  }).toThrow();
});
