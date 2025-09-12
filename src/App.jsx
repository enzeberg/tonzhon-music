import { connect } from 'react-redux'
import { Layout, Spin } from 'antd'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import SearchResult from './components/SearchResult'
import Player from './components/Player'
import { useSearchStatus } from './contexts/SearchStatusContext'
import './App.css'
const { Content } = Layout

function App({ searchResults }) {
  const { searchStatus } = useSearchStatus()
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Content
          className="container"
          style={{
            marginTop: 59,
            marginBottom: 74,
          }}
        >
          <Switch>
            <Route
              path="/search"
              render={() => {
                const filtered = Object.keys(searchResults).filter((key) => {
                  const result = searchResults[key]
                  return result.searchSuccess && result.data.totalCount > 0
                })
                return (
                  <>
                    {filtered.map((key) => (
                      <SearchResult
                        result={searchResults[key]}
                        provider={key}
                        key={key}
                      />
                    ))}
                    {filtered.length === 0 && searchStatus === 'done' && (
                      <div className="white-card">抱歉，未搜索到相关内容。</div>
                    )}
                    {searchStatus === 'searching' && <Spin />}
                  </>
                )
              }}
            />
          </Switch>
        </Content>
        <Player />
      </Layout>
    </BrowserRouter>
  )
}

function mapStateToProps(state) {
  return {
    searchResults: state.searchResults,
  }
}

export default connect(mapStateToProps)(App)
