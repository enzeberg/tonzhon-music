function getServerUrl() {
  const env = process.env.NODE_ENV || 'development'
  const urlMap = {
    development: 'http://localhost:8081/',
    production: '/',
  }

  return urlMap[env]
}

const serverUrl = getServerUrl()

export { serverUrl }
