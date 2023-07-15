import { notification, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

notification.config({
  placement: 'bottomRight',
  bottom: 50,
  duration: 2,
});

function AddToPlayingList({ data, addToPlaylist }) {
  function handleClick() {
    addToPlaylist(data);
    notification.open({
      message: '已添加至播放列表',
    });
  }

  return (
    <Button
      icon={<PlusOutlined />}
      onClick={handleClick}
    >
      添加到播放列表
    </Button>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToPlaylist: (data) => {
      dispatch({ type: 'ADD_LIST_TO_PLAYING_LIST', data });
    },
  };
}

export default connect(null, mapDispatchToProps)(AddToPlayingList);