import { convertDate, convertAmount, calculateBalance, transactions } from './utils';

test('convertDate converts date from UNIX timestamp to proper format', () => {
  expect(convertDate(1505786319000)).toBe('Sep 18 2017');
});

test('convertAmount converts amount to proper format', () => {
  expect(convertAmount(100)).toBe('$100.00');
  expect(convertAmount(-100)).toBe('-$100.00');
  expect(convertAmount(5.5)).toBe('$5.50');
  expect(convertAmount(5.25)).toBe('$5.25');
});


test('calculateBalance correctly calculates the current balance', () => {
  expect(calculateBalance(transactions)).toBe(28);
});
