import React, { Component } from 'react';
import { Button, List, Row, Col, Icon } from 'antd';
import { connect } from 'react-redux';

import ItemInPlaylist from './SongItem/item_in_playlist';
import { playlist } from '../../../config';

class Playlist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <Row type="flex" align="middle" style={styles.header}>
          <Col span={14}>播放列表</Col>
          <Col span={8}>
            <Button icon="delete" ghost onClick={this.props.clearPlaylist}>
              清空
            </Button>
          </Col>
          <Col span={2}>
            <Button icon="close" ghost onClick={this.props.closePlaylist} />
          </Col>
        </Row>
        <div className="playlist" style={styles.list}>
          <List
            itemLayout="horizontal"
            dataSource={this.props.dataSource}
            size="small"
            renderItem={song => {
              return (
                <List.Item
                  key={`${song.platform}${song.originalId}`}
                  // style={{ color: 'white' }}
                >
                  <ItemInPlaylist song={song} rowWidth={playlist.width} />
                </List.Item>
              );
            }}

          />
        </div>

      </div>
    );
  }
}

const styles = {
  wrapper: {
    position: 'absolute',
    bottom: 106,
    color: 'white',
    left: 0,
    width: '100%',
    // height: 300,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    background: 'rgba(150, 150, 150, 0.8)',
  },
  header: {
    borderBottom: '2px solid gray',
    padding: '10px 10px',
    background: 'rgb(150, 150, 150)',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  list: {
    color: 'white',
    overflow: 'auto',
    // background: 'rgba(150, 150, 150, 0.8)',
    height: 200,
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
    clearPlaylist: () => {
      dispatch({ type: 'CLEAR_PLAYLIST' });
    },
    closePlaylist: () => {
      dispatch({ type: 'SHOULD_NOT_SHOW_PLAYLIST' });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
