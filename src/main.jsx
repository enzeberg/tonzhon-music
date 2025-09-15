import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './redux/store/'
import { SearchStatusProvider } from './contexts/SearchStatusContext'
import { SearchKeywordProvider } from './contexts/SearchKeywordContext'
import { SearchResultsProvider } from './contexts/SearchResultsContext'
import registerServiceWorker from './registerServiceWorker'

const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <SearchStatusProvider>
      <SearchKeywordProvider>
        <SearchResultsProvider>
          <App />
        </SearchResultsProvider>
      </SearchKeywordProvider>
    </SearchStatusProvider>
  </Provider>
)

registerServiceWorker()
