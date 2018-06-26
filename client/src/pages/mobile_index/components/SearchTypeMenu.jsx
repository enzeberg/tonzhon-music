import React, { Component } from 'react';
import { Menu } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class SearchTypeMenu extends Component {
  constructor() {
    super();
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect({ key }) {
    // only search when the current search type is different from the last one
    if (key !== this.props.searchParameters.type) {
      this.props.updateSearchType(key);
      this.props.history.push(`/search?keyword=${this.props.searchParameters.keyword}&type=${key}`);
    }

  }
  render() {
    const { type } = this.props.searchParameters;
    return (
      <Menu mode="horizontal" defaultSelectedKeys={[type]} onSelect={this.onSelect} style={{ marginBottom: 20 }}>
        <Menu.Item key="song">歌曲</Menu.Item>
        <Menu.Item key="album">专辑</Menu.Item>
        <Menu.Item key="artist">艺人</Menu.Item>
      </Menu>
    );

  }
}

SearchTypeMenu.propTypes = {
  searchParameters: PropTypes.object.isRequired,
  updateSearchType: PropTypes.func.isRequired,
  // history: PropsTypes.instanceOf(BrowserHistory),
};

function mapStateToProps(state) {
  return {
    searchParameters: state.searchParameters
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateSearchType: (searchType) => {
      dispatch({ type: 'UPDATE_SEARCH_TYPE', data: searchType });
    },
  };
}

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps)(SearchTypeMenu));
