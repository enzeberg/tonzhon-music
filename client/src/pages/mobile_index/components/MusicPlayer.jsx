import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Slider, Button, notification, Tooltip, Drawer } from 'antd';
// import Button1 from '@material-ui/core/Button';
import { withBaseIcon } from 'react-icons-kit';
import { repeat } from 'react-icons-kit/ikons/repeat';
import { ic_repeat_one } from 'react-icons-kit/md/ic_repeat_one'
import { shuffle } from 'react-icons-kit/ikons/shuffle';

import Playlist from './Playlist';
import { toMinAndSec } from '../lib/time_converter';
import { musicPlayer } from '../../../config';
import neteaseMusicLogo from '../images/netease_16.ico';
import qqMusicLogo from '../images/qq_16.ico';
import xiamiMusicLogo from '../images/xiami_16.ico';

notification.config({
  placement: 'bottomRight',
  bottom: 50,
  duration: 3,
});

const Icon1 = withBaseIcon({
  size: 22, style: { color: 'black', verticalAlign: 'middle' }
});
const modeIcons = {
  loop: repeat,
  single: ic_repeat_one,
  shuffle: shuffle,
};

const playModes = ['loop', 'single', 'shuffle'];
const modeExplanations = {
  loop: '循环',
  single: '单曲循环',
  shuffle: '随机',
};

const isiOS = Boolean(navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/));

