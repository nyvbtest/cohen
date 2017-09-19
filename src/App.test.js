import React from 'react';
import { mount } from 'enzyme';
import { App } from './App';
import { transactions } from './utils';

test('sortColumn properly sorts transactions', () => {
  const app = mount(<App transactions={transactions} />),
    nextProps = { transactions: transactions }
  app.instance().componentWillReceiveProps(nextProps);

  app.instance().sortColumn('Amount');
  expect(app.instance().state.transactions[0].transId).toBe(3);
  expect(app.instance().state.amountOrder).toBe('down');

  app.instance().sortColumn('Amount');
  expect(app.instance().state.transactions[0].transId).toBe(6);
  expect(app.instance().state.amountOrder).toBe('up');

  app.instance().sortColumn('To');
  expect(app.instance().state.transactions[0].transId).toBe(2);
  expect(app.instance().state.toOrder).toBe('up');
  expect(app.instance().state.amountOrder).toBe(null);
});

test('No more than 10 transactions are rendered at a time', () => {
  const app = mount(<App transactions={transactions} />),
    nextProps = { transactions: transactions }
  app.instance().componentWillReceiveProps(nextProps);

  expect(app.find('.tableRow').length).toBeLessThan(11);
});

test('calculateChange correctly calculates change in balance in last 24 hours', () => {
  const app = mount(<App transactions={transactions} />);
  expect(app.instance().calculateChange()).toBe(11);
});

test('filterByDate returns only transactions from designated time frame', () => {
  const app = mount(<App transactions={transactions} />);

  app.instance().setState({ dateRange: 7 });
  expect(app.instance().filterByDate(transactions).length).toBe(8);

  app.instance().setState({ dateRange: 30 });
  expect(app.instance().filterByDate(transactions).length).toBe(9);

  app.instance().setState({ dateRange: 90 });
  expect(app.instance().filterByDate(transactions).length).toBe(10);

  app.instance().setState({ dateRange: 0 });
  expect(app.instance().filterByDate(transactions).length).toBe(11);
});

test('filterByType filters by deposit or withdrawal', () => {
  const app = mount(<App transactions={transactions} />);

  app.instance().setState({ transType: 1 });
  expect(app.instance().filterByType(transactions).length).toBe(10);

  app.instance().setState({ transType: -1 });
  expect(app.instance().filterByType(transactions).length).toBe(1);

  app.instance().setState({ transType: 0 });
  expect(app.instance().filterByType(transactions).length).toBe(11);
});
