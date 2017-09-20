import React from 'react';

import TransactionsTable from './TransactionsTable';
import Pages from './Pages';

import './TransactionsView.css';

const TransactionsView = props =>
  <div>
    {props.currentTransactions.length ?
      <div>
        <TransactionsTable {...props} />
        <div className='pages'>
          <Pages {...props} />
        </div>
      </div>
      :
      <div className='empty-table' >
        <h4>No transactions</h4>
      </div>
    }
  </div>

export default TransactionsView;
