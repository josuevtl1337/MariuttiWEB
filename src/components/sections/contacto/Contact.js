import React from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

const Contact = (props)=>{
    const classes = useStyles();

    return (
        <form className={classes.root}>
        <div>
            <h4 className="center">Contact</h4>
            <p>Lorem, icta culpa, ipsum itaque aliquid, doloribus se perspiciatis.</p>
            <TextField required id="standard-required" label="Nombre" defaultValue="Empresa" />
            <TextField required id="standard-required" label="Email"  defaultValue="empresa@empresa.com" />
            <TextField required id="standard-required" label="Asunto" multiline rows="4" defaultValue="Hello..." />
            <Button variant="contained" color="primary">Enviar</Button>
        </div>
        </form>
    )
}

export default Contact
