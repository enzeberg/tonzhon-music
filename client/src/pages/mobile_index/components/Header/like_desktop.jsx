import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';

import { themeColor, serverUrl } from '../../../../config';
import logo from './images/logo.png';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signingOut: false
    };
    this.handleUserMenuClick = this.handleUserMenuClick.bind(this);
    this.handleHistoryMenuClick = this.handleHistoryMenuClick.bind(this);
  }

  handleHistoryMenuClick({ item, key, selectedKeys }) {
    if (key=== 'clear_search_history') {
      this.props.clearSearchHistory();
    }
  }
  handleUserMenuClick({ item, key, selectedKeys }) {
    if (key === 'signOut') {
      this.setState({
        signingOut: true
      });
      this.props.signOut(() => {
        this.setState({
          signingOut: false
        });
      });
    }
  }

  render() {
    return (
      <div style={{ padding: '10px 9px', borderBottom: '1px solid #DBDBDB', }}>
        <Row type="flex" align="middle" className="container" >
          <Col span={4}>
            <div style={styles.header}>
              <Link to="/">
                <img src={logo} alt="铜钟" />
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const styles = {
  header: {
    color: themeColor,
    fontWeight: 200,
  },
  title: {
    color: themeColor,
    fontSize: 30
  }
}

export default Header;
