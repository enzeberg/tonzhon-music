const netease = require('./netease/search');
const qq = require('./qq/search');
// const xiami = require('./xiami/search');
const kuwo = require('./kuwo/search');

const search = (req, res, next) => {
  let { keyword, provider, limit, page } = req.query;
  if (!(keyword && provider)) {
    return res.json({
      searchSuccess: false,
      message: 'Lack of necessary parameters!'
    });
  }

  limit = limit || 6;
  page = page || 1;

  if (provider === 'netease') {
    netease.search(keyword, limit, page)
      .then(data => res.json({
        searchSuccess: true,
        data: data
      })).catch(err => res.json({
        searchSuccess: false,
        message: err.message
      }));

  } else if (provider === 'qq') {
    qq.search(keyword, limit, page)
      .then(data => res.json({
        searchSuccess: true,
        data: data
      })).catch(err => res.json({
        searchSuccess: false,
        message: err.message
      }));
  // } else if (provider === 'xiami') {
  //   xiami.search(keyword, limit, page)
  //     .then(data => res.json({
  //       searchSuccess: true,
  //       data: data
  //     })).catch(err => res.json({
  //       searchSuccess: false,
  //       message: err.message
  //     }));
  } else if (provider === 'kuwo') {
    kuwo.search(keyword, limit, page)
      .then(data => res.json({
        searchSuccess: true,
        data: data
      })).catch(err => res.json({
        searchSuccess: false,
        message: err.message
      }));
  } else {
    res.json({
      searchSuccess: false,
      message: 'Incorrect provider!'
    });
  }
};

module.exports = search;
