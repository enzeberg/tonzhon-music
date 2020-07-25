const songsMapper = (songs) => {
  return songs.map((song, index) => ({
    originalId: song.songmid,
    newId: `qq${song.songmid}`,
    name: song.songname,
    alias: song.lyric, // if no lyric: ''
    mv: song.vid ? song.vid : null,
    artists: song.singer.map((artist) => {
      return {
        name: artist.name,
        id: artist.mid,
      };
    }),
    album: {
      name: song.albumname,
      id: song.albummid,
    },
    platform: 'qq',
  }));
};

module.exports = songsMapper;