'use strict';

import React from 'react';
import { Route } from 'react-router';

import <%= containerName %> from './containers/<%= containerFileName %>';

export default store => {
  return <Route path="<%= containerFileName %>" component={<%= containerName %>}/>;
}
