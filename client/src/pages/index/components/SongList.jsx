import React, { Component } from 'react';

import SongItem from './SongItem';

class SongList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { songs } = this.props;
    return (
      <div>
        <ul style={styles.ul}>
          {
            songs.map((song, index) => (
              <SongItem song={song} key={song.link} index={index} showPlatform={this.props.showPlatform}
              isLiked={this.props.allIsLiked} />
            ))
          }
        </ul>
      </div>
    );
  }
}

const styles = {
  ul: {
    listStyle: 'none',
    padding: '0 15px',
  }
};

export default SongList;
