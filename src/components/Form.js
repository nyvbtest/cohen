import React from 'react';
import { Navbar, FormControl, FormGroup } from 'react-bootstrap';

const Form = props =>
  <Navbar.Form pullLeft>
    <form onSubmit={props.submitSearch} id='search-form' >
      <FormGroup>
        <FormControl type='text' name='search' placeholder='Search transactions' />
      </FormGroup>
      {' '}
      <button type='submit' className='btn search-btn' >?</button>
    </form>
  </Navbar.Form>

export default Form;
