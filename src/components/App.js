import React, { Component } from 'react';
import { connect } from 'react-redux';

import Bar from './Bar';
import Sidebar from './Sidebar';
import { convertLabel, calculateBalance, oneDay } from '../utils';

import './App.css';

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
    this.selectPage = this.selectPage.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.selectDateRange = this.selectDateRange.bind(this);
    this.selectType = this.selectType.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ transactions: nextProps.transactions })
  }

  // in Sidebar
  // calculate change in account value in past 24 hours
  calculateChange() {
    const today = new Date(),
      pastDay = today - oneDay;
    return calculateBalance(this.props.transactions.filter(transaction => transaction.transTime > pastDay));
  }

  // in TransactionsTable
  sortColumn(label) {
    const dataProp = convertLabel(label), // corresponding property name in data
      stateProp = `${label.toLowerCase()}Order`, // corresponding property name in state
      transactions = this.state.transactions;
    let newOrder, sorted;
    switch (this.state[stateProp]) {
      // if column is currently sorted descending, search ascending, and vice versa
      case 'up':
        newOrder = 'down';
        sorted = transactions.reverse();
        break;
      case 'down':
        newOrder = 'up';
        sorted = transactions.reverse();
        break;
      default:
        // sort descending initially for columns with numerical values, ascending for columns with string values
        [newOrder, sorted] = isNaN(transactions[0][dataProp]) ? ['up', this.alphaSort(dataProp)] : ['down', this.numSort(dataProp)];
    }
    const newState = { transactions: sorted, descriptionOrder: null, dateOrder: null, amountOrder: null, toOrder: null, fromOrder: null };
    newState[stateProp] = newOrder; // update state for column being sorted
    this.setState(newState);
  }

  // sort alphabetically by designated string property
  alphaSort(dataProp) {
    const transactions = this.state.transactions;
    return transactions.sort((a, b) => a[dataProp].toLowerCase() < b[dataProp].toLowerCase() ? -1 : 1);
  }

  // sort descending by designated numerical property
  numSort(dataProp) {
    const transactions = this.state.transactions;
    return transactions.sort((a, b) => b[dataProp] - a[dataProp]);
  }

  // in DateMenu
  selectDateRange(eventKey) {
    this.setState({ dateRange: eventKey });
  }

  // in TypeMenu
  selectType(eventKey) {
    this.setState({ transType: eventKey });
  }

  // in Form
  submitSearch(e) {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    this.setState({ searchTerm: searchTerm });
    document.getElementById('search-form').reset();
  }

  // in Bar
  clearFilters() {
    this.setState({ searchTerm: '', dateRange: 0, transType: 0 });
  }

  // find transactions made within selected number of days prior
  filterByDate(transactions) {
    return this.state.dateRange ? transactions.filter(transaction => transaction.transTime > new Date() - this.state.dateRange * oneDay) : transactions;
  }

  // show only deposits or withdrawals
  filterByType(transactions) {
    return this.state.transType ? transactions.filter(transaction => transaction.transAmt * this.state.transType > 0) : transactions;
  }

  // search by description, sender or recipient, using full or partial search terms
  search(transactions) {
    const searchTerm = this.state.searchTerm.toLowerCase();
    return searchTerm ? transactions.filter(transaction => transaction.description.toLowerCase().includes(searchTerm) || transaction.transTo.toLowerCase().includes(searchTerm) || transaction.transFrom.toLowerCase().includes(searchTerm)) : transactions;
  }

  // find transactions to display based on all selected filters
  filterTransactions(transactions) {
    return this.search(this.filterByType(this.filterByDate(transactions)));
  }

  // in Pages
  selectPage(eventKey) {
    this.setState({ activePage: eventKey })
  }

  render() {

    const balance = calculateBalance(this.props.transactions),
      filteredTransactions = this.filterTransactions(this.state.transactions),
      change = this.calculateChange(),
      items = Math.ceil(filteredTransactions.length / 10), // total number of pages
      limit = this.state.activePage * 10,
      currentTransactions = filteredTransactions.slice(limit - 10, limit); // display no more than 10 transactions at a time
      const childProps = Object.assign({}, this.state, {
        items: items,
        currentTransactions: currentTransactions,
        handleSelect: this.selectPage,
        sortColumn: this.sortColumn
      });

    return (
      <div className='container'>
        <div>
          <Bar submitSearch={this.submitSearch} selectDateRange={this.selectDateRange} selectType={this.selectType} clearFilters={this.clearFilters} />
        </div>
        <div className='sidebar col-lg-2 col-md-2 col-sm-2 col-xs-12'>
          <Sidebar balance={balance} change={change} />
        </div>
        <div className='col-lg-10 col-md-10 col-sm-10 col-xs-12'>
          {this.props.children && React.cloneElement(this.props.children, childProps)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ transactions }) => ({ transactions });

export default connect(mapStateToProps, null)(App);
