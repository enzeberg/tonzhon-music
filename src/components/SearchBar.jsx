import { Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSearchKeyword } from '../contexts/SearchKeywordContext'

const { Search } = Input

function SearchBar() {
  const navigate = useNavigate()
  const { searchKeyword: keyword, updateSearchKeyword } = useSearchKeyword()
  const onSearch = (searchKeyword) => {
    searchKeyword = searchKeyword.trim()
    if (searchKeyword !== '' && searchKeyword !== keyword) {
      updateSearchKeyword(searchKeyword)
      navigate(
        `/search?keyword=${window.encodeURIComponent(searchKeyword)}`
      )
    }
  }

  return (
    <Search
      defaultValue={keyword || ''}
      // value={keyword || ''}
      onSearch={onSearch}
      enterButton
    />
  )
}

export default SearchBar
