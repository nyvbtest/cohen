import React from 'react';
import './Sidebar.css'

const Sidebar = props =>
  <div className='stats' >
    <div className='balance' >
      <h4>Balance</h4>
      <p>{`$${props.balance.toLocaleString()}`}</p>
    </div>
    <div className='balance' >
      <h5>Change in last 24 hours</h5>
      <p>{`$${props.change.toLocaleString()}`}</p>
    </div>
  </div>

export default Sidebar;
