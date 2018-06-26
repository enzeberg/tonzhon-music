const initialState = {};

const searchResults = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH_RESULTS':
      return {
        ...state,
        [action.provider]: action.data
      }
    case 'CLEAR_RESULTS':
      return {};
    default:
      return state;
  }
};

export default searchResults;
