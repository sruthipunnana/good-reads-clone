import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {GoogleAuthProvider, getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyAmwxeL43kuA3iYUwnTRbn3CHKaMJj8t4Q",
  authDomain: "good-reads-clone.firebaseapp.com",
  projectId: "good-reads-clone",
  storageBucket: "good-reads-clone.appspot.com",
  messagingSenderId: "215695428472",
  appId: "1:215695428472:web:4b3697e42f1f6ce260d68d"
};

//  connect the react to firebase
export const app = firebase.initializeApp(firebaseConfig); 

// connect the auth to react 
export const auth= getAuth(app) 

// connect the react to google auth 
export const googleProvider= new GoogleAuthProvider()