import React, { Component } from 'react';
import { Button, List, Row, Col } from 'antd';
import { connect } from 'react-redux';

import ItemInPlaylist from '../SongItem/in_playing_list';
import { playingList } from '../../../../config';
import './index.css';

class PlayingList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <Row type="flex" align="middle" justify="space-between" style={styles.header}>
          <Col span={20}>播放列表</Col>
          <Col span={4}>
            <Button icon="delete" ghost onClick={this.props.clearPlaylist}>
              清空
            </Button>
          </Col>
        </Row>
        <div className="playingList" style={styles.list}>
          <List
            itemLayout="horizontal"
            dataSource={this.props.dataSource}
            renderItem={song => {
              return (
                <ItemInPlaylist key={song.link}
                  song={song}
                />
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
    bottom: 64,
    color: 'white',
    left: '50%',
    marginLeft: -playingList.width / 2,
    width: playingList.width,
    height: 320,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    background: 'rgb(85, 85, 85)',
  },
  header: {
    padding: '10px 0 10px 20px',
    background: '#222',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  list: {
    color: 'white',
    overflow: 'auto',
    height: 268,
  },
};

function mapStateToProps(state) {
  return {
    dataSource: state.playingList,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    clearPlaylist: () => {
      dispatch({ type: 'CLEAR_PLAYING_LIST' });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayingList);
