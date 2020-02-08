import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Slider, Button, Tooltip } from 'antd';
import { withBaseIcon } from 'react-icons-kit';
import { repeat } from 'react-icons-kit/ikons/repeat';
import { ic_repeat_one } from 'react-icons-kit/md/ic_repeat_one'
import { shuffle } from 'react-icons-kit/ikons/shuffle';
import { volume_2 } from 'react-icons-kit/ikons/volume_2';
import { volume_mute } from 'react-icons-kit/ikons/volume_mute';

import Artists from './Artists';
import MVIcon from './MVIcon';
import PlayingList from './PlayingList';
import { toMinAndSec } from '../lib/time_converter';
import { musicPlayer } from '../../../config';

const Icon1 = withBaseIcon({
  size: 20,
  style: {
    color: 'white',
    verticalAlign: 'middle',
    paddingLeft: 10
  },
});
const modeIcons = {
  loop: repeat,
  single: ic_repeat_one,
  shuffle: shuffle,
};

const playModes = ['loop', 'shuffle', 'single'];
const modeExplanations = {
  loop: '循环',
  shuffle: '随机',
  single: '单曲循环',
};

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getMusicUrlStatus: 'notYet',
      playStatus: 'pausing',
      playMode: localStorage.getItem('playMode') || 'loop',
      volume: localStorage.getItem('volume') ?
                Number(localStorage.getItem('volume')) : 0.6,
      songSource: null,
      muted: false,
      playProgress: 0,
      playingListVisible: false,
    };
    this.playOrPause = this.playOrPause.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.getSongSource = this.getSongSource.bind(this);
    this.changePlayProgress = this.changePlayProgress.bind(this);
    this.muteOrNot = this.muteOrNot.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.playNext = this.playNext.bind(this);
    this.switchPlayMode = this.switchPlayMode.bind(this);
    this.clickPlayingListBtn = this.clickPlayingListBtn.bind(this);
  }

  componentDidMount() {
    this.audio.volume = this.state.volume;
    this.audio.addEventListener('loadeddata', () => {
      this.setState({
        songLoaded: true,
        songDuration: this.audio.duration,
        // playProgress: 0
      });
    });
    this.audio.addEventListener('play', () => {
      document.title = `${this.props.currentSong.name} -
                        ${this.props.currentSong.artists
          .map(item => item.name)
          .reduce(
            (accumulator, currentValue) =>
              accumulator + ' / ' + currentValue
          )}`;
      if (this.interval) { clearInterval(this.interval); }
      this.interval = setInterval(() => {
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

  componentDidUpdate(prevProps) {
    const prevSong = prevProps.currentSong;
    const currentSong = this.props.currentSong;

    if (currentSong) {
      if ((prevSong && currentSong.link !== prevSong.link) || !prevSong) {
        this.audio.pause();
        this.setState({
          songSource: null,
          songLoaded: false,
          playProgress: 0,
        });
        this.getSongSourceAndPlay(currentSong);
      }
    } else {
      if (prevSong) {
        this.setState({
          songSource: null,
          songLoaded: false,
          playProgress: 0,
        });
      }
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
      this.play();
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

  muteOrNot() {
    if (this.state.muted) {
      this.audio.muted = false;
      this.setState({ muted: false });
    } else {
      this.audio.muted = true;
      this.setState({ muted: true });
    }
  }

  changeVolume(value) {
    this.audio.volume = value;
    this.setState({ volume: value });
    localStorage.setItem('volume', value);
  }

  playNext(direction) {
    if (this.state.playStatus === 'playing') {
      this.pause();
    }
    const { currentSong, playingList } = this.props;
    const { playMode } = this.state;
    if (playMode === 'single' || playingList.length === 1) {
      this.audio.currentTime = 0;
      this.play();
    } else {
      this.props.changePlayIndex(currentSong, playingList, playMode, direction);
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

  clickPlayingListBtn() {
    this.setState({
      playingListVisible: !this.state.playingListVisible,
    });
  }

  render() {
    const { currentSong } = this.props;
    const { getMusicUrlStatus, playStatus } = this.state;
    const progress = toMinAndSec(this.state.playProgress);
    const total = toMinAndSec(this.state.songDuration);
    return (
      <div style={styles.player} id="music-player">
        <audio src={this.state.songSource}
          ref={(audio) => { this.audio = audio; }}
        />

        <Row type="flex" align="middle" className="container" justify="space-around">
          <Col span={3}>
            <Button ghost shape="circle" icon="step-backward"
              onClick={() => this.playNext('backward')}
            />
            <Button ghost shape="circle" size="large"
              onClick={this.playOrPause}
              style={{ margin: '0 10px' }}
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
              disabled={!currentSong}
            />
            <Button ghost shape="circle" icon="step-forward"
              onClick={() => this.playNext('forward')}
            />
          </Col>
          <Col span={14} style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Row type="flex" align="middle" justify="space-between"
              style={{ height: 20 }}
            >
              {
                currentSong &&
                  <>
                    <Col span={7} className="nowrap">
                      <a href={currentSong.link}
                        style={{ color: 'white', marginRight: 4, fontSize: 16 }}
                        target="_blank"
                        title={currentSong.name}
                      >
                        <strong>{currentSong.name}</strong>
                      </a>
                    </Col>
                    <Col span={2}>
                      {
                        currentSong.mvLink &&
                        <MVIcon link={currentSong.mvLink}
                          fontColor="white"
                        />
                      }
                    </Col>
                    <Col span={6} className="nowrap">
                      {
                        currentSong.artists &&
                        <Artists artists={currentSong.artists}
                          fontColor="white"
                        />
                      }
                    </Col>
                    <Col span={5} style={{
                        fontSize: 'small', fontWeight: 'lighter',
                        color: 'rgb(230, 230, 230)',
                      }}
                    >
                      {`来自${platforms[currentSong.platform]}`}
                    </Col>
                    <Col span={4} style={{ textAlign: 'right' }}>
                      {
                        this.state.getMusicUrlStatus === 'failed' ? '加载失败' :
                          (
                            this.state.songLoaded ? `${progress} / ${total}` :
                              '00:00 / 00:00'
                          )
                      }
                    </Col>
                  </>
              }
            </Row>
            <Slider min={0}
              max={this.state.songDuration ? parseInt(this.state.songDuration) : 0}
              value={this.state.playProgress}
              tipFormatter={(value) => toMinAndSec(value)}
              onChange={this.changePlayProgress}
              disabled={!this.state.songSource}
              style={{ margin: '8px 0' }}
            />
          </Col>
          <Col span={1}>
            {/* <a href={this.state.songSource} download>
              <Icon type="download" />
            </a> */}
            <Button icon="download" ghost shape="circle"
              // type="link" size="large"
              href={this.state.songSource} target="_blank"
              download disabled={this.state.songSource === null}
              // style={{ color:'white' }}
            />
          </Col>
          <Col span={1}>
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
            </Tooltip>
          </Col>
          <Col span={3}>
            <Row type="flex" align="middle">
              <Col span={6}>
                <a onClick={this.muteOrNot}>
                  <Icon1 icon={this.state.muted ? volume_mute : volume_2} />
                </a>
              </Col>
              <Col span={18} style={{ paddingRight: 5 }}>
                <Slider min={0} max={1} step={0.01}
                  defaultValue={this.state.volume}
                  onChange={this.changeVolume}
                />
              </Col>
            </Row>
          </Col>
          <Col span={1} style={{ textAlign: 'right' }}>
            <Button ghost icon="bars" onClick={this.clickPlayingListBtn}
              title="播放列表"
            />
          </Col>
        </Row>
        {
          this.state.playingListVisible && <PlayingList />
        }
      </div>
    );
  }
}


const styles = {
  player: {
    position: 'fixed',
    bottom: 0,
    padding: '8px 0',
    width: '100%',
    backgroundColor: musicPlayer.background,
    color: musicPlayer.color,
  },
};
const platforms = {
  qq: 'QQ音乐',
  netease: '网易云音乐',
  xiami: '虾米音乐'
};

function mapStateToProps(state) {
  const currentSong = state.playingList[state.playIndex];
  return {
    currentSong: currentSong,
    playingList: state.playingList,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    changePlayIndex: (currentSong, playingList, playMode, direction) => {
      let nextPlayIndex;
      const currentIndex = playingList.findIndex(song =>
        song.link === currentSong.link);
      if (playMode === 'loop') {
        if (direction === 'forward') {
          nextPlayIndex = playingList[currentIndex + 1] ? currentIndex + 1 : 0;
        } else if (direction === 'backward') {
          nextPlayIndex = playingList[currentIndex - 1] ? currentIndex - 1 :
            playingList.length - 1;
        }
      } else if (playMode === 'shuffle') {
        do {
          nextPlayIndex = Math.floor(Math.random() * playingList.length);
        } while (nextPlayIndex === currentIndex);
      }
      if (nextPlayIndex !== undefined) {
        dispatch({ type: 'UPDATE_PLAY_INDEX', data: nextPlayIndex });
      }
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
