import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Bar from './Bar';
import Sidebar from './Sidebar';
import { convertLabel, calculateBalance, oneDay } from './utils';

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
      searchTerm: '',
      filtered: false
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

  selectPage(eventKey) {
    this.setState({ activePage: eventKey })
  }

  selectDateRange(eventKey) {
    this.setState({ dateRange: eventKey, filtered: true })
  }

  selectType(eventKey) {
    this.setState({ transType: eventKey, filtered: true })
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
    return searchTerm ? transactions.filter(transaction => transaction.description.toLowerCase().includes(searchTerm) || transaction.transTo.toLowerCase().includes(searchTerm) || transaction.transFrom.toLowerCase().includes(searchTerm)) : transactions;
  }

  submitSearch(e) {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    this.setState({ searchTerm: searchTerm, filtered: true });
    document.getElementById('search-form').reset();
  }

  clearFilters() {
    this.setState({ filtered: false })
  }

  filterTransactions(transactions) {
    return this.search(this.filterByType(this.filterByDate(transactions)));
  }

  render() {

    const balance = calculateBalance(this.props.transactions),
      filteredTransactions = this.state.filtered ? this.filterTransactions(this.state.transactions) : this.state.transactions,
      change = this.calculateChange(),
      items = Math.ceil(filteredTransactions.length / 10),
      limit = this.state.activePage * 10,
      currentTransactions = filteredTransactions.slice(limit - 10, limit);
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

const mapStateToProps = ({ transactions }) => ({ transactions })

export default connect(mapStateToProps, null)(App);
