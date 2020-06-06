import React, { Component } from 'react';
import Navbar from "./components/layout/NavBarStateLess";
import Sidenav from "./components/layout/Sidenav";
import Backdrop from "./components/layout/Backdrop";
import SearchBar from "./components/layout/SearchBar";
import Footer from './components/layout/Footer.js';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/sections/inicio/Home";
import About from "./components/sections/nosotros/About";
import Productos from "./components/sections/productos/Productos";
import SearchResult from "./components/sections/productos/SearchResult";
import ProdComp from "./components/sections/productos/ProdComp";
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
import { withRouter } from 'react-router';
import MessengerCustomerChat from 'react-messenger-customer-chat';

class App extends Component {
  state = {
    sidenavOpen : false,
    searchOpen: false,
    busqueda : "",
    maquinas:[],
    dropdown:"",
    dropdownName:"",
    trigger:"",
    categoriaActual:"",
    categoriaActualNombre:""
  };

  sidenavTriggerClickHandler = () => {
    if (this.state.sidenavOpen == false) {
      this.setState({sidenavOpen: true})
    } else {
      this.setState({sidenavOpen: false})
    }
  };
  searchClickHandler = () => {
    if (this.state.searchOpen == false) {
      this.setState({searchOpen: true})
    } else {
      this.setState({searchOpen: false})
    }
  };
  cerrandosidenav = () =>{
    this.setState({sidenavOpen: false})
  }
  backdropClickHandler = () => {
    this.setState({sidenavOpen: false});
    this.setState({searchOpen: false});
  };
  buscandoResultado = (param) =>{
    this.setState({busqueda:param})
  }
  dropdownResultado = (param, param2, param3) =>{
    this.setState({
      dropdown:param, 
      dropdownName:param3+param2
    })
  }
  cleanUpDropdown = () =>{
      this.setState({dropdown:''})
  }
  categoriaActualHandler =(param,param2)=>{
    //Esta funcion es para comunicar el productos.js y productocomponent.js
    this.setState({categoriaActual:param, categoriaActualNombre:param2})
  }
  categoriaActualCleanUp = () =>{
    this.setState({categoriaActual:'',categoriaActualNombre:''})
  }
  // categoriaActualHandler =(param,param2)=>{
  //   //Esta funcion es para comunicar el productocomponent.js y producto.js haciendo lo mismo que la funcion anterior pero visceversa
  //   this.setState({categoriaActual:param, categoriaActualNombre:param2})
  // }


  render(){
    let navbar;
    let backdrop;
    let sidenav;
    let searchbar;
    let footer;
    let messenger;
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

    }

    

    if (window.location.href.includes('login')) {
      // FB.CustomerChat.hide();
      messenger = null;
      footer = null;
      navbar = null;
    } else {
      messenger = <MessengerCustomerChat pageId="314180308659595" appId="656192641884970"  language = 'es_LA' /> 
      navbar = <Navbar searchClickHandler={this.searchClickHandler} sidenavClickHandler={this.sidenavTriggerClickHandler} buscando={this.buscandoResultado} dropdown={this.dropdownResultado}/>
      footer = <Footer/>
    }

    if (this.state.searchOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler}/>
      searchbar = <SearchBar/>
      // navbar = null
    }

    return (
      <BrowserRouter>
        <div>
        {messenger}
        </div>
        {cfg}
        {navbar}
        {sidenav}
        {backdrop}
        {searchbar}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/nosotros" component={About} />
          {/* <Route path="/producto" component={ProductoComponent} />  */}
          <Route path="/contacto" component={Contact} />
          <Route path="/noticias" component={Noticias} />
          <Route path="/entrada" component={Entrada} />
          <Route path="/login" component={Login} />
        </Switch>
        {/* <Route path="/productos" component={ProdComp} /> */}
        <Route
            path='/producto'
            render={(props) => <ProductoComponent {...props} categoriaActualHandler={this.categoriaActualHandler} cleanUp={this.cleanUpDropdown}/>}
        />
        <Route
            path='/productos'
            render={(props) => <Productos {...props} categoriaSet={this.state.categoriaActual} categoriaNombre={this.state.categoriaActualNombre} categoriaActualCleanUp={this.categoriaActualCleanUp} dropdownResult={this.state.dropdown} dropdownResultName={this.state.dropdownName} cleanUp={this.cleanUpDropdown}/>}
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
