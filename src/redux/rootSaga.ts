
import { all } from 'redux-saga/effects';
import authSaga from '~/page/Admin/auth.saga'


function* rootSaga() {
    console.log('root saga');
    
    yield all([
        authSaga()
    ])
}

export default rootSaga

// const sagas = [
//     authSaga
//   ];

//   yield all(sagas.map(saga =>
//     spawn(function* () {
//       while (true) {
//         try {
//           yield call(saga)
//           break
//         } catch (e) {
//           console.log(e)
//         }
//       }
//     }))
//   );