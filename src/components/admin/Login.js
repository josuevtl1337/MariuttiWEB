import React, { useState, useEffect } from 'react';
import  'firebase/database'
import "./admin.css"
import 'firebase/auth'
//MaterialUi
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import SimpleLogo from '../../visuals/logoplano-small.png'

const useStylesSelect = makeStyles(theme => ({
    color:{
      backgroundColor: '#274582',
      color: '#ffffff',
      width: 100,
      marginTop: 32,
      '&:hover': {
        backgroundColor: '#FDB913'
      }
    }
  }));

const Login = (props) => {
    const classesSelect = useStylesSelect();
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const handleOnchangePW = (e) =>{
        setPassword(e.target.value);
      }
    const handleOnchangeEmail = (e) =>{
    setEmail(e.target.value);
    }
    const handleSubmit = () =>{
        props.handleSubmitDragon(email,password);
    }
      return(
        <div className="bglogin">
          <div className="login">
            <form className="loginform">
                <div className="loginlogo">
                  <img className="simplelogo" src={SimpleLogo}/>
                </div>
                <h4 className="logintitle">Credenciales para la sección de administrador</h4>
                <h4 style={{color: "red"}} className="center">{props.error}</h4>
                <TextField required id="standard-required" label="Email"  onChange={handleOnchangeEmail} defaultValue="" />
                <TextField required id="standard-required" type="password" label="Password" onChange={handleOnchangePW} defaultValue="" />   
                <Button variant="contained" className={classesSelect.color} onClick={handleSubmit}>Entrar</Button>
            </form>         
          </div>
        </div>
         
        ) 
}
export default Login;

