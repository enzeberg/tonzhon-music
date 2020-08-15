import React, { useState } from 'react';
import { Layout, Input } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';

import PlaylistContainer from './PlaylistContainer';

const { Sider, Content } = Layout;
const { Search } = Input;

function NeteasePlaylistPage(props) {
  const playlistIdFromUrl = props.match.params.playlistId;
  const [playlistId, setPlaylistId] = useState(playlistIdFromUrl || '');
  const onSearch = (value) => {
    setPlaylistId(value);
    props.history.replace(`/netease-playlist/${value}`);
  };

  return (
    <Router basename="/netease-playlist">
      <Layout style={{ background: 'white', padding: 10 }}>
        <Sider style={{ background: 'none', marginRight: 20 }}>
          <h2>网易歌单</h2>
          <Search
            enterButton={
              <RightOutlined />
            }
            onSearch={onSearch}
            placeholder="此处粘贴 Playlist ID"
          />
        </Sider>
        <Content style={{ background: 'none', }}>
          <PlaylistContainer playlistId={playlistId} />
        </Content>
      </Layout>
    </Router>
  );
}

export default withRouter(NeteasePlaylistPage);