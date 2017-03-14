import reducer, {initialState} from '../reducer';
import * as actions from '../actions';

describe('<%= moduleName %>', function() {
  describe('[Reducer]', function() {
    test('Handle CLEAR action', () => {
      const state = {};
      const action = actions.clear();
      const nextState = reducer(state, action);

      let actual;
      let expected;

      actual = nextState;
      expected = initialState;

      expect(actual).toEqual(expected);
    });
  });
});
