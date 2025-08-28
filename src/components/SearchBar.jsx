import React from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { AutoComplete, Input, Button } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const { Search } = Input

function SearchBar({
  keyword,
  searchHistory,
  updateSearchKeyword,
  clearSearchHistory,
  history,
}) {
  const onSearch = (searchKeyword) => {
    searchKeyword = searchKeyword.trim()
    if (searchKeyword !== '' && searchKeyword !== keyword) {
      updateSearchKeyword(searchKeyword)
      history.push(
        `/search?keyword=${window.encodeURIComponent(searchKeyword)}`
      )
    }
  }

  const searchHistoryOptions = [
    {
      // label: '搜索历史',
      label: (
        <div
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            display: 'flex',
          }}
        >
          <span>搜索历史</span>
          <Button
            icon={<DeleteOutlined />}
            type="circle"
            onClick={() => clearSearchHistory()}
          />
        </div>
      ),
      options: searchHistory.map((item) => ({
        value: item,
      })),
    },
  ]

  return (
    <AutoComplete
      style={{ width: '100%' }}
      options={searchHistoryOptions}
      onSelect={onSearch}
      defaultActiveFirstOption={false}
    >
      <Search
        placeholder="歌曲 | 专辑 | 艺人"
        defaultValue={keyword || ''}
        // value={keyword || ''}
        onSearch={onSearch}
        enterButton
      />
    </AutoComplete>
  )
}

function mapStateToProps(state) {
  return {
    keyword: state.searchKeyword,
    searchHistory: state.searchHistory,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    updateSearchKeyword: (keyword) => {
      dispatch({ type: 'UPDATE_SEARCH_KEYWORD', data: keyword })
    },
    clearSearchHistory: () => {
      dispatch({ type: 'CLEAR_SEARCH_HISTORY' })
    },
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchBar)
)
