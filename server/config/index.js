var siteUrl;
if (process.env.NODE_ENV === 'development') {
  siteUrl = 'http://localhost:8081';
} else if (process.env.NODE_ENV === 'production') {
  siteUrl = 'http://mini.tongzhong.xyz';
}
module.exports = {
  siteUrl
};
