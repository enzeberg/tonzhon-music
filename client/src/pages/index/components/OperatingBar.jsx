import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { connect } from 'react-redux';

import AddTo from './AddTo';

class OperatingBarOfSongList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row type="flex" align="middle" justify="space-around">
        <Col>
          <Button icon="caret-right" shape="circle"
            onClick={() => this.props.playSongList(this.props.songs)}
          />
        </Col>
        <Col>
          <AddTo data={this.props.songs} />
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    playSongList: (songs) => {
      dispatch({ type: 'NEW_PLAYLIST', data: songs });
      dispatch({ type: 'UPDATE_PLAY_INDEX', data: 0 });
      dispatch({ type: 'UPDATE_PLAY_ACTION', data: 'play' });
    },
  };
}

export default connect(mapStateToProps,
  mapDispatchToProps)(OperatingBarOfSongList);