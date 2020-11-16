import firebase from 'firebase/app';
import 'firebase/firebase-storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDA8ZWcy1HnyEyjsbyXgOEaCSAhL5i-9Z0",
  authDomain: "medi-o-der.firebaseapp.com",
  databaseURL: "https://medi-o-der.firebaseio.com",
  projectId: "medi-o-der",
  storageBucket: "medi-o-der.appspot.com",
  messagingSenderId: "1067394625587",
  appId: "1:1067394625587:web:20f7bf19abddb98cf37346",
  measurementId: "G-KB2VC72ZDW"
};
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
export default firebase;