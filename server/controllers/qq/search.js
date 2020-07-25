const request = require('../../utils/request');
const querystring = require('querystring');
const songsMapper = require('./songs_mapper');

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
        const songs = songsMapper(json.data.song.list);
        resolve({
          songs: songs,
          totalCount: json.data.song.totalnum
        });
      }
    }).catch(err => reject(err));
  });
};

module.exports = {
  search,
};