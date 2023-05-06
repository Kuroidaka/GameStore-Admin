import { createSlice } from "@reduxjs/toolkit";

const initialState = {  
    currentUser: null,
    msg: ''
  };
  

export const authReducer = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
      registerSuccess: (state, action) => {
          state.currentUser = action.payload
      },
      loginSuccess: (state, action) => {
          state.currentUser = action.payload
      },
      logOut: (state) => {
        state.currentUser = null
      }
    }
})

export const { loginSuccess, logOut} = authReducer.actions;
export default authReducer.reducer