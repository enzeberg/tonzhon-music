import { Button } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
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
        icon={<CaretRightOutlined />}
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
