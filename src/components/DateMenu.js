import React from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';

const DateMenu = props =>
  <NavDropdown eventKey={2} title='Date' onSelect={props.selectDateRange} id='date-menu' >
    <MenuItem eventKey={0}>All</MenuItem>
    <MenuItem eventKey={7}>Past 7 Days</MenuItem>
    <MenuItem eventKey={30}>Past 30 Days</MenuItem>
    <MenuItem eventKey={90}>Past 90 Days</MenuItem>
  </NavDropdown>

export default DateMenu;
