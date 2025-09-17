import { Button } from 'antd'
import { Play } from 'lucide-react'
import AddToListenlist from './AddToListenlist'
import { usePlayIndex } from '../../contexts/PlayIndexContext'
import { useListenlist } from '../../contexts/ListenlistContext'

export default function OperatingBarOfSongList({ songs }) {
  const { updatePlayIndex } = usePlayIndex()
  const { setNewListenlist } = useListenlist()

  const handlePlaySongList = () => {
    setNewListenlist(songs)
    updatePlayIndex(0)
  }

  return (
    <>
      <Button
        icon={<Play size={16} />}
        onClick={handlePlaySongList}
        style={{
          marginRight: '10px',
        }}
      >
        播放
      </Button>
      <AddToListenlist data={songs} />
    </>
  )
}
