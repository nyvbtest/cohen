import React from 'react';
import { Table, Button, Glyphicon } from 'react-bootstrap';
// import { Link } from 'react-router';

import Pages from './Pages';
import { convertDate, convertAmount } from './utils';

import './Transactions.css';

const Transactions = props => {

  const createGlyph = direction => <Glyphicon glyph={`glyphicon glyphicon-chevron-${direction}`} />;

  const createColName = label => {
    const arrow = props[`${label.toLowerCase()}Order`];
    return (
      <Button bsStyle='link' onClick={() => props.sortColumn(label)} >
        {arrow ? createGlyph(arrow) : null}
          {label}
      </Button>
    )
    };

  return (
    <div>
      <Table responsive striped hover>
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
      {props.transactions.map(transaction =>
        <tr key={transaction.transId} className='tableRow' onClick={() => props.navigate(transaction)} >
          <td>{convertDate(transaction.transTime)}</td>
          <td>{convertAmount(transaction.transAmt)}</td>
          <td>{transaction.description}</td>
          <td>{transaction.transTo}</td>
          <td>{transaction.transFrom}</td>
        </tr>
        )}
        </tbody>
      </Table>
      <div className='pages'>
        <Pages items={props.items} activePage={props.activePage} handleSelect={props.handleSelect} />
      </div>
    </div>
  );
}

export default Transactions;
