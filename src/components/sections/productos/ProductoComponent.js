import React from "react"
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import "./ProductoComponent.css"
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
                        <div className="product-block">
                            <div className="left">
                                <img className="singleprod-img" src={url} />
                            </div>
                            <div className="right">
                                <h3 className="singleprod-title">{item.nombre}</h3>     
                                {/* <h2>{item.subtitulo}</h2>    */}
                                <p className="singleprod-desc">{item.descripcion}</p>  
                                <iframe 
                                    width="600"
                                    height="300"
                                    src={item.enlace}
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen
                                />
                                <a className="singleprod-enlace">{item.enlace}</a>  
                            </div>
                            
                        </div>                                                                                     
                    );
                }                               
            })}     
            </Container>       
        </div>
    )
}

export default ProductoComponent;