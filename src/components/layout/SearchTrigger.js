import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import './SidenavTrigger.css';
import SearchIcon from '@material-ui/icons/Search';


const burger = {
    width: '30px',
    height: '21px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}

const SearchTrigger = props => (
    <div onClick={props.click} className="burger-menu">

        <SearchIcon style={{color: '#636363', fontSize: 20}}/>
    
    </div>
);


export default SearchTrigger
