const createRequest = require('./util1/request');
const neteaseMusicUrl = 'https://music.163.com/#/';

const getPlaylist = (playlistId) => {
  return new Promise((resolve, reject) => {
    createRequest(
      'POST',
      'https://music.163.com/weapi/v3/playlist/detail',
      {
        id: playlistId,
        // n: 30,
      },
      { crypto: 'linuxapi' },
      result => {
        if (result.body && result.body.code === 200) {
          // console.log(result.body);
          const { name, tracks } = result.body.playlist;
          resolve({
            playlistName: name,
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

// getPlaylist('2692409103')

module.exports = { getPlaylist };