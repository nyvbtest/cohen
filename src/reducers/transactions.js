import axios from 'axios';

const initialTransactionsState = [];

const LOADED_TRANSACTIONS = 'LOADED_TRANSACTIONS';

export const loadedTransactions = transactions => ({
    type: LOADED_TRANSACTIONS,
    transactions
});

export const loadTransactions = () => {
  return dispatch => {
    axios.get('http://34.234.241.168/transaction/0')
      .then(response => {
        dispatch(loadedTransactions(response.data));
      });
  };
};

export default function (state = initialTransactionsState, action) {

  switch (action.type) {
    case LOADED_TRANSACTIONS:
      return action.transactions;
    default:
      return state;

  }

}
