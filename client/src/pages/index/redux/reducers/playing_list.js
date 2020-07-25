let list = localStorage.getItem('playlist');
const initialState = (list && JSON.parse(list)) || [];

const playingList = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_PLAYING_LIST':
      let { data } = action;
      if (Array.isArray(data)) {
        data = data.filter((song) => {
          return state.every(item => item.newId !== song.newId);
        });
        list = state.concat(data);
      } else if (typeof data === 'object') {
        if (state.findIndex(item => item.newId === data.newId) > -1) {
          list = state;
        } else {
          list = [...state, data];
        }
      }
      localStorage.setItem('playlist', JSON.stringify(list));
      return list;
    case 'NEW_PLAYING_LIST': // There's NEW_PLAYLIST (新建歌单)
      list = action.data;
      localStorage.setItem('playlist', JSON.stringify(list));
      return list;
    case 'DELETE_SONG_IN_PLAYING_LIST':
      list = Array.from(state);
      list.splice(action.data, 1);
      localStorage.setItem('playlist', JSON.stringify(list));
      return list;
    case 'CLEAR_PLAYING_LIST':
      localStorage.setItem('playlist', '');
      return [];
    default:
      return state;
  }
};

export default playingList;