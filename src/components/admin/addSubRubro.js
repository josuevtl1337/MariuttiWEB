import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Container from '@material-ui/core/Container';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    width:'50%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'space-around'
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
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classesSelect = useStylesSelect();
  const [rubro, setRub] = React.useState('');
  const [subRubro, setSub] = React.useState('');
  const [ruta, setRuta] = React.useState('');

  const handleChangeRub = event => {
    setRub(event.target.value);
    console.log(rubro);
  };
  const onChangeInput = e => {
    setSub(e.target.value);
  }
  const handleOnClick = () =>{
    console.log(rubro+" "+subRubro);
    setRuta(rubro+"/"+subRubro);
    props.handleUpload(subRubro,rubro,"Sub_Rubro");
    setOpen(false);
  }
  return (
    <div>
      {/* <div className="addbtn" onClick={handleOpen}>
        <span>
        Agregar Subrubro 
        </span>
        <i className="material-icons">
          add
        </i>
      </div> */}

      <div className="tablebtn" style={{display: 'flex', alignItems: 'center', padding: '8px 12px', cursor: 'pointer', color:'#736342'}} onClick={handleOpen}>
        <i className="material-icons" style={{marginRight: 4}} >add_circle_outline</i>
        <p style={{margin: 0, fontFamily: 'roboto', fontSize: 14}} >Agregar Sub Rubro</p>
      </div>

      <Modal
        disableBackdropClick="false"
        open={open}
        onClose={handleClose}
        style={{overflow: 'auto'}}
      >
        <div className="addprodform subr">

          <h3 className="modaltitle">Nuevo Subrubro</h3>


          <FormControl className={classesSelect.formControl}>

            {/* Rubro   */}
            <InputLabel id="rubro">Rubro</InputLabel>
            <Select
              labelId="rubroId"
              id="sss"
              value={rubro}
              onChange={handleChangeRub}
            >
              <MenuItem value={"r1"}>MAQUINAS Y HERRAMIENTAS</MenuItem>
              <MenuItem value={"r2"}>OBRA Y CONSTRUCCIÓN</MenuItem>
              <MenuItem value={"r3"}>FERRETERIA INDUSTRIAL</MenuItem>
        
            </Select>
        

            {/* Text Input */}
            <TextField id="standard-basic" label="Nombre Subrubro" onChange={onChangeInput}/>

            {/* Botones enviar y cancelar */}
            <div className="formbtns">
              <Button variant="contained" className={classesSelect.color2} onClick={handleClose} style={{marginTop: 24}}>
                Cancelar
              </Button>
              <Button variant="contained" className={classesSelect.color} onClick={handleOnClick} style={{marginTop: 24}}>
                Enviar
              </Button>
            </div>

            <label>{ruta}</label>
          </FormControl>
        </div>

      </Modal>
    </div>
  );
}
