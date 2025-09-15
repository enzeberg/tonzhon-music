import { combineReducers } from 'redux'
import listenlist from './listenlist'

export default combineReducers({
  // key: state name, value: state value
  providers: () => ['spotify', 'apple', 'youtube'],
  listenlist,
})
