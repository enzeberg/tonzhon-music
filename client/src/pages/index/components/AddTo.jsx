import React, { Component } from 'react';
import { notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

notification.config({
  placement: 'bottomRight',
  bottom: 50,
  duration: 1,
});

class AddTo extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.props.addToPlaylist(this.props.data);
    notification.open({
      message: '已添加至播放列表',
    });
  }

  render() {
    return (
      <a onClick={this.handleClick} title="添加到播放列表">
        <PlusOutlined
          style={{
            fontSize: 20,
            display: 'block',
          }}
        />
      </a>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToPlaylist: (data) => {
      dispatch({ type: 'ADD_TO_PLAYING_LIST', data: data });
    },
  };
}

export default connect(null, mapDispatchToProps)(AddTo);
