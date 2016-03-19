import test from 'tape';
import {take, fork} from 'redux-saga';

import saga, {request} from 'modules/<%= moduleFolder %>/sagas/<%= saga %>';
import {actions, actionTypes} from 'modules/<%= moduleFolder %>';

test('[<%= moduleName %> module] <%= sagaName %> saga', assert => {
  const sagaIterator = saga();

  const actual = [];
  const expected = [];

  const parameter = {};
  const action = actions.<%= action %>(parameter);

  actual[0] = sagaIterator.next().value;
  expected[0] = take(actionTypes.<%= actionType %>);

  actual[1] = sagaIterator.next(action).value;
  expected[1] = fork(request, parameter);

  actual[2] = sagaIterator.next().value;
  expected[2] = take(actionTypes.<%= actionType %>);

  assert.deepEqual(actual, expected,
    'should wait for action and then request');
  assert.end();
});