class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getMusicUrlStatus: 'notYet',
      playStatus: 'pausing',
      playMode: localStorage.getItem('playMode') || 'loop',
      songSource: null,
      playProgress: 0,
      playerDetailsVisible: false,
      playlistVisible: false,
    };
    this.playOrPause = this.playOrPause.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.getSongSource = this.getSongSource.bind(this);
    this.changePlayProgress = this.changePlayProgress.bind(this);
    this.playNext = this.playNext.bind(this);
    this.switchPlayMode = this.switchPlayMode.bind(this);
    this.clickPlaylistBtn = this.clickPlaylistBtn.bind(this);
  }

  componentDidMount() {
    this.audio.addEventListener('loadeddata', () => {
      this.setState({
        songLoaded: true,
        songDuration: this.audio.duration,
        playProgress: 0,
      });
    });
    this.audio.addEventListener('play', () => {
      if (this.interval) { clearInterval(this.interval); }
      this.interval = setInterval(() => {
        console.log('interval')
        this.setState({
          playProgress: this.audio.currentTime,
          // songDuration: this.audio.duration,
        });
      }, 1000);
    });
    this.audio.addEventListener('pause', () => {
      if (this.interval) {
        clearInterval(this.interval);
      }
    });
    this.audio.addEventListener('ended', () => {
      clearInterval(this.interval);
      this.setState({
        playProgress: this.audio.currentTime,
      }, () => {
        this.playNext('forward');
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const currentSong = this.props.currentSong;
    const songToPlay = nextProps.currentSong;

    if (songToPlay) {
      // updating playlist will cause component receive props, so the judgement
      // is necessary
      if ((currentSong && songToPlay.link !== currentSong.link) ||
        (!currentSong && songToPlay)) {
        this.audio.pause();
        this.setState({
          songSource: null,
          songLoaded: false,
          playProgress: 0,
        });
        this.getSongSourceAndPlay(songToPlay);
      }
    } else {
      this.setState({
        songSource: null,
        songLoaded: false,
        playProgress: 0,
      });
    }
  }

  playOrPause() {
    const { playStatus } = this.state;
    if (playStatus === 'pausing') {
      if (this.state.songSource) {
        this.play();
      } else {
        const { currentSong } = this.props;
        this.getSongSourceAndPlay(currentSong);
      }
    } else if (playStatus === 'playing') {
      this.pause();
    }
  }
  getSongSourceAndPlay = (song) => {
    this.getSongSource(song.platform, song.originalId, () => {
      if (!isiOS) {
        // playing after getting new src will cause Unhandled Rejection (NotAllowedError) in the development environment of iOS
        this.play();
      }
    });
  }
  play() {
    this.audio.play();
    this.setState({
      playStatus: 'playing',
    });

  }
  pause() {
    this.audio.pause();
    this.setState({
      playStatus: 'pausing',
    });
  }

  getSongSource(platform, originalId, callback) {
    this.setState({
      getMusicUrlStatus: 'started',
    });
    fetch(`/api/song_source/${platform}/${originalId}`)
      .then(res => res.json())
      .then(json => {
        if (json.status === 'ok') {
          this.setState({
            getMusicUrlStatus: 'ok',
            songSource: json.data.songSource,
            songLoaded: false,
          }, callback);
        } else {
          this.setState({
            getMusicUrlStatus: 'failed',
          });
          notification.open({
            message: '播放失败',
          });
        }
      })
      .catch(err => {
        this.setState({
          getMusicUrlStatus: 'failed',
        });
        notification.open({
          message: '播放失败',
        });
      });
  }

  changePlayProgress(value) {
    this.audio.currentTime = value;
    this.setState({ playProgress: value });
  }

  playNext(direction) {
    if (this.state.playStatus === 'playing') {
      this.pause();
    }
    const { currentSong, playlist } = this.props;
    const { playMode } = this.state;
    if (playMode === 'single' || playlist.length === 1) {
      this.audio.currentTime = 0;
      this.play();
    } else {
      this.props.changePlayIndex(currentSong, playlist, playMode, direction);
    }
  }

  switchPlayMode() {
    const i = playModes.indexOf(this.state.playMode);
    const mode = playModes[i + 1] || playModes[0];
    localStorage.setItem('playMode', mode);
    this.setState({
      playMode: mode,
    });
  }

  clickPlaylistBtn() {
    this.setState({
      playlistVisible: !this.state.playlistVisible,
    });
  }

  switchPlayerDetailsVisible = () => {
    this.setState({
      playerDetailsVisible: !this.state.playerDetailsVisible,
    });
  }
  hidePlayerDetails = () => {
    this.setState({
      playerDetailsVisible: false,
    });
  }

  render() {
    const { getMusicUrlStatus, playStatus } = this.state;
    const { currentSong, playlist } = this.props;
    const progress = toMinAndSec(this.state.playProgress);
    const total = toMinAndSec(this.state.songDuration);
    return (
      <div style={styles.player} id="music-player">
        <audio
          src={this.state.songSource}
          ref={(audio) => { this.audio = audio; }}
        />

        <Drawer visible={this.state.playerDetailsVisible}
          title={currentSong && currentSong.name}
          onCancel={this.handleCancel}
          // bodyStyle={{
          //   backgroundColor: 'rgba(100, 100, 100, 0.7)'
          // }}
          placement="bottom"
          mask={false}
          // destroyOnClose
          onClose={this.hidePlayerDetails}
          closable={false}
        >
          <div style={{ textAlign: 'right' }}>
            {this.state.songLoaded ? `${progress} / ${total}` :
              '00:00 / 00:00'}
          </div>
          <Slider min={0}
            max={this.state.songDuration ? parseInt(this.state.songDuration) : 0}
            value={this.state.playProgress}
            tipFormatter={(value) => toMinAndSec(value)}
            onChange={this.changePlayProgress}
            disabled={!this.state.songSource}
            style={{ margin: '0 0 12px 0' }}
          />
          <Row
            type="flex" align="middle" className="container"
            style={{ marginBottom: 10 }}
          >
            <Col span={20}>
              <Button shape="circle" icon="step-backward"
                onClick={() => this.playNext('backward')}
                style={{ marginRight: 20 }}
              />
              <Button shape="circle" icon="step-forward"
                onClick={() => this.playNext('forward')}
              />
            </Col>
            <Col span={4}>
              <Tooltip
                title={modeExplanations[this.state.playMode]}
              >
                <a
                  onClick={this.switchPlayMode}
                  style={{ float: 'right' }}
                >
                  <Icon1
                    icon={modeIcons[this.state.playMode]}
                  />
                </a>
              </Tooltip>
            </Col>
          </Row>
        </Drawer>

        <Row type="flex" align="middle" justify="space-between"
        >
          <Col span={14} onClick={this.switchPlayerDetailsVisible}>
            {
              currentSong &&
              <div >
                <h3 className="nowrap" style={{ color: 'white' }}>
                  {currentSong.name}
                </h3>
                <h5 className="nowrap" style={{ color: 'white' }}>
                  {
                    currentSong.artists.map(artist => artist.name)
                      .reduce((accumulator, currentValue) =>
                        accumulator + '/' + currentValue
                      )
                  }
                </h5>
              </div>
            }
          </Col>
          <Col span={4}>
            {
              currentSong &&
              <img src={logos[currentSong.platform]} alt={currentSong.platform} />
            }
          </Col>

          <Col span={3}>
            <Button ghost shape="circle"
              icon={
                getMusicUrlStatus === 'notYet' ? 'caret-right' :
                  (
                    getMusicUrlStatus === 'started' ? 'loading' :
                      (
                        getMusicUrlStatus === 'ok' ?
                          (playStatus === 'playing' ? 'pause' : 'caret-right') :
                          'caret-right'
                      )
                  )
              }
              onClick={this.playOrPause}
              disabled={!currentSong}
            />
          </Col>
          <Col span={3} style={{ float: 'right' }}>
            <Button ghost icon="bars" onClick={this.clickPlaylistBtn}
              title="播放列表"
              style={{ float: 'right' }}
            />
          </Col>
        </Row>
        {
          <Playlist visible={this.state.playlistVisible} />
        }
      </div>
    );
  }
}


const styles = {
  player: {
    position: 'fixed',
    bottom: 0,
    padding: '10px',
    width: '100%',
    backgroundColor: musicPlayer.background,
    color: musicPlayer.color,
    zIndex: 1001, // .ant-drawer's z-index = 1000
  },
};

const logos = {
  qq: qqMusicLogo,
  netease: neteaseMusicLogo,
  xiami: xiamiMusicLogo
};

function mapStateToProps(state) {
  const currentSong = state.playlist[state.playIndex];
  return {
    currentSong: currentSong,
    playlist: state.playlist,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    changePlayIndex: (currentSong, playlist, playMode, direction) => {
      let nextPlayIndex;
      const currentIndex = playlist.findIndex(song =>
        song.link === currentSong.link);
      if (playMode === 'loop') {
        if (direction === 'forward') {
          nextPlayIndex = playlist[currentIndex + 1] ? currentIndex + 1 : 0;
        } else if (direction === 'backward') {
          nextPlayIndex = playlist[currentIndex - 1] ? currentIndex - 1 :
            playlist.length - 1;
        }
      } else if (playMode === 'shuffle') {
        do {
          nextPlayIndex = Math.floor(Math.random() * playlist.length);
        } while (nextPlayIndex === currentIndex);
      }
      if (nextPlayIndex !== undefined) {
        dispatch({ type: 'UPDATE_PLAY_INDEX', data: nextPlayIndex });
      }
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
