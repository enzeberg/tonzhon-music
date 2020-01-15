import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import SearchBar from '../SearchBar/withDropdown';
import { themeColor } from '../../../../config';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signingOut: false
    };
  }

  render() {
    return (
      <Row type="flex" align="middle" className="container">
        <Col xs={24} sm={7}>
          <div style={styles.header}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <h1 style={{ display: 'inline', color: themeColor }}
              >
                Tongzhong Mini
              </h1>
            </Link>
          </div>
        </Col>
        <Col xs={24} sm={17} >
          <SearchBar />
        </Col>
      </Row>
    );
  }
}

const styles = {
  header: {
    color: themeColor,
    fontWeight: 200,
  },
}

export default Header;
