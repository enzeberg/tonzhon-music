import { Layout } from 'antd'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Player from './components/Player'
import Search from './pages/Search'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'
const { Content } = Layout

function App() {
  return (
    <ErrorBoundary>
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
              <Route path="search/:keyword" element={<Search />} />
            </Routes>
          </Content>
          <Player />
        </Layout>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
