import process from 'node:process';
import fs from 'node:fs';
import * as path from 'path';
import fileDiff from '../src/index.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getPathToFixture = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);


test('first case', () => {
    const data1 = fileDiff(getPathToFixture('file1.json'), getPathToFixture('file2.json'));
    const result1 = fs.readFileSync(getPathToFixture('result.txt'), {encoding:'utf-8'});
    console.log(data1);
    console.log(result1);
    expect(data1).toEqual(result1);
});