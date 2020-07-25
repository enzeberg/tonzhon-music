const createRequest = require('./util1/request');
const neteaseMusicUrl = 'https://music.163.com/#/';

const getPlaylist = (playlistId) => {
  return new Promise((resolve, reject) => {
    createRequest(
      'POST',
      'https://music.163.com/weapi/v3/playlist/detail',
      {
        id: playlistId,
        // n: 1000,
        // s: '0',
        // t: '0',
      },
      { crypto: 'linuxapi' },
      result => {
        if (result.body && result.body.code === 200) {
          console.log(result.body.playlist);
          const { name, tracks, trackIds } = result.body.playlist;
          const ids = trackIds.map(item => String(item.id));
          console.log('ids: ', ids);
          createRequest(
            'POST',
            'https://music.163.com/weapi/v3/song/detail',
            {
              c: '[' + ids.map(id => ('{"id":' + id + '}')).join(',') + ']',
              ids: `[${ids.join(',')}]`
            },
            { ctypto: 'weapi' },
            result => {
              console.log('result: ', result)
            },
            err => {
              reject(err);
            }
          );
          // resolve({
          //   playlistName: name,
          //   songs: songsHandler(tracks),
          // });
        } else {
          reject({
            message: result.status,
          });
        }
      },
      err => {
        reject(err);
      }
    );
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
    // hasCopyright: song.privilege.cp === 1,
    hasCopyright: true,
    fee: song.fee,
    platform: 'netease',
  }));
};

// getPlaylist('5092808871')

module.exports = { getPlaylist };