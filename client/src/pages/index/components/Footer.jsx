import React, { Component } from 'react';
import { Icon } from 'antd';

export default class Footer extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <a href="https://github.com/enzeberg/tongzhong-music"
          target="blank"
        >
          <Icon type="github" style={{ fontSize: 'large' }} />
        </a>
      </div>
    );
  }
}
