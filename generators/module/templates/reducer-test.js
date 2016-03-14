import test from 'tape';
import reducer from 'modules/<%= moduleName %>';

test('[<%= name %> module] reducer', assert => {
  const state = Object.freeze({});
  reducer(state, {type: 'INVALID'});

  assert.ok();
  assert.end();
});
