import { List } from 'antd'
import { PlayCircle } from 'lucide-react'
import Artists from '../Artists'
import AddToListenlist from './AddToListenlist'
import { usePlayIndex, useListenlist } from '../../contexts/MusicContext'
import './index.css'

export default function SongItem({ song }) {
  const { playIndex, updatePlayIndex } = usePlayIndex()
  const { listenlist, addSongToListenlist } = useListenlist()
  const currentSong = listenlist[playIndex]
  const changeCurrentSong = () => {
    const index = listenlist.findIndex((item) => item.newId === song.newId)
    if (index === -1) {
      addSongToListenlist(song)
      updatePlayIndex(listenlist.length)
    } else {
      updatePlayIndex(index)
    }
  }

  return (
    <List.Item style={{ padding: '5px 10px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          fontSize: 14,
        }}
      >
        <div style={{ flex: 5 }} className="nowrap">
          <span
            title={`${song.name}${song.alias ? ` - ${song.alias}` : ''}`}
            target="_blank"
          >
            <span>{song.name}</span>
            <span className="song-alias">
              {song.alias && ` - ${song.alias}`}
            </span>
          </span>
        </div>
        <div style={{ flex: 3 }} className="nowrap">
          <Artists artists={song.artists} />
        </div>
        <div style={{ flex: 3 }} className="nowrap">
          <span target="_blank" title={song.album.name}>
            {song.album.name}
          </span>
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
            <PlayCircle
              size={20}
              style={{
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
