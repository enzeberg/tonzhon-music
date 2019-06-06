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

const searchSongs = (keyword, limit, page) => {
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
        // let zhidaContent, zhidaType;

        // if (json.data.zhida.type === 1) {
        //   zhidaType = 'artist';
        //   zhidaContent = constructZhidaArtist(json.data.zhida.zhida_singer);
        // } else if (json.data.zhida.type === 2) {
        //   zhidaType = 'album';
        //   zhidaContent = constructZhidaAlbum(json.data.zhida.zhida_album);
        // }
        resolve({
          songs: songs,
          // zhida: {
          //   type: zhidaType,
          //   content: zhidaContent
          // },
          totalCount: json.data.song.totalnum
        });
      }
    }).catch(err => reject(err));
  });
};

const searchAlbums = (keyword, limit, page) => {
  return new Promise((resolve, reject) => {
    requestQQ({
      w: keyword,
      n: limit, // number of songs in one page
      p: page, // page index
      aggr: 1,
      lossless: 0,
      cr: 1,
      t: '8',
      catZhida: 0 // don't get qqmusic zhida
    }).then(json => {
      if (json.message === 'no results') {
        reject({ message: '抱歉，未搜索到相关内容！' });
      } else {
        resolve({
          albums: albumsHandler(json.data.album.list),
          totalCount: json.data.album.totalnum
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
const albumsHandler = (albums) => {
  return albums.map((album) => ({
    name: album.albumName,
    link: `${qqMusicUrl}album/${album.albumMID}.html`,
    picUrl: album.albumPic,
    artists: album.singer_list.map((artist) => ({
      name: artist.name,
      link: `${qqMusicUrl}singer/${artist.mid}.html`
    }))
  }));
};
// const handlers = {
//   'song': songsHandler,
//   'album': albumsHandler
// };
// const constructZhidaArtist = (artist) => {
//   return {
//     name: artist.singerName,
//     link: `${qqMusicUrl}singer/${artist.singerMID}.html`,
//     picUrl: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${artist.singerMID}.jpg`,
//     songNum: artist.songNum,
//     albumNum: artist.albumNum,
//     mvNum: artist.mvNum
//   };
// };
// const constructZhidaAlbum = (album) => {
//   return {
//     name: album.albumName,
//     link: `${qqMusicUrl}album/${album.albumMID}.html`,
//     picUrl: `https://y.gtimg.cn/music/photo_new/T002R150x150M000${album.albumMID}.jpg`,
//     artist: {
//       name: album.singerName,
//       link: `${qqMusicUrl}singer/${album.singerMID}.html`
//     }
//   };
// };

const search = (keyword, type, limit, offset) => {
  if (type === 'song') {
    return searchSongs(keyword, limit, offset);
  } else if (type === 'album') {
    return searchAlbums(keyword, limit, offset);
  } else {
    return Promise.reject({ message: 'QQ Music does not support this search type!' });
  }
};

module.exports = {
  search,
  searchSongs,
  searchAlbums
};
