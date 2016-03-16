'use strict';

import React from 'react';
import { Route } from 'react-router';

import <%= containerName %> from './containers/<%= containerFileName %>';

export default path => (
  <Route path={path} component={<%= containerName %>}/>;
);
