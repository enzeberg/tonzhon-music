import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Row, Col, Slider, Button, notification, Tooltip } from 'antd';
import { withBaseIcon } from 'react-icons-kit';
import { repeat } from 'react-icons-kit/ikons/repeat';
import { ic_repeat_one } from 'react-icons-kit/md/ic_repeat_one';
import { shuffle } from 'react-icons-kit/ikons/shuffle';

import Playlist from './Playlist';
import { toMinAndSec } from '../lib/time_converter';
import { musicPlayer, themeColor } from '../../../config';

notification.config({
  placement: 'bottomRight',
  bottom: 50,
  duration: 3,
});

const Icon1 = withBaseIcon({
  size: 20, style: {color: 'white', verticalAlign: 'middle'}
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

class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playMode: localStorage.getItem('playMode') || 'loop',
      volume: 1,
      songSource: null,
      muted: false,
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
    this.audio.volume = this.state.volume;
    this.audio.addEventListener('loadeddata', () => {
      this.setState({
        songLoaded: true,
        songDuration: this.audio.duration,
        playProgress: 0
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
        const { currentSong, playlist } = this.props;
        const { playMode } = this.state;
        this.props.playNext(currentSong, playlist, playMode, 'forward');
      });
    });

  }

  componentWillReceiveProps(nextProps) {
    const currentSong = this.props.currentSong;
    const songToPlay = nextProps.currentSong;
    const { playAction } = nextProps;

    if (songToPlay) {
      // updating playlist will cause component receive props, so the judgement
      // is necessary
      if ((currentSong && songToPlay.link !== currentSong.link) ||
           (!currentSong && songToPlay)) {
        if (playAction === 'play') {
          this.getSongSource(songToPlay.platform, songToPlay.originalId, () => {
            this.audio.play();
          });
        } else if (playAction === 'pause') {
          this.setState({
            songSource: null,
            playProgress: 0,
          });
        }
      } else if (currentSong && songToPlay.link === currentSong.link) {
        if (playAction === 'play') {
          this.play();
        } else if (playAction === 'pause') {
          this.pause();
        }
      }
    } else {
      if (playAction === 'play') {
        this.props.updatePlayAction('pause');
      } else if (playAction === 'pause') {
        this.pause();
      }
      this.setState({
        songSource: null,
        songLoaded: false,
        playProgress: 0,
      });
    }
  }

  playOrPause() {
    if (this.props.playAction === 'play') {
      this.props.updatePlayAction('pause');
    } else if (this.props.playAction === 'pause') {
      this.props.updatePlayAction('play');
    }
  }
  play() {
    if (this.state.songSource) {
      this.audio.play();
    } else {
      const { currentSong } = this.props;
      this.getSongSource(currentSong.platform, currentSong.originalId, () => {
        this.audio.play();
      });
    }
  }
  pause() {
    this.audio.pause();
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
            songSource: json.data.songSource,
            songLoaded: false,
          }, callback);
        } else {
          this.setState({
            getMusicUrlStatus: 'failed',
          });
        }
      })
      .catch(err => {
        this.setState({
          getMusicUrlStatus: 'failed',
        });
      });
  }

  changePlayProgress(value) {
    this.audio.currentTime = value;
    this.setState({ playProgress: value });
  }

  playNext(direction) {
    const { currentSong, playlist } = this.props;
    const { playMode } = this.state;
    this.props.playNext(currentSong, playlist, playMode, direction);
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
    const { shouldShowPlaylist } = this.props;
    if (shouldShowPlaylist) {
      this.props.hidePlaylist();
    } else {
      this.props.showPlaylist();
    }
  }

  render() {
    const { currentSong, playlist } = this.props;
    const progress = toMinAndSec(this.state.playProgress);
    const total = toMinAndSec(this.state.songDuration);
    return (
      <div style={styles.player} id="music-player">
        <audio src={this.state.songSource}
          ref={(audio) => { this.audio = audio; }}
        >
          <source src={this.state.songSource} />
        </audio>

        <Row
          type="flex" align="middle" className="container"
          style={{ marginBottom: 10 }}
        >
          <Col span={16}>
            <Button ghost shape="circle" icon="step-backward"
              onClick={() => this.playNext('backward')}
            />
            <Button ghost shape="circle" size="large"
              icon={this.props.playAction === 'pause' ? 'caret-right' : 'pause'}
              onClick={this.playOrPause}
              // disabled={!this.state.songSource}
              style={{ margin: '0 20px' }}
            />
            <Button ghost shape="circle" icon="step-forward"
              onClick={() => this.playNext('forward')}
            />
          </Col>
          <Col span={4}>
            <Tooltip
              title={modeExplanations[this.state.playMode]}
            >
              <a
                onClick={this.switchPlayMode}
              >
                <Icon1
                  icon={modeIcons[this.state.playMode]}
                />
              </a>
              {/* <Button
                onClick={this.switchPlayMode}
                style={{
                  border: 'none',
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                }}
              >
                <Icon1
                  icon={modeIcons[this.state.playMode]}
                />
              </Button> */}
            </Tooltip>
          </Col>
          <Col span={4} style={{ float: 'right' }}>
            <Button ghost icon="bars" onClick={this.clickPlaylistBtn}
               title="播放列表"
               style={{ float: 'right' }}
            />
          </Col>
        </Row>
        <Row type="flex" align="middle" justify="space-between" style={{ height: 20 }}>
          <Col span={10}>
            <div className="nowrap">
              {
                currentSong &&
                <span>
                  <span style={{ marginRight: 12, color: 'white' }}>
                    <a href={currentSong.link}
                      style={{ color: 'white', marginRight: 4, fontSize: 16 }}
                      target="_blank"
                    >
                      <strong>{currentSong.name}</strong>
                    </a>
                  </span>
                  <span className="nowrap">
                    {
                      currentSong.artists.map(artist => artist.name)
                        .reduce((accumulator, currentValue) =>
                          accumulator + '/' + currentValue
                        )
                    }
                  </span>
                </span>
              }
            </div>

          </Col>
          <Col span={7}>
            <span style={{ textSize: 'x-small', fontWeight: 'lighter', color: 'rgb(200,200,200)' }}>
              {currentSong && `来自${platforms[currentSong.platform]}`}
            </span>
          </Col>
          <Col span={7} style={{ textAlign: 'right' }}>
            {
              this.state.getMusicUrlStatus === 'failed' ? '播放失败' :
                (
                  this.state.songLoaded ? `${progress} / ${total}` :
                    (this.props.playAction === 'play' &&
                      <Icon type="loading" />)
                )
            }
          </Col>
        </Row>
        <Slider min={0}
          max={this.state.songDuration ? parseInt(this.state.songDuration) : 0}
          value={this.state.playProgress}
          tipFormatter={(value) => toMinAndSec(value)}
          onChange={this.changePlayProgress}
          disabled={!this.state.songSource}
          style={{ margin: '8px 0 0 0' }} />
        {
           this.props.shouldShowPlaylist && <Playlist />
        }
      </div>
    );
  }
}


