import { Row, Col, List } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import Artists from '../Artists'
import './in_listenlist.css'

function SongItem({
  song,
  currentSong,
  listenlist,
  playIndex,
  addToListenlist,
  updatePlayIndex,
  deleteSongInListenlist,
}) {
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
    deleteSongInListenlist(index, playIndex)
  }
  return (
    <List.Item
      onClick={changeCurrentSong}
      className={
        currentSong && currentSong.newId === song.newId ? 'playing' : ''
      }
      style={{ border: 'none', padding: '6px 10px' }}
      extra={
        <a onClick={deleteFromPlaylist} className='delete-btn'>
          <DeleteOutlined
            style={{
              fontSize: 18,
              verticalAlign: 'middle',
            }}
          />
        </a>
      }
    >
      <Row type='flex' align='middle' style={{ width: '100%', color: 'white' }}>
        <Col span={14} className='nowrap'>
          {song.name}
        </Col>
        <Col span={10} className='nowrap'>
          <Artists artists={song.artists} />
        </Col>
      </Row>
    </List.Item>
  )
}

function mapStateToProps(state) {
  return {
    currentSong: state.listenlist[state.playIndex],
    listenlist: state.listenlist,
    playIndex: state.playIndex,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    addToListenlist: (song) => {
      dispatch({ type: 'ADD_TO_LISTENLIST', data: song })
    },
    updatePlayIndex: (index) => {
      dispatch({ type: 'UPDATE_PLAY_INDEX', data: index })
    },
    deleteSongInListenlist: (indexToDelete, playIndex) => {
      dispatch({ type: 'DELETE_SONG_IN_LISTENLIST', data: indexToDelete })
      if (indexToDelete < playIndex) {
        dispatch({ type: 'UPDATE_PLAY_INDEX', data: playIndex - 1 })
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongItem)
