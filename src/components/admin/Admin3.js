import React, { Component } from 'react'
import MaterialTable from 'material-table'
import Catalogo from './ListaRubros'
import Grid from '@material-ui/core/Grid';
import "firebase/database";
import "./admin.css"
//Importar el storage
import "firebase/firebase-storage";
import firebase, { auth } from "firebase/app"
import "firebase/auth";

//Botones "ADD"
import AddRubro from "./addRubro";
import AddSubRubro from "./addSubRubro";
import AddProducto from "./addProducto";
import AddNoticia from "./addNoticia";
import EditProducto from "./EditProducto";
import EditNoticia from "./EditNoticia";
import Loading from "./Loading";
import ModalPic from "./ModalPic"
//Botones
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
//TreeView
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
//Redux
import { connect } from "react-redux";

//Iconos
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import "firebase/auth";

//Progess
import CircularProgress from '@material-ui/core/CircularProgress';

class Admin3 extends Component { 
  state = {
    user: null,
    loading:true,
    loadingPic:true,
    email:"",
    password:"",
    data:[],
    Enlace:{},
    Rubro:[],
    Sub_Rubro:[],
    Categoria:[],
    Noticia:[],
    Producto:[],
    display:"Rubro",
    url: "https://storage.googleapis.com/support-forums-api/attachment/thread-6219249-11716624739372349952.png"
  };
  //Este método sirve para cambiar la tabla dependiendo a cual le das click
  handleClick = (param) =>{
    this.setState({
      display: param
    });     
  }
  //Subiendo SUB_RUBROS
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
    }).then(()=>window.location.reload()) 
  }
  //Subiendo PRODUCTOS
  handleUploadProducto = (nombre,subtitulo,descripcion,enlace,sub_rubro,f,oferta) => (e) =>{
    const file = f;
    const storageRef = firebase.storage().ref(`imagenes/${file.name}`);
    //pusheo mi archivo file dentro de mi BD
    const task = storageRef.put(file);
    task.on(
      //Lo que hacmeos mientras sube
      "state_changed",
      snapshot => {
        // this.setState({
        //   loading: true
        // });
      },
      //Lo que hgacmeos con los errores
      error => {
        console.log(error.message);
      },
      //Lo que hacmeos ni bieen subio la foto
      () => {
        const record = {
          nombre: nombre,
          subtitulo:subtitulo,
          descripcion:descripcion,
          enlace:enlace,
          sub_rubro: sub_rubro,
          img: task.snapshot.metadata.fullPath,
          off:oferta,
          createdAt: firebase.database.ServerValue.TIMESTAMP
        };
        
        const db = firebase.database();
        const dbRef = db.ref("Producto");
        const newPicture = dbRef.push();
        newPicture.set(record);
        const postId = newPicture.key;
        console.log(postId);
        newPicture.update({
          "id":postId
        }).then(()=>{
          console.log(postId.id)
          // this.setState({
          //   loading: false
          // });
          window.location.reload();      
          this.handleClick("Producto");
        }) 
      }   
    );
  }
  //Subiendo NOTICIAS
  handleUploadNoticia = (nombre,descripcion,f) =>{
    const file = f;
    const storageRef = firebase.storage().ref(`Noticias/${file.name}`);
    //pusheo mi archivo file dentro de mi BD
    const task = storageRef.put(file);
    task.on(
      //Lo que hacmeos mientras sube
      "state_changed",
      snapshot => {
        // this.setState({
        //   loading: true
        // });
      },
      //Lo que hgacmeos con los errores
      error => {
        console.log(error.message);
      },
      //Lo que hacmeos ni bieen subio la foto
      () => {
        const record = {
          nombre: nombre,
          descripcion:descripcion,
          img: task.snapshot.metadata.fullPath,
          createdAt: firebase.database.ServerValue.TIMESTAMP
        };       
        const db = firebase.database();
        const dbRef = db.ref("Noticia");
        const newNoticia = dbRef.push();
        newNoticia.set(record);
        const postId = newNoticia.key;
        console.log(postId);
        newNoticia.update({
          "id":postId
        }).then(()=>{
          console.log(postId.id)
          // this.setState({
          //   loading: false
          // });
          window.location.reload();      
        }) 
      }   
    );
  }  
  //EDITANDO PRODUCTOS
  handleEditProducto = (nombre,subtitulo,descripcion,enlace,sub_rubro,off,f,id) =>{
        const db = firebase.database();
        const dbRef = db.ref("Producto");
        const productoRef = dbRef.child(id)
        productoRef.update({
          "nombre": nombre,
          "subtitulo":subtitulo,
          "descripcion":descripcion,
          "enlace":enlace,
          "off":off,
          "sub_rubro": sub_rubro
        }).then(()=>window.location.reload());
        // newPicture.update(record).then(()=>{
        //   // console.log(postId.id)
        //   // this.setState({
        //   //   loading: false
        //   // });
        //   window.location.reload();      
        //   this.handleClick("Producto");
        // }) 
 
  }
  //EDITANDO NOTICIAS
  handleEditNoticia = (nombre,descripcion,id) =>{
    const db = firebase.database();
    const dbRef = db.ref("Noticia");
    const productoRef = dbRef.child(id)
    productoRef.update({
      "nombre": nombre,
      "descripcion":descripcion
    }).then(()=>window.location.reload());
}
  componentDidMount(){
    const db = firebase.database();
    var Xmas95 = new Date();
    var registro = Date.now();
    var day = Xmas95.getDate();
    var month = Xmas95.getMonth() + 1;
    var year = Xmas95.getFullYear();
    console.log("hoy es: ",day, month,year);
    console.log(Xmas95);
    console.log(Xmas95);
    console.log(registro);
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
        });
        const dbRefProducto = db.ref("Producto");
        dbRefProducto.on("child_added", snapshot => {
          this.setState({
            Producto: this.state.Producto.concat(snapshot.val()),
            Enlace: this.state.Producto.enlace
          });
        });
        const dbRefNoticia = db.ref("Noticia");
        dbRefNoticia.on("child_added", snapshot => {
          this.setState({
            Noticia: this.state.Noticia.concat(snapshot.val())
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
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.Producto !== this.state.Producto) {
  //     console.log('pokemons state has changed.',prevState.Producto) 
  //   }
  // }
  importingImg = (img) =>{
    let imagen = img;
    if (imagen) {
      var pathImagen = firebase
        .storage()
        .ref(imagen)
        .getDownloadURL()
        .then(url => {
          this.setState({
            url,
            loadingPic:false
          });
        })
        .catch(error => {
          console.log(error.message);
        });
    } 
  }
  handlerSignOut = () =>{
    const auth= firebase.auth();
    auth.signOut().then(()=>{
      console.log("user sign out")
    })
  }
  render(){ 
        if(this.state.loading){
          return (
          <Loading />
          );
        }       
        else{
          if(this.state.display=="Sub_Rubro"){
            return(
              <Grid container spacing={2}>  
                <Grid container justify="center" item xs={12}>
                  <Catalogo parentCallback={this.handleClick}/>  
                  <AddSubRubro handleUpload={this.handleUpload}/>
                  <button onClick={this.handlerSignOut}></button>
                </Grid>
                <Grid item xs={12} >
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
                                      window.location.reload();                                
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
                            { title: 'Rubro', field: 'rubro', lookup:{r2:"Obras y Contruccion", r1:"Maquinas y Herramientas",r3:"Ferretería Industrial"}
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
                            title="Sub_Rubros/"
                  />   
                </Grid>      
              </Grid>
            );
          }else if(this.state.display=="Rubro"){
            return(
              <Grid container spacing={2}>  
              <Grid container justify="center" item xs={12}>
              <Catalogo parentCallback={this.handleClick}/>   
                {/* <AddRubro /> */}
              </Grid>
              <Grid item xs={12} >
              <MaterialTable
                      actions={[
                        {
                          icon: 'delete',
                          tooltip: 'No se puede ejecutar esta accion',
                          disabled:true
                        },
                        {
                          icon:'edit',                 
                          tooltip: 'No se puede ejecutar esta accion',
                          disabled:true
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
                        title="Rubros/"
              />   
              </Grid>      
              </Grid>
            );
          }else if(this.state.display=="Producto"){
            return(
              <Grid container spacing={2}>  
              <Grid container justify="center" item xs={12}>
              <Catalogo parentCallback={this.handleClick}/>   
                <AddProducto sub_rubros={this.state.Sub_Rubro} handleUploadProducto={this.handleUploadProducto}/>
              </Grid>
              <Grid item xs={12} >
              <MaterialTable
                      actions={[
                        {
                          icon: 'save',
                          tooltip: 'Save User',
                          onClick: (event, rowData) => alert("You saved " + rowData.name)
                        },
                        {
                          icon: 'delete',
                          tooltip: 'Borrar Producto',
                          onClick: (event, rowData) => 
                          {
                            alert("You want to delete " + rowData.nombre)
                            new Promise((resolve, reject) => {
                              setTimeout(() => {
                                {     
                                  console.log(rowData);                        
                                  const db = firebase.database();
                                  const dbRef = db.ref("Producto");
                                  const refSB = dbRef.child(rowData.id); 
                                  refSB.remove();   
                                  // Delete the file
                                  if(rowData.img){
                                  // Create a reference to the file to delete
                                  var storage = firebase.storage();
                                  var storageRef = storage.ref();
                                  var desertRef = storageRef.child(rowData.img);
                                  desertRef.delete().then(function() {
                                      // File deleted successfully
                                      alert("File deleted successfully");
                                      window.location.reload();
                                    }).catch(function(error) {
                                      alert("OH NO!", error);
                                      window.location.reload();
                                      // Uh-oh, an error occurred!
                                    });      
                                  }else{
                                    window.location.reload();
                                  }
                                                          
                                }
                                resolve()
                              }, 1000)
                            })
                          }
                        },
                        {
                          icon:'add',
                          tooltip: 'Save User',
                          onClick: (event, rowData) => alert("You saved " + rowData.name)
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
                          { title: 'Subtitutlo', field: 'subtitulo' },
                          { title: 'Descripcion', field: 'descripcion',
                            cellStyle:{width:200,minWidth:200},
                            headerStlye:{width:200,minWidth:200},
                            hidden:true
                          },
                          { title: 'Sub_Rubro', field: 'sub_rubro'},
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
                                  src={rowData.enlace}
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              )
                            },
                          }   
                        ]}
                        components={{
                          Action: props => {
                            if(props.action.icon === 'save'){
                              return(
                              <EditProducto sub_rubros={this.state.Sub_Rubro} handleEditProducto={this.handleEditProducto} datosProductos={props}/>        
                              )
                            }
                            if(props.action.icon === 'delete'){
                              return(
                                <IconButton aria-label="delete" onClick={(event) => props.action.onClick(event, props.data)}>
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              )
                            }
                            if(props.action.icon === 'add'){
                              return(
                                <ModalPic file={props.data}/>
                              )
                            }    
                          }                   
                        }}
                        title="Productos/"
              />   
              </Grid>      
              </Grid>
            );
          }else if(this.state.display=="Noticias"){
            return(
              <Grid container spacing={2}>  
              <Grid container justify="center" item xs={12}>
              <Catalogo parentCallback={this.handleClick}/>   
                <AddNoticia handleUploadNoticia={this.handleUploadNoticia}/>
              </Grid>
              <Grid item xs={12} >
              <MaterialTable
                      actions={[
                        {
                          icon: 'save',
                          tooltip: 'Save User',
                          // onClick: (event, rowData) => alert("You saved " + rowData.name)
                        },
                        {
                          icon: 'delete',
                          tooltip: 'Borrar Producto',
                          onClick: (event, rowData) => 
                          {
                            alert("You want to delete " + rowData.nombre)
                            new Promise((resolve, reject) => {
                              setTimeout(() => {
                                {     
                                  console.log(rowData);                        
                                  const db = firebase.database();
                                  const dbRef = db.ref("Noticia");
                                  const refSB = dbRef.child(rowData.id); 
                                  refSB.remove();   
                                  // Delete the file
                                  if(rowData.img){
                                  // Create a reference to the file to delete
                                  var storage = firebase.storage();
                                  var storageRef = storage.ref();
                                  var desertRef = storageRef.child(rowData.img);
                                  desertRef.delete().then(function() {
                                      // File deleted successfully
                                      alert("File deleted successfully");
                                      window.location.reload();
                                    }).catch(function(error) {
                                      alert("OH NO!", error);
                                      window.location.reload();
                                      // Uh-oh, an error occurred!
                                    });      
                                  }else{
                                    window.location.reload();
                                  }
                                                          
                                }
                                resolve()
                              }, 1000)
                            })
                          }
                        },
                        {
                          icon:'add',
                          tooltip: 'Save User',
                          onClick: (event, rowData) => alert("You saved " + rowData.name)
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
                          { title: 'Descripcion', field: 'descripcion',
                            cellStyle:{minWidth:500},
                            headerStlye:{minWidth:500},
                            // hidden:true
                          },                    
                        ]}
                        
                        data={this.state.Noticia}
                        components={{
                          Action: props => {
                            if(props.action.icon === 'save'){
                              return(
                              <EditNoticia handleEditNoticia={this.handleEditNoticia} datosNoticia={props}/>        
                              )
                            }
                            if(props.action.icon === 'delete'){
                              return(
                                <IconButton aria-label="delete" onClick={(event) => props.action.onClick(event, props.data)}>
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              )
                          }
                            if(props.action.icon === 'add'){
                              return(
                                <ModalPic file={props.data}/>
                              )
                            }                                                       
                          }                   
                        }}                       
                        title="Noticias/"
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