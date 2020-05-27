import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import './SidenavTrigger.css';
import SvgIcon from '@material-ui/icons/Menu';

const SidenavTrigger = props => (
    <div onClick={props.click} className="burger-menu">

        {/* <SvgIcon component={MenuIcon} /> */}
        <MenuIcon style={{color: '#636363', fontSize: 22}} />
    
    </div>
);


export default SidenavTrigger
