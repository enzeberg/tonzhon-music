const fetch = require('node-fetch');

const getSongSource = (songId) => {
  return new Promise((resolve, reject) => {
    const guid = 679379360;
    fetch(`https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?songmid=${songId}&guid=${guid.toString()}&filename=C400${songId}.m4a&cid=205361747`)
      .then(res => res.text())
      .then(text => {
        const parsed = JSON.parse(text);
        // console.log(parsed);
        const { filename, vkey } = parsed.data.items[0];
        const songSource = `http://dl.stream.qqmusic.qq.com/${filename}?vkey=${vkey}&guid=${guid}&fromtag=66`;
        resolve({
          songSource,
        });
      })
      .catch(err => reject(err));
  });
};

// getSongSource('001Nl0W80sBSwJ')
//   .then(obj => console.log(obj))
//   .catch(err => console.error(err))

module.exports = { getSongSource };
