const qq = require('./qq');
const netease = require('./netease');
const xiami = require('./xiami');

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
  } else if (platform === 'xiami') {
    xiami.getSongSource(originalId)
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
