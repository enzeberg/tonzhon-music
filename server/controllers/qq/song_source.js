const fetch = require('node-fetch');

const getSongSource = (songId) => {
  return new Promise((resolve, reject) => {
    fetch(`https://u.y.qq.com/cgi-bin/musicu.fcg?_=1587960702731`, {
      method: 'POST',
      body: JSON.stringify({
        'req_0': {
          'module': 'vkey.GetVkeyServer',
          'method': 'CgiGetVkey',
          'param': {
            'guid': '4220211900',
            'songmid': [songId],
            'songtype': [0],
            'uin': '0',
            'loginflag': 0,
            'platform': '23',
            'h5to': 'speed'
          },
        },
        'comm': {
          'g_tk': 5381,
          'uin': 0,
          'format': 'json',
          'platform': 'h5',
        }
      }),
    })
      .then(res => res.text())
      .then(text => {
        const parsed = JSON.parse(text);
        const { purl } = parsed.req_0 && parsed.req_0.data
          && parsed.req_0.data.midurlinfo
          && parsed.req_0.data.midurlinfo[0];
        if (purl) {
          resolve({
            songSource: `http://ws.stream.qqmusic.qq.com/${purl}`,
          });
        } else {
          reject({
            message: '403',
          });
        }
      })
      .catch(err => reject(err));
  });
};

module.exports = { getSongSource };