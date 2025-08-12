import { PlusOutlined } from '@ant-design/icons'
import { notification } from 'antd'
import { connect } from 'react-redux'

function AddToListenlist({ data, addToListenlist }) {
  function handleClick() {
    addToListenlist(data)
    notification.open({
      message: '已添加到聆听列表',
    })
  }

  return (
    <a onClick={handleClick} title='添加到聆听列表'>
      <PlusOutlined
        style={{
          fontSize: 20,
          display: 'block',
        }}
      />
    </a>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    addToListenlist: (data) => {
      dispatch({ type: 'ADD_SONG_TO_LISTENLIST', data: data })
    },
  }
}

export default connect(null, mapDispatchToProps)(AddToListenlist)
