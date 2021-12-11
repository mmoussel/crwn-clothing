import { all, takeLatest, call, put } from "redux-saga/effects";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserProfileDocument, getCurrentUser ,signInWithGoogleAuth} from "../../firebase/firebase.utils";

import { signInFailure, signInSuccess, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess } from "./user.actions";

import userActionTypes from "./user.types";


const auth = getAuth();

export function* getSnapshotFromUserAuth(user ,additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument, user,additionalData);
    yield put(signInSuccess({ id: userRef.id, ...userRef.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield signInWithGoogleAuth()

     yield getSnapshotFromUserAuth(user)
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({payload:{email , password}}) {
  try{
    const {user} = yield signInWithEmailAndPassword(auth ,email ,password)
    
   yield getSnapshotFromUserAuth(user)
  }catch(error){
    yield put(signInFailure(error))
  }
}

export function* isUserAuthenticated() {
  try{
    const userAuth = yield getCurrentUser()
    if(!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth)
  }catch(error){
    yield put(signInFailure(error))
  }
}

export function* signOut() {
  try{
    yield auth.signOut()
    yield put(signOutSuccess())
  }catch(error){
    yield put(signOutFailure(error))
  }
}

export function* signUp({payload:{email , password , displayName}}) {
  try{
    const { user } = yield createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    yield put(signUpSuccess({user , additionalData:{displayName}}))
  }catch(error){
    yield put(signUpFailure(error))
  }
}

export function* signInAfterSignUp({payload:{user, additionalData}}) {
    yield getSnapshotFromUserAuth(user,additionalData)
}


export function* onGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOut);
}
export function* onSignUpStart() {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
}
export function* onSignUpSuccess() {
  yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess)
  ]);
}
