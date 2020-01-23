import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';

import { themeColor } from '../../../config';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ padding: '10px 9px', borderBottom: '1px solid #DBDBDB', }}>
        <Row type="flex" align="middle" className="container" >
          <Col >
            <div style={styles.header}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <h2 style={{ display: 'inline', color: themeColor }}
                >
                  Tongzhong Mini
                </h2>
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
};

export default Header;
