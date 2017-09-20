import React from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';

const TypeMenu = props =>
  <NavDropdown eventKey={3} title='Type' onSelect={props.selectType} id='type-menu' >
    <MenuItem eventKey={0}>All</MenuItem>
    <MenuItem eventKey={1}>Deposit</MenuItem>
    <MenuItem eventKey={-1}>Withdrawal</MenuItem>
  </NavDropdown>

export default TypeMenu;
