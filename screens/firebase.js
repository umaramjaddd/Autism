// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import {getAuth, initializeAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// import AsyncStorage from '@react-native-async-storage/async-storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDV1KphXUNngGVaJIGyLtexsdE5TY-EfA",
  authDomain: "aurtism-cca25.firebaseapp.com",
  projectId: "aurtism-cca25",
  storageBucket: "aurtism-cca25.appspot.com",
  messagingSenderId: "294952271324",
  appId: "1:294952271324:web:ec156ff7be81c6fa7d2319"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);



export {app, storage, auth, db};