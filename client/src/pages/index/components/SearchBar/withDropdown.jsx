import React, { Component } from 'react';
import { Dropdown, Menu, Input, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Search = Input.Search;

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  onSearch = (keyword) => {
    if (keyword !== '' &&
      keyword !== this.props.keyword) {
      this.props.updateSearchKeyword(keyword);
      this.props.history.push(`/search?keyword=${window.encodeURIComponent(keyword)}`);
    }
  }

  onSelect = ({ key }) => {
    let inputNode = document.querySelector('input#searchInput');
    // inputNode.setAttribute('value', key);
    inputNode.value = key;
    this.onSearch(key);
  }

  render() {
    const { keyword, searchHistory } = this.props;

    const menu = (
      <Menu selectable onSelect={this.onSelect}>
        <Menu.ItemGroup key="history" title={
          <div style={{ alignItems: 'center', justifyContent: 'space-between',
              display: 'flex'
            }}
          >
            <span>搜索历史</span>
            <Button icon={<DeleteOutlined />}
              type="circle"
              onClick={() => this.props.clearSearchHistory()}
            />
          </div>}
        >
          {
            searchHistory.map(item => (
              <Menu.Item key={item}>
                {item}
              </Menu.Item>
            ))
          }
        </Menu.ItemGroup>
      </Menu>
    );

    return (
      <Dropdown
        overlay={menu}
      >
        <Search
          placeholder="歌曲 | 专辑 | 艺人"
          defaultValue={keyword || ''}
          onSearch={this.onSearch}
          enterButton
          id="searchInput"
        />
      </Dropdown>
    );
  }

}

function mapStateToProps(state) {
  return {
    keyword: state.searchKeyword,
    searchHistory: state.searchHistory,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateSearchKeyword: (keyword) => {
      dispatch({ type: 'UPDATE_SEARCH_KEYWORD', data: keyword });
    },
    clearSearchHistory: () => {
      dispatch({ type: 'CLEAR_SEARCH_HISTORY' });
    },
  };
}

export default withRouter(connect(mapStateToProps,
                                  mapDispatchToProps)(SearchBar));
