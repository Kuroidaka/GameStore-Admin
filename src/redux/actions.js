import * as types from "./actionTypes";
import { 
  auth,
  googleAuthProvider,
  facebookAuthProvider
} from "../firebase";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, signInWithPopup } from "firebase/auth";

export const addToBasket = (item) => ({
  type: types.ADD_TO_BASKET,
  payload: item,
});

export const removeFromBasket = (id) => ({
  type: types.REMOVE_FROM_BASKET,
  payload: id,
});

const registerStart = () => ({
  type: types.REGISTER_START,
});

const registerSuccess = ({ user, additionalData }) => ({
  type: types.REGISTER_SUCCESS,
  payload: { user, additionalData },
});

const registerError = (error) => ({
  type: types.REGISTER_FAIL,
  payload: error,
});

const loginStart = () => ({
  type: types.LOGIN_START,
});

const loginSuccess = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});

const loginError = (error) => ({
  type: types.LOGIN_FAIL,
  payload: error,
});

const googleSignInStart = () => ({
  type: types.GOOGLE_SIGN_IN_START,
});

const googleSignInSuccess = (user) => ({
  type: types.GOOGLE_SIGN_IN_SUCCESS,
  payload: user,
});

const googleSignInFail = (error) => ({
  type: types.GOOGLE_SIGN_IN_FAIL,
  payload: error,
});

const fbSignInStart = () => ({
  type: types.FACEBOOK_SIGN_IN_START,
});

const fbSignInSuccess = (user) => ({
  type: types.FACEBOOK_SIGN_IN_SUCCESS,
  payload: user,
});

const fbSignInFail = (error) => ({
  type: types.FACEBOOK_SIGN_IN_FAIL,
  payload: error,
});

const logoutStart = () => ({
  type: types.LOGOUT_START,
});

const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

const logoutError = (error) => ({
  type: types.LOGOUT_FAIL,
  payload: error,
});

export const setuser = (user) => ({
  type: types.SET_USER,
  payload: user,
});

export const setBasketEmpty = () => ({
  type: types.SET_BASKET_EMPTY,
});

export const registerInitiate = (email, password, displayName) => {
  return function (dispatch) {
    dispatch(registerStart());
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        // user.displayName = displayName;
        // dispatch(registerSuccess({ user, additionalData: { displayName } }));
        updateProfile({
          displayName,
        });
        dispatch(registerSuccess({ user, additionalData: { displayName } }));
      })
      .catch((error) => dispatch(registerError(error.message)));
  };
};

export const loginInitiate = (email, password) => {
  return function (dispatch) {
    dispatch(loginStart());
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(loginSuccess(user));
      })
      .catch((error) => dispatch(loginError(error.message)));
  };
};

export const googleSignInInitiate = () => {
  return function (dispatch) {
    dispatch(googleSignInStart());
    signInWithPopup(auth, googleAuthProvider)
      .then(({ user }) => {
        dispatch(googleSignInSuccess(user));
      })
      .catch((error) => dispatch(googleSignInFail(error.message)));
  };
};

export const fbSignInInitiate = () => {
  return function (dispatch) {
    dispatch(fbSignInStart());
    signInWithPopup(auth, facebookAuthProvider.addScope("user_birthday, email"))
      .then((result) => {
        dispatch(fbSignInSuccess(result.user));
      })
      .catch((error) => dispatch(fbSignInFail(error.message)));
  };
};

export const logOutInitiate = () => {
  return function (dispatch) {
    dispatch(logoutStart());
    signOut(auth)
      .then((resp) => dispatch(logoutSuccess()))
      .catch((error) => dispatch(logoutError(error.message)));
  };
};
