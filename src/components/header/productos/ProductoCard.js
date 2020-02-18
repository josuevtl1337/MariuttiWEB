import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
    <div className="productWrapper">
      <Paper variant="outlined" className="paperStyle">
        <img src={Balde} className="prodImg"/>
        <div>
          <Typography gutterBottom variant="h5" component="h2">
            Taladro x-200PRO
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            El mejor taladro.
          </Typography>
        </div>
      </Paper>
    </div>
  );
}
