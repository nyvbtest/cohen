import React from 'react';
import { Table, Button, Glyphicon } from 'react-bootstrap';

import { convertDate, convertAmount } from './utils';

import './TransactionsTable.css';

const TransactionsTable = props => {

  const createGlyph = direction => <Glyphicon glyph={`glyphicon glyphicon-chevron-${direction}`} />;

  const createColName = label => {
    const arrow = props[`${label.toLowerCase()}Order`];
    return (
      <Button bsStyle='link' onClick={() => props.sortColumn(label)} >
        {arrow && createGlyph(arrow)}
          {label}
      </Button>
    )
    };

  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th>{createColName('Date')}</th>
          <th>{createColName('Amount')}</th>
          <th>{createColName('Description')}</th>
          <th>{createColName('To')}</th>
          <th>{createColName('From')}</th>
        </tr>
      </thead>
      <tbody>
    {props.currentTransactions.map(transaction =>
      <tr key={transaction.transId} >
        <td>{convertDate(transaction.transTime)}</td>
        <td>{convertAmount(transaction.transAmt)}</td>
        <td>{transaction.description}</td>
        <td>{transaction.transTo}</td>
        <td>{transaction.transFrom}</td>
      </tr>
      )}
      </tbody>
    </Table>
  );
}

export default TransactionsTable;
