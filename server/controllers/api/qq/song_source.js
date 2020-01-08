const fetch = require('node-fetch');

const getSongSource = (songId) => {
  return new Promise((resolve, reject) => {
    const guid = 679379360;
    fetch(`https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?songmid=${songId}&guid=${guid.toString()}&filename=C400${songId}.m4a&cid=205361747`)
      .then(res => res.text())
      .then(text => {
        const parsed = JSON.parse(text);
        const { filename, vkey } = parsed.data.items[0];
        if (vkey) {
          resolve({
            songSource: `http://dl.stream.qqmusic.qq.com/${filename}?vkey=${vkey}&guid=${guid}&fromtag=66`,
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
