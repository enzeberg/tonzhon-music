import { List } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import Artists from '../Artists'
import { usePlayIndex } from '../../contexts/PlayIndexContext'
import './in_listenlist.css'

function SongItem({
  song,
  currentSong,
  listenlist,
  addToListenlist,
  deleteSongInListenlist,
}) {
  const { playIndex, updatePlayIndex } = usePlayIndex()
  const changeCurrentSong = () => {
    const index = listenlist.findIndex((song) => song.newId === song.newId)
    if (index === -1) {
      addToListenlist(song)
      updatePlayIndex(listenlist.length)
    } else {
      updatePlayIndex(index)
    }
  }

  const deleteFromPlaylist = (e) => {
    e.stopPropagation()
    const index = listenlist.findIndex((song) => song.newId === song.newId)
    if (index + 1 === listenlist.length) {
      updatePlayIndex(0)
    }
    deleteSongInListenlist(index, playIndex, updatePlayIndex)
  }
  return (
    <List.Item
      onClick={changeCurrentSong}
      className={
        currentSong && currentSong.newId === song.newId ? 'playing' : ''
      }
      style={{ border: 'none', padding: '6px 10px' }}
      extra={
        <a onClick={deleteFromPlaylist} className="delete-btn">
          <DeleteOutlined
            style={{
              fontSize: 18,
              verticalAlign: 'middle',
            }}
          />
        </a>
      }
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          color: 'white',
        }}
      >
        <div style={{ flex: 3 }} className="nowrap">
          {song.name}
        </div>
        <div style={{ flex: 2 }} className="nowrap">
          <Artists artists={song.artists} />
        </div>
      </div>
    </List.Item>
  )
}

function mapStateToProps(state) {
  return {
    currentSong: state.listenlist[state.playIndex],
    listenlist: state.listenlist,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    addToListenlist: (song) => {
      dispatch({ type: 'ADD_TO_LISTENLIST', data: song })
    },
    deleteSongInListenlist: (indexToDelete, playIndex, updatePlayIndexCallback) => {
      dispatch({ type: 'DELETE_SONG_IN_LISTENLIST', data: indexToDelete })
      if (indexToDelete < playIndex) {
        updatePlayIndexCallback(playIndex - 1)
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongItem)
