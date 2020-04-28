import React from "react"
import 'pure-react-carousel/dist/react-carousel.es.css';
import './ProductCarousel.css'
//Importar el storage
import "firebase/firebase-storage";
import firebase from "firebase/app"


export default function SlideWrapper (props) {
    const [url, setUrl] = React.useState('');
    console.log(props.id);
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
        <div className="slide-wrapper" onClick={()=>{props.handlerOnClickProducto(props.id)}}>
        <div className="car-prod-card">
            <div className="imgwrap carousel">                                   
                <img className="prodimg car" src={url}/>                                                 
            </div>
            <div className="car-prod-text">
                <p className="entrada-cardtitle carousel">{props.nombre}</p>
                <p className="entrada-cardtext carousel">{props.descripcion}</p>
            </div>
        </div>
        </div> 
    )
}