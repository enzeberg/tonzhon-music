import { Row, Col } from 'antd';

function Wrapper() {
  return (
    <div className="white-card"
      style={{
        marginTop: '10px',
      }}
    >
      <Row type="flex" align="middle" style={{ marginBottom: '10px' }}>
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

export default Wrapper;