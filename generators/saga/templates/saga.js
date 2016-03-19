'use strict';

import {take, fork} from 'redux-saga';

import * as actions from '../actions';
import * as actionTypes from '../action-types';

export function* request(data) {
  try {

  }
  catch (err) {

  }
}

export default function* () {
  while (true) {
    const {parameter} = yield take(actionTypes.<%= actionType %>);

    yield fork(request, parameter);
  }
}
