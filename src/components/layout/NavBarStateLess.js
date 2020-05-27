import React, { Component, useState } from "react"
import { Link, NavLink, withRouter, Router } from "react-router-dom";
import './Navbar.css';
import SidenavTrigger from "./SidenavTrigger.js";
import SearchTrigger from "./SearchTrigger.js";
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
import Logo from '../../visuals/logoplano-small.png'


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
                ferreteria.push([elemento.id, elemento.nombre])
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
    const onChangeDropDown = (param,param2,param3) => {
        props.history.push("/productos");
        // setDropdown(param);
        props.dropdown(param,param2,param3);
        console.log(param3)
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
            <li className="dropli" key={maquinas[i][0]} onClick={() => onChangeDropDown(maquinas[i][0],maquinas[i][1],"Máquinas y Herramientas > " )}>{maquinas[i][1]}</li>
        );
    }
    let arrayConstruccion = [];
    for(let i = 0; i < construccion.length; i++) {
        arrayConstruccion.push(
            <li className="dropli" key={construccion[i][0]}  onClick={() => onChangeDropDown(construccion[i][0],construccion[i][1],"Obras y Construcción > " )}>{construccion[i][1]}</li>
        );
    }
    let arrayFerreteria = [];
    for(let i = 0; i < ferreteria.length; i++) {
        arrayFerreteria.push(
            <li className="dropli" key={ferreteria[i][0]}  onClick={() => onChangeDropDown(ferreteria[i][0],ferreteria[i][1],"Ferretería Industrial > " )}>{ferreteria[i][1]}</li>
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
                    <Link to="/"><img className="logo" src="http://www.mariutti.com.ar/images/logo-plano.png"/></Link>
                    <Link to="/"><img className="logosmall" src={Logo}/></Link>
                    <Hidden mdDown className="displayend">
                        <div className={tabwrapclasses}>
                            <Link to="/">
                                <Tab isActive={window.location.href.includes('inicio')} titulo="Inicio"/>
                            </Link>
                            <Link to="/nosotros">
                                <Tab isActive={window.location.href.includes('nosotros')} titulo="Quiénes Somos"/>
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
                                        {arrayFerreteria}
                                    </ul>                          
                                </div>
                            </div>
                            
                            <Link to="/noticias">
                                <Tab isActive={window.location.href.includes('noticias')} titulo="Novedades"/>
                            </Link>
                            <Link to="/contacto">
                                <Tab isActive={window.location.href.includes('contacto')} titulo="Contáctenos"/>
                            </Link>
                        </div>
                        {/* SearchBar */}
                        <form   className=""
                                name="Form"
                                onSubmit={handleOnSubmitDragon}>
                        <div className={searchwrapclasses}>
                            <div className="searchbarwrap">
                                <input autoFocus type="text" id="buscar" value={busqueda} onChange={onChange} placeholder="Buscar en productos..." className="searchbar"/>
                                <ArrowForwardIcon className="submiticon" style={{color: '#636363', fontSize: 20}} onClick={handleOnSubmitDragon}/>
                            </div>
                            <CloseIcon className="closeicon" style={{color: '#636363', fontSize: 20}} onClick={closeDragon}/>
                        </div>
                        </form>                            
                        <SearchIcon className={searchiconclasses} style={{color: '#636363', fontSize: 20}} onClick={showSearchbar}/>
                        
                    </Hidden>

                    <Hidden lgUp>
                        <div className="phonebtns">
                            <SearchTrigger click={props.searchClickHandler}/>
                            {/* <SearchIcon className={searchiconclasses} style={{color: '#636363', fontSize: 20}} onClick={showSearchbar}/> */}
                            <SidenavTrigger click={props.sidenavClickHandler}/>
                        </div>
                        
                    </Hidden>
                    
                </Container>
            </div>
        </React.Fragment>
        
    )
}

export default withRouter(NavBarStateLess)