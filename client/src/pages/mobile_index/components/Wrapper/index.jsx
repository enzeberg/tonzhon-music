import React, { Component } from 'react';
import { Row, Col } from 'antd';

import neteaseMusicLogo from './images/netease_16.ico';
import qqMusicLogo from './images/qq_16.ico';
import xiamiMusicLogo from './images/xiami_16.ico';
import kuwoMusicLogo from '../../images/kuwo_16.ico';

class Wrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { provider } = this.props;
    const { themeColor, logo } = providers[provider];
    return (
      <div style={{ ...styles.wrapper, borderColor: themeColor }}>
        <Row type="flex" align="middle">
          <Col span={2}>
            <img src={logo} alt={provider} />
          </Col>
          <Col span={16}>
            {this.props.pagination}
          </Col>
          <Col span={6}>
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
    border: '1px solid',
    borderRadius: 5,
    padding: '8px 8px 0',
    marginBottom: 15,
  },
};

const providers = {
  netease: {
    themeColor: '#C20C0C',
    logo: neteaseMusicLogo,
  },
  qq: {
    themeColor: '#2caf6f',
    logo: qqMusicLogo,
  },
  xiami: {
    themeColor: '#FA8723',
    logo: xiamiMusicLogo,
  },
  kuwo: {
    themeColor: '#ffe443',
    logo: kuwoMusicLogo,
  }

};

export default Wrapper;
