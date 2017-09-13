import React from 'react';

import { Pagination } from 'react-bootstrap';

const Pages = props => (
  <Pagination
    prev
    next
    first
    last
    boundaryLinks
    items={props.items}
    activePage={props.activePage}
    onSelect={props.handleSelect}
  />
)

export default Pages;
