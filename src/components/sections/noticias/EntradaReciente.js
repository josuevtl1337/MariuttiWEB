import React from 'react'
//Importar el storage
import "firebase/firebase-storage";
import firebase from "firebase/app"

export default function EntradaReciente(props) {
    
    const [url, setUrl] = React.useState('');
    var imagen = props.img;
    if (imagen) {
        var pathImagen = firebase
        .storage()
        .ref(imagen)
        .getDownloadURL()
        .then(url => {
            setUrl(url);
        })
        .catch(error => {
            console.log(error.message);
        });
    }
    return(
        <div className="entrada-reciente">
            <img className="er-img" src={url}/>
            <div className="er-text">
                <p className="er-title">{props.title}</p>
                <p className="er-date">{props.date}</p>
            </div>
        </div>
    )
}