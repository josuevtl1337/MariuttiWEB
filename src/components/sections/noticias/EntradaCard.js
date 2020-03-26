import React from 'react'
import './EntradaCard.css'
//Importar el storage
import "firebase/firebase-storage";
import firebase from "firebase/app"


export default function EntradaCard  (props) {

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
                {/* <img src={"https://baumeister.qodeinteractive.com/wp-content/uploads/2017/11/blog-post-2.jpg"} className="entradacard-img"/> */}
                <img src={url} className="entradacard-img"/>
            </div>

            <div className="entrada-contentwrap">
                <p className="entrada-cardtitle">
                    {props.title}
                </p>
<<<<<<< HEAD
                <p className="entrada-fecha">
                    {fechaParseada}
=======
                <p className="entrada-date">
                    {props.date}
>>>>>>> 5f890188c6c21fd8a2f044639547261b057e2c40
                </p>
                <p className="entrada-cardtext">
                    {props.text}
                </p>
                <a className="vermas" href="http://">Ver Más</a>
            </div>
        </div>
    )
}

