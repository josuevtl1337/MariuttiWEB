import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
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

export default function SimpleModal() {
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
  const [categoria, setCategoria] = React.useState('');
  const [ruta, setRuta] = React.useState('');

  const handleChangeRub = event => {
    setRub(event.target.value);
    console.log(rubro);
  };
  const handleChangeSub = event => {
    setSub(event.target.value);
    console.log(subRubro);
  };

  const handleOnClick = ()=>{
    console.log(rubro+" "+subRubro+" "+categoria);
    setRuta(rubro+" "+subRubro+" "+categoria);
  }
  const onChangeInput = e => {
    setCategoria(e.target.value);
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
          <MenuItem value={1}>MAQUINAS Y HERRAMIENTAS</MenuItem>
          <MenuItem value={2}>OBRA Y CONSTRUCCIÓN</MenuItem>
    
        </Select>
        </FormControl>
        <br />
        <br />
        <br />
        {/* Sub-Rubro */}
        <FormControl className={classesSelect.formControl}>
        <InputLabel id="subRubro">Sub-Rubro</InputLabel>
        <Select
          labelId="subRubroId"
          id="aaa"
          value={subRubro}
          onChange={handleChangeSub}
        >
          <MenuItem value={3}>Ferretería Industrial</MenuItem>
          <MenuItem value={4}>Herramientas Eléctricas</MenuItem>
          <MenuItem value={5}>Herramientas Explosión</MenuItem>
          <MenuItem value={6}>Herramientas Neumáticas</MenuItem>
          <MenuItem value={7}>Indumentaria Y Seguridad</MenuItem>
    
        </Select>
        <br />
        <br />
        <br />
        {/* Text Input */}
        <TextField id="standard-basic" label="Nombre Categoría" onChange={onChangeInput}/>
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
        </FormControl>
   
        </div>
      </Modal>
    </div>
  );
}
