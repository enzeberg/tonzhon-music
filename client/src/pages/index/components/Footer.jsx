import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <div style={styles.footer}>
        <p>
          &copy;&nbsp;2017-2018&nbsp;铜钟&nbsp;
          <a style={{ color: '#999' }} href="http://tongzhong.xyz">
            tongzhong.xyz
          </a>
        </p>
      </div>
    );

  }
}

const styles = {
  footer: {
    margin: '30px 0',

    color: '#999',
    textAlign: 'center'
  }
}
