import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';

import neteaseMusicLogo from './images/netease_16.ico';
import qqMusicLogo from './images/qq_16.ico';
import xiamiMusicLogo from './images/xiami_16.ico';
import kuwoMusicLogo from '../../images/kuwo_16.ico';
import { connect } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';

class SongItem extends Component {
  constructor(props) {
    super(props);
  }

  changeCurrentSong = () => {
    const index = this.props.playlist.findIndex(song =>
      song.newId === this.props.song.newId);
    if (index === -1) {
      this.props.addToPlaylist(this.props.song);
      this.props.updatePlayIndex(this.props.playlist.length);
    } else {
      this.props.updatePlayIndex(index);
    }
  }

  deleteFromPlaylist = () => {
    const index = this.props.playlist.findIndex(song =>
      song.newId === this.props.song.newId);
    if (index + 1 === this.props.playlist.length) {
      this.props.updatePlayIndex(0);
    }
    this.props.deleteSongInPlaylist(index, this.props.playIndex);
  }

  render() {
    let { song, currentSong } = this.props;
    return (
      <Row type="flex" align="middle"
        style={{
          width: '100%',
          // color: 'white',
          padding: '0 10px'
        }}
        onClick={this.changeCurrentSong}
      >
        <Col span={12}
        >
          <div className="nowrap">
            <span>{song.name}</span>
          </div>
        </Col>
        <Col span={8}>
          <div className="nowrap">
            {
              song.artists.map(artist => artist.name)
                .reduce((accumulator, currentValue) =>
                  accumulator + ' / ' + currentValue
                )
            }
          </div>
        </Col>
        <Col span={2}>
          <img src={logos[song.platform]} alt={song.platform}
          />
        </Col>
        <Col span={2}>
          <Button
            title="删除"
            onClick={this.deleteFromPlaylist}
            icon={<DeleteOutlined />}
            style={{
              // color: 'white',
              border: 'none',
              // backgroundColor: 'rgba(0, 0, 0, 0)',
            }}
          />
        </Col>
      </Row>
    );
  }
}

const logos = {
  qq: qqMusicLogo,
  netease: neteaseMusicLogo,
  xiami: xiamiMusicLogo,
  kuwo: kuwoMusicLogo,
};

function mapStateToProps(state) {
  return {
    currentSong: state.playlist[state.playIndex],
    playlist: state.playlist,
    playIndex: state.playIndex,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addToPlaylist: (song) => {
      dispatch({ type: 'ADD_TO_PLAYLIST', data: song });
    },
    updatePlayIndex: (index) => {
      dispatch({ type: 'UPDATE_PLAY_INDEX', data: index });
    },
    deleteSongInPlaylist: (indexToDelete, playIndex) => {
      dispatch({ type: 'DELETE_SONG_IN_PLAYLIST', data: indexToDelete });
      if (indexToDelete < playIndex) {
        dispatch({ type: 'UPDATE_PLAY_INDEX', data: playIndex - 1 });
      }
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SongItem);
