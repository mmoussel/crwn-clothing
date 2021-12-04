import { all, takeLatest, call, put } from "redux-saga/effects";

import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserProfileDocument, getCurrentUser ,signInWithGoogleAuth} from "../../firebase/firebase.utils";

import { signInFailure, signInSuccess, signOutFailure, signOutSuccess } from "./user.actions";

import userActionTypes from "./user.types";


const auth = getAuth();

export function* getSnapshotFromUserAuth(user) {
  try {
    const userRef = yield call(createUserProfileDocument, user);
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

export function* userSagas() {
  yield all([call(onGoogleSignInStart),call(onEmailSignInStart),call(onCheckUserSession) , call(onSignOutStart)]);
}
