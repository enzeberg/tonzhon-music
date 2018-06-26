import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import Icon from 'react-icons-kit';
import { ic_ondemand_video } from 'react-icons-kit/md/ic_ondemand_video';
import { ic_play_circle_outline } from 'react-icons-kit/md/ic_play_circle_outline';

import SongList from './SongList';

class TopSongs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topSongs: []
    };
  }

  componentWillReceiveProps(nextProps) {
    const nextResults = nextProps.searchResults;
    // changing search keyword will cause 'CLEAR_RESULTS', which means the topSongs should be cleared too.
    if (Object.keys(nextResults).length === 0) {
      this.setState({
        topSongs: []
      });
    }
    Object.keys(nextResults).forEach((key) => {
      if (this.state.topSongs.every((song) => song.platform !== key)) {
        if (nextResults[key].searchSuccess) {
          this.setState({
            topSongs: [...this.state.topSongs,
              nextResults[key].data.songs[0]
              ]
          });
        }

      }
    });
  }

  render() {
    return this.state.topSongs.length === 0 ? null : (
      <div style={{ padding: '8px 15px', marginBottom: 25, backgroundColor: 'rgba(240,240,240,0.5)', borderRadius: 5 }}>
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
