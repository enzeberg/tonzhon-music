import { PlusOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { connect } from 'react-redux';

function AddToPlayingList({ data, addToPlayingList }) {
  function handleClick() {
    addToPlayingList(data);
    notification.open({
      message: '已添加到播放列表'
    });
  }

  return (
    <a onClick={handleClick} title="添加到播放列表">
      <PlusOutlined
        style={{
          fontSize: 20,
          display: 'block',
        }}
      />
    </a>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToPlayingList: (data) => {
      dispatch({ type: 'ADD_SONG_TO_PLAYING_LIST', data: data });
    },
  };
}

export default connect(null, mapDispatchToProps)(AddToPlayingList);