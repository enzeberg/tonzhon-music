import { Component } from 'react';
import { connect } from 'react-redux';
import querystring from 'querystring';
import PropTypes from 'prop-types';

class SearchWithURL extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
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
