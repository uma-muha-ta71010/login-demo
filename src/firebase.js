import firebase from 'firebase';

import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD5hirp3Qbv8EVTCsMqW0qGnpUVtp7Tpp0",
    authDomain: "logindemo-aa8d6.firebaseapp.com",
    projectId: "logindemo-aa8d6",
    storageBucket: "logindemo-aa8d6.appspot.com",
    messagingSenderId: "290320344258",
    appId: "1:290320344258:web:3aa86fd150111c427e075b"
};

firebase.initializeApp(firebaseConfig);

export default firebase;