import * as firebase from "firebase/app";
import "firebase/firestore";

//collection: cafes field: city, name
const firebaseConfig = {
  apiKey: "AIzaSyAZ6aygTg_bwUBr6OXW1ljtXK0eAKMhSZU",
  authDomain: "dinesh-firebase.firebaseapp.com",
  databaseURL: "https://dinesh-firebase.firebaseio.com",
  projectId: "dinesh-firebase",
  storageBucket: "dinesh-firebase.appspot.com",
  messagingSenderId: "240313187495",
  appId: "1:240313187495:web:4846c8219e935e5cd6af82",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
