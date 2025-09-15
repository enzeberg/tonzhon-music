import { combineReducers } from 'redux'
import listenlist from './listenlist'
import playIndex from './play_index'

export default combineReducers({
  // key: state name, value: state value
  providers: () => ['spotify', 'apple', 'youtube'],
  listenlist,
  playIndex,
})
