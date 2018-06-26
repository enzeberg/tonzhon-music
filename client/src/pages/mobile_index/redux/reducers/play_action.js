const initialState = 'pause';

const playAction = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PLAY_ACTION':
      return action.data;
    default:
      return state;
  }
};

export default playAction;
