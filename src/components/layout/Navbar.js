import React from "react";
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

class Navbar extends React.Component {
    // const [tabIndex, setTabIndex] = React.useState(0);
    
    constructor(props) {
		super(props);
        this.state = {
            sidenav: props.sidenavClickHandler,
            search: false
        };
    }

    showSearchbar = () => {
        if (this.state.search == false) {
            this.setState({search: true});
        } else {
            this.setState({search: false});
        }
        
    }

    render(){

        let tabwrapclasses
        let searchbarclasses
        let searchiconclasses
        let submitclasses
        let searchwrapclasses

        if (this.state.search == true) {
            tabwrapclasses = "tabs-wrapper hide";
            // searchbarclasses = "searchbar";
            searchiconclasses = "searchicon hide";
            // submitclasses = "submiticon";
            searchwrapclasses = "searchwrap"
        } else {
            tabwrapclasses = "tabs-wrapper";
            // searchbarclasses = "searchbar hide";
            searchiconclasses = "searchicon";
            // submitclasses = "submiticon hide";
            searchwrapclasses = "searchwrap hide"

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
                                <Link  to="/inicio">
                                    <Tab isActive={window.location.href.includes('inicio')} titulo="Inicio"/>
                                </Link>
                                <Link  to="/nosotros">
                                    <Tab isActive={window.location.href.includes('nosotros')} titulo="Quienes Somos"/>
                                </Link>
                                <Link  to="/productos">
                                    <Tab isActive={window.location.href.includes('productos') || window.location.href.includes('Productos')} titulo="Productos"/>
                                </Link>
                                <Link  to="/noticias">
                                    <Tab isActive={window.location.href.includes('noticias')} titulo="Noticias"/>
                                </Link>
                                <Link  to="/contacto">
                                    <Tab isActive={window.location.href.includes('contacto')} titulo="Contactanos"/>
                                </Link>
                            </div>
                            <div className={searchwrapclasses}>
                                <div className="searchbarwrap">
                                    <input type="text" placeholder="Buscar en productos..." className="searchbar"/>
                                    <ArrowForwardIcon className="submiticon" style={{color: '#636363', fontSize: 20}} onClick={this.showSearchbar}/>
                                </div>
                                <CloseIcon className="closeicon" style={{color: '#636363', fontSize: 20}} onClick={this.showSearchbar}/>
                            </div>
                            <SearchIcon className={searchiconclasses} style={{color: '#636363', fontSize: 20}} onClick={this.showSearchbar}/>
                        </Hidden>
        
                        <Hidden lgUp>
                            <SidenavTrigger click={this.state.sidenav}/>
                        </Hidden>
                        
                    </Container>
                </div>
            </React.Fragment>
            
        )
    }

    
}

export default withRouter(Navbar)