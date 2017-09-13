import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store';
import { loadTransactions } from './reducers/transactions'

const onAppEnter = () => store.dispatch(loadTransactions())

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path='/' component={App} onEnter={onAppEnter} />
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
