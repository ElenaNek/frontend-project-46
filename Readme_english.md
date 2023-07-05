# Difference Calculator

## Hexlet tests and linter status

[![hexlet-check](https://github.com/ElenaNek/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/ElenaNek/frontend-project-46/actions/workflows/hexlet-check.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/3407583d6e309a4c65a9/maintainability)](https://codeclimate.com/github/ElenaNek/frontend-project-46/maintainability)
[![Node CI](https://github.com/ElenaNek/frontend-project-46/actions/workflows/nodeCI.yml/badge.svg)](https://github.com/ElenaNek/frontend-project-46/actions/workflows/nodeCI.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3407583d6e309a4c65a9/test_coverage)](https://codeclimate.com/github/ElenaNek/frontend-project-46/test_coverage)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

Read this in other languages: English | [Russian](./README.md)

### Description

A difference calculator is a program that determines the difference between two data structures. This is a popular task for which there are many online services, such as http://www.jsondiff.com/. Such a mechanism is used when outputting tests or when automatically tracking changes in configuration files.

When writing the code the following libraries were used: commander.js, loodash.
The Jest framework was used to write the tests.

Utility capabilities:

- Support of different input formats: yaml, json
- Report generation as plain text, stylish and json

## Requirements

- Git client
- Node.js 18 or higher
- *.nix OS

## Setup

*  Clone the project
```bash
git clone 
```
* Install the package (may require sudo)
```bash
make install
```
```bash
make link
```
* Display help information on utility
```bash
gendiff -h 
```

## Example usage

#### Difference in json format (plain)

```
gendiff filePath1.json filePath2.json
```
[![asciicast](https://asciinema.org/a/o7cf7jE4di4fkPTnT3sotMjc2.svg)](https://asciinema.org/a/o7cf7jE4di4fkPTnT3sotMjc2)

### Comparison of plain files (yaml)

```
gendiff filePath1.yml filePath2.yml
```
[![asciicast](https://asciinema.org/a/0bmqrDT9pCYRbNj284qxCwiKi.svg)](https://asciinema.org/a/0bmqrDT9pCYRbNj284qxCwiKi)

### Recursive comparison (json or yaml/yml)

Since the format stylish is applied by default, you can use two variants of the command:

```
gendiff __fixtures__/file1.json __fixtures__/file2.json
```
Or

```
gendiff --format stylish __fixtures__/file1.json __fixtures__/file2.json
```
[![asciicast](https://asciinema.org/a/SAMik7yxlNvhpGrdJQwUQz0Nh.svg)](https://asciinema.org/a/SAMik7yxlNvhpGrdJQwUQz0Nh)

### yml/yaml files difference in plain format
(you can compare json files in plain format the same way)

```
gendiff -f plain __fixtures__/file1.yml __fixtures__/file2.yml
```
[![asciicast](https://asciinema.org/a/UZrDrjudzXn4f7uPdqy7W4ojE.svg)](https://asciinema.org/a/UZrDrjudzXn4f7uPdqy7W4ojE)

### Output to json

```
gendiff --format json __fixtures__/file1.yml __fixtures__/file2.yml
```
[![asciicast](https://asciinema.org/a/n2o3qYIhzLVreCT5Kdig7q8FK.svg)](https://asciinema.org/a/n2o3qYIhzLVreCT5Kdig7q8FK)
