import { Row, Col, List } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import Artists from '../Artists'
import './in_playing_list.css'

function SongItem({
  song,
  currentSong,
  playingList,
  playIndex,
  addToPlayingList,
  updatePlayIndex,
  deleteSongInPlayingList,
}) {
  const changeCurrentSong = () => {
    const index = playingList.findIndex((song) => song.newId === song.newId)
    if (index === -1) {
      addToPlayingList(song)
      updatePlayIndex(playingList.length)
    } else {
      updatePlayIndex(index)
    }
  }

  const deleteFromPlaylist = (e) => {
    e.stopPropagation()
    const index = playingList.findIndex((song) => song.newId === song.newId)
    if (index + 1 === playingList.length) {
      updatePlayIndex(0)
    }
    deleteSongInPlayingList(index, playIndex)
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
      <Row type="flex" align="middle" style={{ width: '100%', color: 'white' }}>
        <Col span={14} className="nowrap">
          {song.name}
        </Col>
        <Col span={10} className="nowrap">
          <Artists artists={song.artists} />
        </Col>
      </Row>
    </List.Item>
  )
}

function mapStateToProps(state) {
  return {
    currentSong: state.playingList[state.playIndex],
    playingList: state.playingList,
    playIndex: state.playIndex,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    addToPlaylist: (song) => {
      dispatch({ type: 'ADD_TO_PLAYING_LIST', data: song })
    },
    updatePlayIndex: (index) => {
      dispatch({ type: 'UPDATE_PLAY_INDEX', data: index })
    },
    deleteSongInPlayingList: (indexToDelete, playIndex) => {
      dispatch({ type: 'DELETE_SONG_IN_PLAYING_LIST', data: indexToDelete })
      if (indexToDelete < playIndex) {
        dispatch({ type: 'UPDATE_PLAY_INDEX', data: playIndex - 1 })
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongItem)
