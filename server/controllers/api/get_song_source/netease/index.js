const util = require('./util/util');

const getSongSource = (songId) => {
  const data = {
    ids: [songId],
    br: 999000,
    csrf_token: ''
  };
  const cookie = '';
  return new Promise((resolve, reject) => {
    util.createWebAPIRequest(
      "music.163.com",
      "/weapi/song/enhance/player/url",
      "POST",
      data,
      cookie,
      result => {
        console.log('result: ', result)
        resolve({
          songSource: JSON.parse(result).data[0].url
        });
      },
      err => {
        reject(err);
      }
    );
  });
};

// getSongSource('108557')
//   .then(object => console.log(object))
//   .catch(err => console.error(err))

module.exports = { getSongSource };
