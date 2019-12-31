import React, { Component } from 'react';
import { Icon } from 'antd';

import SongList from './SongList';
import OperatingBarOfSongList from './OperatingBarOfSongList';

class HotList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      songs: [],
    };
  }

  componentDidMount() {
    this.fetchHotList(this.props.platform);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.platform !== this.props.platform) {
      this.fetchHotList(this.props.platform);
    }
  }

  fetchHotList(platform) {
    this.setState({
      loading: true,
    });
    fetch(`/api/hot_list/${platform}`, {
      credentials: 'include',
    }).then(res => res.json())
      .then(json => {
        if (json.status === 'ok') {
          this.setState({
            loading: false,
            songs: json.data.songs,
          });
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    const { songs } = this.state;
    return (
      <div>
        <div style={{ paddingLeft: 620 }}>
          {
            songs.length !== 0 && <OperatingBarOfSongList songs={songs} />
          }
        </div>
        {
          this.state.loading ?
          <Icon type="loading" /> :
          <SongList songs={songs} />
        }
      </div>
    );
  }
}

export default HotList;
