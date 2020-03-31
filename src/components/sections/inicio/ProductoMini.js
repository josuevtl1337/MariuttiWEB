import  React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../productos/ProductoCard.css'
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
  // var result = props.subtitulo.substring(0, 80) + '...';

  return (
    <div className="paper-style mini">
      <div className="imgwrap">
        <img src={url} className="prodimg"/>
      </div>
      
      <div className="fabGreen">
        <p className="fabtitle">Ver más</p>
        <i className="material-icons entericon">
          transit_enterexit
        </i>
      </div>

      <div className="contentwrap mini">
        <p className="prodcardtitle mini">
         {props.titulo}
        </p>
        <p className="prodcard-cat">
          {props.subtitulo}
        </p>
      </div>
      
    </div>
  );
}
