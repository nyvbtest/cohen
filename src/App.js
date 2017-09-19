import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Transactions from './Transactions';
import { convertLabel } from './utils';
import { Well } from 'react-bootstrap';

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
    this.handleSelect = this.handleSelect.bind(this);
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

  handleSelect(eventKey) {
    this.setState({ activePage: eventKey })
  }

  render() {

    const balance = this.props.transactions.reduce((total, transaction) => total + transaction.transAmt, 0),
      limit = this.state.activePage * 10,
      items = Math.ceil(this.props.transactions.length / 10),
      transactions = this.state.transactions.slice(limit - 10, limit);

    return (
      <div className='container'>
        <div className='sidebar col-lg-2 col-md-2 col-sm-2 col-xs-12'>
          <Well bsSize="large">{`Balance: $${balance.toLocaleString()}`}</Well>
        </div>
        <div className='col-lg-10 col-md-10 col-sm-10 col-xs-12'>
          <Transactions transactions={transactions} descriptionOrder={this.state.descriptionOrder} dateOrder={this.state.dateOrder} amountOrder={this.state.amountOrder} toOrder={this.state.toOrder} fromOrder={this.state.fromOrder} sortColumn={this.sortColumn} items={items} activePage={this.state.activePage} handleSelect={this.handleSelect} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ transactions }) => ({ transactions })

export default connect(mapStateToProps, null)(App);
