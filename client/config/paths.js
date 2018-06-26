'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
}

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

function scanSrc() {
  const dirs = fs.readdirSync(resolveApp('client/src/pages/'));
  const map = {};
  dirs.forEach((file) => {
    const state = fs.statSync(resolveApp('client/src/pages/' + file));
    if (state.isDirectory()) {
      map[file] = resolveApp('client/src/pages/' + file + '/index.js');
    }
  });
  return map;
}

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('client/build'),
  appPublic: resolveApp('client/public'),
  appHtml: resolveApp('client/public/index.html'),
  mobileIndexHtml: resolveApp('client/public/mobile_index.html'),
  // appIndexJs: resolveApp('client/src/app/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('client/src'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
  dirsInSrc: scanSrc(),
  indexServiceWorker:
    resolveApp('client/src/pages/index/registerServiceWorker.js'),
};
