import { List } from 'antd'
import { Trash2 } from 'lucide-react'
import Artists from '../Artists'
import { usePlayIndex, useListenlist } from '../../contexts/MusicContext'
import './in_listenlist.css'

export default function SongItem({ song }) {
  const { playIndex, updatePlayIndex } = usePlayIndex()
  const { listenlist, addSongToListenlist, deleteSongInListenlist } =
    useListenlist()
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

  const deleteFromPlaylist = (e) => {
    e.stopPropagation()
    const index = listenlist.findIndex((item) => item.newId === song.newId)
    if (index + 1 === listenlist.length) {
      updatePlayIndex(0)
    }
    deleteSongInListenlist(index)
    if (index < playIndex) {
      updatePlayIndex(playIndex - 1)
    }
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
          <Trash2
            size={18}
            style={{
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
