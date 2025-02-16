import React, { Component, useState } from "react"
import { Link, NavLink, withRouter, Router } from "react-router-dom";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
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
import LogoBig from '../../visuals/logo-mariutti-2020.png'


const NavBarStateLess = (props) => {

    

    useFirebaseConnect([
        { path: 'Sub_Rubro' }
    ])
    
    const sub_rubros = useSelector(state => state.firebase.data.Sub_Rubro);
    const [busqueda, setBusqueda] = React.useState("");
    const [scroll, setScroll] = React.useState(false);
    const [dropdown, setDropdown] = React.useState("");
    const [search, setSearch] = React.useState(false);
    const [drop, setDrop] = React.useState(false);
    let maquinas = [];
    let construccion = [];
    let ferreteria = [];

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

    maquinas.sort(sortFunction);
    construccion.sort(sortFunction);
    ferreteria.sort(sortFunction);

    function sortFunction(a, b) {
        if (a[1] === b[1]) {
            return 0;
        }
        else {
            return (a[1] < b[1]) ? -1 : 1;
        }
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
        dropTrigger()
        //cambio la categoria segun el click 
        props.history.push("/productos");
        // setDropdown(param);
        //este trigger es para cambiar entre productocard y el catalogo
        // let trigger = false;
        props.dropdown(param,param2,param3);
        console.log(param3)
    };
    let tabwrapclasses
    let searchiconclasses
    let searchwrapclasses
    let dropclasses
    let dropbtnclasses

    if (search == true) {
        tabwrapclasses = "tabs-wrapper hide";
        searchiconclasses = "searchicon hide";
        searchwrapclasses = "searchwrap"
    } else {
        tabwrapclasses = "tabs-wrapper";
        searchiconclasses = "searchicon";
        searchwrapclasses = "searchwrap hide"
    }

    if (drop == false) {
        dropclasses = "proddrop"
        dropbtnclasses = "material-icons arrow"
    } else {
        dropclasses = "proddrop dropped"
        dropbtnclasses = "material-icons arrow active"
    }

    const dropTrigger = () => {
        if(!window.location.href.includes('producto')){
            if (drop == false) {
                setDrop(true);
            } else {
                setDrop(false)
            }
        }
    }

    const closeTrigger = () => {
        setDrop(false)
    }
  
    // Build an array of items


    //WITH SECOND COLUMN+


    // console.log(maquinas[i][1].sort())
    let array = [];
    for(let i = 0; i < maquinas.length; i++) {
        // console.log(maquinas[i][2])
        // console.log(maquinas[i][1].sort())
        array.push(
            <li className="dropli" key={maquinas[i][0]} onClick={() => onChangeDropDown(maquinas[i][0],maquinas[i][1],"Máquinas y Herramientas / " )}>{maquinas[i][1]}</li>
        );
    }
    let arrayConstruccion = [];
    for(let i = 0; i < construccion.length; i++) {
        construccion[1].sort();
        arrayConstruccion.push(
            <li className="dropli" key={construccion[i][0]}  onClick={() => onChangeDropDown(construccion[i][0],construccion[i][1],"Obras y Construcción / " )}>{construccion[i][1]}</li>
        );
    }
    let arrayFerreteria = [];
    for(let i = 0; i < ferreteria.length; i++) {
        arrayFerreteria.push(
            <li className="dropli" key={ferreteria[i][0]}  onClick={() => onChangeDropDown(ferreteria[i][0],ferreteria[i][1],"Ferretería Industrial / " )}>{ferreteria[i][1]}</li>
        );
    }

    return (
        <React.Fragment>
            <div className="backnav">
                <div className="topbar">

                    <div className="footredes nav">
                        <a href="https://www.facebook.com/MARIUTTIFERRETERIAINDUSTRIAL/" className="red" target="_blank">
                            <img className="redimg fb footicon navicon" src="https://image.flaticon.com/icons/svg/1384/1384005.svg"/>
                        </a>
                        <a href="https://api.whatsapp.com/send?phone=5493425215000&text=Hola" className="red">
                            <img className="redimg footicon navicon" src="https://image.flaticon.com/icons/svg/733/733641.svg" alt="" srcset=""/>
                        </a>
                        <a href="https://m.me/ferret.mariutti" className="red" target="_blank">
                            <img className="redimg footicon navicon" src="https://image.flaticon.com/icons/svg/733/733604.svg" alt="" srcset=""/>
                        </a>
                        <a href="https://www.instagram.com/ferreteria_mariutti/" className="red" target="_blank">
                            <img className="redimg footicon navicon" src="https://image.flaticon.com/icons/svg/2111/2111491.svg" alt="" srcset=""/>
                        </a>
                    </div>
                    <div className="contact-info">
                        <div className="contact-info-content">
                            <div className="contact-divider"></div>
                            <MailIcon style={{color: 'white', fontSize: 18, marginRight: '5px'}}/>
                            <p style={{color: 'white', fontSize: 12}}>ventas@mariutti.com.ar</p>
                            <div className="contact-divider"></div>
                            <PhoneIcon style={{color: 'white', fontSize: 18, marginRight: '5px'}}/>
                            <p style={{color: 'white', fontSize: 12}}>+54 9 3425 21-5000</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="navbar">
                <Container className="barra">
                    <Link to="/"><img className="logo" src={LogoBig}/></Link>
                    <Link to="/"><img className="logosmall" src={Logo}/></Link>
                    <Hidden mdDown className="displayend">
                        <div className={tabwrapclasses}>
                            <Link to="/">
                                <Tab isActive={window.location.href.includes('inicio')} titulo="Inicio"/>
                            </Link>
                            <Link to="/nosotros">
                                <Tab isActive={window.location.href.includes('nosotros')} titulo="Quiénes Somos"/>
                            </Link>

                            <ClickAwayListener onClickAway={closeTrigger}>
                                <div className="prodtab">
                                    <Tab dropActive={drop} isActive={window.location.href.includes('producto') || window.location.href.includes('Producto')} titulo={<span className="productotab">Productos <i className={dropbtnclasses}>arrow_drop_down</i></span>} click={dropTrigger}/>
                                        {/* Dropdown Productos */} 
                                        <div className={dropclasses}>
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
                            </ClickAwayListener>

                            
                            <Link to="/noticias">
                                <Tab isActive={window.location.href.includes('noticias') || window.location.href.includes('entrada')} titulo="Novedades"/>
                            </Link>
                            <Link to="/contacto">
                                <Tab isActive={window.location.href.includes('contacto')} titulo="Contáctenos"/>
                            </Link>
                        </div>
                        {/* SearchBar */}
                        {/* <form   className=""
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
                        <SearchIcon className={searchiconclasses} style={{color: '#636363', fontSize: 20}} onClick={showSearchbar}/> */}
                        
                    </Hidden>

                    <Hidden lgUp>
                        <div className="contact-info-content responsive">
                            {/* <MailIcon style={{color: 'black', fontSize: 16, marginRight: '5px'}}/> */}
                            <p style={{color: 'black', fontSize: 10}}>ventas@mariutti.com.ar</p>
                            <div className="contact-divider responsive"></div>
                            {/* <PhoneIcon style={{color: 'black', fontSize: 16, marginRight: '5px'}}/> */}
                            <p style={{color: 'black', fontSize: 10}}>+54 9 3425 21-5000</p>
                        </div>
                        <div className="phonebtns">
                            {/* <SearchTrigger click={props.searchClickHandler}/> */}
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