import React, {useState} from 'react';
import { Link, NavLink, withRouter } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import './sidenav.css'

const SideNav = props => {

    let sidenavClasses = 'side-nav';
    
    if (props.show) {
        sidenavClasses = 'side-nav open'
    } else {
        sidenavClasses = 'side-nav'
    }

    const changeClasses = () => {
        sidenavClasses = 'side-nav'
    }
    const cerrandosidenav = () =>{
        sidenavClasses = 'side-nav'
        console.log("asd")
    }
    
    return(
    <div className={sidenavClasses} >
        <img className="logoside" src="http://www.mariutti.com.ar/images/logo-plano.png"/>
        <List>
            <Divider/>
            <Link to="/">
                <ListItem button >
                    <ListItemText onClick={props.cerrando} click={props.itemClickHandler} className="buttons" primary="Inicio" />
                </ListItem>
            </Link>
            <Divider/>
            <Link to="/nosotros">
                <ListItem button>
                    <ListItemText onClick={props.cerrando} className="buttons" primary="Quienes Somos" />
                </ListItem>
            </Link>
            <Divider/>
            <Link to="/Productos">
                <ListItem button>
                    <ListItemText onClick={props.cerrando} className="buttons" primary="Productos" />
                </ListItem>
            </Link>
            <Divider/>
            <Link to="/Noticias">
                <ListItem button>
                    <ListItemText onClick={props.cerrando} className="buttons" primary="Noticias" />
                </ListItem>
            </Link>
            <Divider/>
            <Link to="/Contacto">
                <ListItem button>
                    <ListItemText onClick={props.cerrando} className="buttons" primary="Contacto" />
                </ListItem>
            </Link>
            <Divider/>
                
        </List>
    </div>
    );
};



export default withRouter(SideNav)