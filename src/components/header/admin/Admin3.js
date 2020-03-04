import React, { Component } from 'react'
import MaterialTable from 'material-table'
import Catalogo from './ListaRubros'
import Grid from '@material-ui/core/Grid';
import firebase from "firebase/app"
import "firebase/database";
import "./admin.css"
//Importar el storage
import "firebase/firebase-storage";
//Botones "ADD"
import AddRubro from "./addRubro";
import AddSubRubro from "./addSubRubro";
import AddProducto from "./addProducto";

import Loading from "./Loading"
//Botones
import Button from '@material-ui/core/Button';
//TreeView
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
//Redux
import { connect } from "react-redux";


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
  //Este método sirve para cambiar la tabla dependiendo a cual le das click
  handleClick = (param) =>{
    this.setState({
      display: param
    });     
  }
  //Subiendo Sub_Rubro
  handleUpload = (nombre,rubro,ruta) =>{
    const db = firebase.database();
    const record = {
      nombre: nombre,
      rubro: rubro
    };
    const dbRef = db.ref(ruta);
    const newPicture = dbRef.push();
    newPicture.set(record);
    const postId = newPicture.key;
    console.log(postId);
    newPicture.update({
      "id":postId
    }) 
  }
  componentDidMount(){
    
    const db = firebase.database();
    //Importo todos los datos necesarios a variables de una sola vez.
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
          console.log(this.state.Sub_Rubro);
        });
        const dbRefProducto = db.ref("Producto");
        dbRefProducto.on("child_added", snapshot => {
          this.setState({
            Producto: this.state.Producto.concat(snapshot.val())
          });
        });
      }
      //Doy un delay de 2segundos para cargar los datos
      setTimeout(() => {
        this.setState({
          loading:false
        })
      }, 2000);

      importingData();



  }
  render(){ 
    console.log(this.props)
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
                <AddSubRubro handleUpload={this.handleUpload}/>
              </Grid>
              <Grid item xs={9} >
              <MaterialTable
                      actions={[
                        {
                          icon: 'delete',
                          tooltip: 'Borrar Producto',
                          onClick: (event, rowData) => 
                          {
                            alert("You want to delete " + rowData.nombre)
                            new Promise((resolve, reject) => {
                              setTimeout(() => {
                                {                             
                                  const db = firebase.database();
                                  const dbRef = db.ref("Sub_Rubro");
                                  const refSB = dbRef.child(rowData.id) 
                                  refSB.remove();                                 
                                }
                                resolve()
                              }, 1000)
                            })
                          }

                        }
                      ]}
                      options={{
                        search: true,
                        sorting: false,
                        columnsButton:true,
                        paging:false,         
                        }}
                        columns={[
                        { title: 'Id', field: 'id',  editable: 'never'
                        },
                        { title: 'Nombre', field: 'nombre'
                        },
                        { title: 'Rubro', field: 'rubro', lookup:{r2:"Obras y Contruccion", r1:"Maquinas y Herramientas"}
                        },
                        ]}
                        data={this.state.Sub_Rubro}
                        editable={{
                          onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                              setTimeout(() => {
                                {
                                  const data = this.state.Sub_Rubro;
                                  const index = data.indexOf(oldData);
                                  data[index] = newData;
                                  this.setState({ data }, () => resolve());
                                  console.log(newData);
                                  const db = firebase.database();
                                  const dbRef = db.ref("Sub_Rubro");
                                  const refSB = dbRef.child(data[index].id) 
                                  refSB.update({
                                    "nombre":newData.nombre,
                                    "rubro":newData.rubro
                                  })
                                  
                                }
                                resolve()
                              }, 1000)
                            }),
                        }}
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
                          { title: 'Titulo', field: 'nombre' ,
                          cellStyle:{width:'50%',minWidth:'50%'},
                          headerStlye:{width:'50%',minWidth:'50%'}
                          },
                          { title: 'Id', field: 'id',
                            cellStyle:{width:200,minWidth:200},
                            headerStlye:{width:200,minWidth:200}
                          }
                        ]}
                        data={this.state.Rubro}
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
                <AddProducto sub_rubros={this.state.Sub_Rubro}/>
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
                          { title: 'Titulo', field: 'nombre',
                          cellStyle:{width:'50%',minWidth:'50%'},
                          headerStlye:{width:'50%',minWidth:'50%'}
                          },
                          { title: 'Id', field: 'id'}
                        ]}
                        data={this.state.Rubro}
                        title="Rubro/"
              />   
              </Grid>      
              </Grid>
            );
          }
        }    
  }
    
}
const mapStateToProps = (state) =>{
  return{
    posts : state.posts
  }
}
export default connect(mapStateToProps)(Admin3);