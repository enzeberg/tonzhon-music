import { Input } from 'antd'
import { withRouter } from 'react-router-dom'
import { useSearchKeyword } from '../contexts/SearchKeywordContext'

const { Search } = Input

function SearchBar({ history }) {
  const { searchKeyword: keyword, updateSearchKeyword } = useSearchKeyword()
  const onSearch = (searchKeyword) => {
    searchKeyword = searchKeyword.trim()
    if (searchKeyword !== '' && searchKeyword !== keyword) {
      updateSearchKeyword(searchKeyword)
      history.push(
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

export default withRouter(SearchBar)
