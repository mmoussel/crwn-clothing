// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  writeBatch,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfWKQQsrDJngAVnfnQEZtAFYrRlMVYZaY",
  authDomain: "crown-clothing-9ffa8.firebaseapp.com",
  projectId: "crown-clothing-9ffa8",
  storageBucket: "crown-clothing-9ffa8.appspot.com",
  messagingSenderId: "133838497942",
  appId: "1:133838497942:web:f791c6b52c03125a773ab7",
  measurementId: "G-FR975M0JED",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = doc(db, "users", userAuth.uid);
  try {
    const snapShot = await getDoc(userRef);

    console.log("userAuth", snapShot);

    if (!snapShot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        setDoc(userRef, {
          displayName,
          email,
          createdAt,
          ...additionalData,
        });
      } catch (e) {
        console.error("error while setting user data in firestore", e);
      }
    }
    return snapShot;
  } catch (e) {
    console.log("firebase err", e?.message);
  }
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);

  const batch = writeBatch(db);

  objectsToAdd.forEach((obj) => {
    const newDocRef = doc(collectionRef);
    batch.set(newDocRef, obj);
  });
  batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      items,
      title,
    };
  });

  return transformedCollection.reduce((accmulator, collection) => {
    accmulator[collection?.title.toLowerCase()] = collection;
    return accmulator;
  }, {});
};

export const auth = getAuth();
// export const firestore = firebase.firestore();

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () =>
  signInWithPopup(auth, provider)
    .then((res) => console.log(res))
    .catch((e) => console.error("google sign in error", e));

// export default firebase;
