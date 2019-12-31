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

  renderSongs(songs) {
    return (
      <SongList songs={songs} shouldSendOperatingData />
    );
  }

  onPageChange(page) {
    const { provider, keyword, type, onResultResponded } = this.props;
    fetch(`/api/search?provider=${provider}&keyword=${keyword}&type=${type}&page=${page}`)
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
      mainPart = this.renderSongs(result.data.songs);
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
    keyword: state.searchParameters.keyword,
    type: state.searchParameters.type
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
