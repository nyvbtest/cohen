import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import Form from './Form';
import DateMenu from './DateMenu';
import TypeMenu from './TypeMenu';

import './Bar.css';

const Bar = props =>
  <Navbar inverse collapseOnSelect >
    <Navbar.Header>
      <Navbar.Brand>
        <a href='/'>NYVB</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <Form {...props} />
        <Navbar.Text onClick={props.clearFilters} id='clear-filters' >
          Clear Filters
        </Navbar.Text>
      </Nav>
      <Nav pullRight>
        <Navbar.Text>
          Filter By:
        </Navbar.Text>
        <DateMenu {...props} />
        <TypeMenu {...props} />
      </Nav>
    </Navbar.Collapse>
  </Navbar>

export default Bar;
