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
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FilledInput from '@material-ui/core/FilledInput';

import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  }
}));
const useStylesSelect = makeStyles(theme => ({
  formControl: {
    // disableScrollLock:true,
    // overFlow:'scroll',
    // height:"600px",
    // overflow:'scroll',
    // overflowX:'hidden',
    // margin: theme.spacing(1),
    width: '85%',
    height: '100%',
    // height: 'max-content',
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
  flexHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 'max-content'
  },
  dosInput: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 12
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
  const [codigo , setCodigo] = React.useState('');
  const [precio , setPrecio] = React.useState('');
  const [precioAntiguo , setPrecioAntiguo] = React.useState('');
  const [subtitulo , setSubtitulo] = React.useState('');
  const [descripcion , setDescripcion] = React.useState('');
  const [enlace , setEnlace] = React.useState('');
  const [file , setFile] = React.useState('');
  const [nameFile , setNameFile] = React.useState('');
  const [pdf , setPdf] = React.useState('');
  const [namePdf , setNamePdf] = React.useState('');
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
  const onChangePrecio = e => {
    setPrecio(e.target.value);
  }
  const onChangePrecioAntiguo = e => {
    setPrecioAntiguo(e.target.value);
  }
  const onChangeCodigo = e => {
    setCodigo(e.target.value);
  }
  const onChangeSubtitulo = e => {
    setSubtitulo(e.target.value);
  }
  const onChangeDescripcion = e => {
    setDescripcion(e.target.value);
  }
  const onChangeEnlace = e => {
    function getId(url) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
  
      return (match && match[2].length === 11)
        ? match[2]
        : null;
    }
    setEnlace("//www.youtube.com/embed/" + getId(e.target.value));
  }
  const handleFile = e =>{
    setNameFile(<h4>{e.target.files[0].name} <span style={{color: 'green'}}>✓</span></h4>);
    setFile(e.target.files[0]);
  }
  const handlePdf = e =>{
    // setNamePdf(e.target.files[0].name + );
    setNamePdf(<h4>{e.target.files[0].name} <span style={{color: 'green'}}>✓</span></h4>);
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
    props.handleUploadProducto(nombre,subtitulo,descripcion,enlace,subRubro,oferta,file,pdf,precio,precioAntiguo,codigo)(e);
    // console.log(oferta)
    console.log();
    setOpen(false);
  }

  const retornando = props.sub_rubros.map((item, key) => 
      <MenuItem name={item.nombre} value={item.id}  key={key} children={item.nombre} >
        {item.nombre} 
      </MenuItem>
  );

  return (
    <div>
      
      <div className="tablebtn" style={{display: 'flex', alignItems: 'center', padding: '8px 12px', cursor: 'pointer', color:'#736342'}} onClick={handleOpen}>
        <i className="material-icons" style={{marginRight: 4}} >add_circle_outline</i>
        <p style={{margin: 0, fontFamily: 'roboto', fontSize: 14}} >Agregar Producto</p>
      </div>

      <Modal
        open={open}
        disableBackdropClick="false"
        onClose={handleClose}
        style={{overflow: 'auto', }}
      >
        <div className="addprodform">


          {/* Sub-Rubro */}
              
          <FormControl className={classesSelect.formControl}>
          <h1 className="modaltitle">Nuevo Producto</h1>
          {/* <h3 className="modaltitle">t</h3> */}
            <InputLabel id="sbLabel" ></InputLabel>
            <Select
              id="sub_rubro"
              value={subRubro}
              name={subNombre}
              onChange={handleChangeSub}
              label="Subrubro"
            >           
              {retornando}    
            </Select>
            <div className={classesSelect.dosInput}>

              {/* Nombre Producto */}
              <TextField id="nombre" label="Nombre Producto" onChange={onChangeNombre} style={{width: '48%'}}/>

            {/* Código Producto, falta onChange */}
              <TextField id="cod" label="Código" onChange={onChangeCodigo} style={{width: '48%'}}/>

            </div>


            {/* Los dos Precios */}
            <div className={classesSelect.dosInput}>
              {/* Precio actual */}
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item style={{padding: 8}}>
                  <p style={{margin: 0, color: 'green'}}>$</p>
                </Grid>
                <Grid item>
                  <TextField
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    id="input-with-icon-grid" 
                    label="Precio Actual" 
                    value={precio}
                    onChange={onChangePrecio}
                    style={{width: '100%'}}
                    />
                </Grid>
              </Grid>

              {/* precio viejo */}
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item style={{padding: 8}}>
                  <p style={{margin: 0, color: 'red'}}>$</p>
                </Grid>
                <Grid item>
                  <TextField
                    id="input-with-icon-grid" 
                    label="Precio Antiguo" 
                    value={precioAntiguo}
                    onChange={onChangePrecioAntiguo}
                    style={{width: '100%'}}
                    />
                </Grid>
              </Grid>

             
            </div>

            {/* Subtitulo */}
            <TextField id="standard-basic" label="Subtitulo" onChange={onChangeSubtitulo} style={{marginTop: 12}}/>
            {/* Descripcion */}
            <TextField id="standard-basic" label="Descripción" multiline rows="10" onChange={onChangeDescripcion} style={{marginTop: 12}}/>
            {/* Enlace */}
            <TextField id="standard-basic" label="Enlace Youtbe" onChange={onChangeEnlace} style={{marginTop: 12, marginBottom: 12}}/>
            <FormControlLabel
              checked={oferta}
              control={<Switch color="primary" />}
              label="Oferta"
              labelPlacement="end"
              onClick={onClickOfertaHandler}
            />
                {/* {Imagen} */}
                <div className={classesSelect.flexHorizontal} style={{marginTop: 8}}>

                  <div>
                    <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleFile} />
                      <label  htmlFor="icon-button-file">
                      <IconButton  color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                      </IconButton>
                    </label>
                  </div>

                  {nameFile}

                </div>
  
                {/* PDF */}
                <div className={classesSelect.flexHorizontal}>

                  <div>

                    <input className={classes.input} id="icon-button-pdf" type="file" accept="application/pdf" onChange={handlePdf} />
                    <label  htmlFor="icon-button-pdf">
                      <IconButton  color="primary" aria-label="upload picture" component="span">
                        <PictureAsPdfIcon />
                      </IconButton>
                    </label>

                  </div>

                  {namePdf}

                </div>
                
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
    </div>
    );
}
