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

  render() {
    let { song, currentSong } = this.props;
    let anchorClass = song.hasCopyright ? '' : 'no-copyright';
    const shouldShowPlayIcon =
      (!currentSong || currentSong.link !== song.link) ||
      (currentSong.link === song.link && this.props.playAction === 'pause');
    return (
      <li className="song-item">
        <Row type="flex" align="middle" style={{ fontSize: 14 }}>
          <Col sm={8}>
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
          <Col sm={5}>
            <div className="nowrap">
              <Artists artists={song.artists} />
            </div>
          </Col>
          <Col sm={5}>
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
          <Col sm={2}>
            <Button
              onClick={this.changeCurrentSong}
              shape="circle"
              icon="caret-right"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0)',
              }}
              type={
                currentSong && currentSong.link === song.link ?
                  'primary' : 'default'
              }
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
    currentSong: state.playingList[state.playIndex],
    playingList: state.playingList,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addToPlayingList: (song) => {
      dispatch({ type: 'ADD_TO_PLAYING_LIST', data: song });
    },
    updatePlayIndex: (index) => {
      dispatch({ type: 'UPDATE_PLAY_INDEX', data: index });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SongItem);