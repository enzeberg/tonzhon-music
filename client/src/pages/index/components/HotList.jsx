import React, { Component } from 'react';
import { Row, Col, Button, Icon } from 'antd';

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

  componentWillReceiveProps(nextProps) {
    this.fetchHotList(nextProps.platform);
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
        {/* <Row type="flex" align="middle" justify="space-between" style={{ marginBottom: 7 }}>
          <Col>
            <span style={{ fontSize: 22 }}>{name}</span>
          </Col>
          <Col>
            {
              songs.length !== 0 && <OperatingBarOfSongList songs={songs} />
            }
          </Col>
        </Row> */}
        <div style={{ paddingLeft: 620 }}>
          {
            songs.length !== 0 && <OperatingBarOfSongList songs={songs} />
          }
        </div>
        {
          this.state.loading ?
          <Icon type="loading" /> :
          //   <div style={{ padding: '8px 15px', marginBottom: 25, backgroundColor: 'rgba(240,240,240,0.5)', borderRadius: 5 }}>
              <SongList songs={songs}
              />
          //   </div>
        }
      </div>
    );
  }
}

export default HotList;
