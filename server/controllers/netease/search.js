const enc = require('../../utils/crypto');
const querystring = require('querystring');
const request = require('../../utils/request');
const songsMapper = require('./songs_mapper');

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
          songs: songsMapper(list),
          totalCount: json.result.songCount
        });
      } else {
        reject({ message: '抱歉，未搜索到相关内容！' });
      }
    }).catch(err => reject(err));
  });
};

module.exports = {
  search,
};