const querystring = require('querystring');
const request = require('../../utils/request');

const xiamiSite = 'https://www.xiami.com/';

const options = {
  host: 'api.xiami.com',
  method: 'GET',
  // mode: 'no-cors',
  headers: {
    referer: 'https://h.xiami.com/', // 去掉这行虾米会返回：“非法请求”
  },
};

const requestXiami = (query) => {
  options.path = `/web?${querystring.stringify(query)}`;
  return new Promise((resolve, reject) => {
    request(options, null, 'https')
      .then(res => JSON.parse(res))
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

const search = (keyword, limit, page) => {
  return new Promise((resolve, reject) => {
    requestXiami({
      v: 2.0,
      app_key: 1,
      key: keyword,
      page: page,
      limit: limit,
      _ksTS: '1519692593395_60',
      // callback: 'jsonp61', // causes Xiami return jsonp61({...})
      r: 'search/songs'
    })
      .then(json => {
        if (json.data.total === 0) {
          return reject({ message: '抱歉，未搜索到相关内容！' });
        } else {
          const songs = json.data.songs.map((song, i) => ({
            originalId: song.song_id,
            newId: `xiami${song.song_id}`,
            name: song.song_name,
            // link: `${xiamiSite}song/${song.song_id}`,
            artists: [{
              name: song.artist_name,
              // link: `${xiamiSite}artist/${song.artist_id}`,
              id: song.artist_id,
            }],
            album: {
              name: song.album_name,
              // link: `${xiamiSite}album/${song.album_id}`
              id: song.album_id,
            },
            // hasCopyright: true,
            platform: 'xiami',
          }));
          return resolve({
            songs: songs,
            totalCount: json.data.total
          });
        }
      })
      .catch(err => reject(err));
  });
};

module.exports = {
  search,
};
