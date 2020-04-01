import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

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
    position: 'absolute',
    width: '80%',
    height: '80%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const useStylesSelect = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
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
      <button type="button" onClick={handleOpen}>
        Agregar
      </button>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>


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
        </FormControl>
        <br />
        <br />
        <br />
      
        <br />
        <br />
        <br />
        {/* Text Input */}
        <TextField id="standard-basic" label="Nombre Sub_Rubro" onChange={onChangeInput}/>
        <br />
        <br />
        <br />
        {/* Boton de enviar */}
        <Button variant="contained" color="primary" onClick={handleOnClick}>
          Enviar
        </Button>
        <br />
        <br />
        <br />
        <label>{ruta}</label>
        </div>
      </Modal>
    </div>
  );
}
