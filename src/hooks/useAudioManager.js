import { useState, useEffect, useRef, useCallback } from 'react'
import { notification } from 'antd'
import { usePlayIndex, useListenlist } from '../contexts/MusicContext'
import { getPlayMode, setPlayMode, getVolume, setVolume } from '../utils/storage'

export const useAudioManager = () => {
  const { playIndex, updatePlayIndex } = usePlayIndex()
  const { listenlist } = useListenlist()
  
  const audioRef = useRef(null)
  const intervalRef = useRef(null)
  const currentSong = listenlist[playIndex]
  
  // 音频状态
  const [getMusicUrlStatus, setGetMusicUrlStatus] = useState('notYet')
  const [playStatus, setPlayStatus] = useState('pausing')
  const [songSource, setSongSource] = useState(null)
  const [playProgress, setPlayProgress] = useState(0)
  const [songLoaded, setSongLoaded] = useState(false)
  const [songDuration, setSongDuration] = useState(0)
  
  // 播放模式和音量
  const [playMode, setPlayModeState] = useState(() => getPlayMode())
  const [volume, setVolumeState] = useState(() => getVolume())
  const [muted, setMuted] = useState(false)

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
        document.title = `${currentSong.name} - ${currentSong.artists?.map(item => item.name).join(' / ')}`
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      intervalRef.current = setInterval(() => {
        const currentTime = Math.floor(audio.currentTime)
        // 只有当秒数发生变化时才更新状态，减少不必要的重渲染
        setPlayProgress(prevProgress => {
          const prevTime = Math.floor(prevProgress)
          return prevTime !== currentTime ? currentTime : prevProgress
        })
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

  // 歌曲切换处理
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

  // 播放控制函数
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
  }, [playStatus, songSource, currentSong, play, pause])

  const getSongSource = useCallback((platform, originalId, callback) => {
    setGetMusicUrlStatus('started')

    fetch(`/api/song_source/${platform}/${originalId}`)
      .then(res => res.json())
      .then(json => {
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
      .catch(err => {
        console.error('获取歌曲源失败:', err)
        setGetMusicUrlStatus('failed')
        afterLoadingFailure()
      })
  }, [])

  const getSongSourceAndPlay = useCallback((song) => {
    getSongSource(song.platform, song.originalId, () => {
      play()
    })
  }, [getSongSource, play])

  const afterLoadingFailure = useCallback(() => {
    notification.open({
      message: '加载失败，已跳过',
    })
    playNext('forward')
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
      let nextPlayIndex
      const currentIndex = listenlist.findIndex(song => song.newId === currentSong.newId)

      if (playMode === 'loop') {
        if (direction === 'forward') {
          nextPlayIndex = listenlist[currentIndex + 1] ? currentIndex + 1 : 0
        } else if (direction === 'backward') {
          nextPlayIndex = listenlist[currentIndex - 1] ? currentIndex - 1 : listenlist.length - 1
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
      setVolumeState(value)
      setVolume(value)
    }
  }, [])

  const switchPlayMode = useCallback(() => {
    const playModes = ['loop', 'single', 'shuffle']
    const currentIndex = playModes.indexOf(playMode)
    const nextMode = playModes[currentIndex + 1] || playModes[0]
    setPlayMode(nextMode)
    setPlayModeState(nextMode)
  }, [playMode])

  return {
    // Refs
    audioRef,
    
    // State
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
    
    // Actions
    playOrPause,
    playNext,
    changePlayProgress,
    onVolumeBtnClick,
    changeVolume,
    switchPlayMode,
  }
}
