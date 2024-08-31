import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { Router } from '@/components/router.tsx'
import { persistor, store } from '@/store/store'

import { router } from './router.tsx'

const rootElement = document.getElementById('root')!

const root = ReactDOM.createRoot(rootElement)

root.render(
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}>
      <Router router={router} />
    </PersistGate>
  </Provider>,
)
