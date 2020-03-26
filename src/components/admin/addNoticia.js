import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


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

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classesSelect = useStylesSelect();
  const [nombre , setNombre] = React.useState('');
  const [descripcion , setDescripcion] = React.useState('');
  const [file , setFile] = React.useState('');

  const onChangeTitulo = e => {
    setNombre(e.target.value);
  }
  const onChangeDescripcion = e => {
    setDescripcion(e.target.value);
  }
  const handleFile = e =>{
    setFile(e.target.files[0]);
  }

  const handleOnClick = e => {
    // console.log(props.sub_rubros);
    props.handleUploadNoticia(nombre,descripcion,file)
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Fab size="small" color="secondary" aria-label="add" type="button" onClick={handleOpen}>
      <AddIcon />
      </Fab>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <Container className={classes.paper}>
          <div className="container">
                {/* Sub-Rubro */}
                <FormControl className={classesSelect.formControl}>      
                {/* Nombre Noticia */}
                <TextField id="standard-basic" label="Titulo Noticia" onChange={onChangeTitulo}/>
                {/* Descripcion */}
                <TextField id="standard-basic" label="Descripción" onChange={onChangeDescripcion}/>
                {/* {Imagen} */}
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleFile} />
                <label  htmlFor="icon-button-file">
                  <IconButton  color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
                {/* Boton de enviar */}
                <Button variant="contained" color="primary" onClick={handleOnClick}>
                  Enviar
                </Button>
                </FormControl>
                </div>
         </Container>     
        </Modal>
      </React.Fragment>
    );
}
