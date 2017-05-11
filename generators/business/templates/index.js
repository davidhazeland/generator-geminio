import * as actions from './actions'
import reducer, { name } from './reducer'
import sagas from './sagas'
import * as selectors from './selectors'

export {
  name,
  actions,
  sagas,
  selectors
}

export default reducer
