const getPlaylist = require('./netease/playlist');

module.exports = (req, res, next) => {
  const { playlistId } = req.params;
  getPlaylist(playlistId)
    .then(data => res.json({
      status: 'ok',
      data: data
    }))
    .catch(err => res.json({
      status: 'failed',
      message: err.message
    }));
};