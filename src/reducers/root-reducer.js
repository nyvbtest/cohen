import { combineReducers } from 'redux';
import transactionsReducer from './transactions';

export default combineReducers({
  transactions: transactionsReducer
});
