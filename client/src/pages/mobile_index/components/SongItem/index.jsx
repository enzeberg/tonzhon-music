import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import { connect } from 'react-redux';

import neteaseMusicLogo from './images/netease_16.ico';
import qqMusicLogo from './images/qq_16.ico';
import xiamiMusicLogo from './images/xiami_16.ico';

class SongItem extends Component {
  constructor(props) {
    super(props);
    this.playOrPause = this.playOrPause.bind(this);
  }

  playOrPause(shouldPlay) {
    if (shouldPlay) {
      const index = this.props.playlist.findIndex(song => song.link === this.props.song.link);
      if (index === -1) {
        this.props.addToPlaylist(this.props.song);
        this.props.updatePlayIndex(this.props.playlist.length);
      } else {
        this.props.updatePlayIndex(index);
      }
      this.props.updatePlayAction('play');
    } else {
      this.props.updatePlayAction('pause');
    }
  }

  render() {
    let { song, currentSong, showPlatform } = this.props;
    // let anchorClass = song.hasCopyright ? '' : 'no-copyright';
    const shouldPlay =
      (!currentSong  || currentSong.link !== song.link) ||
      (currentSong.link === song.link && this.props.playAction === 'pause');
    return (
      <ListItem
        onClick={() => this.playOrPause(shouldPlay)}
        rightIcon={showPlatform &&
          <img src={logos[song.platform]} alt=""
               style={{ width: 16, height: 16 }}
          />
        }
        key={song.link}
        primaryText={song.name}
        secondaryText={song.artists.map(artist => artist.name)
          .reduce((accumulator, currentValue) =>
            accumulator + ' / ' + currentValue
        )}
        style={{
          color: song.hasCopyright ? 'black' : '#aaa',
        }}
      />
      // <ListItem
      //   onClick={() => this.playOrPause(shouldPlay)}
      //   rightIcon={showPlatform &&
      //     <img src={logos[song.platform]} alt=""/>}
      //   key={song.link}
      //   style={{
      //     color: song.hasCopyright ? 'black' : '#aaa',
      //   }}
      // >
      //   <ListItemText
      //     primary={song.name}
      //     secondary={song.artists.map(artist => artist.name)
      //       .reduce((accumulator, currentValue) =>
      //       accumulator + ' / ' + currentValue
      //     )}
      //   />
      // </ListItem>
    );
  }
}

const logos = {
  qq: qqMusicLogo,
  netease: neteaseMusicLogo,
  xiami: xiamiMusicLogo
};

function mapStateToProps(state) {
  return {
    user: state.user,
    currentSong: state.playlist[state.playIndex],
    playlist: state.playlist,
    playAction: state.playAction,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateUserFavoriteSongs: (song) => {
      return dispatch({ type: 'UPDATE_FAVORITE_SONGS', data: song });
    },
    addToPlaylist: (song) => {
      dispatch({ type: 'ADD_TO_PLAYLIST', data: song });
    },
    updatePlayIndex: (index) => {
      dispatch({ type: 'UPDATE_PLAY_INDEX', data: index });
    },
    updatePlayAction: (playAction) => {
      dispatch({ type: 'UPDATE_PLAY_ACTION', data: playAction });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SongItem);
