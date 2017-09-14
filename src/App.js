import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Transactions from './Transactions';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      transactions: [],
      activePage: 1,
      dateOrder: 'down',
      descriptionOrder: undefined
    }
    this.descriptionSort = this.descriptionSort.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ transactions: nextProps.transactions })
  }

  descriptionSort() {
    const type = 'description';
    let newOrder, sorted
    switch (this.state[`${type}Order`]) {
    case 'up':
      newOrder = 'down'
      sorted = this.state.transactions.reverse()
      break
    case 'down':
      newOrder = 'up'
      sorted = this.state.transactions.reverse()
      break
    default:
      newOrder = 'up'
      sorted = this.state.transactions.sort((a, b) => a[type].toLowerCase() < b[type].toLowerCase() ? -1 : 1)
    }
    let descriptionOrder, dateOrder, amountOrder, toOrder, fromOrder;
    this.setState({ transactions: sorted, descriptionOrder: newOrder, dateOrder: dateOrder, amountOrder: amountOrder, toOrder: toOrder, fromOrder: fromOrder })
  }

  render() {

    const balance = this.props.transactions.reduce((total, transaction) => total + transaction.transAmt, 0),
      limit = this.state.activePage * 10,
      // items = Math.ceil(this.props.transactions.length / 10),
      transactions = this.state.transactions.slice(limit - 10, limit);

    return (
      <div>
        <p>{`Balance: $${balance.toLocaleString()}`}</p>
        <Transactions transactions={transactions} descriptionOrder={this.state.descriptionOrder} descriptionSort={this.descriptionSort} />
      </div>
    );
  }
}

const mapStateToProps = ({ transactions }) => ({ transactions })

export default connect(mapStateToProps, null)(App);
