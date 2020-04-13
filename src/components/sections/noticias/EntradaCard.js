import React, { useState, useEffect } from 'react';
import './EntradaCard.css'
//Importar el storage
import "firebase/firebase-storage";
import firebase from "firebase/app"


export default function EntradaCard (props) {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

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
        <div className="entradacard">
            <div className="entradacard-imgwrap">
                <img src={url} className="entradacard-img" onClick={props.click}/>
            </div>

            <div className="entrada-contentwrap">
                <p className="entrada-cardtitle" onClick={props.click}>
                    {props.title}
                </p>
                <p className="entrada-date">
                    {fechaParseada}
                </p>
                <p className="entrada-cardtext">
                    {props.text}
                </p>
                <a className="vermas" onClick={props.click}>Ver Más</a>
            </div>
        </div>
    )
}

