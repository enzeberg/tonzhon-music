import React, { Component } from 'react';
import { Dropdown, Menu, Icon, notification, Button } from 'antd';
import { connect } from 'react-redux';

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
    // const menu = (
    //   <Menu onClick={this.handleClick}>
    //     <Menu.Item key="playlist">
    //       播放列表
    //     </Menu.Item>
    //     <Menu.Divider />
    //     {/* <Menu.Item key="newSongList">
    //       新歌单
    //     </Menu.Item> */}
    //   </Menu>
    // );
    return (
      // <Dropdown overlay={menu}>
      //   <a title="添加到">
      //     <Icon type="plus" style={{ fontSize: this.props.iconSize }} />
      //   </a>
      // </Dropdown>
      // <a title="添加到播放列表" onClick={this.handleClick}>
      //   <Icon type="plus" style={{ fontSize: this.props.iconSize }} />
      // </a>
      <Button
        title="添加到播放列表"
        onClick={this.handleClick}
        shape="circle"
        icon="plus"
        style={{
          // border: 'none',
          backgroundColor: 'rgba(0, 0, 0, 0)',
        }}
        size={this.props.iconSize}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    // playlist: state.playlist,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addToPlaylist: (data) => {
      dispatch({ type: 'ADD_TO_PLAYLIST', data: data });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTo);
