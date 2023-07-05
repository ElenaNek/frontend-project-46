# Вычислитель отличий
## Hexlet tests and linter status

[![hexlet-check](https://github.com/ElenaNek/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/ElenaNek/frontend-project-46/actions/workflows/hexlet-check.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/3407583d6e309a4c65a9/maintainability)](https://codeclimate.com/github/ElenaNek/frontend-project-46/maintainability)
[![Node CI](https://github.com/ElenaNek/frontend-project-46/actions/workflows/nodeCI.yml/badge.svg)](https://github.com/ElenaNek/frontend-project-46/actions/workflows/nodeCI.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3407583d6e309a4c65a9/test_coverage)](https://codeclimate.com/github/ElenaNek/frontend-project-46/test_coverage)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

Read this in other languages: Russian | [English](./Readme_english.md)

### Описание

Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например http://www.jsondiff.com/. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменений в конфигурационных файлах.

В процессе написания кода использовались библиотеки: commander.js, loodash.
Для написания тестов использовался фреймворк Jest.

Возможности утилиты:

- Поддержка разных входных форматов: yaml, json
- Генерация отчета в виде plain text, stylish и json

## Требования

- Git клиент
- Node.js 18 или выше
- Make

## Установка

* Клонировать проект
```
$ git clone 
```
* Установить пакет(может потребоваться sudo)
```
$ make setup
```

## Вывод справочной информации по утилите

```bash
gendiff -h 
```

## Пример использования

### Сравнение плоских файлов (JSON)

```
$ gendiff filePath1.json filePath2.json
```
[![asciicast](https://asciinema.org/a/jAv7G1Hn11IcyjuYxI00mwZAk.svg)](https://asciinema.org/a/jAv7G1Hn11IcyjuYxI00mwZAk)

### Сравнение плоских файлов (yaml)

```
$ gendiff filePath1.yml filePath2.yml
```
[![asciicast](https://asciinema.org/a/0bmqrDT9pCYRbNj284qxCwiKi.svg)](https://asciinema.org/a/0bmqrDT9pCYRbNj284qxCwiKi)

### Рекурсивное сравнение

Так как формат stylish применяется по умолчанию, можно использовать два варианта команды:

```
$ gendiff __fixtures__/file1.json __fixtures__/file2.json
```
или

```
$ gendiff --format stylish __fixtures__/file1.json __fixtures__/file2.json
```
[![asciicast](https://asciinema.org/a/SAMik7yxlNvhpGrdJQwUQz0Nh.svg)](https://asciinema.org/a/SAMik7yxlNvhpGrdJQwUQz0Nh)

### Плоский формат вывода

```
$ gendiff -f plain __fixtures__/file1.yml __fixtures__/file2.yml
```
[![asciicast](https://asciinema.org/a/UZrDrjudzXn4f7uPdqy7W4ojE.svg)](https://asciinema.org/a/UZrDrjudzXn4f7uPdqy7W4ojE)

### Вывод в json

```
$ gendiff --format json __fixtures__/file1.yml __fixtures__/file2.yml
```
[![asciicast](https://asciinema.org/a/n2o3qYIhzLVreCT5Kdig7q8FK.svg)](https://asciinema.org/a/n2o3qYIhzLVreCT5Kdig7q8FK)
