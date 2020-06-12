const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const useragent = require('express-useragent');

const api = require('./routes/api');

const app = express();
const buildPath = path.join(__dirname, '../client/build');

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  // res.header('Content-Type', 'application/json; charset=utf-8')
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(useragent.express());

app.use(express.static(buildPath, {
  index: false,
}));

app.get('/', function(req, res, next) {
  if (req.useragent.isMobile) {
    res.sendFile('mobile_index.html', {
      root: buildPath
    });
  } else {
    res.sendFile('index.html', {
      root: buildPath
    });
  }

});

app.use('/api', api);

app.use('/*', (req, res, next) => {
  return next();
});

app.use((req, res, next) => {
  if (req.useragent.isMobile) {
    res.sendFile('mobile_index.html', {
      root: buildPath
    });
  } else {
    res.sendFile('index.html', {
      root: buildPath
    });
  }
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
