// Import firebase
/* import * as firebase from "firebase"; */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration, you have to paste here the object that comes from firebase
const firebaseConfig = {
  apiKey: "AIzaSyDrQaMmBfkNermV8KeI74aUDQPCvy5Ysy0",
  authDomain: "dmi-project-c6f50.firebaseapp.com",
  databaseURL: "https://dmi-project-c6f50-default-rtdb.firebaseio.com",
  projectId: "dmi-project-c6f50",
  storageBucket: "dmi-project-c6f50.appspot.com",
  messagingSenderId: "671212230715",
  appId: "1:671212230715:web:d3b68406a66d2c5fcba41e"

};


// Initialize Firebase

let app;
if (firebase.apps.length === 0 ) {
  console.info({ firebase });
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth()
const db = firebase.database()
const storage = firebase.storage()
export { auth, db, storage};


