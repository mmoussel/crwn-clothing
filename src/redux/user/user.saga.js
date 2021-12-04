import { all, takeLatest, call, put } from "redux-saga/effects";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserProfileDocument } from "../../firebase/firebase.utils";

import { signInFailure, signInSuccess } from "./user.actions";

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
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const { user } = yield signInWithPopup(auth, provider);

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

export function* onGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart),call(onEmailSignInStart)]);
}
