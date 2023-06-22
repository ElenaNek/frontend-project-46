import plain from '../src/formatters/plain.js';

test('plain default error', () => {
  const data = [['abc', 12345, 'added'], ['idd', 45, 'deleted'], ['id', 459, 'moved']];
  expect(() => {
    plain(data);
  }).toThrow();
});
