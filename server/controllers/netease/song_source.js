const { createWebAPIRequest } = require('./util/util');

const getSongSource = (songId) => {
  const data = {
    ids: [songId],
    br: 999000,
    csrf_token: ''
  };
  const cookie = '';
  return new Promise((resolve, reject) => {
    createWebAPIRequest(
      "music.163.com",
      "/weapi/song/enhance/player/url",
      "POST",
      data,
      cookie,
      result => {
        const parsed = JSON.parse(result);
        if (parsed.data[0].code === 200) {
          resolve({
            songSource: parsed.data[0].url
          });
        } else {
          reject({
            message: parsed.data[0].code
          });
        }
      },
      err => {
        reject(err);
      }
    );
  });
};

module.exports = { getSongSource };