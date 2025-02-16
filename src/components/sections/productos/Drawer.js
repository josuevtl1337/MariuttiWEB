import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

var viewportWidth = window.innerWidth || document.documentElement.clientWidth;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    borderBottomStyle: 'solid',
    borderBottomColor: '#dddfe2',
    borderBottomWidth: '1px',
    padding: 0,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    
  },
}));

const useStyles2 = makeStyles(theme => ({
  primary: {
    color:'grey'
  },
}));

export default function NestedList(props) {
  console.log(props.categorias);
  const classes = useStyles();
  const classes2 = useStyles2();

  const [open, setOpen] = React.useState(false);

  

  const handleClick = (e) => {
    setOpen(!open);
    console.log(e)
  };
  // const handleClick = (e) => {
  //   // props.handlerRuta(e)
  // };
  const handleClickDragon = (e,e2) => {
    props.handlerRuta(props.titulo);
    props.handler(e,e2,props.titulo);
    setOpen(!open)
  };

  return (
    
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      // subheader={
      //   <ListSubheader component="div" id="nested-list-subheader">
      //     Categorías
      //   </ListSubheader>
      // }
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemText  primary={props.titulo} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          {props.categorias.map((categoria) => 
            <ListItem button className={classes.nested} onClick={()=>{handleClickDragon(categoria[0],categoria[1])}}>
              <ListItemText className={classes2.primary} primary={categoria[1]} />
            </ListItem>
          )}
          
        </List>
      </Collapse>
    </List>
  );
}