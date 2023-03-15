import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, take } from "redux-saga/effects";
import { adminApi } from "~/api/admin/authApi";
import { ResponseGenerator } from "~/model/ResGenerator.model";
import { login, loginFail, loginPayload, loginSuccess, logOut } from "./auth.slice";



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
        let res:ResponseGenerator = yield call(adminApi.login, data)

        if(res.msg) {

            yield put({type: loginFail.type, payload: res.msg})
        }
        else if(res.data){
            const user:ResponseGenerator = yield call(adminApi.getUserInfor)
            yield put({type: loginSuccess.type, payload:user.data})
            return res
        }
}

function* handleLogout() {
    yield call(adminApi.logout);
}


function* watchLoginFlow() {
    while(true){    
        const action:PayloadAction<loginPayload> = yield take(login.type)
        const res:ResponseGenerator = yield call(handleLogin, action.payload)
      
    }
}


export default function* authSaga() {
    yield fork(watchLoginFlow)
    
}
