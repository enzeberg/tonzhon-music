import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { themeColor } from '../../../config';

function Header() {
  return (
    <Row type="flex" align="middle" className="container">
      <Col span={6}>
        <Link to="/">
          <h1
            style={{
              display: 'inline',
              color: themeColor,
              fontWeight: 360,
            }}
          >
            Tonzhon
          </h1>
        </Link>
      </Col>
      <Col span={12}>
        <SearchBar />
      </Col>
    </Row>
  );
}

export default Header;