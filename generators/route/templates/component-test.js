import test from 'tape';
import React from 'react';
import reactDom from 'react-dom/server';
import dom from 'cheerio';

import create<%= componentName %> from 'routes/<%= module %>/components/<%= component %>';

const render = reactDom.renderToStaticMarkup;
const <%= componentName %> = create<%= componentName %>(React);

test('[<%= moduleName %> route] <%= componentName %> component', assert => {
  const el = <<%= componentName %>/>;
  const $ = dom.load(render(el));

  assert.pass('should render without props');
  assert.end();
});
