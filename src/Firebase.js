import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwPv5xwt8zs_GusvXPXF-rJT0rjOAtE1Y",
  authDomain: "zecko-sheet.firebaseapp.com",
  projectId: "zecko-sheet",
  storageBucket: "zecko-sheet.appspot.com",
  messagingSenderId: "237232885156",
  appId: "1:237232885156:web:b7b0b95e4967549ce24531",
  measurementId: "G-ZTQDLCWBBS",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firebase, firestore };
