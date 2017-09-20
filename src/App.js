import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Transactions from './Transactions';
import { convertLabel, calculateBalance, oneDay } from './utils';
import { Well, FormControl, Button } from 'react-bootstrap';

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
      fromOrder: null,
      dateRange: 0,
      transType: 0,
      searchTerm: ''
    }
    this.sortColumn = this.sortColumn.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.search = this.search.bind(this);
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
    const transactions = this.state.transactions;
    return transactions.sort((a, b) => a[dataProp].toLowerCase() < b[dataProp].toLowerCase() ? -1 : 1);
  }

  numSort(dataProp) {
    const transactions = this.state.transactions;
    return transactions.sort((a, b) => b[dataProp] - a[dataProp]);
  }

  handleSelect(eventKey) {
    this.setState({ activePage: eventKey })
  }

  calculateChange() {
    const today = new Date(),
      pastDay = today - oneDay;
    return calculateBalance(this.props.transactions.filter(transaction => transaction.transTime > pastDay));
  }

  filterByDate(transactions) {
    return this.state.dateRange ? transactions.filter(transaction => transaction.transTime > new Date() - this.state.dateRange * oneDay) : transactions;
  }

  filterByType(transactions) {
    return this.state.transType ? transactions.filter(transaction => transaction.transAmt * this.state.transType > 0) : transactions;
  }

  search(transactions) {
    const searchTerm = this.state.searchTerm.toLowerCase();
    return searchTerm ? transactions.filter(transaction => transaction.description.toLowerCase() === searchTerm || transaction.transTo.toLowerCase() === searchTerm || transaction.transFrom.toLowerCase() === searchTerm) : transactions;
  }

  submitSearch(e) {
    e.preventDefault();
    this.setState({ searchTerm: e.target.search.value })
  }

  filterTransactions(transactions) {
    return this.search(this.filterByType(this.filterByDate(transactions)));
  }

  render() {

    const balance = calculateBalance(this.props.transactions),
      filteredTransactions = this.filterTransactions(this.state.transactions),
      items = Math.ceil(filteredTransactions.length / 10),
      limit = this.state.activePage * 10,
      currentTransactions = filteredTransactions.slice(limit - 10, limit);

    return (
      <div className='container'>
        <div className='sidebar col-lg-2 col-md-2 col-sm-2 col-xs-12'>
          <Well bsSize="large">
            <p>{`Balance: $${balance.toLocaleString()}`}</p>
            <p>{`Change in last 24 hours: ${this.calculateChange()}`}</p>
            <FormControl componentClass="select" onChange={e => this.setState({ dateRange: +e.target.value })}>
              <option value={0}>All</option>
              <option value={7}>7</option>
              <option value={30}>30</option>
              <option value={90}>90</option>
            </FormControl>
            <FormControl componentClass="select" onChange={e => this.setState({ transType: +e.target.value })}>
              <option value={0}>All</option>
              <option value={1}>Deposit</option>
              <option value={-1}>Withdrawal</option>
            </FormControl>
            <form onSubmit={this.submitSearch} >
              <FormControl
                name="search"
                type="text"
                label="Text"
                placeholder="Enter text"
              />
              <Button type='submit'>
                Submit
              </Button>
            </form>
          </Well>
        </div>
        <div className='col-lg-10 col-md-10 col-sm-10 col-xs-12'>
          <Transactions transactions={currentTransactions} descriptionOrder={this.state.descriptionOrder} dateOrder={this.state.dateOrder} amountOrder={this.state.amountOrder} toOrder={this.state.toOrder} fromOrder={this.state.fromOrder} sortColumn={this.sortColumn} items={items} activePage={this.state.activePage} handleSelect={this.handleSelect} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ transactions }) => ({ transactions })

export default connect(mapStateToProps, null)(App);
