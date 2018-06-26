const fetch = require('node-fetch');
const enc = require('../../../utils/crypto');
const querystring = require('querystring');

const getSongSource = (songId, br) => {
  return new Promise((resolve, reject) => {
    const guid = 1;
    fetch(`http://music.163.com/weapi/song/enhance/player/url?csrf_token=`, {
      method: 'POST',
      headers: {
        'Origin': 'http://music.163.com',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': 'http://music.163.com/',
      },
      body: querystring.stringify(enc.aesRsaEncrypt(JSON.stringify({
        ids: [songId],
        br: br || 999000,
      })))
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        if (json.data[0].code === 200) {
          const songSource = json.data[0].url;
          resolve({
            songSource,
          });
        } else {
          reject({
            message: json.data[0].code
          });
        }
      })
      .catch(err => reject(err));
  });
};

// getSongSource('108557')
//   .then(json => console.log(json))
//   .catch(err => console.error(err))

module.exports = { getSongSource };
