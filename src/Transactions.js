import React from 'react';
import { Table, Button, Glyphicon } from 'react-bootstrap';

import './Transactions.css';

const Transactions = props => {

  const convertDate = timeStamp => new Date(timeStamp).toDateString().slice(4);

  const convertAmount = amount => {
    let formattedAmt = amount.toLocaleString();
    formattedAmt = amount < 0 ? `-$${formattedAmt.slice(1)}` : `$${formattedAmt}`;
    if (!formattedAmt.includes('.')) formattedAmt += '.00';
    if (formattedAmt[formattedAmt.length - 2] === '.') formattedAmt += '0';
    return formattedAmt;
    }

  const glyph = direction => <Glyphicon glyph={`glyphicon glyphicon-chevron-${direction}`} />;

  const colName = (label, arrow, func) =>
    <Button bsStyle='link' onClick={func} >
    {arrow ? glyph(arrow) : null}
      {label}
    </Button>;

  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>{colName('Date')}</th>
            <th>{colName('Amount')}</th>
            <th>{colName('Description', props.descriptionOrder, props.descriptionSort)}</th>
            <th>{colName('To')}</th>
            <th>{colName('From')}</th>
          </tr>
        </thead>
        <tbody>
      {props.transactions.map(transaction =>
        <tr key={transaction.transId}>
          <td>{convertDate(transaction.transTime)}</td>
          <td>{convertAmount(transaction.transAmt)}</td>
          <td>{transaction.description}</td>
          <td>{transaction.transTo}</td>
          <td>{transaction.transFrom}</td>
        </tr>
        )}
        </tbody>
      </Table>
    </div>
  );
}

export default Transactions;
