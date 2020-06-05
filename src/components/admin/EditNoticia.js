import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
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
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    width:'100%',
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
    backgroundColor: '#18AF31',
    color: '#ffffff',
    width: 100,
    '&:hover': {
      backgroundColor: '#87DF87'
    }
  }
}));

export default function SimpleModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    //Seteo los props en mi estado local
    setNombre(props.datosNoticia.data.nombre); 
    setDescripcion(props.datosNoticia.data.descripcion); 
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const classesSelect = useStylesSelect();

  const [nombre, setNombre] = React.useState('');
  const [descripcion, setDescripcion] = React.useState('');
 



  const onChangeNombre = e => {
    setNombre(e.target.value);
  }
  const onChangeDescripcion = e => {
    setDescripcion(e.target.value);
  }

  const handleOnClick = e => {
    // console.log(props.datosNoticia.data);
    props.handleEditNoticia(nombre,descripcion,props.datosNoticia.data.id);
    // recorriendoArray();
    setOpen(false);
  }

  return (
    <React.Fragment>
      <IconButton>
      <EditIcon color="action" onClick={handleOpen}/>
      </IconButton>
  
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
          style={{overflow: 'auto'}}

        >
          <div className="addprodform">   
          <FormControl className={classesSelect.formControl}>           
                {/* Nombre Producto */}
                <TextField id="standard-basic" label="Nombre Producto" defaultValue={props.datosNoticia.data.nombre} onChange={onChangeNombre}/>
                {/* Descripcion */}
                <TextField id="standard-basic" label="Descripción" multiline rows="18" defaultValue={props.datosNoticia.data.descripcion} onChange={onChangeDescripcion}/>          
                {/* Boton de enviar */}
                <Button variant="contained" className={classesSelect.color} onClick={handleOnClick}>
                  Guardar
                </Button>
                </FormControl>       
                </div>
        </Modal>
      </React.Fragment>
    );
}
