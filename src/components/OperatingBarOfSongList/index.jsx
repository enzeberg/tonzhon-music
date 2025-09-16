import { Button } from 'antd'
import { Play } from 'lucide-react'
import { connect } from 'react-redux'
import AddToListenlist from './AddToListenlist'
import { usePlayIndex } from '../../contexts/PlayIndexContext'

function OperatingBarOfSongList({ songs, playSongList }) {
  const { updatePlayIndex } = usePlayIndex()
  
  const handlePlaySongList = () => {
    playSongList(songs)
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

function mapDispatchToProps(dispatch) {
  return {
    playSongList: (songs) => {
      dispatch({ type: 'NEW_LISTENLIST', data: songs })
    },
  }
}

export default connect(null, mapDispatchToProps)(OperatingBarOfSongList)
