import React from 'react';
import { GithubOutlined } from '@ant-design/icons';

export default function Footer() {
  return (
    <div style={{ textAlign: 'center' }}>
      <a href="https://github.com/enzeberg/tongzhong-music"
        target="blank"
      >
        <GithubOutlined style={{ fontSize: 'large' }} />
      </a>
    </div>
  );
}
