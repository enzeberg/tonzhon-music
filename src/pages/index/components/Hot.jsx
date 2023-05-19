import React, { Component } from 'react';
import { Layout, Menu } from 'antd';

import HotList from './HotList';

const { Sider, Content } = Layout;

class Hot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platform: 'qq',
    };
  }

  changePlatform = ({item, key}) => {
    this.setState({
      platform: key,
    });
  }

  render() {
    return (
        <Layout className="white-card">
          <Sider style={{ background: 'none', marginRight: 20 }}
          >
            <h2>热歌榜</h2>
            <Menu
              defaultSelectedKeys={ ['qq'] }
              mode="inline"
              defaultOpenKeys={['qq']}
              onClick={this.changePlatform}
            >
              <Menu.Item key="qq">
                QQ音乐
              </Menu.Item>
              <Menu.Item key="netease">
                网易云音乐
              </Menu.Item>
              <Menu.Item key="kuwo">
                酷我音乐
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ background: 'none', }}>
            <HotList platform={this.state.platform} />
          </Content>
        </Layout>
    );
  }
}

export default Hot;