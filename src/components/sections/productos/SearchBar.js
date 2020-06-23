import React, { Component, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import "./searchBar.css"
// import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';
import { compose, spacing, palette } from '@material-ui/system';
import { createHashHistory } from 'history';
export const history = createHashHistory();



const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 0px',
    display: 'flex',
    width: '100%',
    marginBottom: 4
  },
  input: {
    marginLeft: theme.spacing(3),
    flex: 1,
  }
}));


const SearchBar = (props) =>{
  const [busqueda, setBusqueda] = React.useState("");
  const classes = useStyles();

  const handleOnSubmitDragon = e => {
    // setSearch(false);
    e.preventDefault();
    props.buscando(busqueda);
    // alert(busqueda)
    history.push("/result?"+busqueda);
    // props.history.push("/productos"+busqueda);
    // props.buscando(busqueda);
  };
  const onChange = e => {
    setBusqueda(e.target.value);
    // e.preventDefault();
    // history.push(busqueda);
  };
  
  return (
      <div className="searchBar">
        <Paper component="form" className={classes.root} onSubmit={handleOnSubmitDragon}>
                <InputBase
                    className={classes.input}
                    placeholder="Buscar Producto"
                    inputProps={{ 'aria-label': 'buscar producto' }}
                    onChange={onChange}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
        </Paper>
      </div>
  );
}

export default SearchBar;