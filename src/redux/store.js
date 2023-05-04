import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from './auth/auth.slice'

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'

import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

const rootReducer = combineReducers({ 
    auth: authReducer, 
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
 

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          immutableCheck: { warnAfter: 128 },
          serializableCheck: { warnAfter: 128 },
        },
      }),
  })

export const persistor = persistStore(store)