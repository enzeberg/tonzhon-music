const getHotListFromQQ = require('./qq/hot_list');
const getHotListFromNetease = require('./netease/hot_list');
// const getXiamiHotList = require('./xiami/hot_list');
const getHotListFromKuwo = require('./kuwo/hot_list');

module.exports = (req, res, next) => {
  const { platform } = req.params;
  if (platform === 'qq') {
    getHotListFromQQ()
      .then(data => res.json({
        status: 'ok',
        data: data
      }))
      .catch(err => res.json({
        status: 'failed',
        message: err.message
      }));
  } else if (platform === 'netease') {
    getHotListFromNetease('3778678')
      .then(data => res.json({
        status: 'ok',
        data: data
      }))
      .catch(err => res.json({
        status: 'failed',
        message: err.message
      }));
  } else if (platform === 'kuwo') {
    getHotListFromKuwo()
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