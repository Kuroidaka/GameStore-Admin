import { PayloadAction } from "@reduxjs/toolkit";
import { call, delay, fork, put, select, take } from "redux-saga/effects";
// import { search } from "./employee.slice";
import { employeeApi, employeeModel } from "~/api/employee/employee.api";
import { ResponseGenerator } from "~/model/ResGenerator.model";





const api = {
  fetch(type: string, data: employeeModel) {
    switch (type) {
      case "employee/search": return employeeApi.search(data)
      case 'update': return employeeApi.update({})
      // case 'delete': return employeeApi.delete({})
      case 'employee/create': return employeeApi.create(data)
      // case 'getById': return employeeApi.getById({})

      // other cases
      default: console.log(`Unknown type ${type}`);
    }
  }
};
function* watchLoginFlow() {
  while (true) {
    const action: PayloadAction<Object> = yield take('*')
    const res: ResponseGenerator = yield call(api.fetch, action.type, action.payload);
    // console.log(res)
    yield put({ type: action.type, payload: res.data.results })
  }
}


export default function* employeeSaga() {
  yield fork(watchLoginFlow)

}
