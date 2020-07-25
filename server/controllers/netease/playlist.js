const NeteaseMusic = require('simple-netease-cloud-music');
const songsMapper = require('./songs_mapper');
const nm = new NeteaseMusic();

const getPlaylist = (playlistId) => {
  return new Promise((resolve, reject) => {
    nm.playlist(playlistId).then(data => {
      if (data.code === 200 && data.playlist) {
        // console.log(data.playlist);
        const { playlist } = data;
        resolve({
          name: playlist.name,
          songs: songsMapper(playlist.tracks),
        });
      } else {
        reject({
          message: '',
        });
      }
    });
  });
};

// getPlaylist('5092808871')

module.exports = getPlaylist;