import React from "react"
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import "./catalogoProductos.css"
import { makeStyles } from '@material-ui/core/styles';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { connect } from 'react-redux'
//Importar el storage
import "firebase/firebase-storage";
import firebase from "firebase/app"

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));

const ProductoComponent = (props) =>{
    var productosArray = [];
    const [url, setUrl] = React.useState('');
    const classes = useStyles();
    //Hago la referencia para traer mis objetos Rubros, y Sub_Rubros
    useFirebaseConnect([
        { path: 'Producto' }
    ])
    const productos = useSelector(state => state.firebase.data.Producto)
    // Show message while Rubros y Sub_Rubros are loading
    if (!isLoaded(productos)) {
        return <div>Cargando...</div>
    }
    if(productos){
        console.log(productos)
        productosArray = Object.values(productos);
        console.log(props.history)
    }
    let search = props.history.location.search.substr(1);
    console.log(search);


    return (
        <div className="container">
            <div className="heroimg-small"/>
            <Container style={{zIndex: 100}}>
                {/* Categorias  */}
                <Grid container spacing={4}>
                    {/* Productos */}
                    <Grid  className={classes.paper} item xs={12} md={12}>       
                       <h4>{search}</h4>
                       {productosArray.map((item, i) => {   
                                let fecha = new Date(item.createdAt);                        
                                if(search == item.id){
                                    let imagen = item.img;
                                    
                                    if (imagen) {
                                      var pathImagen = firebase
                                        .storage()
                                        .ref(imagen)
                                        .getDownloadURL()
                                        .then(url => {
                                          setUrl(url);
                                        })
                                        .catch(error => {
                                          console.log(error.message);
                                        });
                                  }
                                    return (      
                                        <div>
                                        <h2>nombre: {item.nombre}</h2> 
                                        <h2>date: {fecha.toString()}</h2>        
                                        <h2>subtitulo: {item.subtitulo}</h2>   
                                        <h2>descripcion: {item.descripcion}</h2>  
                                        <h2>enlace: {item.enlace}</h2>  
                                        <iframe width="1343" height="480" 
                                        src={item.enlace}
                                        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                                         allowfullscreen></iframe>
                                        <img src={url} />
                                                                      
                                        </div>                                                                                       
                                    );
                                }                               
                            })}
                    </Grid>
                </Grid>              
            </Container>       
        </div>
    )
}

export default ProductoComponent;