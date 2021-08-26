import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database"

let firebaseConfig = {
  apiKey: "AIzaSyDQtAVqHXKS2zzTCZFMBePn_sxmnfRgeE4",
  authDomain: "reactfirebase-b0789.firebaseapp.com",
  projectId: "reactfirebase-b0789",
  storageBucket: "reactfirebase-b0789.appspot.com",
  messagingSenderId: "812081207118",
  appId: "1:812081207118:web:ce45910e756e9ebd8af01f",
  measurementId: "G-EZ50D7FP43",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const database = firebase.database()

export { auth, firestore, storage, database };
