import React from 'react';
import './SidenavTrigger.css'

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
    <div className="burger" onClick={props.click}>
        <div className="burger_line"></div>
        <div className="burger_line"></div>
        <div className="burger_line"></div>
    </div>
);


export default SidenavTrigger
