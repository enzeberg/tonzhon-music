const fetch = require('node-fetch');
const songsMapper = require('./songs_mapper');

const getHotList = () => {
  return new Promise((resolve, reject) => {
    fetch(`https://www.kuwo.cn/api/www/bang/bang/musicList?bangId=16&pn=1&rn=30&httpsStatus=1&reqId=e4229b90-e5eb-11ea-8f96-61d4b2e784f6`, {
      headers: {
        cookie: '_ga=GA1.2.1675613707.1589085909; _gid=GA1.2.1099796595.1589085909; Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1589085909,1589087176; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1589089377; kw_token=GJZXJFO04YH; _gat=1',
        csrf: 'GJZXJFO04YH',
        referer: 'http://www.kuwo.cn',
      },
    })
      .then(res => res.json())
      .then(json => {
        // console.log('json: ', json)
        if (json.code === 200) {
          resolve({
            songs: songsMapper(json.data.musicList),
          });
        } else {
          reject({
            message: 'failed',
          });
        }
      })
      .catch(err => reject(err));
  });
};

// getHotList()
//   .then(songs => console.log(songs))
//   .catch(err => console.error(err));

module.exports = getHotList;