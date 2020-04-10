import React, { useState, useEffect } from 'react';
import HomeDivider from '../inicio/HomeDivider'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import "./ProductoComponent.css"
import { makeStyles } from '@material-ui/core/styles';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { connect } from 'react-redux'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import PinterestIcon from '@material-ui/icons/Pinterest';
//Importar el storage
import "firebase/firebase-storage";
import firebase from "firebase/app"
import ProductoTabs from './ProductoTabs'

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
    const [enlace, setEnlace] = React.useState("https://storage.googleapis.com/support-forums-api/attachment/thread-6219249-11716624739372349952.png");
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
        <div className="containerprod">
            <div className="noticiasbanner prod">
                <h2>Productos</h2>
            </div>
            <div className="singleprod-wrap" style={{zIndex: 100}}>
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
                            <React.Fragment>
                                <div className="product-block">
                                    <div className="left">
                                        <img className="singleprod-img" src={url} />
                                    </div>
                                    <div className="right">
                                        <h3 className="singleprod-title">{item.nombre}</h3>
                                        <p className="singleprod-sub">{item.subtitulo}</p>
                                        <div className="divline" style={{marginLeft: 0, marginRight: 0, width: '100%'}}></div>
                                        <ProductoTabs
                                            descripcion={item.descripcion}
                                            enlace={item.enlace}
                                        />
                                        
                                        <button className="aboutbtn prodstock">
                                                Consultar Stock
                                        </button>   

                                        <div className="share">
                                            <h4 className="compartir">Compartir:</h4>
                                            <div className="shareicons">
                                                <FacebookIcon className="share-icon"/>
                                                <TwitterIcon className="share-icon"/>
                                                <PinterestIcon className="share-icon"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>   
                                <HomeDivider title="Productos Relacionados"/>
                            </React.Fragment>    
                                                                                                            
                        );
                    }                               
                })}     
            </div>       
        </div>
    )
}

export default ProductoComponent;