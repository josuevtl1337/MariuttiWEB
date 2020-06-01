import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import "./searchBar.css"
// import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';
import { compose, spacing, palette } from '@material-ui/system';

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

export default function CustomizedInputBase() {
  const classes = useStyles();

  return (
      <div className="searchBar">
        <Paper component="form" className={classes.root}>
                <InputBase
                    className={classes.input}
                    placeholder="Buscar Producto"
                    inputProps={{ 'aria-label': 'buscar producto' }}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
        </Paper>
      </div>
  );
}