const searchStatus = (state = 'not_searched_yet', action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH_STATUS':
      return action.data;
    default:
      return state;
  }
};

export default searchStatus;
