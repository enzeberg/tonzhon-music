let index = localStorage.getItem('playIndex');
const initialState = index ? Number(index) : 0;

const playIndex = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PLAY_INDEX':
      index = action.data;
      localStorage.setItem('playIndex', index);
      return index;
    case 'CLEAR_PLAY_INDEX':
      localStorage.setItem('playIndex', '');
      return 0;
    default:
      return state;
  }
};

export default playIndex;
