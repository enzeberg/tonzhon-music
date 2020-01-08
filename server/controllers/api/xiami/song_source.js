const fetch = require('node-fetch');
const querystring = require('querystring');

const getSongSource = (songId) => {
  return new Promise((resolve, reject) => {
    const query = {
      id: songId,
      v: 2.0,
      'app_key': 1,
      '_ksTS': '1523064689780_91',
      // callback: jsonp92,
      r: 'song/detail',
    };
    fetch(`https://api.xiami.com/web?${querystring.stringify(query)}`, {
      headers: {
        referer: 'https://h.xiami.com/', // 去掉这行虾米会返回：“非法请求”
      },
    })
      .then(res => res.json())
      .then(json => {
        const songSource = json.data.song.listen_file;
        if (songSource) {
          resolve({
            songSource,
          });
        } else {
          reject({
            message: '404'
          });
        }
      })
      .catch(err => reject(err));
  });
};

module.exports = { getSongSource };
