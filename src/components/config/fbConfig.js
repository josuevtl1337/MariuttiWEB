// import firebase from "firebase/app"
// import React from 'react'
// import "firebase/firestore"
// import "firebase/auth"



// export default function fbConfig() {
  
// // Initialize Firebase
// const firebaseConfig = {
//     apiKey: "AIzaSyDDIfY80bf_0UaCa3vSYoSnT4HuOjfAGjI",
//     authDomain: "mariuttiweb.firebaseapp.com",
//     databaseURL: "https://mariuttiweb.firebaseio.com",
//     projectId: "mariuttiweb",
//     storageBucket: "mariuttiweb.appspot.com",
//     messagingSenderId: "866031224697",
//     appId: "1:866031224697:web:020b137bf33425db4d51a8",
//     measurementId: "G-EWP5WP724D"
//   };
//   firebase.initializeApp(firebaseConfig);
//   //Make auth and firestore references
//   // const auth = firebase.auth();
//   // const db = firebase.firestore;
//   return (
//     <div>
      
//     </div>
//   )
// }
import React from "react"
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'

const Cfg = (props)=>{
    //Hago la referencia para traer mis objetos Rubros, y Sub_Rubros
    useFirebaseConnect([
        { path: 'Rubro' },
        { path: 'Sub_Rubro' },
        { path: 'Producto' }
    ])
    const rubros = useSelector(state => state.firebase.data.Rubro)
    const sub_rubros = useSelector(state => state.firebase.data.Sub_Rubro)
    const productos = useSelector(state => state.firebase.data.Producto)
    let maquinas = [];
    props.trayendoCategorias(sub_rubros);

    // const trayendoCategorias = () => {
    //     if(sub_rubros){
    //       const arrayParse = Object.values(sub_rubros);
    //       arrayParse.forEach(elemento => {
    //         maquinas.push(elemento);
    //       })
    //     }
    //   }

    return (<h1></h1>)
}

export default Cfg

