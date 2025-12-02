import SongItem from './SongItem'

function SongList({ songs }) {
  return (
    <ol
      className="song-list"
      style={{
        margin: 0,
        padding: 0,
        listStyle: 'none',
      }}
    >
      {songs.map((song) => (
        <SongItem key={`${song.platform}-${song.originalId}`} song={song} />
      ))}
    </ol>
  )
}

export default SongList
