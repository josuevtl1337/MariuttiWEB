import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
        <img src={Balde} className="prodimg"/>
      </div>
        
      <div className="contentwrap">
        <p className="prodcardtitle">
          Un nombre copado
        </p>
      </div>
    </div>
  );
}
