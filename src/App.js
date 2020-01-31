import React, { Component } from 'react';
import Navbar from "./components/layout/Navbar";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/header/Home"
import About from "./components/header/About"
import Productos from "./components/header/productos/Productos"
import Contact from "./components/header/Contact"
import Admin from "./components/header/admin/Admin3"
// import fbConfig from "./components/config/fbConfig"
import firebase from "firebase/app";

class App  extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/productos" component={Productos} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin" component={Admin} />
        </div>
      </BrowserRouter>     
    );
  }
}

export default App;

