'use strict';

import React from 'react';
import { Route } from 'react-router';

import <%= containerName %> from './containers/<%= container %>';

export default path => (
  <Route path={path}>
    <IndexRoute component={<%= containerName %>}/>
  </Route>;
);
