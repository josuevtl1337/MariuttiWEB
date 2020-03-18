import React, { Component } from 'react';
import Navbar from "./components/layout/Navbar";
import Sidenav from "./components/layout/Sidenav";
import Backdrop from "./components/layout/Backdrop";
import Footer from './components/layout/Footer.js'
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/sections/inicio/Home"
import About from "./components/sections/nosotros/About"
import Productos from "./components/sections/productos/Productos"
import Contact from "./components/sections/contacto/Contact"
import Admin from "./components/admin/Admin3"
import AdminNav from "./components/admin/AdminNav"
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
  };
 
  render(){
    let navbar;
    let backdrop;
    let sidenav;
    let adminnav;

    sidenav = <Sidenav itemClickHandler={this.sidenavTriggerClickHandler} show={this.state.sidenavOpen}/>

    if (this.state.sidenavOpen) {
      
      backdrop = <Backdrop click={this.backdropClickHandler}/>
      // sidenav = <Sidenav itemClickHandler={this.sidenavTriggerClickHandler} show={this.state.sidenavOpen}/>
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
        {/* <Route
            path='/admin'
            component={() => <Admin props={Rubro} />}
        /> */}
        <Footer></Footer>
      </BrowserRouter>
    );
  }
}

export default App;

