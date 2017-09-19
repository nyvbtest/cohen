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
