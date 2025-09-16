import { Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSearchKeyword } from '../contexts/SearchKeywordContext'

const { Search } = Input

function SearchBar() {
  const navigate = useNavigate()
  const { searchKeyword, updateSearchKeyword } = useSearchKeyword()
  const onSearch = (inputKeyword) => {
    inputKeyword = inputKeyword.trim()
    if (inputKeyword !== '' && inputKeyword !== searchKeyword) {
      updateSearchKeyword(inputKeyword)
      navigate(
        `/search/${window.encodeURIComponent(inputKeyword)}`
      )
    }
  }

  return (
    <Search
      defaultValue={searchKeyword || ''}
      // value={searchKeyword || ''}
      onSearch={onSearch}
      enterButton
    />
  )
}

export default SearchBar
