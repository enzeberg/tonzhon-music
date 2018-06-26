import React, { Component } from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const Search = Input.Search;

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(keyword) {
    if (keyword !== '' &&
        keyword !== this.props.searchParameters.keyword) {
      this.props.updateSearchKeyword(keyword);
      this.props.history.push(`/search?keyword=${window.encodeURIComponent(keyword)}&type=${this.props.searchParameters.type}`);
    }
  }

  render() {
    const { keyword } = this.props.searchParameters;

    return (
      <Search
        placeholder="歌曲/专辑/艺人"
        defaultValue={ keyword || '' }
        onSearch={this.onSearch}
        enterButton
        size="large"
      />

    );
  }

}

SearchBar.propTypes = {
  searchParameters: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    searchParameters: state.searchParameters
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateSearchKeyword: (keyword) => {
      dispatch({ type: 'UPDATE_SEARCH_KEYWORD', data: keyword });
    }
  };
}

export default withRouter(connect(mapStateToProps,
                                  mapDispatchToProps)(SearchBar));
