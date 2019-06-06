import React, { Component } from 'react';
import { Button, List, Row, Col, Icon, Drawer } from 'antd';
import { connect } from 'react-redux';

import ItemInPlaylist from './SongItem/item_in_playlist';
import { playingList } from '../../../config';

class PlayingList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
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
          <Row type="flex" align="middle" style={styles.header}>
            <Col span={18}>播放列表</Col>
            <Col span={6}>
              <Button icon="delete" onClick={this.props.clearPlayingList}>
                清空
              </Button>
            </Col>
          </Row>
        }
      >
        <div style={styles.wrapper}>

          <div className="playingList" style={styles.list}>
            <List
              itemLayout="horizontal"
              dataSource={this.props.dataSource}
              size="small"
              renderItem={song => {
                return (
                  <List.Item
                    key={`${song.platform}${song.originalId}`}
                  >
                    <ItemInPlaylist song={song} rowWidth={playingList.width} />
                  </List.Item>
                );
              }}

            />
          </div>

        </div>
      </Drawer>

    );
  }
}

const styles = {
  list: {
    // color: 'white',
    overflow: 'auto',
    // background: 'rgba(150, 150, 150, 0.8)',
    height: 400,
    padding: '0 10px',
  },
};

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
