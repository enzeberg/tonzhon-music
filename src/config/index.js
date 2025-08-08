function getServerUrl() {
  const env = process.env.NODE_ENV || 'development'

  const urlMap = {
    development: 'http://localhost:8081/',
    production: '/',
  }

  return urlMap[env]
}

const serverUrl = getServerUrl()

const themeColor = '#EA7030'

const musicPlayer = {
  background: '#222',
  color: 'white',
}

export { serverUrl, themeColor, musicPlayer }
