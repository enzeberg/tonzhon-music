import { createRoot } from 'react-dom/client'
import App from './App'
import { AppProvider } from './contexts/AppProvider'

const root = createRoot(document.getElementById('root'))
root.render(
  <AppProvider>
    <App />
  </AppProvider>
)
