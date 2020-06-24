import React, {useEffect} from 'react';
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
import NativeSelect from '@material-ui/core/NativeSelect';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//Iconos
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import { animateScroll } from "react-scroll";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-around'
  },
  color:{
    backgroundColor: '#18AF31',
    color: '#ffffff',
    width: 100,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#87DF87',
      boxShadow: 'none',
    }
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
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const classesSelect = useStylesSelect();
  const [subRubro, setSub] = React.useState('');
  const [nombre, setNombre] = React.useState('');
  const [codigo , setCodigo] = React.useState('');
  const [precio , setPrecio] = React.useState('');
  const [precioAntiguo , setPrecioAntiguo] = React.useState('');
  const [subtitulo, setSubtitulo] = React.useState('');
  const [descripcion, setDescripcion] = React.useState('');
  const [enlace, setEnlace] = React.useState('');
  const [off, setOff] = React.useState('');
  const [file, setFile] = React.useState('');
  const [pdf, setPdf] = React.useState('');
  const [fileRef, setFileRef] = React.useState('');
  const [pdfRef, setPdfRef] = React.useState('');
  const [fileName, setFileName] = React.useState('');
  const [pdfName, setPdfName] = React.useState('No hay PDF Cargado');
  const [pdfDelete, setPdfDelete] = React.useState(false);
  const [pdfTrue, setPdfTrue] = React.useState(false);
  const handleOpen = () => {
    // this.scrollToBottom();

    setOpen(true);
    //Seteo los props en mi estado local
    console.log(props.datosProductos.data.pdf);
    setNombre(props.datosProductos.data.nombre); 
    setSubtitulo(props.datosProductos.data.subtitulo); 
    setDescripcion(props.datosProductos.data.descripcion); 
    setSub(props.datosProductos.data.sub_rubro);
    setOff(props.datosProductos.data.off);
    setEnlace(props.datosProductos.data.enlace);
    setPrecio(props.datosProductos.data.precio);
    setPrecioAntiguo(props.datosProductos.data.precioAntiguo);
    setCodigo(props.datosProductos.data.codigo);
    setFileName("BD: "+props.datosProductos.data.img);
    setFileRef(props.datosProductos.data.img);
    if(props.datosProductos.data.pdf!=undefined){
      setPdfTrue(true);
      setPdfRef(props.datosProductos.data.pdf);
      setPdfName("BD: "+props.datosProductos.data.pdf);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeSub = event => {
    setSub(event.target.value);
    console.log(subRubro);
  };

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
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name)
  }
  const handlePdf = e =>{
    setPdf(e.target.files[0]);
    setPdfName(e.target.files[0].name)
  }
  const handleDeletePdf = e =>{
    var result = window.confirm("Quieres borrar el PDF de este Producto?");
    if(result==true){
      setPdfDelete(true);
      if(pdfDelete==true){
        props.handleDeletePdf(pdfRef,props.datosProductos.data.id);
      }  
      setPdfName('No hay PDF Cargado');
      setPdfTrue(false);
    }
  }
  const onClickOfertaHandler = e => {
    if (off == false){
      setOff(true);  
    }else {
      setOff(false);  
    }
  }

  const handleOnClick = e => {
    console.log("Imagen:",file);

    setAlertOpen(true)

    //DESCOMENTAR ESTO ANTES DEL DEPLOY
    if(file != ''){
      props.handleEditFiles(file,fileRef,props.datosProductos.data.id,nombre,subtitulo,descripcion,enlace,subRubro,off,precio,precioAntiguo,codigo);
    }
    if(pdf != ''){
      props.handleEditPdf(pdf,pdfRef,props.datosProductos.data.id,nombre,subtitulo,descripcion,enlace,subRubro,off,precio,precioAntiguo,codigo);
    }
    if(pdf == '' && file == ''){
      props.handleEditProducto(nombre,subtitulo,descripcion,enlace,subRubro,off,props.datosProductos.data.id,precio,precioAntiguo,codigo); 
    }

    if(pdfDelete==true){
      props.handleDeletePdf(pdfRef,props.datosProductos.data.id);
    }
    // recorriendoArray();
    setOpen(false);
  }

  const retornando2 = props.sub_rubros.map((item, key) =>
  <option   value={item.id}  key={key}>
    {item.nombre}
  </option>
  );

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };



  return (
    <React.Fragment>
      <IconButton>
      <EditIcon color="action" onClick={handleOpen}/>
      </IconButton>
  
        <Modal
          disableBackdropClick="false"
          open={open}
          onClose={handleClose}
          style={{overflow: 'auto'}}
        >
          
          <div className="addprodform">
            <h3 className="modaltitle">Editar Producto</h3>

                {/* Sub-Rubro */}
                <FormControl className={classesSelect.formControl}>
                  <NativeSelect
                    id="sub_rubro"
                    value={subRubro}
                    onChange={handleChangeSub}
                    defaultValue={props.datosProductos.data.sub_rubro}
                    inputProps={{
                      name: 'name',
                      id: 'uncontrolled-native',
                    }}
                  >
                  {retornando2}
                  </NativeSelect>        
              
            <div className={classesSelect.dosInput}>
                {/* Nombre Producto */}
                <TextField id="standard-basic" label="Nombre Producto" defaultValue={props.datosProductos.data.nombre} onChange={onChangeNombre}/>
                {/* Código Producto, falta defaultValue */}
                <TextField id="cod" label="Código" defaultValue={props.datosProductos.data.codigo} onChange={onChangeCodigo} style={{width: '48%'}}/>

            </div>

            {/* Los dos Precios */}
            <div className={classesSelect.dosInput}>
              {/* Precio actual  FALTA valor y valor por defecto*/}
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item style={{padding: 8}}>
                  <p style={{margin: 0, color: 'green'}}>$</p>
                </Grid>
                <Grid item>
                  <TextField
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    defaultValue={props.datosProductos.data.precio}
                    id="input-with-icon-grid" 
                    label="Precio Actual" 
                    onChange={onChangePrecio}
                    style={{width: '100%'}}
                    />
                </Grid>
              </Grid>

              {/* precio viejo FALTA valor y valor default*/}
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item style={{padding: 8}}>
                  <p style={{margin: 0, color: 'red'}}>$</p>
                </Grid>
                <Grid item>
                  <TextField
                    id="input-with-icon-grid" 
                    label="Precio Antiguo"
                    defaultValue={props.datosProductos.data.precioAntiguo}
                    onChange={onChangePrecioAntiguo}
                    style={{width: '100%'}}
                    />
                </Grid>
              </Grid>
            </div>

                {/* Subtitulo */}
                <TextField id="standard-basic" label="Subtitulo" defaultValue={props.datosProductos.data.subtitulo} onChange={onChangeSubtitulo} style={{marginTop: 12}}/>
                {/* Descripcion */}
                <TextField id="standard-basic" label="Descripción" multiline rows="8" defaultValue={props.datosProductos.data.descripcion} onChange={onChangeDescripcion} style={{marginTop: 12}}/>
                {/* Enlace */}
                <TextField id="standard-basic" label="Enlace Youtbe" defaultValue={props.datosProductos.data.enlace} onChange={onChangeEnlace} style={{marginTop: 12}}/>
                <FormControlLabel
                  checked={off}
                  control={<Switch color="primary" />}
                  label="Oferta"
                  labelPlacement="end"
                  onClick={onClickOfertaHandler}
                  style={{marginTop: 12}}
                />

                {/* {Imagen} */}
                <div className={classesSelect.flexHorizontal} style={{marginTop: 12}}>

                  <div>
                    <input accept="image/*" className={classes.input} id="icon-button-file" type="file" 
                    onChange={handleFile} 
                    />
                      <label  htmlFor="icon-button-file">
                      <IconButton  color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                      </IconButton>
                    </label>
                  </div>

                  {fileName}

                </div>
  
                {/* PDF */}
                <div className={classesSelect.flexHorizontal}>

                  <div>

                    <input className={classes.input} id="icon-button-pdf" type="file" accept="application/pdf" 
                    onChange={handlePdf} 
                    />
                    <label  htmlFor="icon-button-pdf">
                      <IconButton  color="primary" aria-label="upload picture" component="span">
                        <PictureAsPdfIcon />
                      </IconButton>
                    </label>

                  </div>

                  {pdfName}
                  {pdfTrue ? 
                  <IconButton  onClick={handleDeletePdf} color="secondary" aria-label="upload picture" component="span">
                    <DeleteForeverIcon />
                  </IconButton> : console.log("#")
                  }
                </div>
  
                {/* Botones enviar y cancelar */}
                <div className="formbtns">
                  <Button variant="contained" className={classesSelect.color2} onClick={handleClose} style={{marginTop: 24}}>
                    Cancelar
                  </Button>
                  <Button variant="contained" className={classesSelect.color} onClick={handleOnClick} style={{marginTop: 24}}>
                    Guardar
                  </Button>
                </div>
                </FormControl>
                </div>  
        </Modal>
        <Snackbar open={alertOpen} autoHideDuration={1700} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity="success">
            ¡Cambios Guardados! Recargue la página para verlos.
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
}
