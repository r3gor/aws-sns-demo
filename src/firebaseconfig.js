// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/database";
import 'firebase/analytics';

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
    apiKey: "AIzaSyDA5YypDsagE4p6cCcdqETR--5uWWtF040",
    authDomain: "arq-demo-05.firebaseapp.com",
    databaseURL: "https://arq-demo-05-default-rtdb.firebaseio.com",
    projectId: "arq-demo-05",
    storageBucket: "arq-demo-05.appspot.com",
    messagingSenderId: "957667703707",
    appId: "1:957667703707:web:84ec3b384dd23106f17f3e",
    measurementId: "G-EWY06XHRN9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics(); // Optional (for send analytics data)

var fireDatabase = firebase.database();
var fireAuth = firebase.auth;

export { fireDatabase, fireAuth }