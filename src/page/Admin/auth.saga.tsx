import { PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { call, fork, put, take } from "redux-saga/effects";
import { login, loginSuccess, loginPayload, logOut, loginFail } from "./auth.slice";
import { adminApi } from "~/api/admin/authApi";
import { userApi } from "~/api/admin/userApi";
import { ResponseGenerator } from "~/model/ResGenerator.model";
import { UserToken } from "~/model/User.model";


function storeToken(token: string) {
    localStorage.setItem('token', token)
}

function getToken() {
    return localStorage.getItem('token')
}

function clearToken() {
    localStorage.removeItem("token");
}

function* handleLogin(payload: loginPayload) {

        const data = payload
        const res:ResponseGenerator = yield call(adminApi.login, data)

        console.log(res);
        
        if(res.msg) {
            yield put({type: loginFail.type, payload: res.msg})
        }
        else if(res.token){
            // yield fork(storeToken, res.token)
            localStorage.setItem('token', res.token)
            const decode = jwt_decode<UserToken>(res.token)
            const user:ResponseGenerator = yield call(userApi.getUserById, decode.id, res.token)
            yield put({type: loginSuccess.type, payload:user.data})
            return res
        }
        
    

    
}

function* handleLogout() {
    console.log('handle Logout');
    yield call(clearToken)
}


function* watchLoginFlow() {
    while(true){
        
        const action:PayloadAction<loginPayload> = yield take(login.type)
        const res:ResponseGenerator = yield call(handleLogin, action.payload)

        const token = getToken()
        console.log('check token');
        
        if(token){
            console.log('token', token);
            // yield fork(storeToken, res.token)
            // const decode = jwt_decode<UserToken>(res.token)
            // const user:ResponseGenerator = yield call(userApi.getUserById, decode.id, res.token)
            // yield put({type: loginSuccess.type, payload:user.data})
            
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
