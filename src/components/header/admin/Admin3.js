import React, { Component } from 'react'
import MaterialTable from 'material-table'
import Catalogo from './ListaRubros'
import Grid from '@material-ui/core/Grid';
import firebase from "firebase/app"
import "firebase/database";
import "./admin.css"
//Importar el storage
import "firebase/firebase-storage";



class Admin3 extends Component { 
  state = {
    data:[],
    enlaces:{}
  };
  componentDidMount(){
    this.setState({
      data:[],
      enlaces:{}
    });
    const db = firebase.database();

      // const record = { 
      //   titulo: 'Taco Fischer metálico FBS', 
      //   subtitulo: 'Una buena Selladora', 
      //   descripcion: 'Sellador adhesivo universal con tecnología híbrida de alta performance y agarre inmediato. Pega – Rellena – Sella', 
      //   enlaces: "https://www.youtube.com/ watch?v=2DYYVp4QXew",
      //   fichaTecnica: 'https://www.youtube.com/ watch?v=2DYYVp4QXew'
      // }
        const dbRef = db.ref("pictures/herramientas");
      //   const newPicture = dbRef.push();
      //   newPicture.set(record);

      const importingData = () =>{
        dbRef.on("child_added", snapshot => {
          this.setState({
            data: this.state.data.concat(snapshot.val())
          });
          this.state.data.map((item , key)=>{
            this.setState({
              enlaces: item.enlaces
            })
          });
        });
      }
      importingData();



      // console.log(this.snap);

      // dbRef.on("value", function(snapshot) {
      //   console.log(snapshot.val()); 
      // }, function (errorObject) {
      //   console.log("The read failed: " + errorObject.code);
      // });  
  }

  //Metodo que pushea a la BD
  // handleUpload = e => {
  //   e.preventDefault();
  //   //Seteo y referencia de la DB
  //   const file = e.target.files[0];
  //   const storageRef = firebase.storage().ref(`imagenes/${file.name}`);
  //   //pusheo mi archivo file dentro de mi BD
  //   const task = storageRef.put(file);
  //   task.on(
  //     //Lo que hacmeos ni bien subio la foto
  //     () => {
  //       const record = {
  //         titulo: this.state.user.photoURL,
  //         subtitulo: this.state.user.displayName,
  //         descripcion: this.state.txt,
  //         enlaces:this.state.enlaces,
  //         pic: task.snapshot.metadata.fullPath,
  //         fichaTecnica:this.state.fichaTecnica
  //       };
  //       const db = firebase.database();
  //       const dbRef = db.ref("pictures");
  //       // const newPicture = dbRef.push();
  //       // newPicture.set(record);
  //     }
  //   );
  // };

  render(){ 
    return (
        <Grid container className="container per" spacing={2}>
        <Grid container justify="center" item xs={6}>
          <Catalogo />
        </Grid>
        <Grid item xs={6} >
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
            { title: 'Titulo', field: 'titulo' },
            { title: 'Subtitutlo', field: 'subtitulo' },
            { title: 'Descripcion', field: 'descripcion',
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
          data={this.state.data}
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
          title="Mariutti Admin"
        />
      </Grid>      
      </Grid>
    
    )
  }
    
}
export default Admin3;