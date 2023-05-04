import { createSlice } from "@reduxjs/toolkit";

const initialState = {  
    currentUser: null,
    logging: false,
    loggedIn: false,
    logError: false,
    msg: ''
  };
  

export const authReducer = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
       
        loginSuccess: (state, action) => {
            state.currentUser = action.payload
            state.logging = false
            state.loggedIn = true
            state.logError = false
        },
        logOut: (state) => {
          state.currentUser = null
          state.loggedIn = false
        }
    }
})

export const { loginSuccess, logOut} = authReducer.actions;
export default authReducer.reducer