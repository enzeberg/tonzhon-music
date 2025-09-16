import { notification, Button } from 'antd'
import { Plus } from 'lucide-react'
import { connect } from 'react-redux'

notification.config({
  placement: 'bottomRight',
  bottom: 50,
  duration: 2,
})

function AddToListenlist({ data, addToListenlist }) {
  function handleClick() {
    addToListenlist(data)
    notification.open({
      message: '已添加到聆听列表',
    })
  }

  return (
    <Button icon={<Plus size={16} />} onClick={handleClick}>
      添加到聆听列表
    </Button>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    addToListenlist: (data) => {
      dispatch({ type: 'ADD_SONGS_TO_LISTENLIST', data })
    },
  }
}

export default connect(null, mapDispatchToProps)(AddToListenlist)
