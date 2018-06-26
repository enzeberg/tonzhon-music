import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
// import List from '@material-ui/core/List';
import propTypes from 'prop-types';

import SongItem from '../SongItem';
// import neteaseMusicLogo from './images/netease_22.png';
// import qqMusicLogo from './images/qq_22.png';
// import xiamiMusicLogo from './images/xiami_22.png';
// import { themeColor } from '../config';

class SongList extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    let { songs, showPlatform } = this.props;
    return (
      // <div>
      //   <ul style={styles.ul}>
      //     {
      //       songs.map((song, index) => (
      //         <SongItem song={song} key={song.link} index={index} showPlatform={this.props.showPlatform}
      //         isLiked={this.props.allIsLiked} />
      //       ))
      //     }
      //   </ul>
      // </div>
      <List>
        {
          songs.map(song => (
            // <ListItem
            //   // leftAvatar={<Avatar icon={<FileFolder />} />}
            //   rightIcon={showPlatform &&
            //     <img src={logos[song.platform]} alt=""/>}
            //   key={song.link}
            //   primaryText={song.name}
            //   secondaryText={song.artists.map(artist => artist.name)
            //     .reduce((accumulator, currentValue) =>
            //     accumulator + ' / ' + currentValue
            //   )}
            // />
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

// const logos = {
//   qq: qqMusicLogo,
//   netease: neteaseMusicLogo,
//   xiami: xiamiMusicLogo
// };

export default SongList;
