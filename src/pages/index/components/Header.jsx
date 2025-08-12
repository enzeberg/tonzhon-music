import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import { themeColor } from '../../../config'

function Header() {
  return (
    <div
      className='container'
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <div style={{ flex: '0 0 auto' }}>
        <Link to='/'>
          <h1
            style={{
              display: 'inline',
              color: themeColor,
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
  )
}

export default Header
