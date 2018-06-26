import React, { Component } from 'react';
import propTypes from 'prop-types';

import SongItem from './SongItem';

class SongList extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    let { songs } = this.props;
    return (
      <div>
        {
          // <Row style={styles.listHeader}>
          //   <Col sm={8}>歌曲</Col>
          //   <Col sm={6}>艺人</Col>
          //   <Col sm={7}>专辑</Col>
          //   <Col sm={2}>{this.props.showPlatform && '平台'}</Col>
          //   <Col sm={1}></Col>
          // </Row>
        }

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

SongList.propTypes = {
  songs: propTypes.array.isRequired,
};

const styles = {
  // listHeader: {
  //   color: 'white',
  //   padding: '5px 15px',
  //   marginTop: 20,
  //   // marginBottom: 10,
  //   backgroundColor: themeColor,
  //   borderRadius: 2
  // },
  ul: {
    listStyle: 'none',
    padding: '0 15px',
    // marginTop: 10
  }
};

export default SongList;
