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
          <Button icon="caret-right"
            onClick={() => this.props.playSongList(this.props.songs)}
          >
            播放全部
          </Button>
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
      dispatch({ type: 'NEW_PLAYING_LIST', data: songs });
      dispatch({ type: 'UPDATE_PLAY_INDEX', data: 0 });
    },
  };
}

export default connect(mapStateToProps,
  mapDispatchToProps)(OperatingBarOfSongList);