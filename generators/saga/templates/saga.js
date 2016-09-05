'use strict';

import {take, fork} from 'redux-saga/effects';

import * as actions from '../actions';
import * as actionTypes from '../action-types';

export function* handle(action) {
  try {

  }
  catch (error) {

  }
}

export default function* () {
  while (true) {
    const action = yield take(actionTypes.<%= actionType %>);

    yield fork(handle, action);
  }
}
