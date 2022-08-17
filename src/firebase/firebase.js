// Import the functions you need from the SDKs you need
import {getApps,getApp, initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAAd7IF6JT26CnRIRoxGS9UUDfCb4lHVp8",
  authDomain: "drive-clone-57c6d.firebaseapp.com",
  projectId: "drive-clone-57c6d",
  storageBucket: "drive-clone-57c6d.appspot.com",
  messagingSenderId: "835110017573",
  appId: "1:835110017573:web:9108f8d5f16afb5142bdcc",
  measurementId: "G-X274XX15QE"
};

// Initialize Firebase
!getApps().length ?initializeApp(firebaseConfig):getApp()
const db=getFirestore();
const auth=getAuth();
const storage=getStorage()
const provider=new GoogleAuthProvider();

export default db;
export {auth,storage,provider}


