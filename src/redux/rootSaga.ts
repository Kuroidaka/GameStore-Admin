
import { all, call, spawn } from 'redux-saga/effects';
import authSaga from '~/page/Admin/Auth/auth.saga'
// import employeeSaga from '~/page/Admin/Employee/Service/employee.saga'


const sagas = [
  authSaga,
  // employeeSaga
];
function* rootSaga() {
    console.log('root saga');
   
  

  yield all(sagas.map(saga =>
    spawn(function* () {
      console.log(saga)
      while (true) {
        try {
          yield call(saga)
          break
        } catch (e) {
          console.log(e)
        }
      }
    }))
  );
}

export default rootSaga

