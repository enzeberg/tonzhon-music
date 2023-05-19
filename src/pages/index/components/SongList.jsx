import React, { Component } from 'react';
import { List } from 'antd';

import SongItem from './SongItem';

class SongList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <List
        itemLayout="horizontal"
        dataSource={this.props.songs}
        renderItem={song => {
          return (
            <SongItem key={song.link}
              song={song}
              showPlatform={this.props.showPlatform}
            />
          );
        }}
        className="song-list"
      />
    );
  }
}

export default SongList;