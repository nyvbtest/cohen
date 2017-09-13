import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';

export default class Transactions extends Component {
  constructor(props){
    super(props);
  }
  convertDate(timeStamp) {
    return new Date(timeStamp).toLocaleString();
  }
  colName(label, func) {
    return <Button bsStyle='link'>{label}</Button>
  }
  render() {
    const transactions = this.props.transactions;
    return (
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>{this.colName('Date')}</th>
              <th>{this.colName('Amount')}</th>
              <th>{this.colName('Description')}</th>
              <th>{this.colName('To')}</th>
              <th>{this.colName('From')}</th>
            </tr>
          </thead>
          <tbody>
        {transactions.map(transaction =>
          <tr key={transaction.transId}>
            <td>{this.convertDate(transaction.transTime)}</td>
            <td>{transaction.transAmt}</td>
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
}
