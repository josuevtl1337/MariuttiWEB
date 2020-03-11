import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import firebase from "firebase/app"
import { createStore, combineReducers, compose } from 'redux'
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
import rootReducer from "./components/reducers/rootReducer"

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
// react-redux-firebase config
const rrfConfig = {
    // rubros: 'Rubro'
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    // enableClaims: true // Get custom claims along with the profile
}
//Create Store
const initialState = {
}
const store = createStore(
    rootReducer, 
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch
    // createFirestoreInstance // <- needed if using firestore
}

ReactDOM.render(<Provider store={store}><ReactReduxFirebaseProvider {...rrfProps}><App /></ReactReduxFirebaseProvider></Provider>, document.getElementById('root'));
serviceWorker.unregister();