import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, take, takeLatest } from "redux-saga/effects";
import { login, loginPayload, logOut } from "./auth.slice";

function* handleLogin(payload: loginPayload) {
    console.log('handle login');
    console.log('payload: ', payload );
    localStorage.setItem("token", 'fake token');
    
}

function* handleLogout() {
    console.log('handle Logout');
    localStorage.removeItem("token");
}

function* watchLoginFlow() {
    while(true){
        const isLoggedIn = Boolean(localStorage.getItem('token'))
        if(!isLoggedIn){
            const action:PayloadAction<loginPayload> = yield take(login.type)
            yield fork(handleLogin, action.payload)
    
        }
        
        yield take(logOut.type)
        call(handleLogout)

    }


}

export default function* authSaga() {
    yield fork(watchLoginFlow)
    console.log('auth saga');
    
}
