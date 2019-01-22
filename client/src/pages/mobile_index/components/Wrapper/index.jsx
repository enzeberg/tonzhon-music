import React, { Component } from 'react';
import { Row, Col, Pagination } from 'antd';
import neteaseMusicLogo from './images/netease_32.ico';
import qqMusicLogo from './images/qq_32.ico';
import xiamiMusicLogo from './images/xiami_32.ico';

class Wrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { provider } = this.props;
    const { themeColor, logo, link } = providers[provider];
    return (
      <div style={{...styles.wrapper, borderColor: themeColor}}>
        <Row>
          <Col xs={4} sm={4} md={4}>
            <a href={link} target="_blank" alt={provider}>
              <img src={logo} alt="" />
            </a>
          </Col>
          <Col xs={20} sm={20} md={14}>
            { this.props.zhida }
          </Col>
          <Col md={6}>
            { this.props.pagination}
          </Col>
        </Row>
        <div style={{ marginTop: 20 }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    border: '1px solid',
    borderRadius: 5,
    padding: '15px 10px',
    marginBottom: 20
  },
  resultContainer: {
    // padding: window.tongzhong.isMobile ? '0 0' : '0 15px',
    marginTop: 10
  }

};

const providers = {
  netease: {
    themeColor: '#C20C0C',
    logo: neteaseMusicLogo,
    link: 'https://music.163.com/'
  },
  qq: {
    themeColor: '#2caf6f',
    logo: qqMusicLogo,
    link: 'https://y.qq.com/'
  },
  xiami: {
    themeColor: '#FA8723',
    logo: xiamiMusicLogo,
    link: 'https://www.xiami.com/'
  }

};

export default Wrapper;
