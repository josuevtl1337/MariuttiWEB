import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Balde from "./taladroX.jpg"
import './ProductoCard.css'
import Fab from '@material-ui/core/Fab';
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';

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

// Recortar texto
const cardtext = "Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio."
var result = cardtext.substring(0, 80) + '...';


export default function MediaCard() {
  const classes = useStyles();

  return (
    <div className="paper-style">
      <div className="imgwrap">
        <img src={Balde} className="prodimg"/>
      </div>
      
      <div className="fabGreen">
        <p className="fabtitle">Ver más</p>
        <i class="material-icons entericon">
          transit_enterexit
        </i>
        
      </div>
      <div className="contentwrap">
        <p className="prodcardtitle">
          Un nombre copado
        </p>
        <p className="prodcardsub">
          {result}
        </p>
      </div>
    </div>
  );
}
