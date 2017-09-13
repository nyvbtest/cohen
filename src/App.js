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
      maxPerPage: 10
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ transactions: nextProps.transactions })
  }
  render() {
    const balance = this.props.transactions.reduce((total, transaction) => total + transaction.transAmt, 0),
    limit = this.state.activePage * this.state.maxPerPage,
    items = Math.ceil(this.props.transactions.length / this.state.maxPerPage),
    transactions = this.state.transactions.slice(limit - this.state.maxPerPage, limit);
    return (
      <div>
        <p>{`Balance: $${balance.toLocaleString()}`}</p>
        <Transactions transactions={transactions} />
      </div>
    );
  }
}

const mapStateToProps = ({ transactions }) => ({ transactions })
const mapDispatchToProps = ({})

export default connect(mapStateToProps, null)(App);
