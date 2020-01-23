const enc = require('../../../utils/crypto');
const querystring = require('querystring');
const request = require('../../../utils/request');
const neteaseMusicUrl = 'https://music.163.com/#/';

const host = 'music.163.com';
const path = '/weapi/cloudsearch/get/web?csrf_token=';
const headers = {
  'Origin': 'http://music.163.com',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Referer': 'http://music.163.com/search/',
};

const options = {
  host: host,
  path: path,
  method: 'POST',
  headers: headers
};

const requestNetease = (query) => {
  return new Promise((resolve, reject) => {
    const encData = enc.aesRsaEncrypt(JSON.stringify(query));
    options.body = querystring.stringify(encData);
    request(options, options.body)
      .then(res => JSON.parse(res))
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

const search = (keyword, limit, page) => {
  return new Promise((resolve, reject) => {
    requestNetease({
      s: keyword,
      type: '1',
      limit: limit,
      offset: (page - 1) * limit
    }).then(json => {
      const list = json.result.songs;
      if (list) {
        resolve({
          songs: songsHandler(list),
          totalCount: json.result.songCount
        });
      } else {
        reject({ message: '抱歉，未搜索到相关内容！' });
      }
    }).catch(err => reject(err));
  });
};

const songsHandler = (songs) => {
  return songs.map((song, index) => ({
    originalId: song.id,
    name: song.name,
    link: `${neteaseMusicUrl}song?id=${song.id}`,
    alias: song.alia[0], // if no alia: undefined
    mvLink: song.mv ? `${neteaseMusicUrl}mv?id=${song.mv}` : null,
    artists: song.ar.map((artist) => {
      return {
        name: artist.name,
        link: `${neteaseMusicUrl}artist?id=${artist.id}`
      }
    }),
    album: {
      name: song.al.name,
      link: `${neteaseMusicUrl}album?id=${song.al.id}`
    },
    hasCopyright: song.privilege.cp === 1,
    fee: song.fee,
    platform: 'netease',
  }));
};

module.exports = {
  search,
};
