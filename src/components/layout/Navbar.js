import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import './Navbar.css';
import SidenavTrigger from "./SidenavTrigger.js";
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const Navbar = (props) =>{
    const [tabIndex, setTabIndex] = React.useState(0);
    console.log(props);
    return (
        <React.Fragment>

        {/* // <!-- navbar --> */}
        <div className="navbar">
            <Container className="barra">
                <Link to="/Home"><img className="logo" src="http://www.mariutti.com.ar/images/logo-plano.png"/></Link>
                <Hidden mdDown>
                    {/* <ul className="links">
                        <li className="items"><Link to="/Home">Inicio</Link></li>
                        <li className="items"><Link to="/About">Quienes Somos</Link></li>
                        <li className="items"><Link to="/Productos">Productos</Link></li>
                        <li className="items"><Link to="/News">Noticias</Link></li>
                        <li className="items"><Link to="/Contact">Contactanos</Link></li>
                    </ul> */}
                    <Tabs variant="fullWidth" onChange={(e, index) => setTabIndex(index)} aria-label="full width tabs example">
                        <Link to="/Home"><Tab label={'Inicio'} /></Link>
                        <Link to="/About"><Tab label={'Quienes Somos'} /></Link>
                        <Link to="/Productos"><Tab label={'Productos'} /></Link>
                        <Link to="/News"><Tab label={'Noticias'} /></Link>
                        <Link to="/Contact"><Tab label={'Contactanos'} /></Link>
                    </Tabs>

                </Hidden>

                {/* <a href="#" data-target="slide-out" className="hide-on-large-only burger sidenav-trigger">
                    <i className="material-icons">menu</i>
                </a> */}

                <Hidden lgUp>
                    <SidenavTrigger click={props.sidenavClickHandler}/>
                </Hidden>
                
            </Container>
        </div>







        {/* /* <!-- Manu lateral movil -->
        <ul id="slide-out" className="sidenav hide-on-large">
            <img className="logoside" src="http://www.mariutti.com.ar/images/logo-plano.png"/>
            <li className="items"><Link to="/Home">Inicio</Link></li>
            <li className="items"><Link to="/About">Quienes Somos</Link></li>
            <li className="items"><Link to="/Productos">Productos</Link></li>
            <li className="items"><Link to="/News">Noticias</Link></li>
            <li className="items"><Link to="/Contact">Contactanos</Link></li>
        </ul> */}
        </React.Fragment>
    )
}

export default withRouter(Navbar)