let history = localStorage.getItem('searchHistory');
if (history && !history.includes('[') && !history.includes(']')) {
  history = false; // 清理旧格式的 searchHistory
}
const initialState = (history && JSON.parse(history)) || [];
const limit = 6;

const searchHistory = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH_HISTORY':
      const keyword = action.data;
      history = [...state];
      if (history.includes(keyword)) {
        history.splice(history.indexOf(keyword), 1);
      }
      history = [keyword, ...history];
      if (history.length > limit) {
        history = history.splice(0, limit);
      }
      localStorage.setItem('searchHistory', JSON.stringify(history));
      return history;
    case 'CLEAR_SEARCH_HISTORY':
      localStorage.setItem('searchHistory', '');
      return [];
    default:
      return state;
  }
};

export default searchHistory;
