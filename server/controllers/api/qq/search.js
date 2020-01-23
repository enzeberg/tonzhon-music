const request = require('../../../utils/request');
const querystring = require('querystring');
const qqMusicUrl = 'https://y.qq.com/n/yqq/';

const options = {
  host: 'c.y.qq.com',
  method: 'GET',
  mode: 'no-cors'
};
const requestQQ = (query) => {
  options.path = `/soso/fcgi-bin/client_search_cp?${querystring.stringify(query)}`;
  return new Promise((resolve, reject) => {
    request(options, null, 'https')
      .then(res => JSON.parse(res.slice(9, -1))) // `callback(${useful data})`
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

const search = (keyword, limit, page) => {
  return new Promise((resolve, reject) => {
    requestQQ({
      w: keyword,
      n: limit, // number of songs in one page
      p: page, // page index
      aggr: 1,
      lossless: 0,
      cr: 1,
      t: '0',
      // catZhida: 1 // get qqmusic zhida
    }).then(json => {
      if (json.message === 'no results') {
        reject({ message: '抱歉，未搜索到相关内容！' });
      } else {
        const songs = songsHandler(json.data.song.list);
        resolve({
          songs: songs,
          totalCount: json.data.song.totalnum
        });
      }
    }).catch(err => reject(err));
  });
};

const songsHandler = (songs) => {
  return songs.map((song, index) => ({
    originalId: song.songmid,
    name: song.songname,
    link: `${qqMusicUrl}song/${song.songmid}.html`,
    alias: song.lyric, // if no lyric: ''
    mvLink: song.vid ? `${qqMusicUrl}mv/v/${song.vid}.html` : null,
    artists: song.singer.map((artist) => {
      return {
        name: artist.name,
        link: `${qqMusicUrl}singer/${artist.mid}.html`
      };

    }),
    album: {
      name: song.albumname,
      link: `${qqMusicUrl}album/${song.albummid}.html`
    },
    hasCopyright: true,
    platform: 'qq',
  }));
};

module.exports = {
  search,
};
