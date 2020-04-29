import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Descripción" {...a11yProps(0)} />
          <Tab label="Información Adicional" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <p className="singleprod-desc">
            {props.descripcion}
        </p>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="videowrapper">
          <iframe 
            className="ytvideo"
            src={props.enlace} 
            frameborder="0" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" 
            allowfullscreen
          />  
        </div>
        
        <a href={props.ficha} className="singleprod-ficha">
            <button className="aboutbtn prodficha">
                Ver Ficha Técnica
            </button>
        </a>  
      </TabPanel>
    </div>
  );
}
