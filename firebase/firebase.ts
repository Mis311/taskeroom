import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Auth, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDn9r5paYDKpSUcLJ2IHV1WUL7t28gW-j4",
  authDomain: "taskeroom.firebaseapp.com",
  projectId: "taskeroom",
  storageBucket: "taskeroom.appspot.com",
  messagingSenderId: "1097904501085",
  appId: "1:1097904501085:web:3e551abbd1f1de2adf38b4",
  measurementId: "G-DEG150W410"
};



const app:FirebaseApp = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app)