import { useEffect, useRef } from 'react'
import { useSearchStatus, useSearchResults, useSearchKeyword } from '../contexts/SearchContext'

export const useSearchManager = () => {
  const { searchKeyword } = useSearchKeyword()
  const { updateSearchStatus, clearResults } = useSearchStatus()
  const { updateSearchResults, clearResults: clearSearchResults } = useSearchResults()
  const lastKeywordRef = useRef('')
  
  useEffect(() => {
    if (searchKeyword && searchKeyword !== lastKeywordRef.current) {
      lastKeywordRef.current = searchKeyword
      performSearch(searchKeyword)
    }
  }, [searchKeyword])

  const performSearch = async (keyword) => {
    const providers = ['spotify', 'apple', 'youtube']
    
    // 开始搜索
    clearSearchResults()
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
        
        // 更新搜索结果
        updateSearchResults(provider, json)
        
        resultsResponded++
        if (resultsResponded === providers.length) {
          updateSearchStatus('done')
        }
      } catch (err) {
        console.log('搜索错误: ', err)
        resultsResponded++
        if (resultsResponded === providers.length) {
          updateSearchStatus('done')
        }
      }
    })
  }

  return { performSearch }
}
