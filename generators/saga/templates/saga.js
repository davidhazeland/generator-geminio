import {call, put, take, fork} from 'redux-saga/effects';

import * as actions from '../actions';
import {actions as notifActions} from 'ironlake/businesses/notification';

export function* handle({payload}) {
  try {

  }
  catch (error) {
    yield put(notifActions.notifyError({
      text: error.message
    }));
  }
}

export default function* () {
  while (true) {
    const action = yield take(actions.<%= action %>);

    yield fork(handle, action);
  }
}
