import React from 'react'
import '../noticias/EntradaCard.css'
//Importar el storage
import "firebase/firebase-storage";
import firebase from "firebase/app"

export default function EntradaLista (props) {

    const [url, setUrl] = React.useState('');

    var months = ['de Enero','de Febrero','de Marzo,','de Abril,','de Mayo,','de Junio,','de Julio,','de Agosto,','de Septiembre,','de Octubre,','de Noviembre,','de Diciembre,'];

    var date = new Date(props.date);

    var day = date.getDate();
    var month = months[date.getMonth()];
    var year = date.getFullYear();

    var fechaParseada = day + ' ' + month + ' ' + year + ' ';

    let imagen = props.img;
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
        <div className="entradacelu" onClick={props.handlerOnClickNoticia}>
            <div className="entradacelu-wrap">
                <p className="entradacelu-title" style={{color: '#424242'}}>
                    {props.title}
                </p>
                <p className="entradacelu-date" style={{color: '#818181'}}>
                    {fechaParseada}
                </p>
                <p className="entradacelu-text" style={{color: "#5e5e5e"}}>
                    {props.text}
                </p>
                
                
            </div>
            <div className="hcc-divider entrada"/>
        </div>
    )
}