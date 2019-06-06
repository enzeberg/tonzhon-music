const qq = require('./qq/hot_list');
const netease = require('./netease/hot_list');
// const xiami = require('./xiami/hot_list');

module.exports = (req, res, next) => {
  const { platform, originalId } = req.params;
  if (platform === 'qq') {
    qq.getHotList(originalId)
      .then(data => res.json({
        status: 'ok',
        data: data
      }))
      .catch(err => res.json({
        status: 'failed',
        message: err.message
      }));
  } else if (platform === 'netease') {
    netease.getHotList('3778678')
      .then(data => res.json({
        status: 'ok',
        data: data
      }))
      .catch(err => res.json({
        status: 'failed',
        message: err.message
      }));
  } else if (platform === 'xiami') {
    xiami.getHotList(originalId)
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
