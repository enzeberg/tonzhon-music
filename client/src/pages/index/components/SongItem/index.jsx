import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { connect } from 'react-redux';

import neteaseMusicLogo from './images/netease_16.ico';
import qqMusicLogo from './images/qq_16.ico';
import xiamiMusicLogo from './images/xiami_16.ico';
import Artists from '../Artists';
import MVIcon from '../MVIcon';
import AddTo from '../AddTo';
import './index.css';

class SongItem extends Component {
  constructor(props) {
    super(props);
  }

  playOrPause = (shouldPlay) => {
    if (shouldPlay) {
      const index = this.props.playlist.findIndex(song => song.link === this.props.song.link);
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

  render() {
    let { song, currentSong } = this.props;
    let anchorClass = song.hasCopyright ? '' : 'no-copyright';
    const shouldShowPlayIcon =
      (!currentSong  || currentSong.link !== song.link) ||
      (currentSong.link === song.link && this.props.playAction === 'pause');
    return (
      <li className="song-item">
        <Row  type="flex"  align="middle" style={{ fontSize: 14 }}>
          <Col xs={24} sm={8}>
            <div className="nowrap">
              <a href={song.link}
                title={`${song.name}${song.alias ? ` - ${song.alias}` : ''}\n` +
                       `${song.hasCopyright ? '' : '（此歌曲在该平台可能存在版权问题。）'}`}
                target="_blank"
                className={anchorClass}
              >
                <span>{song.name}</span>
                <span className="song-alias">
                  {song.alias && ` - ${song.alias}`}
                </span>
              </a>
            </div>
          </Col>
          <Col sm={1}>{song.mvLink && <MVIcon link={song.mvLink} />}</Col>
          <Col xs={12} sm={5}>
            <div className="nowrap">
              <Artists artists={song.artists} />
            </div>
          </Col>
          <Col xs={12} sm={5}>
            <div className="nowrap">
              <a href={song.album.link} target="_blank" title={song.album.name}>
                《{song.album.name}》
              </a>
            </div>
          </Col>
          <Col sm={2}>
            {
              this.props.showPlatform && <img src={logos[song.platform]} alt={song.platform} />
            }
          </Col>
          <Col sm={1}>
            <Button
              onClick={() => this.playOrPause(shouldShowPlayIcon)}
              shape="circle"
              icon={shouldShowPlayIcon ? 'caret-right' : 'pause'}
              title={shouldShowPlayIcon ? '播放' : '暂停'}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0)',
              }}
            />
          </Col>
          <Col sm={1}>
            <AddTo data={song} />
          </Col>
        </Row>
      </li>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SongItem);
