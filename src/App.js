import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Transactions from './Transactions';
import { convertLabel } from './utils';

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      transactions: [],
      activePage: 1,
      dateOrder: 'down',
      descriptionOrder: null,
      amountOrder: null,
      toOrder: null,
      fromOrder: null
    }
    this.sortColumn = this.sortColumn.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ transactions: nextProps.transactions })
  }

  sortColumn(label) {
    const dataProp = convertLabel(label),
      stateProp = `${label.toLowerCase()}Order`,
      transactions = this.state.transactions;
    let newOrder, sorted;
    switch (this.state[stateProp]) {
    case 'up':
      newOrder = 'down';
      sorted = transactions.reverse();
      break
    case 'down':
      newOrder = 'up';
      sorted = transactions.reverse();
      break
    default:
      [newOrder, sorted] = isNaN(transactions[0][dataProp]) ? ['up', this.alphaSort(dataProp)] : ['down', this.numSort(dataProp)];
    }
    const newState = { transactions: sorted, descriptionOrder: null, dateOrder: null, amountOrder: null, toOrder: null, fromOrder: null };
    newState[stateProp] = newOrder;
    this.setState(newState);
  }

  alphaSort(dataProp) {
    return this.state.transactions.sort((a, b) => a[dataProp].toLowerCase() < b[dataProp].toLowerCase() ? -1 : 1);
  }

  numSort(dataProp) {
    return this.state.transactions.sort((a, b) => b[dataProp] - a[dataProp]);
  }

  render() {

    const balance = this.props.transactions.reduce((total, transaction) => total + transaction.transAmt, 0),
      limit = this.state.activePage * 10,
      // items = Math.ceil(this.props.transactions.length / 10),
      transactions = this.state.transactions.slice(limit - 10, limit);

    return (
      <div className='hi'>
        <p>{`Balance: $${balance.toLocaleString()}`}</p>
        <Transactions transactions={transactions} descriptionOrder={this.state.descriptionOrder} dateOrder={this.state.dateOrder} amountOrder={this.state.amountOrder} toOrder={this.state.toOrder} fromOrder={this.state.fromOrder} sortColumn={this.sortColumn} />
      </div>
    );
  }
}

const mapStateToProps = ({ transactions }) => ({ transactions })

export default connect(mapStateToProps, null)(App);
