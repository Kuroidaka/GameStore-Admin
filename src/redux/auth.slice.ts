import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';


// export interface CounterState {
//   value: number;
//   status: 'idle' | 'loading' | 'failed';
// }

export interface currentUserType {
    User_Account_Name: '' | null
    User_Account_Password: string | null
    User_Account_Permission: string | null
    createdAt: string | null
    id: number | null
    updatedAt: string | null
}

const initialState: currentUserType = {
    User_Account_Name: '',
    User_Account_Password: '',
    User_Account_Permission: '',
    createdAt: '',
    id: null,
    updatedAt: '',
};


export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    login: (state, action: PayloadAction<currentUserType>) => {
        state.User_Account_Name = action.payload.User_Account_Name
        state.User_Account_Password = action.payload.User_Account_Password
        state.User_Account_Permission = action.payload.User_Account_Permission
        state.createdAt = action.payload.createdAt
        state.id = action.payload.id
        state.updatedAt = action.payload.updatedAt
    },

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

export const { login } = authReducer.actions;

export const selectUser = (state: RootState) => state;

export default authReducer.reducer;
