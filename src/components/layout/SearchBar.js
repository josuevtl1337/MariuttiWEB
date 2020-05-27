import React, { Component, useState } from "react"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';



const SearchBar = () => (
    
    <div className="searchbarwrap mob">

        <input 
            type="text" 
            id="buscar" 
            placeholder="Buscar en productos..." 
            className="searchbar mob"
        />

        <ArrowForwardIcon 
            className="submiticon" 
            style={{color: '#636363', fontSize: 20}}
        />

    </div>
);


export default SearchBar