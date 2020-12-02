import firebase from 'firebase'
import 'firebase/firestore'

 var firebaseConfig = {
    apiKey: "AIzaSyBvYR10YRXaL-pywG2gLbmFuc1QmtKExWo",
    authDomain: "proyectobd-e891c.firebaseapp.com",
    databaseURL: "https://proyectobd-e891c.firebaseio.com",
    projectId: "proyectobd-e891c",
    storageBucket: "proyectobd-e891c.appspot.com",
    messagingSenderId: "417802527174",
    appId: "1:417802527174:web:7a3035e17784daad0c92c7"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 export const db = firebase.firestore();