import { takeLatest, call, put ,all} from "@redux-saga/core/effects";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import {
  fetchCollectionsFailure,
  fetchCollectionsSuccess,
} from "./shop.actions";

import shopActionTypes from "./shop.types";

function* fetchCollectionsAsync() {
  try {
    const db = getFirestore();
    const collectionsRef = collection(db, "collections");
    const snapshot = yield getDocs(collectionsRef);
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (err) {
    yield put(fetchCollectionsFailure(err?.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    shopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
 yield all([call(fetchCollectionsStart)])
}
