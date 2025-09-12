import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './redux/store/'
import { SearchStatusProvider } from './contexts/SearchStatusContext'
import registerServiceWorker from './registerServiceWorker'

const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <SearchStatusProvider>
      <App />
    </SearchStatusProvider>
  </Provider>
)

registerServiceWorker()
