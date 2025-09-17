import React, { useState, useEffect, useRef, useCallback } from 'react'
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
  Loader2
} from 'lucide-react'
import { Slider, Button, Tooltip, notification } from 'antd'
import Artists from './Artists'
import Listenlist from './Listenlist'
import toMinAndSec from '../utils/toMinAndSec'
import { usePlayIndex } from '../contexts/PlayIndexContext'
import { useListenlist } from '../contexts/ListenlistContext'

const playModeIcons = {
  loop: <Repeat className="player-icon" size={16} />,
  single: <Repeat1 className="player-icon" size={16} />,
  shuffle: <Shuffle className="player-icon" size={16} />,
}

const playModes = ['loop', 'single', 'shuffle']
const modeExplanations = {
  loop: '循环',
  single: '单曲循环',
  shuffle: '随机',
}

function Player() {
  const { playIndex, updatePlayIndex } = usePlayIndex()
  const { listenlist } = useListenlist()
  const audioRef = useRef(null)
  const intervalRef = useRef(null)
  
  // 计算当前歌曲
  const currentSong = listenlist[playIndex]
  
  // 状态管理
  const [getMusicUrlStatus, setGetMusicUrlStatus] = useState('notYet')
  const [playStatus, setPlayStatus] = useState('pausing')
  const [playMode, setPlayMode] = useState(() => localStorage.getItem('playMode') || 'loop')
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem('volume')
    return savedVolume ? Number(savedVolume) : 0.6
  })
  const [songSource, setSongSource] = useState(null)
  const [muted, setMuted] = useState(false)
  const [playProgress, setPlayProgress] = useState(0)
  const [listenlistVisible, setListenlistVisible] = useState(false)
  const [songLoaded, setSongLoaded] = useState(false)
  const [songDuration, setSongDuration] = useState(0)

  // 音频事件处理
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume

    const handleLoadedData = () => {
      setSongLoaded(true)
      setSongDuration(audio.duration)
    }

    const handlePlay = () => {
      if (currentSong) {
        document.title = `${currentSong.name} - ${currentSong.artists
          ?.map((item) => item.name)
          .join(' / ')}`
      }
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      
      intervalRef.current = setInterval(() => {
        setPlayProgress(audio.currentTime)
      }, 1000)
    }

    const handlePause = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    const handleEnded = () => {
      clearInterval(intervalRef.current)
      setPlayProgress(audio.currentTime)
      playNext('forward')
    }

    audio.addEventListener('loadeddata', handleLoadedData)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [currentSong])

  // 当前歌曲变化时的处理
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (currentSong) {
      audio.pause()
      setSongSource(null)
      setSongLoaded(false)
      setPlayProgress(0)
      getSongSourceAndPlay(currentSong)
    } else {
      setSongSource(null)
      setSongLoaded(false)
      setPlayProgress(0)
    }
  }, [currentSong?.newId])

  const playOrPause = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (playStatus === 'pausing') {
      if (songSource) {
        play()
      } else if (currentSong) {
        getSongSourceAndPlay(currentSong)
      }
    } else if (playStatus === 'playing') {
      pause()
    }
  }, [playStatus, songSource, currentSong])

  const getSongSourceAndPlay = useCallback((song) => {
    getSongSource(song.platform, song.originalId, () => {
      play()
    })
  }, [])

  const play = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      audio.play()
      setPlayStatus('playing')
    }
  }, [])

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      setPlayStatus('pausing')
    }
  }, [])

  const getSongSource = useCallback((platform, originalId, callback) => {
    setGetMusicUrlStatus('started')
    
    fetch(`/api/song_source/${platform}/${originalId}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 'ok') {
          setSongSource(json.data.songSource)
          setSongLoaded(false)
          setGetMusicUrlStatus('ok')
          if (callback) callback()
        } else {
          setGetMusicUrlStatus('failed')
          afterLoadingFailure()
        }
      })
      .catch((err) => {
        setGetMusicUrlStatus('failed')
        afterLoadingFailure()
      })
  }, [])

  const afterLoadingFailure = useCallback(() => {
    notification.open({
      message: '加载失败，已跳过',
    })
    playNext('forward')
  }, [])

  const changePlayProgress = useCallback((value) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = value
      setPlayProgress(value)
    }
  }, [])

  const onVolumeBtnClick = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      if (muted) {
        audio.muted = false
        setMuted(false)
      } else {
        audio.muted = true
        setMuted(true)
      }
    }
  }, [muted])

  const changeVolume = useCallback((value) => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = value
      setVolume(value)
      localStorage.setItem('volume', value.toString())
    }
  }, [])

  const playNext = useCallback((direction) => {
    if (playStatus === 'playing') {
      pause()
    }
    
    if (playMode === 'single' || listenlist.length === 1) {
      const audio = audioRef.current
      if (audio) {
        audio.currentTime = 0
        play()
      }
    } else {
      // 计算下一首歌曲的索引
      let nextPlayIndex
      const currentIndex = listenlist.findIndex(
        (song) => song.newId === currentSong.newId
      )
      
      if (playMode === 'loop') {
        if (direction === 'forward') {
          nextPlayIndex = listenlist[currentIndex + 1] ? currentIndex + 1 : 0
        } else if (direction === 'backward') {
          nextPlayIndex = listenlist[currentIndex - 1]
            ? currentIndex - 1
            : listenlist.length - 1
        }
      } else if (playMode === 'shuffle') {
        do {
          nextPlayIndex = Math.floor(Math.random() * listenlist.length)
        } while (nextPlayIndex === currentIndex)
      }
      
      if (nextPlayIndex !== undefined) {
        updatePlayIndex(nextPlayIndex)
      }
    }
  }, [playStatus, playMode, listenlist, currentSong, updatePlayIndex, pause, play])

  const switchPlayMode = useCallback(() => {
    const currentIndex = playModes.indexOf(playMode)
    const nextMode = playModes[currentIndex + 1] || playModes[0]
    localStorage.setItem('playMode', nextMode)
    setPlayMode(nextMode)
  }, [playMode])

  const onListenlistBtnClick = useCallback(() => {
    setListenlistVisible(!listenlistVisible)
  }, [listenlistVisible])

  const progress = toMinAndSec(playProgress)
  const total = toMinAndSec(songDuration)

  return (
    <div style={styles.player} id="music-player">
      <audio
        src={songSource}
        ref={audioRef}
      />

      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <div style={{ flex: 2 }}>
          <Button
            ghost
            shape="circle"
            icon={<SkipBack size={16} />}
            onClick={() => playNext('backward')}
          />
          <Button
            ghost
            shape="circle"
            size="large"
            onClick={playOrPause}
            style={{ margin: '0 10px' }}
            icon={
              getMusicUrlStatus === 'notYet' ? (
                <Play size={20} />
              ) : getMusicUrlStatus === 'started' ? (
                <Loader2 size={20} className="animate-spin" />
              ) : getMusicUrlStatus === 'ok' ? (
                playStatus === 'playing' ? (
                  <Pause size={20} />
                ) : (
                  <Play size={20} />
                )
              ) : (
                <Play size={20} />
              )
            }
            disabled={!currentSong}
          />
          <Button
            ghost
            shape="circle"
            icon={<SkipForward size={16} />}
            onClick={() => playNext('forward')}
          />
        </div>
        
        <div style={{ flex: 7, paddingRight: 40 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 20,
            }}
          >
            {currentSong && (
              <>
                <div style={{ flex: 3 }} className="nowrap">
                  <span
                    style={{ color: 'white', marginRight: 4, fontSize: 16 }}
                    title={currentSong.name}
                  >
                    <strong>{currentSong.name}</strong>
                  </span>
                </div>
                <div style={{ flex: 2 }} className="nowrap">
                  {currentSong.artists && (
                    <Artists artists={currentSong.artists} />
                  )}
                </div>
                <div style={{ flex: 1, textAlign: 'right' }}>
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
            tipFormatter={(value) => toMinAndSec(value)}
            onChange={changePlayProgress}
            disabled={!songSource}
            style={{ margin: '8px 0' }}
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
            <a onClick={switchPlayMode}>
              {playModeIcons[playMode]}
            </a>
          </Tooltip>
        </div>
        
        <div style={{ flex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
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

const styles = {
  player: {
    position: 'fixed',
    bottom: 0,
    padding: '8px 0',
    width: '100%',
    backgroundColor: '#222',
    color: 'white',
  },
}

export default Player
