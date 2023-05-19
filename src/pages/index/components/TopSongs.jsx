import React, { Component } from 'react';
import { connect } from 'react-redux';

import SongList from './SongList';

class TopSongs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topSongs: []
    };
  }

  componentDidUpdate(prevProps) {
    const currentResults = this.props.searchResults;
    if (currentResults !== prevProps.searchResults) {
      // changing search keyword will cause 'CLEAR_RESULTS', which means the 
      // topSongs should be cleared too.
      if (Object.keys(currentResults).length === 0) {
        this.setState({
          topSongs: []
        });
      }
      Object.keys(currentResults).forEach((key) => {
        if (this.state.topSongs.every((song) => song.platform !== key)) {
          if (currentResults[key].searchSuccess) {
            this.setState({
              topSongs: [...this.state.topSongs,
              currentResults[key].data.songs[0]
              ]
            });
          }
        }
      });
    }
  }

  render() {
    return this.state.topSongs.length === 0 ? null : (
      <div className="white-card">
        <SongList songs={this.state.topSongs} showPlatform />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchResults: state.searchResults
  };
}

export default connect(mapStateToProps)(TopSongs);