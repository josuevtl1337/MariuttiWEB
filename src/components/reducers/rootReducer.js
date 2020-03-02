import { combineReducers } from "redux"
import { firebaseReducer } from 'react-redux-firebase'
import counterReduxer from "./counter"
import isLoggedReducer from "./isLogged"

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    counter: counterReduxer,
    isLogged : isLoggedReducer
});
export default rootReducer;
