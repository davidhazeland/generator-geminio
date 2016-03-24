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

  assert.deepEqual(actual[0], expected[0],
    'should wait for action');

  actual[1] = sagaIterator.next(action).value;
  expected[1] = fork(request, parameter);

  assert.deepEqual(actual[1], expected[1],
    'and then fork request generator');

  actual[2] = sagaIterator.next().value;
  expected[2] = take(actionTypes.<%= actionType %>);

  assert.deepEqual(actual[2], expected[2],
    'and then continue waiting for action');

  assert.end();
});
