import React , { Component } from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import  "./ListaRubros.css"
import Loading from "./Loading"


// const useStyles = makeStyles({
//   root: {
//     height: 216,
//     flexGrow: 1,
//     maxWidth: 400,
//   },
// });
// const classes = useStyles();

class ListaRubros extends Component {
state={
  rubros:"",
  loading:true
}
 componentDidMount (){
    // this.setState({
    //   rubros : Object.keys(this.props.rubros[0])
    // }, () =>{
    //   console.log(this.state.rubros);
    //   // console.log(this.state.rubros[0].valueOf());
    //   // console.log(Object.keys(this.state.rubros[0]));
    //   // const rubrosTitle = Object.keys(this.state.rubros[0]);
      this.setState({
        loading:false
      })
    // })

  }
  render(){

      if(this.state.loading ){
        return (
        <Loading />
        );
      }
      else{
        const handleOnClick = (name) =>{
          alert(name);
        }      
        const classTree = {
          height: 216,
          flexGrow: 1,
          maxWidth: 400,
          color:'grey'
        };
        return (
          <div className="container">
<TreeView
          style={classTree}
          defaultExpandIcon={<ChevronRightIcon />}
          defaultCollapseIcon={<ExpandMoreIcon />}
          >
          {/* {this.state.rubros.map((item,key)=> {
            return (
                <TreeItem nodeId={key} label={item}>
                  <TreeItem nodeId={key} label={item}>
                  </TreeItem>
                </TreeItem>

            );
          })} */}
            <TreeItem onClick={()=>{handleOnClick("1")}} nodeId="1" label="RUBROS">
            </TreeItem>
            <TreeItem nodeId="2" label="SUB RUBROS">
            </TreeItem>
            <TreeItem nodeId="3" label="CATEGORIAS">
            </TreeItem>
            <TreeItem nodeId="4" label="PRODUCTOS">
            </TreeItem>
          </TreeView> 
          </div>    
        );
      }
  }
  
}

export default  ListaRubros;



