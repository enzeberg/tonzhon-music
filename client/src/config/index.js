var serverUrl;
if (process.env.NODE_ENV === 'development') {
  serverUrl = 'http://localhost:8080/';
} else if (process.env.NODE_ENV === 'production') {
  serverUrl = '/';
}
const themeColor = '#EA7030';
const musicPlayer = {
  background: 'rgba(120, 120, 120, 1)',
  color: 'white',
};
const playlist = {
  width: 600,
}
export {
  serverUrl,
  themeColor,
  musicPlayer,
  playlist,
};
