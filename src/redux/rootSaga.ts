
import { all, call, spawn } from 'redux-saga/effects';
import authSaga from '~/page/Admin/Auth/auth.saga'


function* rootSaga() {
    console.log('root saga');
    
   const sagas = [
    authSaga
  ];

  yield all(sagas.map(saga =>
    spawn(function* () {
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

