import * as actionTypes from './action-types';

export const action = (parameter) => {
  return {
    type: actionTypes.ACTION,
    parameter
  }
};
