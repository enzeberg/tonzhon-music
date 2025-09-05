import { combineReducers } from 'redux'
import searchStatus from './search_status'
import searchResults from './search_results'
import searchKeyword from './search_keyword'
import listenlist from './listenlist'
import playIndex from './play_index'

export default combineReducers({
  // key: state name, value: state value
  providers: () => ['spotify', 'apple', 'youtube'],
  searchStatus,
  searchResults,
  searchKeyword,
  listenlist,
  playIndex,
})
