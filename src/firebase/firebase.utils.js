// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

export const auth = getAuth();
// export const firestore = firebase.firestore();

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () =>
  signInWithPopup(auth, provider)
    .then((res) => console.log(res))
    .catch((e) => console.error(e));

// export default firebase;
