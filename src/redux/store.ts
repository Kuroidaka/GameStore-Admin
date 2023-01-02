import { configureStore, Action } from '@reduxjs/toolkit';
import authReducer from './auth.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
