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
import NativeSelect from '@material-ui/core/NativeSelect';
//Iconos
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import CreateIcon from '@material-ui/icons/Create';


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
    //Seteo los props en mi estado local
    setNombre(props.datosProductos.data.nombre); 
    setSubtitulo(props.datosProductos.data.subtitulo); 
    setDescripcion(props.datosProductos.data.descripcion); 
    setSub(props.datosProductos.data.sub_rubro);
    setEnlace(props.datosProductos.data.enlace);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classesSelect = useStylesSelect();
  const [subRubro, setSub] = React.useState('');
  const [nombre, setNombre] = React.useState('');
  const [subtitulo, setSubtitulo] = React.useState('');
  const [descripcion, setDescripcion] = React.useState('');
  const [enlace, setEnlace] = React.useState('');
  const [file, setFile] = React.useState('');

  const handleChangeSub = event => {
    setSub(event.target.value);
    console.log(subRubro);
  };

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

  const handleOnClick = e => {
    // console.log(nombre);
    // console.log(subtitulo);
    // console.log("Descripcion:",descripcion);
    // console.log("Enlace:",enlace);
    // console.log("Imagen:",file);
    // console.log(subRubro);
    // console.log(props.datosProductos.data);
    props.handleEditProducto(nombre,subtitulo,descripcion,enlace,subRubro,file,props.datosProductos.data.id);
    // recorriendoArray();
    setOpen(false);
  }

  const retornando2 = props.sub_rubros.map((item, key) =>
  <option   value={item.id}  key={key}>
    {item.nombre}
  </option>
);
  // {if(props.datosProductos.data.sub_rubro === item.id){
  //   const  sbEdit = item.id;
  // }}

  // const recorriendoArray = props.sub_rubros.map((item, key) =>{
  //   if (props.datosProductos.data.sub_rubro === item.id){
  //     const sbEdit = item.nombre;
  //   }return sbEdit;
  // }
  // const recorriendoArray = () =>{
  //   var sbEdit = '';
  //   const sb = props.sub_rubros;
  //   sb.forEach(elemento =>{
  //     if (props.datosProductos.data.sub_rubro === elemento.id){
  //       sbEdit = elemento.nombre;
  //       console.log(sbEdit)
  //     }return sbEdit;
  //   })
  // }


  return (
    <React.Fragment>
      {/* <Fab 
        // onClick={(event) => props.action.onClick(event, props.data)}
        onClick={handleOpen}
        size="small"                          
        // aria-label="edit" 
      >
       
      </Fab>    */}
  
      {/* <Fab  color="secondary" > 
      <CreateIcon color="action" onClick={handleOpen}/>
      </Fab>  */}
      <IconButton>
      <EditIcon color="action" onClick={handleOpen}/>
      </IconButton>
  
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
{/* 
                  <InputLabel id="subRubros">Sub-Rubros</InputLabel>

                  <Select
                    labelId="subRubroId"
                    id="sub_rubro"
                    value={subRubro ? subRubro : " "}
                    onChange={handleChangeSub}
                    defaultValue={props.datosProductos.data.sub_rubro}
                  >         
                    {retornando}
                  </Select>  */}

                  <InputLabel htmlFor="uncontrolled-native">Sub Rubros</InputLabel>
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
                {/* Nombre Producto */}
                <TextField id="standard-basic" label="Nombre Producto" defaultValue={props.datosProductos.data.nombre} onChange={onChangeNombre}/>
                {/* Subtitulo */}
                <TextField id="standard-basic" label="Subtitulo" defaultValue={props.datosProductos.data.subtitulo} onChange={onChangeSubtitulo}/>
                {/* Descripcion */}
                <TextField id="standard-basic" label="Descripción" defaultValue={props.datosProductos.data.descripcion} onChange={onChangeDescripcion}/>
                {/* Enlace */}
                <TextField id="standard-basic" label="Enlace Youtbe" defaultValue={props.datosProductos.data.enlace} onChange={onChangeEnlace}/>
                <FormControlLabel
                  value="end"
                  control={<Switch color="primary" />}
                  label="Oferta"
                  labelPlacement="end"
                />

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
