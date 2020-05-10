const fetch = require('node-fetch');

const getSongSource = (songId) => {
  return new Promise((resolve, reject) => {
    fetch(`http://www.kuwo.cn/url?format=mp3&rid=${songId}&response=url&type=convert_url3&br=128kmp3&from=web`, {
      headers: {
        cookie: '_ga=GA1.2.1675613707.1589085909; _gid=GA1.2.1099796595.1589085909; Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1589085909,1589087176; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1589089377; kw_token=GJZXJFO04YH; _gat=1',
        csrf: 'GJZXJFO04YH',
        referer: 'http://www.kuwo.cn',
      },
    })
      .then(res => res.json())
      .then(json => {
        if (json.code === 200) {
          resolve({
            songSource: json.url,
          });
        } else {
          reject({ message: 'err' });
        }
      })
      .catch(err => reject(err));
  });
};

// 我欲成仙
// getSongSource(296348)
//   .then(url => console.log(url))
//   .catch(err => console.error(err));

module.exports = {
  getSongSource
};