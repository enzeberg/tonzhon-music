const songsMapper = (songs) => {
  return songs.map((song, index) => ({
    originalId: song.id,
    newId: `netease${song.id}`,
    name: song.name,
    alias: song.alia[0], // if no alia: undefined
    mv: song.mv ? song.mv : null,
    artists: song.ar.map((artist) => {
      return {
        name: artist.name,
        id: artist.id,
      }
    }),
    album: {
      name: song.al.name,
      id: song.al.id,
    },
    // hasCopyright: song.privilege.cp === 1,
    hasCopyright: true,
    fee: song.fee,
    platform: 'netease',
  }));
};

module.exports = songsMapper;