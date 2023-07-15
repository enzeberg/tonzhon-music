import React, { Component } from 'react';
import { Row, Col, List } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import Artists from '../Artists';
import './in_playing_list.css';

class SongItem extends Component {
  changeCurrentSong = () => {
    const index = this.props.playingList.findIndex(song =>
      song.newId === this.props.song.newId);
    if (index === -1) {
      this.props.addToPlayingList(this.props.song);
      this.props.updatePlayIndex(this.props.playingList.length);
    } else {
      this.props.updatePlayIndex(index);
    }
  }

  deleteFromPlaylist = (e) => {
    e.stopPropagation();
    const index = this.props.playingList.findIndex(song =>
                  song.newId === this.props.song.newId);
    if (index + 1 === this.props.playingList.length) {
      this.props.updatePlayIndex(0);
    }
    this.props.deleteSongInPlayingList(index, this.props.playIndex);
  }

  render() {
    let { song, currentSong } = this.props;
    return (
      <List.Item
        onClick={this.changeCurrentSong}
        className={currentSong && currentSong.newId === song.newId ?
          'playing' : ''
        }
        style={{ border: 'none', padding: '6px 10px' }}
        extra={
          <a onClick={this.deleteFromPlaylist} className="delete-btn">
            <DeleteOutlined
              style={{
                fontSize: 18,
                verticalAlign: 'middle'
              }}
            />
          </a>
        }
      >
        <Row type="flex" align="middle"
          style={{ width: '100%', color: 'white', }}
        >
          <Col span={14} className="nowrap">
            {song.name}
          </Col>
          <Col span={10} className="nowrap">
            <Artists artists={song.artists} />
          </Col>
        </Row>
      </List.Item>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentSong: state.playingList[state.playIndex],
    playingList: state.playingList,
    playIndex: state.playIndex,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addToPlaylist: (song) => {
      dispatch({ type: 'ADD_TO_PLAYING_LIST', data: song });
    },
    updatePlayIndex: (index) => {
      dispatch({ type: 'UPDATE_PLAY_INDEX', data: index });
    },
    deleteSongInPlayingList: (indexToDelete, playIndex) => {
      dispatch({ type: 'DELETE_SONG_IN_PLAYING_LIST', data: indexToDelete });
      if (indexToDelete < playIndex) {
        dispatch({ type: 'UPDATE_PLAY_INDEX', data: playIndex - 1 });
      }
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SongItem);
