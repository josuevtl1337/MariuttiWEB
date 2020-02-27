import React from 'react';
import { Link, NavLink, withRouter } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import './sidenav.css'

const sideNav = props => {

    let sidenavClasses = 'side-nav';
    
    if (props.show) {
        sidenavClasses = 'side-nav open'
    } else {
        sidenavClasses = 'side-nav'
    }
    
    return(
    <div className={sidenavClasses} >
        <img className="logoside" src="http://www.mariutti.com.ar/images/logo-plano.png"/>
        <List  component="side-nav" aria-label="">

            <Divider/>
            <Link  to="/inicio">
                <ListItem button >
                    <ListItemText click={props.itemClickHandler} className="buttons" primary="Inicio"  />
                </ListItem>
            </Link>
            <Divider/>
            <Link to="/nosotros">
                <ListItem button>
                    <ListItemText className="buttons" primary="Quienes Somos" />
                </ListItem>
            </Link>
            <Divider/>
            <Link to="/Productos">
                <ListItem button>
                    <ListItemText className="buttons" primary="Productos" />
                </ListItem>
            </Link>
            <Divider/>
            <Link to="/Noticias">
                <ListItem button>
                    <ListItemText className="buttons" primary="Noticias" />
                </ListItem>
            </Link>
            <Divider/>
            <Link to="/Contact">
                <ListItem button>
                    <ListItemText className="buttons" primary="Contacto" />
                </ListItem>
            </Link>
            <Divider/>
                
        </List>
    </div>
    );
};

export default withRouter(sideNav)