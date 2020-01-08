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

const searchSongs = (keyword, limit, page) => {
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

const searchAlbums = (keyword, limit, page) => {
  return new Promise((resolve, reject) => {
    requestNetease({
      s: keyword,
      type: '10',
      limit: limit,
      offset: (page - 1) * limit
    }).then(json => {
      const list = json.result.albums;
      if (list) {
        resolve({
          albums: albumsHandler(list),
          totalCount: json.result.albumCount
        });
      } else {
        reject({ message: '抱歉，未搜索到相关内容！' });
      }
    }).catch(err => reject(err));
  });
};

const searchArtists = (keyword, limit, page) => {
  return new Promise((resolve, reject) => {
    requestNetease({
      s: keyword,
      type: '100',
      limit: limit,
      offset: (page - 1) * limit
    }).then(json => {
      const list = json.result.artists;
      if (list) {
        resolve({
          artists: artistsHandler(list),
          totalCount: json.result.artistCount
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
const albumsHandler = (albums) => {
  return albums.map((album, index) => ({
    name: album.name,
    link: `${neteaseMusicUrl}album?id=${album.id}`,
    picUrl: `${album.picUrl}?param=180y180`,
    artists: album.artists.map((artist) => ({
      name: artist.name,
      link: `${neteaseMusicUrl}artist?id=${artist.id}`
    }))
  }));
};
const artistsHandler = (artists) => {
  return artists.map((artist, index) => ({
    name: artist.name,
    link: `${neteaseMusicUrl}artist?id=${artist.id}`,
    picUrl: `${artist.picUrl}?param=180y180`
  }));
};

const search = (keyword, type, limit, offset) => {
  if (type === 'song') {
    return searchSongs(keyword, limit, offset);
  } else if (type === 'album') {
    return searchAlbums(keyword, limit, offset);
  } else if (type === 'artist') {
    return searchArtists(keyword, limit, offset);
  } else {
    return Promise.reject({ message: 'Netease Music does not support this search type!' });
  }
};

module.exports = {
  search,
  searchSongs,
  searchAlbums,
  searchArtists
};
