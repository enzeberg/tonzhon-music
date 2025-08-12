import { connect } from 'react-redux'
import { Layout } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import TheHeader from './components/Header'
import SearchResult from './components/SearchResult'
import TopSongs from './components/TopSongs'
import Player from './components/Player'
import Hot from './components/Hot'
import './App.css'
const { Header, Content } = Layout

function App({ searchStatus, searchResults }) {
  return (
    <BrowserRouter>
      <Layout>
        <Header
          style={{
            position: 'fixed',
            width: '100%',
            zIndex: 1040,
            padding: '8px 0',
            boxShadow: '0 1px 3px rgba(26,26,26,.1)',
          }}
        >
          <TheHeader />
        </Header>
        <Content>
          <div
            className='container'
            style={{
              marginTop: 59,
              marginBottom: 74,
              minHeight: 800,
            }}
          >
            <Switch>
              <Route exact path='/' component={Hot} />
              <Route
                path='/search'
                render={() => {
                  const filtered = Object.keys(searchResults).filter((key) => {
                    const result = searchResults[key]
                    return result.searchSuccess && result.data.totalCount > 0
                  })
                  return (
                    <>
                      <TopSongs />
                      {filtered.map((key) => (
                        <SearchResult
                          result={searchResults[key]}
                          provider={key}
                          key={key}
                        />
                      ))}
                      {filtered.length === 0 && searchStatus === 'done' && (
                        <div className='white-card'>
                          抱歉，未搜索到相关内容。
                        </div>
                      )}
                      {searchStatus === 'searching' && <LoadingOutlined />}
                    </>
                  )
                }}
              />
            </Switch>
          </div>
        </Content>
        <Player />
      </Layout>
    </BrowserRouter>
  )
}

function mapStateToProps(state) {
  return {
    searchStatus: state.searchStatus,
    searchResults: state.searchResults,
  }
}

export default connect(mapStateToProps)(App)
