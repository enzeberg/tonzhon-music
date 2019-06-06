import { combineReducers } from 'redux';
import searchHistory from './search_history';
import searchStatus from './search_status';
import searchResults from './search_results';
import searchParameters from './search_parameters';
import playingList from './playing_list';
import playIndex from './play_index';

export default combineReducers({
  // key: state name, value: state value
  providers: () => ['netease', 'qq', 'xiami'],
  searchHistory,
  searchStatus,
  searchResults,
  searchParameters,
  playingList,
  playIndex,
});
