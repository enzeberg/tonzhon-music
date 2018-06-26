
const shouldShowPlaylist = (state = false, action) => {
  switch (action.type) {
    case 'SHOULD_SHOW_PLAYLIST':
      return true;
    case 'SHOULD_NOT_SHOW_PLAYLIST':
      return false;
    default:
      return state;
  }
};

export default shouldShowPlaylist;
