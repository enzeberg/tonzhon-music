import React, { Component } from 'react';
import { Pagination } from 'antd';
import { connect } from 'react-redux';

import SongList from './SongList';
import Wrapper from './Wrapper';
import OperatingBarOfSongList from './OperatingBarOfSongList';

// 一个Result就是一个有边框的面板
class Result extends Component {
  constructor(props) {
    super(props);
  }

  onPageChange = (page) => {
    const { provider, keyword, onResultResponded } = this.props;
    fetch(`/api/search?provider=${provider}&keyword=${keyword}&page=${page}`)
      .then(res => res.json())
      .then(json => {
        onResultResponded(provider, json);
      })
      .catch(err => {
        console.log('err ', err);
      });
  }

  render() {
    const { result, searchType, provider } = this.props;
    let mainPart;
    if (result.searchSuccess) {
      mainPart = <SongList songs={result.data.songs} />;
    } else {
      mainPart = <h3>{result.message}</h3>;
    }

    return (
      <Wrapper provider={provider}
        pagination={result.searchSuccess &&
          <Pagination
            simple
            onChange={this.onPageChange}
            defaultPageSize={4}
            total={result.data.totalCount} />
        }
        operatingBar={
          result.searchSuccess && searchType === 'song' &&
          <OperatingBarOfSongList songs={result.data.songs} />
        }
      >
        {mainPart}
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    keyword: state.searchKeyword,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onResultResponded: (provider, data) => {
      dispatch({ type: 'UPDATE_SEARCH_RESULTS', provider, data });
    }
  };
}

export default connect(mapStateToProps,
                       mapDispatchToProps)(Result);
