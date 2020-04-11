import React, { Component } from 'react';
import Navbar from "./components/layout/NavBarStateLess";
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
import Noticias from "./components/sections/noticias/Noticias";
import Entrada from "./components/sections/noticias/Entrada";
// import Admin from "./components/admin/Admin3";
import Login from "./components/admin/Admin3";
import Cfg from "./components/config/fbConfig";
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
// import fbConfig from "./components/config/fbConfig"
// import firebase from "firebase/app";
import { withRouter } from 'react-router'


class App extends Component {
  state = {
    sidenavOpen : false,
    busqueda : "",
    maquinas:[],
    dropdown:"",
    dropdownName:""
  };

  // static propTypes = {
  //   location: React.PropTypes.object.isRequired
  // }

  // ...

  componentWillMount() {
    // this.props.history.push("/inicio");
    // this.props.history.listen(() => {
    //   console.log('You changed the page to: ')
    // });
  }
  componentWillUnmount() {
      // this.unlisten();
  }

  sidenavTriggerClickHandler = () => {
    if (this.state.sidenavOpen == false) {
      this.setState({sidenavOpen: true})
    } else {
      this.setState({sidenavOpen: false})
    }
  };
  cerrandosidenav = () =>{
    this.setState({sidenavOpen: false})
  }
  backdropClickHandler = () => {
    this.setState({sidenavOpen: false})
  };
  buscandoResultado = (param) =>{
    this.setState({busqueda:param})
  }
  dropdownResultado = (param, param2) =>{
    this.setState({
      dropdown:param, 
      dropdownName:param2
    })
  }
  cleanUpDropdown = () =>{
      this.setState({dropdown:''})
  }



  render(){
    let navbar;
    let backdrop;
    let sidenav;
    let footer;
    let maquinas = [];
    let cfg;


    const trayendoCategorias = (array1) => {
      if(array1){
        const arrayParse = Object.values(array1);
        arrayParse.forEach(elemento => {
          maquinas.push(elemento);
        })
      }
    }

   
    cfg =  <Cfg trayendoCategorias={trayendoCategorias} />
    sidenav = <Sidenav itemClickHandler={this.sidenavTriggerClickHandler} show={this.state.sidenavOpen} cerrando={this.cerrandosidenav}/>

    if (this.state.sidenavOpen) {
      
      backdrop = <Backdrop click={this.backdropClickHandler}/>
      // sidenav = <Sidenav itemClickHandler={this.sidenavTriggerClickHandler} show={this.state.sidenavOpen}/>
    }

    if (window.location.href.includes('login')) {
      footer = null
      navbar = null;
    } else {
      navbar = <Navbar sidenavClickHandler={this.sidenavTriggerClickHandler} buscando={this.buscandoResultado} dropdown={this.dropdownResultado}/>
      footer = <Footer/>
    }

    return (
      <BrowserRouter>
        {cfg}
        {navbar}
        {sidenav}
        {backdrop}
        <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/nosotros" component={About} />
        {/* <Route path="/productos" component={productosComponent} />  */}
        <Route path="/producto" component={ProductoComponent} />
        <Route path="/contacto" component={Contact} />
        <Route path="/noticias" component={Noticias} />
        <Route path="/entrada" component={Entrada} />
        <Route path="/login" component={Login} />
        </Switch>
        <Route
            path='/productos'
            render={(props) => <Productos {...props} dropdownResult={this.state.dropdown} dropdownResultName={this.state.dropdownName} cleanUp={this.cleanUpDropdown}/>}
        />
        <Route
            path='/busqueda'
            render={(props) => <SearchResult {...props} busquedaResult={this.state.busqueda} />}
        />
        {footer}
      </BrowserRouter>
    );
  }
}

export default withRouter(App)
