let list = localStorage.getItem('playingList');
const initialState = (list && JSON.parse(list)) || [];

const playingList = (state = initialState, action) => {
  let { data } = action;
  switch (action.type) {
    case 'ADD_SONG_TO_PLAYING_LIST':
      if (state.some(item => item.newId === data.newId)) {
        list = state;
      } else {
        list = [...state, data];
        saveToStorage(list);
      }
      return list;
    case 'ADD_LIST_TO_PLAYING_LIST':
      data = data.filter((song) => {
        return state.every(item => item.newId !== song.newId);
      });
      list = state.concat(data);
      saveToStorage(list);
      return list;
    case 'NEW_PLAYING_LIST':
      list = data;
      saveToStorage(list);
      return list;
    case 'DELETE_SONG_IN_PLAYING_LIST':
      list = Array.from(state);
      list.splice(data, 1);
      saveToStorage(list);
      return list;
    case 'CLEAR_PLAYING_LIST':
      saveToStorage([]);
      return [];
    default:
      return state;
  }
};

function saveToStorage(list) {
  localStorage.setItem('playingList', JSON.stringify(list));
}

export default playingList;