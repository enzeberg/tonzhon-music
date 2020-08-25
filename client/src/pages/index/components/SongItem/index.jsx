import React, { Component } from 'react';
import { Row, Col, List } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import neteaseMusicLogo from './images/netease_16.ico';
import qqMusicLogo from './images/qq_16.ico';
import xiamiMusicLogo from './images/xiami_16.ico';
import kuwoMusicLogo from './images/kuwo_16.ico';
import ArtistLinks from '../ArtistLinks';
import MVIcon from '../MVIcon';
import AddToPlayingList from './AddToPlayingList';
import './index.css';
import {
    buildSongLink,
    buildAlbumLink,
} from '../../../../utils/link';

class SongItem extends Component {
  constructor(props) {
    super(props);
  }

  changeCurrentSong = () => {
    const index = this.props.playingList.findIndex(song =>
      song.newId === this.props.song.newId);
    if (index === -1) {
      this.props.addToPlayingList(this.props.song);
      this.props.updatePlayIndex(this.props.playingList.length);
    } else {
      this.props.updatePlayIndex(index);
    }
  }

  render() {
    let { song, currentSong } = this.props;
    // let anchorClass = song.hasCopyright ? '' : 'no-copyright';
    return (
      <List.Item style={{ padding: '5px 10px' }}>
        <Row type="flex" align="middle" style={{ width: '100%', fontSize: 14 }}>
          <Col span={8} className="nowrap">
            <a href={buildSongLink(song.platform, song.originalId)}
              title={
                `${song.name}${song.alias ? ` - ${song.alias}` : ''}`
                // + `\n${song.hasCopyright ? '' : '（此歌曲在该平台可能存在版权问题。）'}`
              }
              target="_blank"
              // className={anchorClass}
            >
              <span>{song.name}</span>
              <span className="song-alias">
                {song.alias && ` - ${song.alias}`}
              </span>
            </a>
          </Col>
          <Col span={1}>
            {song.mv && <MVIcon platform={song.platform} id={song.mv} />}
          </Col>
          <Col span={6} className="nowrap">
            <ArtistLinks platform={song.platform} artists={song.artists} />
          </Col>
          <Col span={6} className="nowrap">
            <a
              href={buildAlbumLink(song.platform, song.album.id)}
              target="_blank" title={song.album.name}
            >
              {song.album.name}
            </a>
          </Col>
          <Col span={1}>
            {
              this.props.showPlatform &&
                <img
                  src={logos[song.platform]}
                  alt={song.platform}
                  style={{ display: 'block' }}
                />
            }
          </Col>
          <Col span={1}>
            <a onClick={this.changeCurrentSong}
              className={
                currentSong && currentSong.originalId === song.originalId
                  && currentSong.platform === song.platform
                  ? 'play-btn playing' : 'play-btn'
              }
            >
              <PlayCircleOutlined
                style={{
                  fontSize: 20,
                  display: 'block',
                }}
              />
            </a>
          </Col>
          <Col span={1}>
            <AddToPlayingList data={song} />
          </Col>
        </Row>
      </List.Item>
    );
  }
}

const logos = {
  qq: qqMusicLogo,
  netease: neteaseMusicLogo,
  xiami: xiamiMusicLogo,
  kuwo: kuwoMusicLogo,
};

function mapStateToProps(state) {
  return {
    currentSong: state.playingList[state.playIndex],
    playingList: state.playingList,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addToPlayingList: (song) => {
      dispatch({ type: 'ADD_SONG_TO_PLAYING_LIST', data: song });
    },
    updatePlayIndex: (index) => {
      dispatch({ type: 'UPDATE_PLAY_INDEX', data: index });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SongItem);