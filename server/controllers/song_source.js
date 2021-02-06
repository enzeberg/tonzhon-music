const qq = require('./qq/song_source');
const netease = require('./netease/song_source');
// const xiami = require('./xiami/song_source');
const kuwo = require('./kuwo/song_source');

module.exports = (req, res, next) => {
  const { platform, originalId } = req.params;
  if (platform === 'qq') {
    qq.getSongSource(originalId)
      .then(data => res.json({
        status: 'ok',
        data: data
      }))
      .catch(err => res.json({
        status: 'failed',
        message: err.message
      }));
  } else if (platform === 'netease') {
    netease.getSongSource(originalId)
      .then(data => res.json({
        status: 'ok',
        data: data
      }))
      .catch(err => res.json({
        status: 'failed',
        message: err.message
      }));
  // } else if (platform === 'xiami') {
  //   xiami.getSongSource(originalId)
  //     .then(data => res.json({
  //       status: 'ok',
  //       data: data
  //     }))
  //     .catch(err => res.json({
  //       status: 'failed',
  //       message: err.message
  //     }));
  } else if (platform === 'kuwo') {
    kuwo.getSongSource(originalId)
      .then(data => res.json({
        status: 'ok',
        data: data
      }))
      .catch(err => res.json({
        status: 'failed',
        message: err.message
      }));
  } else {
    res.status(404).json({
      status: 'failed',
      message: 'Invalid music platform.'
    });
  }
};
