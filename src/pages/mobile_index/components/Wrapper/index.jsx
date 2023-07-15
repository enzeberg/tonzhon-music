import { Row, Col } from 'antd';

function Wrapper() {
  return (
    <div
      style={{
        border: '1px solid',
        borderRadius: 5,
        padding: '8px 8px 0',
        marginBottom: 15
      }}
    >
      <Row type="flex" align="middle">
        <Col span={16}>
          {this.props.pagination}
        </Col>
        <Col span={8}>
          {this.props.operatingBar}
        </Col>
      </Row>
      {this.props.children}
    </div>
  );
}

export default Wrapper;