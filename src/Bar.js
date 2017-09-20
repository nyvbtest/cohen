import React from 'react';
import { Navbar, Nav, NavDropdown, MenuItem, FormControl, FormGroup } from 'react-bootstrap';
import './Bar.css'

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
        <Navbar.Form pullLeft>
          <form onSubmit={props.submitSearch} id='search-form' >
            <FormGroup>
              <FormControl type='text' name='search' placeholder='Search transactions' />
            </FormGroup>
            {' '}
            <button type='submit' className='btn search-btn' >?</button>
          </form>
        </Navbar.Form>
        <Navbar.Text onClick={props.clearFilters} id='clear-filters' >
          Clear Filters
        </Navbar.Text>
      </Nav>
      <Nav pullRight>
        <Navbar.Text>
          Filter By:
        </Navbar.Text>
        <NavDropdown eventKey={2} title='Date' onSelect={props.selectDateRange} id='date-menu' >
          <MenuItem eventKey={0}>All</MenuItem>
          <MenuItem eventKey={7}>Past 7 Days</MenuItem>
          <MenuItem eventKey={30}>Past 30 Days</MenuItem>
          <MenuItem eventKey={90}>Past 90 Days</MenuItem>
        </NavDropdown>
        <NavDropdown eventKey={3} title='Type' id='type-menu' onSelect={props.selectType} >
          <MenuItem eventKey={0}>All</MenuItem>
          <MenuItem eventKey={1}>Deposit</MenuItem>
          <MenuItem eventKey={-1}>Withdrawal</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

export default Bar;


    //<form onSubmit={this.submitSearch} >
      //<FormControl
        //name="search"
        //type="text"
        //label="Text"
        //placeholder="Enter text"
      ///>
      //<Button type='submit'>
        //Submit
      //</Button>
    //</form>
