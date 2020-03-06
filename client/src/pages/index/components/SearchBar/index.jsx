import React, { Component } from 'react';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { AutoComplete, Input, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const Search = Input.Search;
const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(keyword) {
    keyword = keyword.trim();
    if (keyword !== '' &&
        keyword !== this.props.searchParameters.keyword) {
      this.props.updateSearchKeyword(keyword);
      this.props.history.push(`/search?keyword=${window.encodeURIComponent(keyword)}&type=${this.props.searchParameters.type}`);
    }
  }


  render() {
    const { keyword } = this.props.searchParameters;
    const { searchHistory } = this.props;

    const options = [
      <OptGroup key="history"
        label={
          <span>搜索历史
            <Button icon={<LegacyIcon type="delete" />}
              onClick={() => this.props.clearSearchHistory()}
              style={{ float: 'right' }}
            />
          </span>
        }
      >
        {
          searchHistory.map(item => (
            <Option key={item} value={`${item} `}>
              {item}
            </Option>
          ))
        }
      </OptGroup>
    ];

    return (
      <AutoComplete
        dropdownMatchSelectWidth={false}
        // dropdownStyle={{ width: 300 }}
        size="large"
        style={{ width: '100%' }}
        dataSource={options}
        // optionLabelProp="value"
        onSelect={this.onSearch}
        defaultActiveFirstOption={false}
      >
        <Search
          placeholder="歌曲/专辑/艺人"
          defaultValue={ keyword || '' }
          onSearch={this.onSearch}
          enterButton
          size="large"
        />
      </AutoComplete>
    );
  }

}

SearchBar.propTypes = {
  searchParameters: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    searchParameters: state.searchParameters,
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

