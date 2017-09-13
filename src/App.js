import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

class App extends Component {
  convertDate(timeStamp) {
    return new Date(timeStamp).toLocaleString();
  }
  render() {
    const balance = this.props.transactions.reduce((total, transaction) => total + transaction.transAmt, 0)
    return (
      <div>
        <p>{`Balance: $${balance.toLocaleString()}`}</p>
        <Table responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Description</th>
              <th>To</th>
              <th>From</th>
            </tr>
          </thead>
          <tbody>
        {this.props.transactions.map(transaction =>
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

const mapStateToProps = ({ transactions }) => ({ transactions })
const mapDispatchToProps = ({})

export default connect(mapStateToProps, null)(App);
