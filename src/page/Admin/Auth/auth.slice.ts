import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/redux/store';
import { User } from '~/model/User.model'

// export interface CounterState {
//   value: number;
//   status: 'idle' | 'loading' | 'failed';
// }

interface authState {
  currentUser: User | null
  logging?: Boolean
  loggedIn?: Boolean
  logError?: Boolean
  msg?: string
}

const initialState: authState = {  
  currentUser: null,

  logging: false,
  loggedIn: false,
  logError: false,
  msg: ''
};

export interface loginPayload {
  User_Account_Name: string
  User_Account_Password: string
}


export interface registerPayload {
  User_Account_Name: string
  // User_Account_Email: string
  User_Account_Password: string
  User_Account_Permission: string
}


export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<loginPayload>) => {
        state.logging = true
        state.logError = false
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
        state.currentUser = action.payload
        state.logging = false
        state.loggedIn = true
        state.logError = false
    },
    loginFail: (state, action: PayloadAction<string>) => {
        state.logging = false
        state.loggedIn = false
        state.logError = true 
        state.msg = action.payload
    },
    logOut: (state) => {
      state.currentUser = null
      state.loggedIn = false
    }

  },
//   extraReducers: (builder) => {
//     builder
//       .addCase(incrementAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(incrementAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.value += action.payload;
//       })
//       .addCase(incrementAsync.rejected, (state) => {
//         state.status = 'failed';
//       });
//   },
});

export const { login, loginSuccess, loginFail, logOut} = authReducer.actions;

export const selectCurrentUser = (state:RootState) => state.auth.currentUser;

export const selectLogging = (state:RootState) => state.auth.logging
export const selectLoggedIn = (state:RootState) => state.auth.loggedIn
export const selectLogError = (state:RootState) => state.auth.logError
export const selectLogMsg = (state:RootState) => state.auth.msg

export default authReducer.reducer;
