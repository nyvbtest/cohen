import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import App from './App';
import TransactionsView from './TransactionsView';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store';
import { loadTransactions } from './reducers/transactions'

const onAppEnter = () => store.dispatch(loadTransactions())

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path='/' component={App} onEnter={onAppEnter}>
        <Route path='/transactions' component={TransactionsView} />
        <IndexRedirect to='/transactions'/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
