import React, { Component } from 'react'
import MaterialTable from 'material-table'
import Catalogo from './ListaRubros'
import Grid from '@material-ui/core/Grid';
import firebase from "firebase/app"
import "firebase/database";
import "./admin.css"
//Importar el storage
import "firebase/firebase-storage";
import AddRubro from "./addRubro";
import Loading from "./Loading"
//Botones
import Button from '@material-ui/core/Button';
//TreeView
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';


class Admin3 extends Component { 
  state = {
    loading:true,
    data:[],
    enlaces:{},
    Rubro:[],
    Sub_Rubro:[],
    Categoria:[],
    Producto:[],
    display:""
  };
  handleClick = (param) =>{
    this.setState({
      display: param
    });     
  }

  componentDidMount(){
    const db = firebase.database();
    const importingData = () =>{
        const dbRefRubro = db.ref("Rubro");
        dbRefRubro.on("child_added", snapshot => {
          this.setState({
            Rubro: this.state.Rubro.concat(snapshot.val())
          });
        });
        const dbRefSub_Rubro = db.ref("Sub_Rubro");
        dbRefSub_Rubro.on("child_added", snapshot => {
          this.setState({
            Sub_Rubro: this.state.Sub_Rubro.concat(snapshot.val())
          });
        });
        const dbRefProducto = db.ref("Producto");
        dbRefProducto.on("child_added", snapshot => {
          this.setState({
            Producto: this.state.Producto.concat(snapshot.val())
          });
        });
      }
      setTimeout(() => {
        this.setState({
          loading:false
        })
      }, 2000);
      importingData();

  }
  render(){ 
        const classTree = {
          height: 216,
          flexGrow: 1,
          maxWidth: 400,
          color:'grey'
        };
        if(this.state.loading){
          return (
          <Loading />
          );
        }
        else{

          if(this.state.display=="Sub_Rubro"){
            return(
              <Grid container className="container per" spacing={2}>  
              <Grid container justify="center" item xs={3}>
                <Catalogo parentCallback={this.handleClick}/>  
                <AddRubro />
              </Grid>
              <Grid item xs={9} >
              <MaterialTable
                      actions={[
                        {
                          icon: 'delete',
                          tooltip: 'Borrar Producto',
                        },
                        {
                          icon:'edit',
                          tooltip:'editar producto'
                        },
                        {
                          icon: 'add',
                          tooltip: 'Add User',
                          isFreeAction: true,
                          onClick: (event) => alert("You want to add a new row")
                        }  
                      ]}
                      options={{
                        search: true,
                        sorting: false,
                        columnsButton:true,
                        paging:false,         
                        }}
                        columns={[
                          { title: 'Titulo', field: 'nombre' },
                          { title: 'Subtitutlo', field: 'categoria' },
                          { title: 'Descripcion', field: 'id',
                            cellStyle:{width:200,minWidth:200},
                            headerStlye:{width:200,minWidth:200}
                          },
                          // { title: 'Enlaces', field: 'enlaces'},
                          // { title: 'Imagen', field: 'imagen'},
                          // { title: 'Ficha Tecnica', field: 'fichaTecnica'}
                        ]}
                        // data={ () =>
                        //   new Promise((resolve, reject) => {
                        //       console.log(this.state.data);
                        //       // prepare your data and then call resolve like this:
                        //       resolve({
                        //           data: this.state.data
                        //       });
                        //   })
                        // }
                        
                        data={this.state.Sub_Rubro}
                        detailPanel={[
                          {
                            tooltip: 'Ver video',
                            render: rowData => {
                              return (
                                <iframe
                                  width="100%"
                                  height="315"
                                  // src={`https://www.youtube.com/embed/${bqF5i4qloVE}`}
                                  src={this.state.enlaces}
                                  frameborder="0"
                                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                  allowfullscreen
                                />
                              )
                            },
                          },
                          {
                          icon: 'account_circle',
                          tooltip: 'Ver Imagen',
                          render: rowData => {
                            return (
                              <iframe
                                  width="100%"
                                  height="315"
                                  src={"https://www.nexon.com.ar/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/c/y/cyber016913_1.jpg"}
                                  frameborder="0"
                                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                  allowfullscreen
                                />
                            )
                          },
                        },      
                        ]}
                        title="Sub_Rubro/"
              />   
              </Grid>      
              </Grid>
            );
          }else if(this.state.display=="Rubro"){
            return(
              <Grid container className="container per" spacing={2}>  
              <Grid container justify="center" item xs={3}>
              <Catalogo parentCallback={this.handleClick}/>   
                <AddRubro />
              </Grid>
              <Grid item xs={9} >
              <MaterialTable
                      actions={[
                        {
                          icon: 'delete',
                          tooltip: 'Borrar Producto',
                        },
                        {
                          icon:'edit',
                          tooltip:'editar producto'
                        },
                        {
                          icon: 'add',
                          tooltip: 'Add User',
                          isFreeAction: true,
                          onClick: (event) => alert("You want to add a new row")
                        }  
                      ]}
                      options={{
                        search: true,
                        sorting: false,
                        columnsButton:true,
                        paging:false,         
                        }}
                        columns={[
                          { title: 'Titulo', field: 'nombre' },
                          { title: 'Subtitutlo', field: 'categoria' },
                          { title: 'Descripcion', field: 'id',
                            cellStyle:{width:200,minWidth:200},
                            headerStlye:{width:200,minWidth:200}
                          },
                          // { title: 'Enlaces', field: 'enlaces'},
                          // { title: 'Imagen', field: 'imagen'},
                          // { title: 'Ficha Tecnica', field: 'fichaTecnica'}
                        ]}
          
                        
                        data={this.state.Rubro}
                        detailPanel={[
                          {
                            tooltip: 'Ver video',
                            render: rowData => {
                              return (
                                <iframe
                                  width="100%"
                                  height="315"
                                  // src={`https://www.youtube.com/embed/${bqF5i4qloVE}`}
                                  src={this.state.enlaces}
                                  frameborder="0"
                                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                  allowfullscreen
                                />
                              )
                            },
                          },
                          {
                          icon: 'account_circle',
                          tooltip: 'Ver Imagen',
                          render: rowData => {
                            return (
                              <iframe
                                  width="100%"
                                  height="315"
                                  src={"https://www.nexon.com.ar/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/c/y/cyber016913_1.jpg"}
                                  frameborder="0"
                                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                  allowfullscreen
                                />
                            )
                          },
                        },      
                        ]}
                        title="Rubro/"
              />   
              </Grid>      
              </Grid>
            );
          }else if(this.state.display=="Producto"){
            return(
              <Grid container className="container per" spacing={2}>  
              <Grid container justify="center" item xs={3}>
              <Catalogo parentCallback={this.handleClick}/>   
                <AddRubro />
              </Grid>
              <Grid item xs={9} >
              <MaterialTable
                      actions={[
                        {
                          icon: 'delete',
                          tooltip: 'Borrar Producto',
                        },
                        {
                          icon:'edit',
                          tooltip:'editar producto'
                        },
                        {
                          icon: 'add',
                          tooltip: 'Add User',
                          isFreeAction: true,
                          onClick: (event) => alert("You want to add a new row")
                        }  
                      ]}
                      options={{
                        search: true,
                        sorting: false,
                        columnsButton:true,
                        paging:false,         
                        }}
                        columns={[
                          { title: 'Titulo', field: 'nombre' },
                          { title: 'Subtitutlo', field: 'categoria' },
                          { title: 'Descripcion', field: 'id',
                            cellStyle:{width:200,minWidth:200},
                            headerStlye:{width:200,minWidth:200}
                          },
                          // { title: 'Enlaces', field: 'enlaces'},
                          // { title: 'Imagen', field: 'imagen'},
                          // { title: 'Ficha Tecnica', field: 'fichaTecnica'}
                        ]}
                        
                        data={this.state.Producto}
                        detailPanel={[
                          {
                            tooltip: 'Ver video',
                            render: rowData => {
                              return (
                                <iframe
                                  width="100%"
                                  height="315"
                                  // src={`https://www.youtube.com/embed/${bqF5i4qloVE}`}
                                  src={this.state.enlaces}
                                  frameborder="0"
                                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                  allowfullscreen
                                />
                              )
                            },
                          },
                          {
                          icon: 'account_circle',
                          tooltip: 'Ver Imagen',
                          render: rowData => {
                            return (
                              <iframe
                                  width="100%"
                                  height="315"
                                  src={"https://www.nexon.com.ar/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/c/y/cyber016913_1.jpg"}
                                  frameborder="0"
                                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                  allowfullscreen
                                />
                            )
                          },
                        },      
                        ]}
                        title="Producto/"
              />   
              </Grid>      
              </Grid>
            );
          }else {
            return(
              <Grid container className="container per" spacing={2}>  
              <Grid container justify="center" item xs={3}>
              <Catalogo parentCallback={this.handleClick}/>   
                <AddRubro />
              </Grid>
              <Grid item xs={9} >
              <MaterialTable
                      actions={[
                        {
                          icon: 'delete',
                          tooltip: 'Borrar Producto',
                        },
                        {
                          icon:'edit',
                          tooltip:'editar producto'
                        },
                        {
                          icon: 'add',
                          tooltip: 'Add User',
                          isFreeAction: true,
                          onClick: (event) => alert("You want to add a new row")
                        }  
                      ]}
                      options={{
                        search: true,
                        sorting: false,
                        columnsButton:true,
                        paging:false,         
                        }}
                        columns={[
                          { title: 'Titulo', field: 'nombre' },
                          { title: 'Subtitutlo', field: 'categoria' },
                          { title: 'Descripcion', field: 'id',
                            cellStyle:{width:200,minWidth:200},
                            headerStlye:{width:200,minWidth:200}
                          },
                          // { title: 'Enlaces', field: 'enlaces'},
                          // { title: 'Imagen', field: 'imagen'},
                          // { title: 'Ficha Tecnica', field: 'fichaTecnica'}
                        ]}
      
                        
                        data={this.state.Rubro}
                        detailPanel={[
                          {
                            tooltip: 'Ver video',
                            render: rowData => {
                              return (
                                <iframe
                                  width="100%"
                                  height="315"
                                  // src={`https://www.youtube.com/embed/${bqF5i4qloVE}`}
                                  src={this.state.enlaces}
                                  frameborder="0"
                                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                  allowfullscreen
                                />
                              )
                            },
                          },
                          {
                          icon: 'account_circle',
                          tooltip: 'Ver Imagen',
                          render: rowData => {
                            return (
                              <iframe
                                  width="100%"
                                  height="315"
                                  src={"https://www.nexon.com.ar/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/c/y/cyber016913_1.jpg"}
                                  frameborder="0"
                                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                  allowfullscreen
                                />
                            )
                          },
                        },      
                        ]}
                        title="Rubro/"
              />   
              </Grid>      
              </Grid>
            );
          }
        }    
  }
    
}
export default Admin3;