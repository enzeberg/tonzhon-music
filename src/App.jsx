import { Layout, Spin } from 'antd'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import SearchResult from './components/SearchResult'
import Player from './components/Player'
import { useSearchStatus } from './contexts/SearchStatusContext'
import { useSearchResults } from './contexts/SearchResultsContext'
import { useSearchManager } from './hooks/useSearchManager'
import './App.css'
const { Content } = Layout

function SearchPage() {
  const { searchStatus } = useSearchStatus()
  const { searchResults } = useSearchResults()
  
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
        <div className="white-card">No results found.</div>
      )}
      {searchStatus === 'searching' && <Spin />}
    </>
  )
}

function App() {
  useSearchManager()
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
          <Routes>
            <Route
              path="search"
              element={<SearchPage />}
            />
          </Routes>
        </Content>
        <Player />
      </Layout>
    </BrowserRouter>
  )
}

export default App
