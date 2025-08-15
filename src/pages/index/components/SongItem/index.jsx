import { List } from 'antd'
import { PlayCircleOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import Artists from '../Artists'
import AddToListenlist from './AddToListenlist'
import { buildSongLink, buildAlbumLink } from '../../../../utils/link'
import './index.css'

function SongItem({
  song,
  currentSong,
  listenlist,
  addToListenlist,
  updatePlayIndex,
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

  return (
    <List.Item style={{ padding: '5px 10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', fontSize: 14 }}>
        <div style={{ flex: 5 }} className='nowrap'>
          <a
            href={buildSongLink(song.platform, song.originalId)}
            title={`${song.name}${song.alias ? ` - ${song.alias}` : ''}`}
            target='_blank'
          >
            <span>{song.name}</span>
            <span className='song-alias'>
              {song.alias && ` - ${song.alias}`}
            </span>
          </a>
        </div>
        <div style={{ flex: 3 }} className='nowrap'>
          <Artists artists={song.artists} />
        </div>
        <div style={{ flex: 3 }} className='nowrap'>
          <a
            href={buildAlbumLink(song.platform, song.album.id)}
            target='_blank'
            title={song.album.name}
          >
            {song.album.name}
          </a>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
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
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <AddToListenlist data={song} />
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
      dispatch({ type: 'ADD_SONG_TO_LISTENLIST', data: song })
    },
    updatePlayIndex: (index) => {
      dispatch({ type: 'UPDATE_PLAY_INDEX', data: index })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongItem)
