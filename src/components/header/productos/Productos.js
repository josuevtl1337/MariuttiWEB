import React, { Component } from "react"
import ReactDOM from 'react-dom';
import SearchBar from "./SearchBar"
import CatalogoLista from "./CatalogoLista"
import CatListExp from "./CatListExp"
import CatalogoProductos from "./CatalogoProductos"
import firebase from "firebase/app"
import "firebase/firestore";

class Productos extends Component{
    state={
        data:[]
    }
    componentDidMount(){
        this.setState({
            data:[],
        });
        const db = firebase.firestore();
        // const dbRef = db.collection("UNIVERSO").doc("SUB_RUBRO").collection("CATEGORIA").doc("Producto").get()
        // .then(snapshot => {
        //     console.log(snapshot);
        //     snapshot.map((doc) => {
        //     console.log(doc.id, '=>', doc.data());
        //   });
        // }).catch((err) => {
        //   console.log('Error getting documents', err);
        // });
        

        // const dbRef = db.collection("UNIVERSO/SUB_RUBRO/CATEGORIA");
        // console.log(dbRef.id);
        // dbRef.add({
        //     request: "buff akali"
        // }).then(function(){
        //     console.log("Añadido a la bd");
        // }).catch(function(err){
        //     console.log("error: ",err);
        // });
        
        // .add({
        //     first: "Ada",
        //     last: "Lovelace"
        // })
        // .then(function(dbRef) {
        //     console.log("Document written with ID: ", dbRef.id);
        // })
        // .catch(function(error) {
        //     console.error("Error adding document: ", error);
        // });
        // dbRef.on("child_added", snapshot=>{
        //     this.setState({
        //         data:this.state.data.concat(snapshot.val())
        //     });
        // });
   
    }
    render(){
        return (
            <div className="container">
                <div className="row">
                    {/* <SearchBar/> */}
                </div>
                <div className="row">
                    <div className="col l3 m12"> <CatListExp /> </div>
                    <div className="col l9 m12"> <CatalogoProductos /> </div>
                </div>
                
            </div> 
        );
    }
}

export default Productos
