import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';

import App from './components/App';
import TransactionsView from './components/TransactionsView';
import store from './store';
import { loadTransactions } from './reducers/transactions';
import registerServiceWorker from './registerServiceWorker';

const onAppEnter = () => store.dispatch(loadTransactions());

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
