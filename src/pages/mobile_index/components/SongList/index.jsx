import React, { Component } from 'react';
import { List } from '@material-ui/core';
import SongItem from '../SongItem';

class SongList extends Component {
  render() {
    let { songs } = this.props;
    return (
      <List>
        {
          songs.map(song => (
            <SongItem key={song.link} song={song} />
          ))
        }
      </List>
    );
  }
}

export default SongList;