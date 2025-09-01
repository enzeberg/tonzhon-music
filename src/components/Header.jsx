import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

function Header() {
  return (
    <header
      style={{
        position: 'fixed',
        width: '100%',
        zIndex: 1040,
        padding: '8px 0',
        boxShadow: '0 1px 3px rgba(26,26,26,.1)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <div style={{ flex: '0 0 auto' }}>
          <Link to="/">
            <h1
              style={{
                display: 'inline',
                color: 'orange',
                fontWeight: 360,
                margin: 0,
              }}
            >
              Tonzhon
            </h1>
          </Link>
        </div>
        <div style={{ flex: '1' }}>
          <SearchBar />
        </div>
      </div>
    </header>
  )
}

export default Header
