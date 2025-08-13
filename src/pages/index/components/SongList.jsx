import { List } from 'antd'
import SongItem from './SongItem'

function SongList({ songs }) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={songs}
      renderItem={(song) => (
        <SongItem key={`${song.platform}-${song.originalId}`} song={song} />
      )}
      className="song-list"
    />
  )
}

export default SongList
