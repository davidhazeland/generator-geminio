'use strict';

import freeze from 'deep-freeze';

const initialState = freeze({

});

module.exports = function(reducer, actionTypes) {
  return function (state, action) {
    const reducedState = freeze({
      ...initialState,
      ...reducer(state, action)
    });

    switch (action.type) {

      default:
        return reducedState
    }
  }
}
