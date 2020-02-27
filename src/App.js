import React, { Component } from 'react';
import Navbar from "./components/layout/Navbar";
import Sidenav from "./components/layout/Sidenav";
import Backdrop from "./components/layout/Backdrop";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/header/Home"
import About from "./components/header/About"
import Productos from "./components/header/productos/Productos"
import Contact from "./components/header/Contact"
import Admin from "./components/header/admin/Admin3"
import AdminNav from "./components/header/admin/AdminNav"
// import fbConfig from "./components/config/fbConfig"
// import firebase from "firebase/app";



class App extends Component {

  state = {
    sidenavOpen : false
  };

  sidenavTriggerClickHandler = () => {
    this.setState((prevState) => {
      return {sidenavOpen: !prevState.sidenavOpen}
    })
  };

  backdropClickHandler = () => {
    this.setState({sidenavOpen: false})
  }

  render(){
    let navbar;
    let backdrop;
    let sidenav;
    let adminnav;

    if (this.state.sidenavOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler}/>
      sidenav = <Sidenav itemClickHandler={this.sidenavTriggerClickHandler} show={this.state.sidenavOpen}/>
    }

    if (window.location.href.includes('admin')) {
      adminnav = <AdminNav />
      navbar = null;
    } else {
      navbar = <Navbar sidenavClickHandler={this.sidenavTriggerClickHandler}/>
      adminnav = null
    }

    return (
      <BrowserRouter>
        {adminnav}
        {navbar}
        {sidenav}
        {backdrop}
        <Route exact path="/inicio" component={Home} />
        <Route path="/nosotros" component={About} />
        <Route path="/productos" component={Productos} />
        <Route path="/contacto" component={Contact} />
        <Route path="/admin" component={Admin} />
      </BrowserRouter>
    );
  }
}

export default App;

