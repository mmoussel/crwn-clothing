// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  const snapShot = await getDoc(userRef);
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
};

export const auth = getAuth();
// export const firestore = firebase.firestore();

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () =>
  signInWithPopup(auth, provider)
    .then((res) => console.log(res))
    .catch((e) => console.error(e));

// export default firebase;
