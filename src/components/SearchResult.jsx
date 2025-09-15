import { Pagination } from 'antd'
import { useCallback, useMemo } from 'react'
import SongList from './SongList'
import Wrapper from './Wrapper'
import OperatingBarOfSongList from './OperatingBarOfSongList'
import { useSearchKeyword } from '../contexts/SearchKeywordContext'
import { useSearchResults } from '../contexts/SearchResultsContext'

function SearchResult({ result, provider }) {
  const { searchKeyword: keyword } = useSearchKeyword()
  const { updateSearchResults } = useSearchResults()
  // 使用 useCallback 优化函数，避免不必要的重新渲染
  const onPageChange = useCallback(
    (page) => {
      fetch(`/api/search?provider=${provider}&keyword=${keyword}&page=${page}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
          }
          return res.json()
        })
        .then((json) => {
          updateSearchResults(provider, json)
        })
        .catch((err) => {
          console.error('搜索请求失败:', err)
        })
    },
    [provider, keyword, onResultResponded]
  )

  const songs = useMemo(() => result?.data?.songs || [], [result])
  const totalCount = useMemo(() => result?.data?.totalCount || 0, [result])

  if (!result || !result.data) {
    return null
  }

  return (
    <Wrapper
      provider={provider}
      operatingBar={<OperatingBarOfSongList songs={songs} />}
      pagination={
        <Pagination
          simple
          onChange={onPageChange}
          defaultPageSize={4}
          total={totalCount}
          showSizeChanger={false}
        />
      }
    >
      <SongList songs={songs} />
    </Wrapper>
  )
}

export default SearchResult
