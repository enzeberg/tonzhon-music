const defaultState = {
  keyword: '',
  type: 'song'
};
const searchParameters = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH_KEYWORD':
      return {
        keyword: action.data,
        type: state.type
      };
    case 'UPDATE_SEARCH_TYPE':
      return {
        keyword: state.keyword,
        type: action.data
      }
    case 'UPDATE_SEARCH_PARAMETERS':
      return {
        ...action.data
      };
    default:
      return state;
  }
};

export default searchParameters;
