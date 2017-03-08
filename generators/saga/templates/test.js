import {call, put, take, fork} from 'redux-saga/effects';

import saga, {handle} from '../<%= saga %>';
import {actions, actionTypes} from '../../index';

import {actions as notificationActions} from 'redux-businesses/lib/notification';

test('[Saga] <%= sagaName %>', () => {
  const sagaIterator = saga();

  const actual = [];
  const expected = [];

  const parameter = {};
  const action = actions.<%= action %>(parameter);

  actual[0] = sagaIterator.next().value;
  expected[0] = take(actionTypes.<%= actionType %>);

  expect(actual[0]).toEqual(expected[0]);

  actual[1] = sagaIterator.next(action).value;
  expected[1] = fork(handle, action);

  expect(actual[1]).toEqual(expected[1]);

  actual[2] = sagaIterator.next().value;
  expected[2] = take(actionTypes.<%= actionType %>);

  expect(actual[2]).toEqual(expected[2]);
});

describe('[Saga] <%= sagaName %> - handle() generator', () => {
  xtest('Error', () => {
    const parameter = {};
    const action = actions.<%= action %>(parameter);
    const sagaIterator = handle(action);

    const actual = [];
    const expected = [];

    sagaIterator.next();

    const error = new Error('error');

    actual[0] = sagaIterator.throw(error).value;
    expected[0] = put(notificationActions.notifyFailure({
      message: 'error'
    }));

    expect(actual[0]).toEqual(expected[0]);
  });
});
