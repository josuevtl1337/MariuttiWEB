import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function ControlledTreeView() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState([]);

  const handleChange = (event, nodes) => {
    setExpanded(nodes);
  };

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      onNodeToggle={handleChange}
    >
      <TreeItem nodeId="1" label="Maquinas y Herramientas">
        <TreeItem nodeId="2" label="Herramientas Eléctricas" />
        <TreeItem nodeId="3" label="Herramientas Explosión" />
        <TreeItem nodeId="4" label="Herramientas Neumáticas" />
      </TreeItem>
      <TreeItem nodeId="5" label="Obras y Construcción">
        <TreeItem nodeId="6" label="Calendar" />
        <TreeItem nodeId="7" label="Chrome" />
        <TreeItem nodeId="8" label="Webstorm" />
        <TreeItem nodeId="9" label="Webstorm" />
      </TreeItem>
    </TreeView>
  );
}