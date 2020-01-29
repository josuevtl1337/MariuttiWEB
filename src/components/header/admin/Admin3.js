import React, { Component } from 'react'
import MaterialTable from 'material-table'
import { makeStyles } from '@material-ui/core/styles';
import Catalogo from './ListaRubros'
import Grid from '@material-ui/core/Grid';
import firebase from "firebase/app"
import "firebase/database";
//Importar el storage
import "firebase/firebase-storage";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  }
}));


class Admin3 extends Component { 
  state = {
    data:[]
  };
  componentDidMount(){
    this.setState({
      data:[]
    })
  }
  //Metodo que pushea a la BD
  handleUpload = e => {
    e.preventDefault();
    //Seteo y referencia de la DB
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref(`imagenes/${file.name}`);
    //pusheo mi archivo file dentro de mi BD
    const task = storageRef.put(file);
    task.on(
      //Lo que hacmeos mientras sube
      "state_changed",
      snapshot => {
        //Para saber el portencageee que me falta
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({
          uploadValue: percentage
        });
      },
      //Lo que hgacmeos con los errores
      error => {
        console.log(error.message);
      },
      //Lo que hacmeos ni bieen subio la foto
      () => {
        const record = {
          titulo: this.state.user.photoURL,
          subtitulo: this.state.user.displayName,
          descripcion: this.state.txt,
          enlaces:this.state.enlaces,
          pic: task.snapshot.metadata.fullPath,
          fichaTecnica:this.state.fichaTecnica
        };
        const db = firebase.database();
        const dbRef = db.ref("pictures");
        const newPicture = dbRef.push();
        newPicture.set(record);
      }
    );
  };

  render(){ 
    const classes = useStyles;
    return (
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs>
          <Catalogo />
        </Grid>
        <Grid item xs >
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
            { title: 'Enlaces', field: 'enlaces'},
            { title: 'Imagen', field: 'imagen'},
            { title: 'Ficha Tecnica', field: 'fichaTecnica'}
          ]}
          data={[{ titulo: 'Taco Fischer metálico FBS', 
          subtitulo: 'Una buena Selladora', 
          descripcion: 'Sellador adhesivo universal con tecnología híbrida de alta performance y agarre inmediato. Pega – Rellena – Sella', 
          enlaces: "https://www.youtube.com/ watch?v=2DYYVp4QXew",
          fichaTecnica: 'https://www.youtube.com/ watch?v=2DYYVp4QXew' },
          
          { titulo: 'Caballetes Sorrento N° 3', 
          subtitulo: 'Un muy buen Sorrento (Recomendado) :)', 
          descripcion: 'Hormigonera con tambor Bicónico. Pala cargadora con elevación a cable de acero y vibrador incorporado.', 
          enlaces: "https://www.youtube.com/ watch?v=B7uMdmCQabc&list=RDB7uMdmCQabc&start_radio=1",
          imagen:'referencia al storage',
          fichaTecnica: 'archivo.PDF' },
          { titulo: 'Taco Fischer metálico FBS', 
          subtitulo: 'Una buena Selladora', 
          descripcion: 'Sellador adhesivo universal con tecnología híbrida de alta performance y agarre inmediato. Pega – Rellena – Sella', 
          enlaces: "https://www.youtube.com/watch?v=2DYYVp4QXew",
          fichaTecnica: 'PDF' },]}
          title="Mariutti Admin"
        />
      </Grid>      
      </Grid>
    )
  }
    
}
export default Admin3;