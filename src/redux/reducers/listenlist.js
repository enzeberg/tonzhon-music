let list = localStorage.getItem('listenlist')
const initialState = (list && JSON.parse(list)) || []

const listenlist = (state = initialState, action) => {
  let { data } = action
  switch (action.type) {
    case 'ADD_SONG_TO_LISTENLIST':
      if (state.some((item) => item.newId === data.newId)) {
        list = state
      } else {
        list = [...state, data]
        saveToStorage(list)
      }
      return list
    case 'ADD_SONGS_TO_LISTENLIST':
      data = data.filter((song) => {
        return state.every((item) => item.newId !== song.newId)
      })
      list = state.concat(data)
      saveToStorage(list)
      return list
    case 'NEW_LISTENLIST':
      list = data
      saveToStorage(list)
      return list
    case 'DELETE_SONG_IN_LISTENLIST':
      list = Array.from(state)
      list.splice(data, 1)
      saveToStorage(list)
      return list
    case 'CLEAR_LISTENLIST':
      saveToStorage([])
      return []
    default:
      return state
  }
}

function saveToStorage(list) {
  localStorage.setItem('listenlist', JSON.stringify(list))
}

export default listenlist
