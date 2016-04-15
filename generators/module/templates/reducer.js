'use strict';

import freeze from 'deep-freeze';
import * as actionTypes from './action-types';

const initialState = freeze({

});

export default function (state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */

  switch (action.type) {
    case actionTypes.CLEAR: {
      return initialState;
    } break;

    default:
    {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
