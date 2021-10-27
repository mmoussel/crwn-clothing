import { collection, getDocs, getFirestore } from "firebase/firestore";
import { convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import shopActionTypes from "./shop.types";

export const fetchCollectionsStart = () => ({
  type: shopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    const db = getFirestore();
    const collectionsRef = collection(db, "collections");
    dispatch(fetchCollectionsStart());
    getDocs(collectionsRef)
      .then(async (snapshot) => {
        const collectionsMap = await convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch((err) => dispatch(fetchCollectionsFailure(err?.message)));
  };
};
