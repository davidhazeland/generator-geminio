'use strict';

import {call, put, take, fork} from 'redux-saga/effects';

import * as actions from '../actions';
import * as actionTypes from '../action-types';
import {actions as notificationActions} from 'auvene-modules/lib/notification';

export function* handle(action) {
  try {

  }
  catch (error) {
    yield put(notificationActions.notifyFailure({
      message: error.message
    }));
  }
}

export default function* () {
  while (true) {
    const action = yield take(actionTypes.<%= actionType %>);

    yield fork(handle, action);
  }
}
