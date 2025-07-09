import { Component } from 'react';
import { Link } from 'react-router-dom';
import { themeColor } from '../../../config';

class Header extends Component {
  render() {
    return (
      <div style={{ padding: '10px 9px', borderBottom: '1px solid #DBDBDB', }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h2
            style={{
              display: 'inline',
              color: themeColor,
              fontWeight: 360,
            }}
          >
            Tonzhon
          </h2>
        </Link>
      </div>
    );
  }
}

export default Header;