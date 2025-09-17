import { createRoot } from 'react-dom/client'
import App from './App'
import { SearchStatusProvider } from './contexts/SearchStatusContext'
import { SearchKeywordProvider } from './contexts/SearchKeywordContext'
import { SearchResultsProvider } from './contexts/SearchResultsContext'
import { PlayIndexProvider } from './contexts/PlayIndexContext'
import { ListenlistProvider } from './contexts/ListenlistContext'

const root = createRoot(document.getElementById('root'))
root.render(
  <SearchStatusProvider>
    <SearchKeywordProvider>
      <SearchResultsProvider>
        <PlayIndexProvider>
          <ListenlistProvider>
            <App />
          </ListenlistProvider>
        </PlayIndexProvider>
      </SearchResultsProvider>
    </SearchKeywordProvider>
  </SearchStatusProvider>
)
