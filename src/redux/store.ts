import { combineReducers, configureStore } from "@reduxjs/toolkit"
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
import storage from 'redux-persist/lib/storage'

import createSagaMiddleware from 'redux-saga';
import authReducer from '../page/Admin/Auth/auth.slice'
import employeeReducer from '../page/Admin/Employee/Service/employee.slice'

import rootSaga from './rootSaga';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({ 
  auth: authReducer, 
  employee: employeeReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const SagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER],
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
      }
  }).concat(SagaMiddleware)
});

SagaMiddleware.run(rootSaga);
export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
