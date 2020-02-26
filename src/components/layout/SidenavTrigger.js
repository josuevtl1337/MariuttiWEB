import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import './SidenavTrigger.css';
import SvgIcon from '@material-ui/icons/Menu';

const burger = {
    width: '30px',
    height: '21px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}

const SidenavTrigger = props => (
    // <a href="#" data-target="slide-out" className="hide-on-large-only" style={burger}>
    //     <i className="material-icons">menu</i>
    // </a>
    // <div className="burger" onClick={props.click}>
    //     <div className="burger_line"></div>
    //     <div className="burger_line"></div>
    //     <div className="burger_line"></div>
    // </div>
    <div onClick={props.click} className="burger-menu">
        {/* <MenuIcon style={{color: '#636363', fontSize: 35}} /> */}
        <SvgIcon component={MenuIcon} />
    </div>
);


export default SidenavTrigger
