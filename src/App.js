import React, { Component } from 'react';
import Navbar from "./components/layout/Navbar";
import Sidenav from "./components/layout/Sidenav";
import Backdrop from "./components/layout/Backdrop";
import Footer from './components/layout/Footer.js'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/sections/inicio/Home";
import About from "./components/sections/nosotros/About";
import Productos from "./components/sections/productos/Productos";
import SearchResult from "./components/sections/productos/SearchResult";
import ProductoComponent from "./components/sections/productos/ProductoComponent";
import Contact from "./components/sections/contacto/Contact";
import Admin from "./components/admin/Admin3";
import AdminNav from "./components/admin/AdminNav";
// import fbConfig from "./components/config/fbConfig"
// import firebase from "firebase/app";


class App extends Component {

  state = {
    sidenavOpen : false,
    busqueda : ""
  };
  sidenavTriggerClickHandler = () => {
    this.setState((prevState) => {
      return {sidenavOpen: !prevState.sidenavOpen}
    })
  };

  backdropClickHandler = () => {
    this.setState({sidenavOpen: false})
  };
  buscandoResultado = (param) =>{
    this.setState({busqueda:param})
  }
  componentDidUpdate(){

    console.log(this.state.busqueda)
  }
  render(){
    let navbar;
    let backdrop;
    let sidenav;
    let adminnav;

    // let productosComponent =  <Productos busquedaResult={this.state.busqueda} />

    sidenav = <Sidenav itemClickHandler={this.sidenavTriggerClickHandler} show={this.state.sidenavOpen}/>

    if (this.state.sidenavOpen) {
      
      backdrop = <Backdrop click={this.backdropClickHandler}/>
      // sidenav = <Sidenav itemClickHandler={this.sidenavTriggerClickHandler} show={this.state.sidenavOpen}/>
    }

    if (window.location.href.includes('admin')) {
      adminnav = <AdminNav />
      navbar = null;
    } else {
      navbar = <Navbar sidenavClickHandler={this.sidenavTriggerClickHandler} buscando={this.buscandoResultado}/>
      adminnav = null
    }

    return (
      <BrowserRouter>
        {adminnav}
        {navbar}
        {sidenav}
        {backdrop}
        <Switch>
        <Route exact path="/inicio" component={Home} />
        <Route path="/nosotros" component={About} />
        {/* <Route path="/productos" component={productosComponent} />  */}
        <Route path="/producto" component={ProductoComponent} />
        <Route path="/contacto" component={Contact} />
        <Route path="/admin" component={Admin} />
        </Switch>
        <Route
            path='/productos'
            render={(props) => <Productos {...props} busquedaResult={this.state.busqueda} />}
        />
        <Route
            path='/busqueda'
            render={(props) => <SearchResult {...props} busquedaResult={this.state.busqueda} />}
        />
        <Footer></Footer>
      </BrowserRouter>
    );
  }
}

export default App;

