import { useEffect, useRef } from 'react'
import { useSearchStatus } from '../contexts/SearchStatusContext'

export const useSearchManager = (searchKeyword, updateSearchResults) => {
  const { updateSearchStatus, clearResults } = useSearchStatus()
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
        
        // 更新搜索结果（这里仍然使用 Redux，后续会替换）
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
