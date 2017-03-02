import * as actionTypes from './action-types';

export const clear = (parameter) => {
  return {
    type: actionTypes.CLEAR,
    parameter
  }
};
