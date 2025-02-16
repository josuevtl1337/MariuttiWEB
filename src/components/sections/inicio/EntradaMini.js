import React from 'react'
import '../noticias/EntradaCard.css'
//Importar el storage
import "firebase/firebase-storage";
import firebase from "firebase/app"

export default function EntradaMini (props) {

    var months = ['de Enero','de Febrero','de Marzo,','de Abril,','de Mayo,','de Junio,','de Julio,','de Agosto,','de Septiembre,','de Octubre,','de Noviembre,','de Diciembre,'];

    var date = new Date(props.date);

    var day = date.getDate();
    var month = months[date.getMonth()];
    var year = date.getFullYear();

    var fechaParseada = day + ' ' + month + ' ' + year + ' ';

    const [url, setUrl] = React.useState('');
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
        <div className="entradamini" onClick={props.handlerOnClickNoticia}>
            <div className="entradamini-imgwrap">
                <img src={url} className="entradacard-img"/>
            </div>

            <div className="entrada-contentwrap">
                <p className="entradamini-cardtitle">
                    {props.title}
                </p>
                <p className="entrada-date">
                    {fechaParseada}
                </p>
                <p className="entrada-cardtext" style={{marginBottom: 8, fontSize: 15, letterSpacing: 'unset'}}>
                    {props.text}
                </p>
            </div>
        </div>
    )
}