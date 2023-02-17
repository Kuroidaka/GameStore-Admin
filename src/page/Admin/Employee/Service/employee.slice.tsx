import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { employeeModel } from '~/api/employee/employee.api';
import { RootState } from '~/redux/store';

// export interface CounterState {
//   value: number;
//   status: 'idle' | 'loading' | 'failed';
// }


// let initialState: employeeModel[] = []
  


export const employeeReducer = createSlice({
  name: 'employee',
  initialState:[] as employeeModel[],
  reducers: {
    search: (state, action: PayloadAction<employeeModel>) => {
      
    },
    add: (state, action: PayloadAction<any>) => {
      console.log(state)
    },
    getById: (state, action: PayloadAction<any>) => {
      console.log(state)
    },
    delete: (state, action: PayloadAction<any>) => {
      console.log(state)
    },
    update: (state, action: PayloadAction<any>) => {
      console.log(state)
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

export const { search, getById,add } = employeeReducer.actions;


export const selectEmployee = (state: RootState) =>{
  return state.employee
}

export default employeeReducer.reducer;
