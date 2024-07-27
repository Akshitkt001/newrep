import firebase from "firebase"
const firebaseConfig = {
  apiKey: "AIzaSyBdzrfPHvUpPrvnbMUbZrcTW4sbDgC7IEc",
  authDomain: "drive-clone-1a82a.firebaseapp.com",
  projectId: "drive-clone-1a82a",
  storageBucket: "drive-clone-1a82a.appspot.com",
  messagingSenderId: "210481254452",
  appId: "1:210481254452:web:885f51071204dd3a39fa61"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export{ db,storage,auth,provider}
