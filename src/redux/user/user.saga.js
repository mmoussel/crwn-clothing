import { all, takeLatest, call, put } from "redux-saga/effects";
import userActionTypes from "./user.types";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUserProfileDocument } from "../../firebase/firebase.utils";
import { googleSignInFailure, googleSignInSuccess } from "./user.actions";

const auth = getAuth();

export function* signInWithGoogle() {
  console.log("im fired");
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    const { user } = yield signInWithPopup(auth, provider);
    const userRef = yield call(createUserProfileDocument, user);
    yield put(googleSignInSuccess({ id: userRef.id, ...userRef.data() }));
  } catch (error) {
    yield put(googleSignInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart)]);
}
