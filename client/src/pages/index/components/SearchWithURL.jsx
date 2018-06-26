import { Component } from 'react';
import { connect } from 'react-redux';
import querystring from 'querystring';
import PropTypes from 'prop-types';

class SearchWithURL extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentWillMount() {
    const { location, searchParameters } = this.props;
    const query = location.search.slice(1);
    // keyword in the store is encoded
    const keywordFromStore = searchParameters.keyword;
    const typeFromStore = searchParameters.type;
    // querystring.parse() will decode URI component
    const { keyword, type } = querystring.parse(query);
    if (keyword && type) {
      if (window.encodeURIComponent(keyword) !== keywordFromStore || type !== typeFromStore) {
        this.props.updateSearchParameters({ keyword, type });
      }
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('SearchWithURL will receive props...............')
  //   const nextQuery = nextProps.location.search.slice(1);
  //   const parsed = querystring.parse(nextQuery);
  //   const nextKeyword = parsed.keyword,
  //         nextType = parsed.type;
  //   // console.log()
  //   const query = this.props.location.search.slice(1);
  //   const { keyword, type } = querystring.parse(query);
  //   // const { keyword, type } = this.props.searchParameters;
  //   console.log('next: ', parsed)
  //   console.log('current: ', { keyword, type })
  //   console.log('from store: ', this.props.searchParameters)
  //   if (nextKeyword && nextType) {
  //     if (nextKeyword !== keyword || nextType !== type) {
  //       console.log('update search parameters')
  //       // this.props.updateSearchParameters({ nextKeyword, nextType });
  //     }
  //   }
  // }

  render() {
    return (
      null
    );
  }
}

SearchWithURL.propTypes = {
  // location: PropTypes.instanceOf(location).isRequired,
};

function mapStateToProps(state) {
  return {
    searchParameters: state.searchParameters,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateSearchParameters: (data) => {
      dispatch({ type: 'UPDATE_SEARCH_PARAMETERS', data });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchWithURL);
