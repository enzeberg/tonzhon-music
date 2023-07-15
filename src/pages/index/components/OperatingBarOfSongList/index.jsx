import { Button } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import AddToPlayingList from './AddToPlayingList';

function OperatingBarOfSongList() {
  return (
    <>
      <Button icon={<CaretRightOutlined />}
        onClick={() => this.props.playSongList(this.props.songs)}
        style={{
          marginRight: '10px',
        }}
      >
        播放
      </Button>
      <AddToPlayingList data={this.props.songs} />
    </>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    playSongList: (songs) => {
      dispatch({ type: 'NEW_PLAYING_LIST', data: songs });
      dispatch({ type: 'UPDATE_PLAY_INDEX', data: 0 });
    },
  };
}

export default connect(null, mapDispatchToProps)(OperatingBarOfSongList);