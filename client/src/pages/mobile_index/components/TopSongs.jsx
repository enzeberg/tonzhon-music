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
    // changing search keyword will cause 'CLEAR_RESULTS', which means the topSongs should be cleared too.
    if (currentResults !== prevProps.searchResults) {
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
      <div style={{ padding: '0 8px', marginBottom: 15, backgroundColor: 'rgba(240,240,240,0.5)', borderRadius: 5 }}>
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
