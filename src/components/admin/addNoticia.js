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
    margin: theme.spacing(1),
    width: '85%',
    height: 550,
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-around'
  },
  color:{
    backgroundColor: '#274582',
    color: '#ffffff',
    width: 100,
    '&:hover': {
      backgroundColor: '#18AF31'
    },
    boxShadow: 'none'
  },
  color2:{
    backgroundColor: 'transparent',
    color: '##274582',
    width: 100,
    boxShadow: 'none',
    '&:hover': {
    boxShadow: 'none',
    backgroundColor: '#e8e8e8'
    },
    marginRight: 12
  },
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
  const [nameFile , setNameFile] = React.useState('');
  const [file , setFile] = React.useState('');

  const onChangeTitulo = e => {
    setNombre(e.target.value);
  }
  const onChangeDescripcion = e => {
    setDescripcion(e.target.value);
  }
  const handleFile = e =>{
    setNameFile(e.target.files[0].name+" ✓");
    setFile(e.target.files[0]);
  }

  const handleOnClick = e => {
    // console.log(props.sub_rubros);
    props.handleUploadNoticia(nombre,descripcion,file)
    setOpen(false);
  }

  return (
    <React.Fragment>
      <div className="tablebtn" style={{display: 'flex', alignItems: 'center', padding: '8px 12px', cursor: 'pointer', color:'#736342'}} onClick={handleOpen}>
        <i className="material-icons" style={{marginRight: 4}} >add_circle_outline</i>
        <p style={{margin: 0, fontFamily: 'roboto', fontSize: 14}} >Agregar Noticia</p>
      </div>
        <Modal
          disableBackdropClick="false"
          open={open}
          onClose={handleClose}
          style={{overflow: 'auto'}}
        >
          <div className="addprodform">
          <h3 className="modaltitle">Nueva Noticia</h3>

                {/* Sub-Rubro */}
                <FormControl className={classesSelect.formControl}>      
                {/* Nombre Noticia */}
                <TextField id="standard-basic" label="Titulo Noticia" onChange={onChangeTitulo}/>
                {/* Descripcion */}
                <TextField id="standard-basic"  multiline rows="18" label="Descripción" onChange={onChangeDescripcion}/>
                {/* {Imagen} */}
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleFile} />
                <label className="filebtn" htmlFor="icon-button-file">
                  <IconButton  color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                  </IconButton>
                <h4>{nameFile}</h4>
                </label>
                {/* Botones enviar y cancelar */}
                <div className="formbtns">
                  <Button variant="contained" className={classesSelect.color2} onClick={handleClose} style={{marginTop: 24}}>
                    Cancelar
                  </Button>
                  <Button variant="contained" className={classesSelect.color} onClick={handleOnClick} style={{marginTop: 24}}>
                    Enviar
                  </Button>
                </div>
                </FormControl>
                </div>  
        </Modal>
      </React.Fragment>
    );
}
