import React, { Component } from 'react'
import firebase from "firebase/app"
import "firebase/auth"
import "./auth.css"

class Auth extends Component {
    state={
        user:null
    }
    componentWillMount(){
        firebase.auth().onAuthStateChanged(user=>{
            this.setState({user})
            if(this.state.user){
                this.props.history.push("/")
            }
        })
    }
    handleAuth = (e) =>{     
        e.preventDefault();
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(cred =>{
            console.log(cred.user); 
        }).catch(err=>console.log(err.code))
    }
    render() {
        return (
            <div className="container pink divLogin">    
               <p className="flow-text loginp">Logueate con tu red social preferida</p>
               <div className="container">
                 <a className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons" onClick={this.handleAuth}>add</i></a>google
               </div>
            </div>
        )
    }
}

export default Auth
