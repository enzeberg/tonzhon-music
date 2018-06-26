const request = (options, data, protocol = 'http') => {
  const theModule = require(protocol);
  return new Promise((resolve, reject) => {
    let resData = '';
    const req = theModule.request(options, (res) => {
      res.on('data', chunk => {
        resData += chunk;
      });
      res.on('end', () => {
        resolve(resData);
      });
      res.on('error', err => {
        reject(err);
      });
    });
    if (data) {
      req.write(data);
    }
    req.end();
    req.on('error', err => reject(err));
  });
};

module.exports = request;
