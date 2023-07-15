import { Button, List, Row, Col, Drawer } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import ItemInPlaylist from './SongItem/item_in_playlist';

function PlayingList() {
  return (
    <Drawer visible={this.props.visible}
      placement="bottom"
      mask={false}
      height={540}
      closable={false}
      bodyStyle={{
        padding: '0 0 75px 0',
      }}
      style={{
        zIndex: 10,
      }}
      title={
        <Row type="flex" align="middle">
          <Col span={18}>播放列表</Col>
          <Col span={6}>
            <Button icon={<DeleteOutlined />}
              onClick={this.props.clearPlayingList}
            >
              清空
            </Button>
          </Col>
        </Row>
      }
    >
      <div
        className="playingList"
        style={{
          overflow: 'auto',
          height: 400,
          padding: '0 10px',
        }}
      >
        <List
          itemLayout="horizontal"
          dataSource={this.props.dataSource}
          size="small"
          renderItem={song => {
            return (
              <List.Item
                key={`${song.platform}${song.originalId}`}
              >
                <ItemInPlaylist song={song} />
              </List.Item>
            );
          }}
        />
      </div>
    </Drawer>
  );
}

function mapStateToProps(state) {
  return {
    dataSource: state.playlist,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    clearPlayingList: () => {
      dispatch({ type: 'CLEAR_PLAYLIST' });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayingList);