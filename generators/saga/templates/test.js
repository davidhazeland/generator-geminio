import {call, put, take, fork} from 'redux-saga/effects'

import saga, {handle} from '../<%= saga %>'
import {actions} from '../../index'

import {actions as notifActions} from 'ironlake/businesses/notification'

describe('<%= moduleName %>', () => {
  test('[Saga] <%= sagaName %>', () => {
    const sagaIterator = saga()

    let actual
    let expected

    const parameter = {}
    const action = actions.<%= action %>(parameter)

    actual = sagaIterator.next().value
    expected = take(actions.<%= action %>)

    expect(actual).toEqual(expected)

    actual = sagaIterator.next(action).value
    expected = fork(handle, action)

    expect(actual).toEqual(expected)

    actual = sagaIterator.next().value
    expected = take(actions.<%= action %>)

    expect(actual).toEqual(expected)
  })

  describe('[Saga] <%= sagaName %> - handle() generator', () => {
    xtest('Exception', () => {
      const parameter = {}
      const action = actions.<%= action %>(parameter)
      const sagaIterator = handle(action)

      let actual
      let expected

      sagaIterator.next()

      const error = new Error('error')

      actual = sagaIterator.throw(error).value
      expected = put(notifActions.notifyError({
        text: 'error'
      }))

      expect(actual).toEqual(expected)
    })
  })
})
