import React from 'react';
import { Route, IndexRoute } from 'react-router';

import <%= containerName %> from './containers/<%= container %>';

export default path => (
  <Route path={path}>
    <IndexRoute component={<%= containerName %>}/>
  </Route>
);
