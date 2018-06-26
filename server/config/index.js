var siteUrl;
if (process.env.NODE_ENV === 'development') {
  siteUrl = 'http://localhost:8080';
} else if (process.env.NODE_ENV === 'production') {
  siteUrl = 'http://tongzhong.xyz';
}
module.exports = {
  siteUrl
};
