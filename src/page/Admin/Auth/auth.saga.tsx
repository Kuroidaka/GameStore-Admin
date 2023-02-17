import { PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { call, fork, put, select, take } from "redux-saga/effects";
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
        let res:ResponseGenerator = yield call(adminApi.login, data)

        console.log(res);
        // res = res.data
        
        
        if(res.msg) {

            yield put({type: loginFail.type, payload: res.msg})
        }
        else if(res.data.token){
            // yield fork(storeToken, res.token)

            const token = res.data.token
            localStorage.setItem('token', token)
            const decode = jwt_decode<UserToken>(token)
            const user:ResponseGenerator = yield call(userApi.getUserById, decode.id, token)
            
            yield put({type: loginSuccess.type, payload:user.data})
            return res
        }
        
    

    
}

function* handleLogout() {
    yield call(clearToken)
}


function* watchLoginFlow() {
    while(true){
        const action:PayloadAction<loginPayload> = yield take(login.type)
        const res:ResponseGenerator = yield call(handleLogin, action.payload)
        const token = getToken()
        
        if(token){
            // yield fork(storeToken, res.token)
            // const decode = jwt_decode<UserToken>(res.token)
            // const user:ResponseGenerator = yield call(userApi.getUserById, decode.id, res.token)
            // yield put({type: loginSuccess.type, payload:user.data})
            
            yield take(logOut.type)
            call(handleLogout)
        }


    }
}


export default function* authSaga() {
    yield fork(watchLoginFlow)
    
}
