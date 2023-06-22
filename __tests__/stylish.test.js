import stylish from '../src/formatters/stylish.js';

test('stylish default error', () => {
  const data = [['abc', 12345, 'added'], ['idd', 45, 'deleted'], ['id', 459, 'moved']];
  expect(() => {
    stylish(data);
  }).toThrow();
});
