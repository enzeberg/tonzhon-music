const createRequest = require('./util1/request');
const songsMapper = require('./songs_mapper');

const getHotList = (playlistId) => {
  return new Promise((resolve, reject) => {
    createRequest(
      'POST',
      'https://music.163.com/weapi/v3/playlist/detail',
      {
        id: playlistId,
        n: 50,
      },
      { crypto: 'linuxapi' },
      result => {
        if (result.body && result.body.code === 200) {
          const { tracks } = result.body.playlist;
          resolve({
            songs: songsMapper(tracks),
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

module.exports = getHotList;