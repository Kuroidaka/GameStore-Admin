
import { all } from 'redux-saga/effects';
import authSaga from '~/page/Admin/auth.saga'


function* rootSaga() {
    console.log('root saga');
    
    yield all([
        authSaga()
    ])
}

export default rootSaga