import React, { createContext, useContext, useState, useEffect, useRef } from 'react'

const SearchContext = createContext()

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

// 兼容性 hooks - 保持旧接口
export const useSearchStatus = () => {
  const { searchStatus, updateSearchStatus, clearResults } = useSearch()
  return { searchStatus, updateSearchStatus, clearResults }
}

export const useSearchKeyword = () => {
  const { searchKeyword, updateSearchKeyword } = useSearch()
  return { searchKeyword, updateSearchKeyword }
}

export const useSearchResults = () => {
  const { searchResults, updateSearchResults, clearResults } = useSearch()
  return { searchResults, updateSearchResults, clearResults }
}

export const SearchProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchStatus, setSearchStatus] = useState('not_searched_yet')
  const [searchResults, setSearchResults] = useState({})
  const lastKeywordRef = useRef('')

  const updateSearchKeyword = (keyword) => {
    setSearchKeyword(keyword)
  }

  const updateSearchStatus = (status) => {
    setSearchStatus(status)
  }

  const updateSearchResults = (provider, data) => {
    setSearchResults(prevResults => ({
      ...prevResults,
      [provider]: data
    }))
  }

  const clearResults = () => {
    setSearchResults({})
    setSearchStatus('not_searched_yet')
  }

  // 自动搜索逻辑
  useEffect(() => {
    if (searchKeyword && searchKeyword !== lastKeywordRef.current) {
      lastKeywordRef.current = searchKeyword
      performSearch(searchKeyword)
    }
  }, [searchKeyword])

  const performSearch = async (keyword) => {
    const providers = ['spotify', 'apple', 'youtube']
    
    clearResults()
    updateSearchStatus('searching')
    
    let resultsResponded = 0
    
    providers.forEach(async (provider) => {
      try {
        const response = await fetch(
          `/api/search?provider=${provider}&keyword=${encodeURIComponent(keyword)}`,
          {
            credentials: 'include',
          }
        )
        const json = await response.json()
        
        updateSearchResults(provider, json)
        
        resultsResponded++
        if (resultsResponded === providers.length) {
          updateSearchStatus('done')
        }
      } catch (err) {
        console.error('搜索错误: ', err)
        resultsResponded++
        if (resultsResponded === providers.length) {
          updateSearchStatus('done')
        }
      }
    })
  }

  const value = {
    // 状态
    searchKeyword,
    searchStatus,
    searchResults,
    
    // 操作
    updateSearchKeyword,
    updateSearchStatus,
    updateSearchResults,
    clearResults,
    performSearch,
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}
