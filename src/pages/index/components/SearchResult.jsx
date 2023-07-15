import { Pagination } from 'antd';
import { connect } from 'react-redux';
import SongList from './SongList';
import Wrapper from './Wrapper';
import OperatingBarOfSongList from './OperatingBarOfSongList';

function SearchResult({ result, provider }) {
  function onPageChange() {
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

  return (
    <Wrapper provider={provider}
      operatingBar={
        <OperatingBarOfSongList songs={result.data.songs} />
      }
      pagination={
        <Pagination
          simple
          onChange={onPageChange}
          defaultPageSize={4}
          total={result.data.totalCount}
        />
      }
    >
      <SongList songs={result.data.songs} />
    </Wrapper>
  );
}

function mapStateToProps(state) {
  return {
    keyword: state.searchKeyword,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onResultResponded: (provider, data) => {
      dispatch({ type: 'UPDATE_SEARCH_RESULTS', provider, data});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);