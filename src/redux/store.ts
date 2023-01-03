import { configureStore } from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';
import authReducer from '../page/Admin/auth.slice'
import rootSaga from './rootSaga';

const SagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(SagaMiddleware)
});

SagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
