import React, { Component } from 'react';
import { List } from '@material-ui/core';
import propTypes from 'prop-types';

import SongItem from '../SongItem';

class SongList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { songs, showPlatform } = this.props;
    return (
      <List>
        {
          songs.map(song => (
            <SongItem key={song.link} song={song} showPlatform={showPlatform} />
          ))
        }
      </List>
    );
  }

}

SongList.propTypes = {
  songs: propTypes.array.isRequired,
  showPlatform: propTypes.bool,
};

export default SongList;
