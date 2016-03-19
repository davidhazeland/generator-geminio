import test from 'tape';
import reducer from 'modules/<%= module %>';

test('[<%= moduleName %> module] reducer', assert => {
  const state = Object.freeze({});
  reducer(state, {type: 'INVALID'});

  assert.pass('should not change passed state');
  assert.end();
});
