import { Row, Col, List } from 'antd'
import { PlayCircleOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import Artists from '../Artists'
import AddToPlayingList from './AddToPlayingList'
import { buildSongLink, buildAlbumLink } from '../../../../utils/link'
import './index.css'

function SongItem({
  song,
  currentSong,
  playingList,
  addToPlayingList,
  updatePlayIndex,
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

  return (
    <List.Item style={{ padding: '5px 10px' }}>
      <Row type="flex" align="middle" style={{ width: '100%', fontSize: 14 }}>
        <Col span={10} className="nowrap">
          <a
            href={buildSongLink(song.platform, song.originalId)}
            title={`${song.name}${song.alias ? ` - ${song.alias}` : ''}`}
            target="_blank"
          >
            <span>{song.name}</span>
            <span className="song-alias">
              {song.alias && ` - ${song.alias}`}
            </span>
          </a>
        </Col>
        <Col span={6} className="nowrap">
          <Artists artists={song.artists} />
        </Col>
        <Col span={6} className="nowrap">
          <a
            href={buildAlbumLink(song.platform, song.album.id)}
            target="_blank"
            title={song.album.name}
          >
            {song.album.name}
          </a>
        </Col>
        <Col span={1}>
          <a
            onClick={changeCurrentSong}
            className={
              currentSong &&
              currentSong.originalId === song.originalId &&
              currentSong.platform === song.platform
                ? 'play-btn playing'
                : 'play-btn'
            }
          >
            <PlayCircleOutlined
              style={{
                fontSize: 20,
                display: 'block',
              }}
            />
          </a>
        </Col>
        <Col span={1}>
          <AddToPlayingList data={song} />
        </Col>
      </Row>
    </List.Item>
  )
}

function mapStateToProps(state) {
  return {
    currentSong: state.playingList[state.playIndex],
    playingList: state.playingList,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    addToPlayingList: (song) => {
      dispatch({ type: 'ADD_SONG_TO_PLAYING_LIST', data: song })
    },
    updatePlayIndex: (index) => {
      dispatch({ type: 'UPDATE_PLAY_INDEX', data: index })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongItem)
