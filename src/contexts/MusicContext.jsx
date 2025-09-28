import React, { createContext, useContext, useState, useEffect } from 'react'
import { getListenList, setListenList, getPlayIndex, setPlayIndex } from '../utils/storage'

const MusicContext = createContext()

export const useMusicContext = () => {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error('useMusicContext must be used within a MusicProvider')
  }
  return context
}

// 兼容性 hooks - 保持旧接口
export const usePlayIndex = () => {
  const { playIndex, updatePlayIndex, clearPlayIndex } = useMusicContext()
  return { playIndex, updatePlayIndex, clearPlayIndex }
}

export const useListenlist = () => {
  const { 
    listenlist, 
    addSongToListenlist, 
    addSongsToListenlist, 
    setNewListenlist, 
    deleteSongInListenlist, 
    clearListenlist 
  } = useMusicContext()
  return { 
    listenlist, 
    addSongToListenlist, 
    addSongsToListenlist, 
    setNewListenlist, 
    deleteSongInListenlist, 
    clearListenlist 
  }
}

export const MusicProvider = ({ children }) => {
  // 播放列表状态
  const [listenlist, setListenlist] = useState(() => getListenList())

  // 播放索引状态
  const [playIndex, setPlayIndexState] = useState(() => getPlayIndex())

  // 计算当前歌曲
  const currentSong = listenlist[playIndex]

  // 持久化函数
  const saveListenlistToStorage = (list) => {
    setListenList(list)
  }

  const savePlayIndexToStorage = (index) => {
    setPlayIndex(index)
  }

  // 播放列表操作
  const addSongToListenlist = (song) => {
    setListenlist(prevList => {
      if (prevList.some(item => item.newId === song.newId)) {
        return prevList
      }
      const newList = [...prevList, song]
      saveListenlistToStorage(newList)
      return newList
    })
  }

  const addSongsToListenlist = (songs) => {
    setListenlist(prevList => {
      const newSongs = songs.filter(song => 
        prevList.every(item => item.newId !== song.newId)
      )
      const newList = prevList.concat(newSongs)
      saveListenlistToStorage(newList)
      return newList
    })
  }

  const setNewListenlist = (songs) => {
    setListenlist(songs)
    saveListenlistToStorage(songs)
  }

  const deleteSongInListenlist = (index) => {
    setListenlist(prevList => {
      const newList = [...prevList]
      newList.splice(index, 1)
      saveListenlistToStorage(newList)
      return newList
    })
  }

  const clearListenlist = () => {
    setListenlist([])
    saveListenlistToStorage([])
  }

  // 播放索引操作
  const updatePlayIndex = (index) => {
    setPlayIndexState(index)
    savePlayIndexToStorage(index)
  }

  const clearPlayIndex = () => {
    setPlayIndexState(0)
    savePlayIndexToStorage(0)
  }

  // 自动保存播放索引
  useEffect(() => {
    savePlayIndexToStorage(playIndex)
  }, [playIndex])

  const value = {
    // 状态
    listenlist,
    playIndex,
    currentSong,
    
    // 播放列表操作
    addSongToListenlist,
    addSongsToListenlist,
    setNewListenlist,
    deleteSongInListenlist,
    clearListenlist,
    
    // 播放索引操作
    updatePlayIndex,
    clearPlayIndex,
  }

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  )
}
