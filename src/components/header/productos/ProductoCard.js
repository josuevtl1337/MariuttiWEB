import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Balde from "./taladroX.jpg"
import './ProductoCard.css'

const useStyles = makeStyles({
  card: {
    maxWidth: 250,
  },
  media: {
    height: 100,
  },
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <div className="paper-style">
      <div className="imgwrap">
        <div className="imghover"><span>Ver Más</span></div>
        <img src={Balde} className="prodimg"/>
      </div>
        
      <div className="contentwrap">
        <Typography gutterBottom variant="h5" component="h2">
          Nombre
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Categoría
        </Typography>
      </div>
    </div>
  );
}
