import React, { createContext, useContext, useState, useEffect } from 'react'

const PlayIndexContext = createContext()

export const usePlayIndex = () => {
  const context = useContext(PlayIndexContext)
  if (!context) {
    throw new Error('usePlayIndex must be used within a PlayIndexProvider')
  }
  return context
}

export const PlayIndexProvider = ({ children }) => {
  // 从 localStorage 初始化状态
  const [playIndex, setPlayIndex] = useState(() => {
    const savedIndex = localStorage.getItem('playIndex')
    return savedIndex ? Number(savedIndex) : 0
  })

  // 当 playIndex 变化时自动保存到 localStorage
  useEffect(() => {
    localStorage.setItem('playIndex', playIndex.toString())
  }, [playIndex])

  const updatePlayIndex = (index) => {
    setPlayIndex(index)
  }

  const clearPlayIndex = () => {
    setPlayIndex(0)
    localStorage.setItem('playIndex', '0')
  }

  return (
    <PlayIndexContext.Provider 
      value={{ 
        playIndex, 
        updatePlayIndex,
        clearPlayIndex 
      }}
    >
      {children}
    </PlayIndexContext.Provider>
  )
}
