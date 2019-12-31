import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';

import neteaseMusicLogo from './images/netease_16.ico';
import qqMusicLogo from './images/qq_16.ico';
import xiamiMusicLogo from './images/xiami_16.ico';
import { connect } from 'react-redux';
import Artists from '../Artists';

class SongItem extends Component {
  constructor(props) {
    super(props);
  }

  changeCurrentSong = () => {
    const index = this.props.playingList.findIndex(song =>
      song.link === this.props.song.link);
    if (index === -1) {
      this.props.addToPlayingList(this.props.song);
      this.props.updatePlayIndex(this.props.playingList.length);
    } else {
      this.props.updatePlayIndex(index);
    }
  }

  deleteFromPlaylist = () => {
    const index = this.props.playingList.findIndex(song =>
                  song.link === this.props.song.link);
    if (index + 1 === this.props.playingList.length) {
      this.props.updatePlayIndex(0);
    }
    this.props.deleteSongInPlayingList(index, this.props.playIndex);
  }

  render() {
    let { song, currentSong } = this.props;
    return (
      <Row type="flex" align="middle"
        style={{ width :'100%', color: 'white', padding: '0 20px' }}
      >
        <Col xs={11} sm={12}>
          <div className="nowrap">
            <span>{song.name}</span>
          </div>
        </Col>
        <Col xs={6} sm={6}>
          <div className="nowrap">
            <Artists artists={song.artists} fontColor="white" />
          </div>
        </Col>
        <Col xs={3} sm={2}>
           <img src={logos[song.platform]} alt={song.platform} />
        </Col>
        <Col xs={2} sm={2}>
          <Button
            onClick={this.changeCurrentSong}
            shape="circle"
            icon="caret-right"
            size="small"
            ghost
            type={
              currentSong && currentSong.link === song.link ?
                'primary' : 'default'
            }
          />
        </Col>
        <Col xs={2} sm={2}>
          <Button
            title="删除"
            onClick={this.deleteFromPlaylist}
            icon="delete"
            shape="circle"
            size="small"
            ghost
          />
        </Col>
      </Row>
    );
  }
}

const logos = {
  qq: qqMusicLogo,
  netease: neteaseMusicLogo,
  xiami: xiamiMusicLogo
};

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
