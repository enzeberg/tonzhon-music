const netease = require('./netease/playlist');

module.exports = (req, res, next) => {
  const { playlistId } = req.params;
  netease.getPlaylist(playlistId)
    .then(data => res.json({
      status: 'ok',
      data: data
    }))
    .catch(err => res.json({
      status: 'failed',
      message: err.message
    }));
};