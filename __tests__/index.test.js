import { readFileSync } from 'node:fs';
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
])('diff json format %s, %s', (file1, file2, expected, format) => {
  const data1 = fileDiff(getPathToFixture(file1), getPathToFixture(file2), format);
  const result1 = readFileSync(getPathToFixture(expected), {
    encoding: 'utf-8',
  });
  expect(data1).toEqual(result1);
});

test.each([
  ['file1.yml', 'file2.yml', 'expected_file_stylish.txt', 'stylish'],
  ['file1.yml', 'file2.yaml', 'expected_file_stylish.txt', 'stylish'],
  ['file1.yml', 'file2.yml', 'expected_file_stylish.txt', undefined],
  ['file1.yml', 'file2.yml', 'expected_file_plain.txt', 'plain'],
  ['file1.yml', 'file2.yml', 'expected_file_json.json', 'json'],
])('diff yml/yaml format %s, %s', (file1, file2, expected, format) => {
  const data1 = fileDiff(getPathToFixture(file1), getPathToFixture(file2), format);
  const result1 = readFileSync(getPathToFixture(expected), { encoding: 'utf-8' });
  expect(data1).toEqual(result1);
});

test('parsers error, incorrect extension', () => {
  expect(() => {
    fileDiff(getPathToFixture('file1.json'), getPathToFixture('file2.json'), 'word');
  }).toThrow();
});

test('parser error', () => {
  const file1 = getPathToFixture('file1.json');
  const file2 = getPathToFixture('file3.txt');

  const checkParse = () => fileDiff(file1, file2);
  const error = new Error('Incorrect extension');

  expect(checkParse).toThrow(error);
});

test('plain default error', () => {
  const data = getPathToFixture('file3.txt');
  expect(() => { plain(data); }).toThrow();
});

test('stylish default error', () => {
  const data = getPathToFixture('file3.txt');
  expect(() => { stylish(data); }).toThrow();
});
