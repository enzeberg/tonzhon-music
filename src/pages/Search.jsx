import { useEffect } from 'react'
import { Spin } from 'antd'
import { useParams } from 'react-router-dom'
import SearchResult from '../components/SearchResult'
import { useSearchStatus } from '../contexts/SearchStatusContext'
import { useSearchResults } from '../contexts/SearchResultsContext'
import { useSearchKeyword } from '../contexts/SearchKeywordContext'

export default function Search() {
  const { keyword } = useParams()
  const { updateSearchKeyword } = useSearchKeyword()
  const { searchStatus } = useSearchStatus()
  const { searchResults } = useSearchResults()

  useEffect(() => {
    if (keyword) {
      const decodedKeyword = decodeURIComponent(keyword)
      updateSearchKeyword(decodedKeyword)
    }
  }, [keyword, updateSearchKeyword])

  const filtered = Object.keys(searchResults).filter((key) => {
    const result = searchResults[key]
    return result.searchSuccess && result.data.totalCount > 0
  })

  return (
    <>
      {filtered.map((key) => (
        <SearchResult result={searchResults[key]} provider={key} key={key} />
      ))}
      {filtered.length === 0 && searchStatus === 'done' && (
        <div className="white-card">No results found.</div>
      )}
      {searchStatus === 'searching' && <Spin />}
    </>
  )
}
