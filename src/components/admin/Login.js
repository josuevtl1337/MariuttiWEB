import React, { useState, useEffect } from 'react';
import  'firebase/database'
import "./admin.css"
import 'firebase/auth'
//MaterialUi
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const Login = (props) => {
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
        <Container>
            <div className="contactblock">
                <form className="loginform">
                    <h4 className="center">Login Admin</h4>
                    <h4 style={{color: "red"}} className="center">{props.error}</h4>
                    <TextField required id="standard-required" label="Email"  onChange={handleOnchangeEmail} defaultValue="" />
                    <TextField required id="standard-required" type="password" label="Password" onChange={handleOnchangePW} defaultValue="" />   
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Enviar</Button>
                </form>         
            </div>
        </Container>   
        ) 
}
export default Login;

