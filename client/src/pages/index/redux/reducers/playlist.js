let list = localStorage.getItem('playlist');
const initialState = (list && JSON.parse(list)) || [];

const playlist = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_PLAYLIST':
      let { data } = action;
      const links = state.map(song => song.link);
      if (Array.isArray(data)) {
        data = data.filter((song) => {
          return !links.includes(song.link);
        });
        list = state.concat(data);
      } else if (typeof data === 'object') {
        if (links.includes(data.link)) {
          list = state;
        } else {
          list = [...state, data];
        }
      }
      localStorage.setItem('playlist', JSON.stringify(list));
      return list;
    case 'NEW_PLAYLIST':
      list = action.data;
      localStorage.setItem('playlist', JSON.stringify(list));
      return list;
    case 'DELETE_SONG_IN_PLAYLIST':
      list = Array.from(state);
      list.splice(action.data, 1);
      localStorage.setItem('playlist', JSON.stringify(list));
      return list;
    case 'CLEAR_PLAYLIST':
      localStorage.setItem('playlist', '');
      return [];
    default:
      return state;
  }
};

export default playlist;
