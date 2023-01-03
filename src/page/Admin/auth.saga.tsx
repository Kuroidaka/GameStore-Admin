import { PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { call, fork, put, take, takeLatest } from "redux-saga/effects";
import { login, loginSuccess, loginPayload, logOut, loginFail } from "./auth.slice";
import { adminApi } from "~/api/admin/authApi";
import { userApi } from "~/api/admin/userApi";
import { ResponseGenerator } from "~/model/ResGenerator.model";
import { UserToken, User } from "~/model/User.model";


function storeToken(token: string) {
    localStorage.setItem('token', token)
}

function* handleLogin(payload: loginPayload) {
    try {

        const data = payload
        const { token } = yield call(adminApi.login, data)
        return token
        
    } catch (error) {
        yield put({type: loginFail.type})
    }
    
}

function* handleLogout() {
    console.log('handle Logout');
    localStorage.removeItem("token");
}


function* watchLoginFlow() {
    while(true){
        
        const action:PayloadAction<loginPayload> = yield take(login.type)
        const token:string = yield call(handleLogin, action.payload)
        
        if(token){
            yield fork(storeToken, token)
            const decode = jwt_decode<UserToken>(token)
            const user:ResponseGenerator = yield call(userApi.getUserById, decode.id, token)
            yield put({type: loginSuccess.type, payload:user})
            
            yield take(logOut.type)
            call(handleLogout)
        }


    }
}

// function* loginFlow() {
//     while (true) {
//       const {user, password} = yield take('LOGIN_REQUEST')
//       const token = yield call(authorize, user, password)
//       if (token) {
//         yield call(Api.storeItem, {token})
//         yield take('LOGOUT')
//         yield call(Api.clearItem, 'token')
//       }
//     }
//   }

export default function* authSaga() {
    yield fork(watchLoginFlow)
    console.log('auth saga');
    
}
