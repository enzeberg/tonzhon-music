import React, { createContext, useContext, useState, useEffect } from 'react'

const ListenlistContext = createContext()

export const useListenlist = () => {
  const context = useContext(ListenlistContext)
  if (!context) {
    throw new Error('useListenlist must be used within a ListenlistProvider')
  }
  return context
}

export const ListenlistProvider = ({ children }) => {
  // 从 localStorage 初始化状态
  const [listenlist, setListenlist] = useState(() => {
    const savedList = localStorage.getItem('listenlist')
    return savedList ? JSON.parse(savedList) : []
  })

  // 保存到 localStorage 的辅助函数
  const saveToStorage = (list) => {
    localStorage.setItem('listenlist', JSON.stringify(list))
  }

  // 添加单首歌曲到播放列表
  const addSongToListenlist = (song) => {
    setListenlist(prevList => {
      // 检查歌曲是否已存在
      if (prevList.some(item => item.newId === song.newId)) {
        return prevList // 已存在，不添加
      }
      const newList = [...prevList, song]
      saveToStorage(newList)
      return newList
    })
  }

  // 添加多首歌曲到播放列表
  const addSongsToListenlist = (songs) => {
    setListenlist(prevList => {
      // 过滤掉已存在的歌曲
      const newSongs = songs.filter(song => 
        prevList.every(item => item.newId !== song.newId)
      )
      const newList = prevList.concat(newSongs)
      saveToStorage(newList)
      return newList
    })
  }

  // 设置新的播放列表
  const setNewListenlist = (songs) => {
    setListenlist(songs)
    saveToStorage(songs)
  }

  // 删除播放列表中的歌曲
  const deleteSongInListenlist = (index) => {
    setListenlist(prevList => {
      const newList = [...prevList]
      newList.splice(index, 1)
      saveToStorage(newList)
      return newList
    })
  }

  // 清空播放列表
  const clearListenlist = () => {
    setListenlist([])
    saveToStorage([])
  }

  return (
    <ListenlistContext.Provider 
      value={{ 
        listenlist,
        addSongToListenlist,
        addSongsToListenlist,
        setNewListenlist,
        deleteSongInListenlist,
        clearListenlist
      }}
    >
      {children}
    </ListenlistContext.Provider>
  )
}
