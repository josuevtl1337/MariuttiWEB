import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const ExpansionPanel = withStyles({
  root: {
    //border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'White',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

export default function CustomizedExpansionPanels() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
        <Paper>
            <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>Ferretería Industrial</Typography>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                <a href="">
                    <Typography>
                        Carretillas
                    </Typography>
                </a>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                <a href="">
                    <Typography>
                        Discos de Corte
                    </Typography>
                </a>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                <a href="">
                    <Typography>
                        Dobladoras y Cortadoras de Hierro
                    </Typography>
                </a>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                <a href="">
                    <Typography>
                        Fijaciones
                    </Typography>
                </a>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                <a href="">
                    <Typography>
                        Movimiento de Cargas
                    </Typography>
                </a>
                </ExpansionPanelDetails>
                
            </ExpansionPanel>

            <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>Herramientas Eléctricas</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <a href="">
                        <Typography>
                            abc
                        </Typography>
                    </a>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            
            <ExpansionPanel square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <ExpansionPanelSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography>Herramientas Explosión</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    
                </ExpansionPanelDetails>
            </ExpansionPanel>
            
            <ExpansionPanel square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <ExpansionPanelSummary aria-controls="panel4d-content" id="panel4d-header">
                    <Typography>Herramientas Neumáticas</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    
                </ExpansionPanelDetails>
            </ExpansionPanel>
            
            <ExpansionPanel square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <ExpansionPanelSummary aria-controls="panel5d-content" id="panel5d-header">
                    <Typography>Indumentaria y Seguridad</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    
                </ExpansionPanelDetails>
            </ExpansionPanel>
            
            <ExpansionPanel square expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                <ExpansionPanelSummary aria-controls="panel6d-content" id="panel6d-header">
                    <Typography>Instrumentos de Precisión</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    
                </ExpansionPanelDetails>
            </ExpansionPanel>
            
            <ExpansionPanel square expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                <ExpansionPanelSummary aria-controls="panel7d-content" id="panel7d-header">
                    <Typography>Industria Civil</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    
                </ExpansionPanelDetails>
            </ExpansionPanel>
            
            <ExpansionPanel square expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                <ExpansionPanelSummary aria-controls="panel8d-content" id="panel8d-header">
                    <Typography>Pinturas Hogar y Obra</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    
                </ExpansionPanelDetails>
            </ExpansionPanel>
            
            <ExpansionPanel square expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                <ExpansionPanelSummary aria-controls="panel9d-content" id="panel9d-header">
                    <Typography>Pinturas Industriales y Náuticas</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    
                </ExpansionPanelDetails>
            </ExpansionPanel>
            
            <ExpansionPanel square expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
                <ExpansionPanelSummary aria-controls="panel10d-content" id="panel10d-header">
                    <Typography>Productos para Construcción</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    
                </ExpansionPanelDetails>
            </ExpansionPanel>
            
        </Paper>
    </div>
  );
}