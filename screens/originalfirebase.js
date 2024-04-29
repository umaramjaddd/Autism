// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, initializeAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getReactNativePersistence } from 'firebase/auth/react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDi_ln-ZyHaSSBi2VFPdEksxI_PbK6I1tg",
  authDomain: "petrade-3cf4d.firebaseapp.com",
  projectId: "petrade-3cf4d",
  storageBucket: "petrade-3cf4d.appspot.com",
  messagingSenderId: "118578719771",
  appId: "1:118578719771:web:67b20cb57a7f308bdc1cbe",
  measurementId: "G-LXY5GXVCYL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {persistence: getReactNativePersistence(AsyncStorage)});
const firestore = getFirestore(app);
const storage = getStorage(app);


export { app, auth, firestore, storage };