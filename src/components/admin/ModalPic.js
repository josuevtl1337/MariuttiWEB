import React from 'react';
//Importar el storage
import "firebase/firebase-storage";
import firebase from "firebase/app"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

//Iconos
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import CreateIcon from '@material-ui/icons/Create';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import Container from "@material-ui/core/Container"


const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    width:'50%',
    border: '2px solid #000',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'space-around'
  },
  input: {
    display: 'none',
  },
}));

const useStylesSelect = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1)
  }
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const classesSelect = useStylesSelect();
  const [nombre, setNombre] = React.useState('');
  const [url, setUrl] = React.useState('');

  let imagen = props.file.img;
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
  const handleOpen = () => {
    setOpen(true);
    console.log(props.file);
    setNombre(props.file.nombre);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>

      <IconButton>
      <ImageRoundedIcon color="action" onClick={handleOpen}/>
      </IconButton>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <Container className={classes.paper}>
          <div className="container">
            <h2>{nombre}</h2>
            <div className="imgwrap">
            <img src={url} className="prodimg"/>
          </div>
          </div>
         </Container>     
        </Modal>
      </React.Fragment>
    );
}
