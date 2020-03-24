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
    <div onClick={props.click} className="burger-menu">

        <SvgIcon component={MenuIcon} />
    
    </div>
);


export default SidenavTrigger
