import { Component } from 'react';
import { connect } from 'react-redux';
import querystring from 'querystring';

class SearchWithURL extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { location, keywordFromStore } = this.props;
    const query = location.search.slice(1);
    // keyword in the store is encoded
    // querystring.parse() will decode URI component
    const { keyword } = querystring.parse(query);
    if (keyword) {
      if (window.encodeURIComponent(keyword) !== keywordFromStore) {
        this.props.updateSearchKeyword(keyword);
      }
    }
  }

  render() {
    return (
      null
    );
  }
}

function mapStateToProps(state) {
  return {
    keywordFromStore: state.searchKeyword,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateSearchKeyword: (data) => {
      dispatch({ type: 'UPDATE_SEARCH_KEYWORD', data });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchWithURL);