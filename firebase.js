// Import firebase
/* import * as firebase from "firebase"; */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration, you have to paste here the object that comes from firebase
const firebaseConfig = {
  apiKey: "AIzaSyBooNg3x2b35HoGIX21zfVFa8kwB5PVbiw",
  authDomain: "greenfod-ccecd.firebaseapp.com",
  projectId: "greenfod-ccecd",
  storageBucket: "greenfod-ccecd.appspot.com",
  messagingSenderId: "451172899427",
  appId: "1:451172899427:web:ac4d7ed74c62925670b656"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0 ) {
  console.info({ firebase });
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
