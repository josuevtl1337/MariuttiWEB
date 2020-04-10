import React, { Component } from 'react'
//Importar el storage
import "firebase/firebase-storage";
import firebase from "firebase/app"
import "firebase/auth";
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

class Login extends Component { 
    state = {
        user: null,
        loading:true,
  };
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user });
            if (this.state.user) {
                console.log("user logueado");
                this.props.history.push("/admin");
            }
        })
    }
    handleOnchangePW = (e) =>{
        this.setState({
          password: e.target.value
        });
      }
      handleOnchangeEmail = (e) =>{
        this.setState({
          email: e.target.value
        });
      }
      handleSubmitDragon = () => {
        const auth= firebase.auth();
        console.log("email: ",this.state.email, " pass:",this.state.password);
        auth.signInWithEmailAndPassword(this.state.email,this.state.password).then(cred=>{
          console.log(cred.user);
      })
    }
    render(){
        return(
            <Container>
                <div className="contactblock">
                <div>
                    <form className="contactform">
                        <h4 className="center">Admin Login</h4>
                        <TextField required id="standard-required" label="Email"  onChange={this.handleOnchangeEmail} defaultValue="" />
                        <TextField required id="standard-required" type="password" label="Password" onChange={this.handleOnchangePW} defaultValue="" />   
                        <Button variant="contained" color="primary" onClick={this.handleSubmitDragon}>Enviar</Button>
                    </form>
                </div>
                </div>
            </Container>        
        )
      }
}

export default Login;
