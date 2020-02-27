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

import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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

export default function SimpleModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
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

  const handleOnClick = e => {
    console.log(nombre);
    console.log(subtitulo);
    console.log("Descripcion:",descripcion);
    console.log("Enlace:",enlace);
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
        style={{zIndex: 400}}
      >
        <Grid container  xs={9} className={classes.paper}>
              {/* Sub-Rubro */}
              <FormControl className={classesSelect.formControl}>
                <div className="container">
                <InputLabel id="subRubro">Sub-Rubro</InputLabel>
                <Select
                  labelId="subRubroId"
                  id="subRubro"
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
              {/* Nombre Producto */}
              <TextField id="standard-basic" label="Nombre Poroducto" onChange={onChangeNombre}/>
              <br />
              <br />
              <br />
              {/* Subtitulo */}
              <TextField id="standard-basic" label="Subtitulo" onChange={onChangeSubtitulo}/>
              <br />
              <br />
              <br />
              {/* Descripcion */}
              <TextField id="standard-basic" label="Descripción" onChange={onChangeDescripcion}/>
              <br />
              <br />
              <br />
              {/* Enlace */}
              <TextField id="standard-basic" label="Enlace Youtbe" onChange={onChangeEnlace}/>
              <br />
              <br />
              <br />

              {/* {Imagen} */}
              <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
              <label  htmlFor="icon-button-file">
                <IconButton  color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>

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
                </div>
              </FormControl>
       </Grid>     
      </Modal>
    </div>
  );
}
