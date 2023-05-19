const searchKeyword = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH_KEYWORD':
      return action.data;
    default:
      return state;
  }
};

export default searchKeyword;
