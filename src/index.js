import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from "firebase/app"

firebase.initializeApp({
    apiKey: "AIzaSyDDIfY80bf_0UaCa3vSYoSnT4HuOjfAGjI",
    authDomain: "mariuttiweb.firebaseapp.com",
    databaseURL: "https://mariuttiweb.firebaseio.com",
    projectId: "mariuttiweb",
    storageBucket: "mariuttiweb.appspot.com",
    messagingSenderId: "866031224697",
    appId: "1:866031224697:web:020b137bf33425db4d51a8",
    measurementId: "G-EWP5WP724D"
});

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();