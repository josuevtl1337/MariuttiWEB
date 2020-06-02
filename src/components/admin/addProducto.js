import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    width:'50%',
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
      backgroundColor: '#FDB913'
    }
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
  const [subRubro , setSub] = React.useState('');
  const [subNombre , setSubNombre] = React.useState('');
  const [nombre , setNombre] = React.useState('');
  const [subtitulo , setSubtitulo] = React.useState('');
  const [descripcion , setDescripcion] = React.useState('');
  const [enlace , setEnlace] = React.useState('');
  const [file , setFile] = React.useState('');
  const [pdf , setPdf] = React.useState('');
  const [oferta , setOferta] = React.useState(false);

  const handleChangeSub = event => {
    // setSubNombre(event.target.name);
    // console.log(event.target.getAttribute('name'));
    setSub(event.target.value);
  };
  const handleChangeSubNombre = (event) => {
    console.log(event.taget)
    // setSubNombre(event.target.name);
  }
  const onChangeNombre = e => {
    setNombre(e.target.value);
  }
  const onChangeSubtitulo = e => {
    setSubtitulo(e.target.value);
  }
  const onChangeDescripcion = e => {
    setDescripcion(e.target.value);
  }
  const onChangeEnlace = e => {
    setEnlace(e.target.value);
  }
  const handleFile = e =>{
    setFile(e.target.files[0]);
  }
  const handlePdf = e =>{
    setPdf(e.target.files[0]);
  }
  const onClickOfertaHandler = e => {
    if (oferta == false){
      setOferta(true);  
    }else {
      setOferta(false);  
    }
  }

  const handleOnClick = e => {
    // console.log(nombre);
    // console.log(subtitulo);
    // console.log("Descripcion:",descripcion);
    // console.log("Enlace:",enlace);
    // console.log("Imagen:",file);
    // // console.log(subRubro);
    props.handleUploadProducto(nombre,subtitulo,descripcion,enlace,subRubro,oferta,file,pdf)(e);
    // console.log(oferta)
    console.log(nombre,subtitulo,descripcion,enlace,subRubro,file,oferta);
    setOpen(false);
  }

  const retornando = props.sub_rubros.map((item, key) => 
      <MenuItem name={item.nombre} value={item.id}  key={key} children={item.nombre} >
        {item.nombre} 
      </MenuItem>
  );

  return (
    <React.Fragment>
      <div className="addbtn" onClick={handleOpen}>
        <span>
        Agregar Producto 
        </span>
        <i className="material-icons">
          add
        </i>
      </div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        style={{overflow: 'auto'}}
      >
        <div className="addprodform">
          <h3 className="modaltitle">Nuevo Producto</h3>

          {/* Sub-Rubro */}
              
          <FormControl className={classesSelect.formControl}>

            <InputLabel id="subRubros">Sub-Rubros</InputLabel>

            <Select
              labelId="subRubroId"
              id="sub_rubro"
              value={subRubro}
              name={subNombre}
              onChange={handleChangeSub}
            >           
              {retornando}    
            </Select>                                   
            {/* Nombre Producto */}
            <TextField id="standard-basic" label="Nombre Producto" onChange={onChangeNombre}/>
            {/* Subtitulo */}
            <TextField id="standard-basic" label="Subtitulo" onChange={onChangeSubtitulo}/>
            {/* Descripcion */}
            <TextField id="standard-basic" label="Descripción" multiline rows="10" onChange={onChangeDescripcion}/>
            {/* Enlace */}
            <TextField id="standard-basic" label="Enlace Youtbe" onChange={onChangeEnlace}/>
            <FormControlLabel
              checked={oferta}
              control={<Switch color="primary" />}
              label="Oferta"
              labelPlacement="end"
              onClick={onClickOfertaHandler}
            />
                {/* {Imagen} */}
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleFile} />
                <label  htmlFor="icon-button-file">
                  <IconButton  color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
  
                {/* PDF */}
                <input className={classes.input} id="icon-button-pdf" type="file" accept="application/pdf" onChange={handlePdf} />
                <label  htmlFor="icon-button-pdf">
                  <IconButton  color="primary" aria-label="upload picture" component="span">
                    <PictureAsPdfIcon />
                  </IconButton>
                </label>
  
            {/* Boton de enviar */}
            <Button variant="contained" className={classesSelect.color} onClick={handleOnClick} style={{marginTop: 24}}>
              Enviar
            </Button>
          </FormControl>
        </div>
      </Modal>
    </React.Fragment>
    );
}
