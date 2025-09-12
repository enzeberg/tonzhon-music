import { Input } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const { Search } = Input

function SearchBar({ keyword, updateSearchKeyword, history }) {
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

function mapStateToProps(state) {
  return {
    keyword: state.searchKeyword,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    updateSearchKeyword: (keyword) => {
      dispatch({ type: 'UPDATE_SEARCH_KEYWORD', data: keyword })
    },
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchBar)
)
