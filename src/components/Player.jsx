import React, { useState, useMemo, useCallback } from 'react'
import {
  Play,
  SkipForward,
  SkipBack,
  Pause,
  Download,
  List,
  Repeat,
  Repeat1,
  Shuffle,
  Volume2,
  VolumeX,
  Loader2,
} from 'lucide-react'
import { Slider, Button, Tooltip } from 'antd'
import Artists from './Artists'
import Listenlist from './Listenlist'
import toMinAndSec from '../utils/toMinAndSec'
import { useAudioManager } from '../hooks/useAudioManager'

const playModeIcons = {
  loop: <Repeat className="player-icon" size={16} />,
  single: <Repeat1 className="player-icon" size={16} />,
  shuffle: <Shuffle className="player-icon" size={16} />,
}

const modeExplanations = {
  loop: '循环',
  single: '单曲循环',
  shuffle: '随机',
}

// 提取样式对象，避免每次渲染都创建新对象
const playerStyles = {
  container: {
    position: 'fixed',
    bottom: 0,
    padding: '8px 0',
    width: '100%',
    backgroundColor: '#222',
    color: 'white',
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  playButton: {
    margin: '0 10px',
  },
  songInfoContainer: {
    flex: 7,
    paddingRight: 40,
  },
  songInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 20,
  },
  songTitle: {
    flex: 3,
  },
  songArtists: {
    flex: 2,
  },
  songTime: {
    flex: 1,
    textAlign: 'right',
  },
  progressSlider: {
    margin: '8px 0',
  },
  volumeContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  titleSpan: {
    color: 'white',
    marginRight: 4,
    fontSize: 16,
  },
}

export default function Player() {
  const [listenlistVisible, setListenlistVisible] = useState(false)
  
  const {
    audioRef,
    currentSong,
    getMusicUrlStatus,
    playStatus,
    songSource,
    playProgress,
    songLoaded,
    songDuration,
    playMode,
    volume,
    muted,
    playOrPause,
    playNext,
    changePlayProgress,
    onVolumeBtnClick,
    changeVolume,
    switchPlayMode,
  } = useAudioManager()

  const onListenlistBtnClick = useCallback(() => {
    setListenlistVisible(!listenlistVisible)
  }, [listenlistVisible])

  // 使用useMemo优化时间格式化计算
  const progress = useMemo(() => toMinAndSec(playProgress), [playProgress])
  const total = useMemo(() => toMinAndSec(songDuration), [songDuration])

  // 使用useMemo优化播放按钮图标
  const playButtonIcon = useMemo(() => {
    if (getMusicUrlStatus === 'notYet') {
      return <Play size={20} />
    }
    if (getMusicUrlStatus === 'started') {
      return <Loader2 size={20} className="animate-spin" />
    }
    if (getMusicUrlStatus === 'ok') {
      return playStatus === 'playing' ? <Pause size={20} /> : <Play size={20} />
    }
    return <Play size={20} />
  }, [getMusicUrlStatus, playStatus])

  // 使用useCallback优化事件处理函数
  const handlePlayNext = useCallback((direction) => {
    playNext(direction)
  }, [playNext])

  return (
    <div style={playerStyles.container} id="music-player">
      <audio src={songSource} ref={audioRef} />

      <div className="container" style={playerStyles.flexContainer}>
        <div style={{ flex: 2 }}>
          <Button
            ghost
            shape="circle"
            icon={<SkipBack size={16} />}
            onClick={() => handlePlayNext('backward')}
          />
          <Button
            ghost
            shape="circle"
            size="large"
            onClick={playOrPause}
            style={playerStyles.playButton}
            icon={playButtonIcon}
            disabled={!currentSong}
          />
          <Button
            ghost
            shape="circle"
            icon={<SkipForward size={16} />}
            onClick={() => handlePlayNext('forward')}
          />
        </div>

        <div style={playerStyles.songInfoContainer}>
          <div style={playerStyles.songInfo}>
            {currentSong && (
              <>
                <div style={playerStyles.songTitle} className="nowrap">
                  <span style={playerStyles.titleSpan} title={currentSong.name}>
                    <strong>{currentSong.name}</strong>
                  </span>
                </div>
                <div style={playerStyles.songArtists} className="nowrap">
                  {currentSong.artists && (
                    <Artists artists={currentSong.artists} />
                  )}
                </div>
                <div style={playerStyles.songTime}>
                  {getMusicUrlStatus === 'failed'
                    ? '加载失败'
                    : songLoaded
                    ? `${progress} / ${total}`
                    : '00:00 / 00:00'}
                </div>
              </>
            )}
          </div>
          <Slider
            min={0}
            max={songDuration ? parseInt(songDuration) : 0}
            value={playProgress}
            tooltip={{ formatter: (value) => toMinAndSec(value) }}
            onChange={changePlayProgress}
            disabled={!songSource}
            style={playerStyles.progressSlider}
          />
        </div>

        <div style={{ flex: 1, textAlign: 'center' }}>
          <Button
            icon={<Download size={16} />}
            ghost
            shape="circle"
            href={songSource}
            target="_blank"
            download
            disabled={songSource === null}
          />
        </div>

        <div style={{ flex: 1, textAlign: 'center', paddingLeft: 3 }}>
          <Tooltip title={modeExplanations[playMode]}>
            <a onClick={switchPlayMode}>{playModeIcons[playMode]}</a>
          </Tooltip>
        </div>

        <div style={{ flex: 2 }}>
          <div style={playerStyles.volumeContainer}>
            <div style={{ flex: 1 }}>
              <a onClick={onVolumeBtnClick}>
                {muted ? (
                  <VolumeX className="player-icon" size={16} />
                ) : (
                  <Volume2 className="player-icon" size={16} />
                )}
              </a>
            </div>
            <div style={{ flex: 5 }}>
              <Slider
                min={0}
                max={1}
                step={0.01}
                defaultValue={volume}
                onChange={changeVolume}
              />
            </div>
          </div>
        </div>

        <div style={{ flex: 1, textAlign: 'right' }}>
          <Button
            ghost
            icon={<List size={16} />}
            onClick={onListenlistBtnClick}
            title="聆听列表"
          />
        </div>
      </div>

      {listenlistVisible && <Listenlist />}
    </div>
  )
}
