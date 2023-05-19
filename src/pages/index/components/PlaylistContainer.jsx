import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import SongList from './SongList';
import OperatingBarOfSongList from './OperatingBarOfSongList';

class PlaylistContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      playlistName: '',
      songs: [],
    };
  }

  componentDidMount() {
    this.fetchPlaylist(this.props.playlistId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.playlistId !== this.props.playlistId) {
      this.fetchPlaylist(this.props.playlistId);
    }
  }

  fetchPlaylist(playlistId) {
    this.setState({
      loading: true,
      playlistName: '',
      songs: [],
    });
    fetch(`/api/netease-playlist/${playlistId}`, {
      credentials: 'include',
    }).then(res => res.json())
      .then(json => {
        this.setState({
          loading: false,
        });
        if (json.status === 'ok') {
          this.setState({
            playlistName: json.data.name,
            songs: json.data.songs,
          });
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    const { playlistName, songs } = this.state;
    return (
      <>
        <Row type="flex" align="middle" justify="space-between"
          style={{ marginBottom: '10px' }}
        >
          <Col span={16} style={{ fontSize: 20 }}>
            {playlistName}
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            {
              songs.length > 0 &&
              <OperatingBarOfSongList songs={songs} />
            }
          </Col>
        </Row>
        {
          this.state.loading
          ? <LoadingOutlined />
          : (
            songs.length > 0
            ? <SongList songs={songs} />
            : '获取失败，可能是因为该 Playlist ID 不存在。'
          )
        }
      </>
    );
  }
}

export default PlaylistContainer;