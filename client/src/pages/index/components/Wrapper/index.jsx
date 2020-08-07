import React, { Component } from 'react';
import { Row, Col } from 'antd';

import neteaseMusicLogo from './images/netease_32.ico';
import qqMusicLogo from './images/qq_32.ico';
import xiamiMusicLogo from './images/xiami_32.ico';
import kuwoMusicLogo from './images/kuwo_32.ico';

class Wrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { provider } = this.props;
    const { logo, link } = providers[provider];
    return (
      <div style={styles.wrapper} className="white-card">
        <Row type="flex" align="middle" style={{ marginBottom: '10px' }}>
          <Col span={10}>
            <a href={link} target="_blank" alt={provider}>
              <img src={logo} alt="" />
            </a>
          </Col>
          <Col span={8}>
            {this.props.pagination}
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            {this.props.operatingBar}
          </Col>
        </Row>
        {this.props.children}
      </div>
    );
  }
}

const styles = {
  wrapper: {
    marginTop: 10,
  },
};

const providers = {
  netease: {
    // themeColor: '#C20C0C',
    logo: neteaseMusicLogo,
    link: 'https://music.163.com/'
  },
  qq: {
    // themeColor: '#2caf6f',
    logo: qqMusicLogo,
    link: 'https://y.qq.com/'
  },
  xiami: {
    // themeColor: '#FA8723',
    logo: xiamiMusicLogo,
    link: 'https://www.xiami.com/'
  },
  kuwo: {
    // themeColor: '#ffe443',
    logo: kuwoMusicLogo,
    link: 'http://www.kuwo.cn',
  },
};

export default Wrapper;
