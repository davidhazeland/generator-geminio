import test from 'tape';
import {take, fork} from 'redux-saga';

import saga, {request} from 'modules/<%= moduleName %>/sagas/<%= sagaName %>';
import {actions, actionTypes} from 'modules/<%= moduleName %>';

test('[<%= moduleName %> module] Saga saga', assert => {
  const sagaIterator = saga();

  const actual = [];
  const expected = [];

  const param = {};
  const action = actions.action(param);

  actual[0] = sagaIterator.next().value;
  expected[0] = take(actionTypes.ACTION);

  actual[1] = sagaIterator.next(action).value;
  expected[1] = fork(request, param);

  actual[2] = sagaIterator.next().value;
  expected[2] = take(actionTypes.ACTION);

  assert.deepEqual(actual, expected,
    'should wait for action and then request');
  assert.end();
});
