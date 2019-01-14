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

  playOrPause = (shouldPlay) => {
    if (shouldPlay) {
      const index = this.props.playlist.findIndex(song =>
                    song.link === this.props.song.link);
      if (index === -1) {
        this.props.addToPlaylist(this.props.song);
        this.props.updatePlayIndex(this.props.playlist.length);
      } else {
        this.props.updatePlayIndex(index);
      }
      this.props.updatePlayAction('play');
    } else {
      this.props.updatePlayAction('pause');
    }
  }

  deleteFromPlaylist = () => {
    const index = this.props.playlist.findIndex(song =>
                  song.link === this.props.song.link);
    if (index + 1 === this.props.playlist.length) {
      this.props.updatePlayIndex(0);
    }
    this.props.deleteSongInPlaylist(index, this.props.playIndex);
  }

  render() {
    let { song, currentSong } = this.props;
    let artistsNum = song.artists.length;
    let anchorClass = song.hasCopyright ? '' : 'no-copyright';
    const shouldShowPlayIcon =
      (!currentSong  || currentSong.link !== song.link) ||
      (currentSong.link === song.link && this.props.playAction === 'pause');
    return (
      <Row type="flex" align="middle"
        style={{ width: this.props.rowWidth, color: 'white', padding: '0 10px' }}
      >
        <Col xs={11} sm={14}>
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
           <img src={logos[song.platform]} alt={song.platform}
           />
        </Col>
        <Col xs={2} sm={1}>
          {/* <a
            title={shouldShowPlayIcon ? '播放' : '暂停'}
            onClick={() => this.playOrPause(shouldShowPlayIcon)}
          >
            <Icon
              type={shouldShowPlayIcon ? 'play-circle-o' : 'pause-circle-o'}
              style={{ color: 'white' }}
            />
          </a> */}
          <Button
            title={shouldShowPlayIcon ? '播放' : '暂停'}
            onClick={() => this.playOrPause(shouldShowPlayIcon)}
            icon={shouldShowPlayIcon ? 'play-circle-o' : 'pause-circle-o'}
            style={{
              color: 'white',
              border: 'none',
              backgroundColor: 'rgba(0, 0, 0, 0)',
            }}
          />
        </Col>
        <Col xs={2} sm={1}>
          {/* <a
            title="删除"
            onClick={this.deleteFromPlaylist}
          >
            <Icon
              type="delete"
              style={{ color: 'white' }}
            />
          </a> */}
          <Button
            title="删除"
            onClick={this.deleteFromPlaylist}
            icon="delete"
            style={{
              color: 'white',
              border: 'none',
              backgroundColor: 'rgba(0, 0, 0, 0)',
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
  xiami: xiamiMusicLogo
};

function mapStateToProps(state) {
  return {
    currentSong: state.playlist[state.playIndex],
    playlist: state.playlist,
    playAction: state.playAction,
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
    updatePlayAction: (playAction) => {
      dispatch({ type: 'UPDATE_PLAY_ACTION', data: playAction });
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
