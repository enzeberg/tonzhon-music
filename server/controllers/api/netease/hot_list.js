// const util = require('./util/util');
const createRequest = require('./util1/request');
const neteaseMusicUrl = 'https://music.163.com/#/';

const getHotList = (playlistId) => {
  return new Promise((resolve, reject) => {
    createRequest(
      'POST',
      'https://music.163.com/weapi/v3/playlist/detail',
      {
        id: playlistId,
        n: 30,
      },
      { crypto: 'linuxapi' },
      result => {
        // console.log('result: ', result);
        if (result.body && result.body.code === 200) {
          const { tracks } = result.body.playlist;
          // console.log('tracks: ', tracks);
          resolve({
            songs: songsHandler(tracks),
          });
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

// getHotList('3778678')
//   .then(object => console.log(object))
//   .catch(err => console.error(err))

module.exports = { getHotList };
