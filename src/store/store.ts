import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { apiSlice } from './api/api-slice'
import authReducer from './slices/auth-slice'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['selected', 'fontList', 'copied', 'api'],
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  }),
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // immutableCheck: { warnAfter: 128 },
      immutableCheck: false,
    }).concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)
