import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
import {GoogleAuthProvider, getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCwJevk69d6abaA8lBZuZRy3z1HPKvsTE0",
    authDomain: "online-book-store-d4d72.firebaseapp.com",
    projectId: "online-book-store-d4d72",
    storageBucket: "online-book-store-d4d72.appspot.com",
    messagingSenderId: "388873163167",
    appId: "1:388873163167:web:911e096c05638fa3bc6daa"
  };

//  connect the react to firebase
export const app = firebase.initializeApp(firebaseConfig); 

// connect the auth to react 
export const auth= getAuth(app) 

// connect the react to google auth 
export const googleProvider= new GoogleAuthProvider()