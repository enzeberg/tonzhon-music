const songsMapper = (songs) => {
  return songs.map(song => {
    return ({
      originalId: String(song.rid),
      newId: `kuwo${song.rid}`,
      name: song.name,
      artists: [{
        name: song.artist,
        id: song.artistid,
      }],
      album: {
        name: song.album,
        id: song.albumid,
      },
      // hasCopyright: true,
      platform: 'kuwo',
    });
  });
};

module.exports = songsMapper;