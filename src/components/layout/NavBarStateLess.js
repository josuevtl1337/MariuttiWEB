import React, { Component, useState } from "react"
import { Link, NavLink, withRouter, Router } from "react-router-dom";
import './Navbar.css';
import SidenavTrigger from "./SidenavTrigger.js";
import Tab from './Tab.js';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import SearchIcon from '@material-ui/icons/Search';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CloseIcon from '@material-ui/icons/Close';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'

const NavBarStateLess = (props) => {

    useFirebaseConnect([
        { path: 'Sub_Rubro' }
    ])
    
    const sub_rubros = useSelector(state => state.firebase.data.Sub_Rubro);
    const [busqueda, setBusqueda] = React.useState("");
    const [dropdown, setDropdown] = React.useState("");
    const [search, setSearch] = React.useState(false);
    const maquinas = [];
    const construccion = [];
    const ferreteria = [];

    if(sub_rubros){
        const categorias = Object.values(sub_rubros);
        categorias.forEach(elemento => {
            if (elemento.rubro == "r1") {
                maquinas.push([elemento.id, elemento.nombre])
            } else if (elemento.rubro == "r2") {
                construccion.push([elemento.id, elemento.nombre])
            } else {
                ferreteria.push(new Object([Object.values(elemento)]))
            }
        })
    }

    const showSearchbar = () => {
        if (search == false) {
            setSearch(true);
        } else {
            setSearch(false);
        }     
    }
    const closeDragon = () => {
        setSearch(false);
        // props.history.push("/productos");
    }
    const handleOnSubmitDragon = e => {
        setSearch(false);
        e.preventDefault();
        props.history.push("/busqueda?"+busqueda);
        props.buscando(busqueda);
    };
    const onChange = e => {
        setBusqueda(e.target.value);
    };
    const onChangeDropDown = (param) => {
        props.history.push("/productos");
        // setDropdown(param);
        props.dropdown(param);
        // console.log(drop)
    };
    let tabwrapclasses
    let searchiconclasses
    let searchwrapclasses

    if (search == true) {
        tabwrapclasses = "tabs-wrapper hide";
        searchiconclasses = "searchicon hide";
        searchwrapclasses = "searchwrap"
    } else {
        tabwrapclasses = "tabs-wrapper";
        searchiconclasses = "searchicon";
        searchwrapclasses = "searchwrap hide"

    }
  
    // Build an array of items
    let array = [];
    for(let i = 0; i < maquinas.length; i++) {
        array.push(
            <li key={maquinas[i][0]} onClick={() => onChangeDropDown(maquinas[i][0])}>{maquinas[i][1]}</li>
        );
    }
    let arrayConstruccion = [];
    for(let i = 0; i < construccion.length; i++) {
        arrayConstruccion.push(
            <li key={construccion[i][0]}  onClick={() => onChangeDropDown(construccion[i][0])}>{construccion[i][1]}</li>
        );
    }

    return (
        <React.Fragment>
            <div className="backnav">
                <div className="contact-info">
                    <div className="contact-info-content">
                        <div className="contact-divider"></div>
                        <MailIcon style={{color: 'white', fontSize: 18, marginRight: '5px'}}/>
                        <p style={{color: 'white', fontSize: 12}}>info@mariutti.com.ar</p>
                        <div className="contact-divider"></div>
                        <PhoneIcon style={{color: 'white', fontSize: 18, marginRight: '5px'}}/>
                        <p style={{color: 'white', fontSize: 12}}>+54 342 453-5318</p>
                    </div>
                </div>
            </div>
            <div className="navbar">
                <Container className="barra">
                    <Link to="/inicio"><img className="logo" src="http://www.mariutti.com.ar/images/logo-plano.png"/></Link>
                    <Hidden mdDown className="displayend">
                        <div className={tabwrapclasses}>
                            <Link to="/inicio">
                                <Tab isActive={window.location.href.includes('inicio')} titulo="Inicio"/>
                            </Link>
                            <Link to="/nosotros">
                                <Tab isActive={window.location.href.includes('nosotros')} titulo="Quienes Somos"/>
                            </Link>
                            <div className="prodtab">
                                <Link to="/productos">
                                    <Tab isActive={window.location.href.includes('producto') || window.location.href.includes('Producto')} titulo="Productos"/>
                                </Link>

                                {/* Dropdown Productos */} 
                                <div className="proddrop">
                                    <ul className="drop-categorias-list">
                                        <p className="drop-rubro">Máquinas y Herramientas</p>
                                        {array}
                                        <p className="drop-rubro">Obras y Construcción</p>
                                        {arrayConstruccion}
                                        <p className="drop-rubro">Ferretería Industrial</p>
                                    </ul>                          
                                </div>
                            </div>
                            
                            <Link to="/noticias">
                                <Tab isActive={window.location.href.includes('noticias')} titulo="Noticias"/>
                            </Link>
                            <Link to="/contacto">
                                <Tab isActive={window.location.href.includes('contacto')} titulo="Contactanos"/>
                            </Link>
                        </div>
                        {/* SearchBar */}
                        <form   className=""
                                name="Form"
                                onSubmit={handleOnSubmitDragon}>
                        <div className={searchwrapclasses}>
                            <div className="searchbarwrap">
                                <input type="text" id="buscar" value={busqueda} onChange={onChange} placeholder="Buscar en productos..." className="searchbar"/>
                                <ArrowForwardIcon className="submiticon" style={{color: '#636363', fontSize: 20}} onClick={handleOnSubmitDragon}/>
                            </div>
                            <CloseIcon className="closeicon" style={{color: '#636363', fontSize: 20}} onClick={closeDragon}/>
                        </div>
                        </form>                            
                        <SearchIcon className={searchiconclasses} style={{color: '#636363', fontSize: 20}} onClick={showSearchbar}/>
                        
                    </Hidden>

                    <Hidden lgUp>
                        <SidenavTrigger click={props.sidenavClickHandler}/>
                    </Hidden>
                    
                </Container>
            </div>
        </React.Fragment>
        
    )
}

export default withRouter(NavBarStateLess)