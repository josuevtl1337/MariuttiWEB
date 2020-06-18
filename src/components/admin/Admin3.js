import React, { Component } from 'react'
//CSS
import "./admin.css"

//Firebase
import "firebase/firebase-storage";
import firebase from "firebase/app"
import "firebase/database";
import 'firebase/auth'

//Material UI
import MaterialTable, { MTableToolbar } from 'material-table'
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

//React Helmet (títulos dinámicos)
import Helmet from 'react-helmet';

//Progess
import CircularProgress from '@material-ui/core/CircularProgress';
//ListaRubros
import Nav from './AdminNav'
import Login from "./Login"

//Botones "ADD"
import AddSubRubro from "./addSubRubro";
import AddProducto from "./addProducto";
import AddNoticia from "./addNoticia";
import EditProducto from "./EditProducto";
import EditNoticia from "./EditNoticia";
import Loading from "../layout/Loading";
import ModalPic from "./ModalPic"
import ModalPdf from "./ModalPdf"
//Redux
import { connect } from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

class Admin3 extends Component { 
  state = {
    user: null,
    loading:true,
    Rubro:[],
    Sub_Rubro:[],
    Categoria:[],
    Noticia:[],
    Producto:[],
    email:"",
    password:"",
    data:[],
    Enlace:{},
    display:"Producto",
    displayError:"",
    idToSet:""
  };
  componentDidMount(){
    const db = firebase.database();
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    })
    //Importo todos los datos necesarios a variables de una sola vez.
 
      //Doy un delay de 2segundos para cargar los datos
      setTimeout(() => {
        const importingData = () =>{
          const db = firebase.database();
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
            const dbRefNoticia = db.ref("Noticia");
            dbRefNoticia.on("child_added", snapshot => {
              this.setState({
                Noticia: this.state.Noticia.concat(snapshot.val())
              });
            });       
        }
        this.setState({
          loading:false
        })
      }, 2000);
      this.importingData();

  }
  importingData = () =>{
    const db = firebase.database();
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
      const dbRefNoticia = db.ref("Noticia");
      dbRefNoticia.on("child_added", snapshot => {
        this.setState({
          Noticia: this.state.Noticia.concat(snapshot.val())
        });
      });       
  }
  importProductos = () =>{
    const db = firebase.database();
    const dbRefProducto = db.ref("Producto");
    dbRefProducto.on("child_added", snapshot => {
      this.setState({
        Producto: this.state.Producto.concat(snapshot.val())       
      });
    });
    // this.importingData();
    console.log(this.state.Producto)
  }
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

  ///
  //Subiendo archivos al Storage
  handleUploadProducto = (nombre,subtitulo,descripcion,enlace,sub_rubro,oferta,f,pdf,precio,precioAntiguo,codigo) => async (e) => {
    var timestamp = new Date().getTime()
    const file = f;
    const filePdf = pdf;
    if(file != ""){
      await this.uploadImageAsPromise(file,nombre,subtitulo,descripcion,enlace,sub_rubro,oferta,timestamp,precio,precioAntiguo,codigo);
    }
    if(filePdf != ""){
      await this.uploadImageAsPromise(filePdf,nombre,subtitulo,descripcion,enlace,sub_rubro,oferta,timestamp,precio,precioAntiguo,codigo);
    }
  }

  //Handle waiting to upload each file using promise
  uploadImageAsPromise = (imageFile,nombre,subtitulo,descripcion,enlace,sub_rubro,oferta,timestamp,precio,precioAntiguo,codigo) => {
    // return new Promise (function  (resolve, reject) {
        const storageRef = firebase.storage().ref(`imagenes/${imageFile.name+timestamp}`);
        var task = storageRef.put(imageFile);
        //Update progress bar
        task.on('state_changed', snapshot =>{
          //Mientras carga
          var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 
          100;
          console.log(percentage);
        },//Lo que hgacmeos con los errores
          error => {
            console.log(error.message);
            // reject(error.message);
        },
        () => {

          // var downloadURL = task.snapshot.downloadURL;

          const db = firebase.database();
          const dbRef = db.ref("Producto");
          const newPicture = dbRef.push();

          if(task.snapshot.metadata.contentType!="application/pdf"){
            //Si es una imagen
            const record = {
              nombre: nombre,
              subtitulo:subtitulo,
              codigo:codigo,
              precio:precio,
              precioAntiguo:precioAntiguo,
              descripcion:descripcion,
              enlace:enlace,
              sub_rubro: sub_rubro,
              img: task.snapshot.metadata.fullPath,
              off:oferta,
              createdAt: firebase.database.ServerValue.TIMESTAMP
            };
            newPicture.set(record);
            const postId = newPicture.key;
            this.setState({
              idToSet : postId
            });
            newPicture.update({
              "id":postId
            });
          }else{
            var id = this.state.idToSet;
            const productoRef = dbRef.child(id);
            productoRef.update({
              pdf: task.snapshot.metadata.fullPath
            })
            // newPicture.update({
            //   pdf: task.snapshot.metadata.fullPath
            // }); 
          }
          // resolve(downloadURL);
        });
    // });
  }
  
  //Editando IMG
  handleEditFiles = (file,fileRef,id,nombre,subtitulo,descripcion,enlace,sub_rubro,off,precio,precioAntiguo,codigo) => {
    var idLocal = id;
    var timestamp = new Date().getTime()
    const storageRef = firebase.storage().ref(`imagenes/${file.name+timestamp}`);
    var task = storageRef.put(file);
    //Update progress bar
    task.on('state_changed', snapshot =>{
      //Mientras carga
      var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 
      100;
      console.log(percentage);
      // Create a reference to the file to delete
      var desertRef = firebase.storage().ref(fileRef);
      // Delete the file
      desertRef.delete().then(function() {
      // File deleted successfully
      console.log("Archivo viejo eliminado")
      }).catch(function(error) {
        // Uh-oh, an error occurred!
        console.log("Error: ",error.message)
      });
    },//Lo que hgacmeos con los errores
      error => {
        console.log(error.message);
        // reject(error.message);
    },
    () => {
      if(idLocal!=undefined){          
        const db = firebase.database();
        const dbRef = db.ref("Producto");
        const productoRef = dbRef.child(idLocal)
        productoRef.update({
          "nombre": nombre,
          "subtitulo":subtitulo,
          "codigo":codigo,
          "precio":precio,
          "precioAntiguo":precioAntiguo,
          "descripcion":descripcion,
          "enlace":enlace,
          "off":off,
          "img": task.snapshot.metadata.fullPath,
          "sub_rubro": sub_rubro
        }).then(()=>window.location.reload());
      }else{
        alert("Actualice la página para seguir modificando")
      } 
    });
  }
  //Editando PDF
  handleEditPdf = (file,fileRef,id,nombre,subtitulo,descripcion,enlace,sub_rubro,off,precio,precioAntiguo,codigo) => {

    var idLocal = id;
    var timestamp = new Date().getTime()
    const storageRef = firebase.storage().ref(`imagenes/${file.name+timestamp}`);
    var task = storageRef.put(file);
    //Update progress bar
    task.on('state_changed', snapshot =>{
      //Mientras carga
      var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 
      100;
      console.log(percentage);
      // Create a reference to the file to delete
      if(fileRef!=''){
        var desertRef = firebase.storage().ref(fileRef);
        // Delete the file
        desertRef.delete().then(function() {
          // File deleted successfully
          console.log("Archivo viejo eliminado")
        }).catch(function(error) {
          // Uh-oh, an error occurred!
          console.log("Error: ",error.message)
        });
      }
    },//Lo que hgacmeos con los errores
      error => {
        console.log(error.message);
        // reject(error.message);
    },
    () => {
      if(idLocal!=undefined){          
        const db = firebase.database();
        const dbRef = db.ref("Producto");
        const productoRef = dbRef.child(idLocal)
        productoRef.update({
          "nombre": nombre,
          "subtitulo":subtitulo,
          "codigo":codigo,
          "precio":precio,
          "precioAntiguo":precioAntiguo,
          "descripcion":descripcion,
          "enlace":enlace,
          "off":off,
          "pdf": task.snapshot.metadata.fullPath,
          "sub_rubro": sub_rubro
        }).then(()=>window.location.reload());
      }else{
        alert("Actualice la página para seguir modificando")
      }  
    });
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
  handleEditProducto = (nombre,subtitulo,descripcion,enlace,sub_rubro,off,id,precio,precioAntiguo,codigo) =>{
        if(id!=undefined){          
          const db = firebase.database();
          const dbRef = db.ref("Producto");
          const productoRef = dbRef.child(id)
          productoRef.update({
            "nombre": nombre,
            "subtitulo":subtitulo,
            "codigo":codigo,
            "precio":precio,
            "precioAntiguo":precioAntiguo,
            "descripcion":descripcion,
            "enlace":enlace,
            "off":off,
            "sub_rubro": sub_rubro
          // }).then(()=>this.importProductos());
        }).then(()=>window.location.reload());
        }else{
          alert("Actualice la página para seguir modificando")
        }  
 
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
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.Producto !== this.state.Producto) {
    }
  }
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
  handleSubmitDragon = (email,password) =>{
    const auth= firebase.auth();
    auth.signInWithEmailAndPassword(email,password).then(cred =>{
      console.log(cred.user);
    }).catch(err=>{
      this.setState({
        displayError: err.message
      })
    })
  }

  refreshpage = () => {
    window.location.reload()
  }

  render(){ 
        if(this.state.loading){
          return (
            <Loading text='Cargando admin...'/>
          );
        }
        if(this.state.user==null){
          return(
            <Login handleSubmitDragon={this.handleSubmitDragon} error={this.state.displayError}/> 
          )
        }       
        else{
          if(this.state.display=="Sub_Rubro"){
            console.log(this.state.Rubro)
            var obj = this.state.Rubro.reduce(function(acc, cur, i) {
              acc[cur.id] = cur.nombre;
              return acc;
            }, {});
            console.log(obj);
            return(
              <div className="bg">
                <Helmet>
                  <title>Sub Rubros | Admin - Mariutti Hnos</title>
                </Helmet>
                <Grid container spacing={2}>
                <Grid container justify="center" item xs={12}>
                  <Nav parentCallback={this.handleClick} close={this.handlerSignOut} />
                </Grid>
                <Grid  container justify="center" item xs={12} >
                  <MaterialTable
                          actions={[
                            {
                              icon: 'delete',
                              tooltip: 'Borrar Producto',
                              onClick: (event, rowData) => 
                              {
                                var result = window.confirm("Quieres borrar > " + rowData.nombre);
                                new Promise((resolve, reject) => {
                                  if(result == true){
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
                                  }else{
                                    reject()
                                  }              
                                })
                              }
                            }
                          ]}
                          options={{
                            search: true,
                            sorting: true,
                            columnsButton:true,
                            paging:true,    
                            pageSize:10,      
                            filtering:true     
                            }}
                          columns={[
                            { title: 'Id', field: 'id',  editable: 'never', filtering:false
                            },
                            { title: 'Nombre', field: 'nombre' , filtering:false
                            },
                            { title: 'Rubro', field: 'rubro', lookup:obj 
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
                          title="Editor de Sub Rubros"
                          components={{
                            Toolbar: props => (

                              <React.Fragment>
                                <div style={{padding: '0px 10px', backgroundColor: '#E2E2E2'}}>
                                  <MTableToolbar {...props} />
                                </div>
                                <div 
                                  style={{
                                    backgroundColor: '#F8D15C',
                                    display: 'flex',
                                  }}
                                >
                                  <AddSubRubro handleUpload={this.handleUpload}/>


                                  <div style={{background: 'white', height: '100%', width: '1px'}} />

                                  <div className="tablebtn" style={{display: 'flex', alignItems: 'center', padding: '8px 12px', cursor: 'pointer', color:'#736342'}} onClick={this.refreshpage}>
                                    <i className="material-icons" style={{marginRight: 2}} >refresh</i>
                                    <p style={{margin: 0, fontFamily: 'roboto', fontSize: 14}} >Actualizar</p>
                                  </div>
                                </div>

                              </React.Fragment>

                            )
                          }}
                  />   
                </Grid>      
              </Grid>
              </div>
              
            );
          }else if(this.state.display=="Producto"){
            console.log(this.state.Sub_Rubro);
            var obj = this.state.Sub_Rubro.reduce(function(acc, cur, i) {
              acc[cur.id] = cur.nombre;
          
              return acc;
            }, {});
            console.log(obj);
            return(
              <div className="bg">
                <Helmet>
                  <title>Productos | Admin - Mariutti Hnos</title>
                </Helmet>
                <Grid container spacing={2}>  
              <Grid container justify="center" item xs={12}>
              <Nav parentCallback={this.handleClick} close={this.handlerSignOut}/>   
              </Grid>
              <Grid container justify="center" item xs={12} >
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
                            var result = window.confirm("Quieres borrar > " + rowData.nombre);
                            new Promise((resolve, reject) => {
                              if(rowData.id != undefined && result == true){
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
                                        alert("Producto eliminado correctamente !");
                                        window.location.reload();
                                      }).catch(function(error) {
                                        alert("OH NO, an error occurred!", error);
                                        window.location.reload();
                                        // Uh-oh, an error occurred!
                                      });      
                                    }else{
                                      window.location.reload();
                                    }
                                                            
                                  }
                                  resolve()
                                }, 1000)
                              }else if(result == false){
                                reject();
                              }
                              else{
                                reject();
                                alert("Error al borrar producto, por favor recargue la página");
                              }
                             
                            })
                          }
                        },
                        {
                          icon:'add',
                          tooltip: 'Save User',
                          onClick: (event, rowData) => alert("Guardaste " + rowData.name)
                        },
                        {
                          icon:'edit',
                          tooltip: 'Save User',
                          onClick: (event, rowData) => {
                            new Promise((resolve, reject) => {
                              console.log(rowData)                          
                              let pdf = rowData.pdf;
                              if (pdf) {
                                var pathImagen = firebase
                                  .storage()
                                  .ref(pdf)
                                  .getDownloadURL()
                                  .then(urlparam => {
                                    window.open(urlparam);
                                    resolve()
                                  })
                                  .catch(error => {
                                    alert("Parece que este producto no tiene un archivo PDF")
                                    console.log(error.message);
                                    reject()
                                  });
                              }else{
                                alert("Parece que este producto no tiene un archivo PDF")
                                reject()
                              }
                            })
                          }
                        }
                      ]}
                      options={{
                        filtering:true,
                        search: true,
                        sorting: true,
                        columnsButton:true,
                        paging:true,    
                        pageSize:10     
                        }}
                        columns={[
                          { title: 'Título', field: 'nombre', filtering:false },
                          { title: 'Subtítutlo', field: 'subtitulo', filtering:false },
                          { title: 'Descripción', field: 'descripcion',
                            cellStyle:{width:200,minWidth:200},
                            headerStlye:{width:200,minWidth:200},
                            hidden:true,
                            filtering:false
                          },
                          { title: 'Sub_Rubro', field: 'sub_rubro' , lookup: obj },
                          // { title: 'Ficha Tecnica', field: 'fichaTecnica'}                        
                        ]}
                        
                        data={this.state.Producto}

                        detailPanel={[
                          {
                            icon: 'play_arrow',
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
                              <EditProducto sub_rubros={this.state.Sub_Rubro} handleEditProducto={this.handleEditProducto} handleEditFiles={this.handleEditFiles} handleEditPdf={this.handleEditPdf} datosProductos={props}/>        
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
                            if(props.action.icon === 'edit'){
                              return(
                                <IconButton>
                                <PictureAsPdfIcon onClick={(event) => props.action.onClick(event, props.data)}/>
                                </IconButton>
                              )
                            }  
                          },   

                          Toolbar: props => (

                            <React.Fragment>
                              <div style={{padding: '0px 10px', backgroundColor: '#E2E2E2'}}>
                                <MTableToolbar {...props} />
                              </div>
                              <div 
                                style={{
                                  backgroundColor: '#F8D15C',
                                  display: 'flex',
                                }}
                              >

                                <AddProducto sub_rubros={this.state.Sub_Rubro} handleUploadProducto={this.handleUploadProducto}/>

                                <div style={{background: 'white', height: '100%', width: '1px'}} />

                                <div className="tablebtn" style={{display: 'flex', alignItems: 'center', padding: '8px 12px', cursor: 'pointer', color:'#736342'}} onClick={this.refreshpage}>
                                  <i className="material-icons" style={{marginRight: 2}} >refresh</i>
                                  <p style={{margin: 0, fontFamily: 'roboto', fontSize: 14}} >Actualizar</p>
                                </div>
                              </div>

                            </React.Fragment>

                          ),

                            

                        }}
                        title="Editor de Productos"
                        
              />   
              </Grid>      
              </Grid>
              </div>
              
            );
          }else if(this.state.display=="Noticias"){
            return(
              <div className="bg">
                <Helmet>
                  <title>Noticias | Admin - Mariutti Hnos</title>
                </Helmet>
                <Grid container spacing={2}>  
              <Grid container justify="center" item xs={12}>
                
                <Nav parentCallback={this.handleClick} close={this.handlerSignOut}/>   
              </Grid>
              <Grid container justify="center" item xs={12} >
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
                            var result = window.confirm("Quieres borrar > " + rowData.nombre);
                            new Promise((resolve, reject) => {
                              if(result == true){
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
                              }else{
                                reject()
                              }

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
                        sorting: true,
                        columnsButton:true, 
                        paging:true,    
                        pageSize:10         
                        }}
                        columns={[
                          { title: 'Titulo', field: 'nombre' },
                          { title: 'Descripcion', field: 'descripcion',
                            cellStyle:{maxWidth:500},
                            headerStlye:{minWidth:500}
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
                          },
                          Toolbar: props => (

                            <React.Fragment>
                              <div style={{padding: '0px 10px', backgroundColor: '#E2E2E2'}}>
                                <MTableToolbar {...props} />
                              </div>
                              <div 
                                style={{
                                  backgroundColor: '#F8D15C',
                                  display: 'flex',
                                }}
                              >

                                <AddNoticia handleUploadNoticia={this.handleUploadNoticia}/>


                                <div style={{background: 'white', height: '100%', width: '1px'}} />

                                <div className="tablebtn" style={{display: 'flex', alignItems: 'center', padding: '8px 12px', cursor: 'pointer', color:'#736342'}} onClick={this.refreshpage}>
                                  <i className="material-icons" style={{marginRight: 2}} >refresh</i>
                                  <p style={{margin: 0, fontFamily: 'roboto', fontSize: 14}} >Actualizar</p>
                                </div>
                              </div>

                            </React.Fragment>

                          )             
                        }}                       
                        title="Editor de Noticias"
              />   
              </Grid>      
              </Grid>
              </div>
              
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