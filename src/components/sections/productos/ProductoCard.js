import  React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Balde from "./taladroX.jpg"
import './ProductoCard.css'
import Fab from '@material-ui/core/Fab';
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';
//Importar el storage
import "firebase/firebase-storage";
import firebase from "firebase/app"

const useStyles = makeStyles({
  card: {
    maxWidth: 250,
  },
  media: {
    height: 100,
  },
  fabGreen: {
    backgroundColor: 'green',
    '&:hover': {
      backgroundColor: 'green',
      display: 'block'
    },
  },
});


export default function MediaCard(props) {
  const classes = useStyles();
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
  // Recortar texto
  var result = props.subtitulo.substring(0, 80) + '...';

  return (
    <div className="paper-style">
      <div className="imgwrap">
        <img src={url} className="prodimg"/>
      </div>
      
      <div className="fabGreen">
        <p className="fabtitle">Ver más</p>
        <i className="material-icons entericon">
          transit_enterexit
        </i>
        
      </div>
      <div className="contentwrap">
        <p className="prodcardtitle">
         {props.titulo}
        </p>
        <p className="prodcardsub">
          {result}
        </p>
      </div>
    </div>
  );
}