const styles = {
  player: {
    position: 'fixed',
    bottom: 0,
    padding: '12px',
    width: '100%',
    backgroundColor: musicPlayer.background,
    color: musicPlayer.color,
  },
};
const platforms = {
  qq: 'QQ音乐',
  netease: '网易云音乐',
  xiami: '虾米'
};

function mapStateToProps(state) {
  const { user } = state;
  const currentSong = state.playlist[state.playIndex];
  return {
    playAction: state.playAction,
    currentSong: currentSong,
    playlist: state.playlist,
    currentSongIsLiked: user && currentSong && user.favoriteSongs.some(song =>
       song.link === currentSong.link),
    user: state.user,
    shouldShowPlaylist: state.shouldShowPlaylist,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    playNext: (currentSong, playlist, playMode, direction) => {
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
      } else if (playMode === 'single') {
        dispatch({ type: 'UPDATE_PLAY_ACTION', data: 'pause' });
      } else if (playMode === 'shuffle') {
        nextPlayIndex = Math.floor(Math.random() * playlist.length);
      }
      if (nextPlayIndex !== undefined) {
        if (nextPlayIndex === currentIndex) {
          dispatch({ type: 'UPDATE_PLAY_ACTION', data: 'pause' });
        } else {
          dispatch({ type: 'UPDATE_PLAY_INDEX', data: nextPlayIndex });
        }
      }
      
      // if the player is paused, clicking "Previous" or "Next" button will make it play
      dispatch({ type: 'UPDATE_PLAY_ACTION', data: 'play' });
    },
    updatePlayAction: (playAction) => {
      dispatch({ type: 'UPDATE_PLAY_ACTION', data: playAction });
    },
    updateUserFavoriteSongs: (song) => {
      return dispatch({ type: 'UPDATE_FAVORITE_SONGS', data: song });
    },
    showPlaylist: () => {
      dispatch({ type: 'SHOULD_SHOW_PLAYLIST' });
    },
    hidePlaylist: () => {
      dispatch({ type: 'SHOULD_NOT_SHOW_PLAYLIST' });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
