import { combineReducers } from 'redux'
import searchResults from './search_results'
import listenlist from './listenlist'
import playIndex from './play_index'

export default combineReducers({
  // key: state name, value: state value
  providers: () => ['spotify', 'apple', 'youtube'],
  searchResults,
  listenlist,
  playIndex,
})
