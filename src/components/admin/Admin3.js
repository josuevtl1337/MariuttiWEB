import React, { Component } from 'react'
//CSS
import "./admin.css"

//Firebase
import "firebase/firebase-storage";
import firebase from "firebase/app"
import "firebase/database";
import 'firebase/auth'

//Material UI
import MaterialTable from 'material-table'
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

//Progess
import CircularProgress from '@material-ui/core/CircularProgress';
//ListaRubros
import Nav from './ListaRubros'
import Login from "./Login"

//Botones "ADD"
import AddSubRubro from "./addSubRubro";
import AddProducto from "./addProducto";
import AddNoticia from "./addNoticia";
import EditProducto from "./EditProducto";
import EditNoticia from "./EditNoticia";
import Loading from "./Loading";
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
  handleUploadProducto = (nombre,subtitulo,descripcion,enlace,sub_rubro,oferta,f,pdf) => async (e) => {
    var timestamp = new Date().getTime()
    const file = f;
    const filePdf = pdf;
    if(file != ""){
      await this.uploadImageAsPromise(file,nombre,subtitulo,descripcion,enlace,sub_rubro,oferta,timestamp);
    }
    if(filePdf != ""){
      await this.uploadImageAsPromise(filePdf,nombre,subtitulo,descripcion,enlace,sub_rubro,oferta,timestamp);
    }
  }

  //Handle waiting to upload each file using promise
  uploadImageAsPromise = (imageFile,nombre,subtitulo,descripcion,enlace,sub_rubro,oferta,timestamp) => {
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
  
  ///
  //Subiendo PRODUCTOS
  // handleUploadProducto = (nombre,subtitulo,descripcion,enlace,sub_rubro,f,oferta,pdf) => (e) =>{
  //   const file = f;
  //   const filePdf = pdf;
  //   if(file != ""){
  //     uploadingDocument(file);
  //   }
  //   if(filePdf != ""){
  //     uploadingDocument(filePdf);
  //   }

  //   var timestamp = Math.floor(Date.now() / 1000)
  //   console.log(files);
  //   // console.log(Math.floor(Date.now() / 1000))

  //   // console.log(filePdf);
  //   const storageRef = firebase.storage().ref(`imagenes/${nombre+"_"+timestamp}`);
  //   //pusheo mi archivo file dentro de mi BD
  //   const task = storageRef.put(files);
  //   task.on(
  //     //Lo que hacmeos mientras sube
  //     "state_changed",
  //     snapshot => {
  //     },
  //     //Lo que hgacmeos con los errores
  //     error => {
  //       console.log(error.message);
  //     },
  //     //Lo que hacmeos ni bieen subio la foto
  //     () => {        
  //       const record = {
  //         nombre: nombre,
  //         subtitulo:subtitulo,
  //         descripcion:descripcion,
  //         enlace:enlace,
  //         sub_rubro: sub_rubro,
  //         img: task.snapshot.metadata.fullPath,
  //         off:oferta,
  //         createdAt: firebase.database.ServerValue.TIMESTAMP
  //       };
        
  //       const db = firebase.database();
  //       const dbRef = db.ref("Producto");
  //       const newPicture = dbRef.push();
  //       newPicture.set(record);
  //       const postId = newPicture.key;
  //       console.log(postId);
  //       newPicture.update({
  //         "id":postId
  //       }).then(()=>{
  //         console.log(postId.id)
  //         window.location.reload();      
  //         this.handleClick("Producto");
  //       }) 
  //     }   
  //   );
  // }
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
        if(id!=undefined){
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
        }else{
          alert("Ah ocurrido algo inesperado, por favor recargue la página")
        }  
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
          <Loading/>
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
                <div className="refreshbtn" onClick={this.refreshpage}>
                  <span className="material-icons">loop</span>
                </div>
                <Grid container spacing={2}>  
                <Grid container justify="center" item xs={12}>
                  <Nav parentCallback={this.handleClick} close={this.handlerSignOut} />  
                  <AddSubRubro handleUpload={this.handleUpload}/>
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
                            sorting: false,
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
                <div className="refreshbtn" onClick={this.refreshpage}>
                  <span className="material-icons">loop</span>
                </div>
                <Grid container spacing={2}>  
              <Grid container justify="center" item xs={12}>
              <Nav parentCallback={this.handleClick} close={this.handlerSignOut}/>   
                <AddProducto sub_rubros={this.state.Sub_Rubro} handleUploadProducto={this.handleUploadProducto}/>
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
                        sorting: false,
                        columnsButton:true,
                        paging:true,    
                        pageSize:10     
                        }}
                        columns={[
                          { title: 'Titulo', field: 'nombre', filtering:false },
                          { title: 'Subtitutlo', field: 'subtitulo', filtering:false },
                          { title: 'Descripcion', field: 'descripcion',
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
                            if(props.action.icon === 'edit'){
                              return(
                                <IconButton>
                                <PictureAsPdfIcon onClick={(event) => props.action.onClick(event, props.data)}/>
                                </IconButton>
                              )
                            }  
                          }                   
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
                <div className="refreshbtn" onClick={this.refreshpage}>
                  <span className="material-icons">loop</span>
                </div>
                <Grid container spacing={2}>  
              <Grid container justify="center" item xs={12}>
                
                <Nav parentCallback={this.handleClick} close={this.handlerSignOut}/>   
                <AddNoticia handleUploadNoticia={this.handleUploadNoticia}/>
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
                        sorting: false,
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
                          }                   
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