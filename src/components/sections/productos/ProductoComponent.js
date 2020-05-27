import React, { useState, useEffect } from 'react';
import HomeDivider from '../inicio/HomeDivider'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Divider from '@material-ui/core/Divider';
import Drawer from './Drawer.js'


import "./ProductoComponent.css"
import { makeStyles } from '@material-ui/core/styles';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import PinterestIcon from '@material-ui/icons/Pinterest';
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


    useFirebaseConnect([
        { path: 'Rubro' },
        { path: 'Sub_Rubro' },
        { path: 'Producto' }
    ])

    const [categoriaActual, setCategoriaActual] = useState("-M163WoG-kWq-0jDt1CJ");

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        window.scrollTo(0, 0)
        //si el resultado del dropdown es distinto a vacio lo seteo
        if(props.dropdownResult!=''){
            setCategoriaActual(props.dropdownResult);    
            setCategoriaActualName(props.dropdownResultName);  
        }
    });

    const [categoriaActualName, setCategoriaActualName] = useState("Aislantes");
    const [productoState, setProductoState] = useState(false);

    const rubros = useSelector(state => state.firebase.data.Rubro)
    const sub_rubros = useSelector(state => state.firebase.data.Sub_Rubro)
    const maquinas = [];
    const construccion = [];
    const ferreteria = [];
    var re = [];

    if(rubros){
        const r = Object.values(rubros);
        console.log(r)
    }
    
    if(sub_rubros){
        const categorias = Object.values(sub_rubros);
        console.log(categorias)
        console.log(sub_rubros)
        categorias.forEach(elemento => {
            if (elemento.rubro == "r1") {
                maquinas.push([elemento.id, elemento.nombre])
            } else if (elemento.rubro == "r2") {
                construccion.push([elemento.id, elemento.nombre])
            } else {
                ferreteria.push([elemento.id, elemento.nombre])
            }
        })
        // props.trayendoCategorias(categorias);
    }

    const handleClick = (e,categoriaNombre) =>{
        props.cleanUp();
        setCategoriaActual(e);
        setCategoriaActualName(categoriaNombre);
        console.log(categoriaActual)
    }



    var productosArray = [];
    const [url, setUrl] = React.useState('');
    const [enlace, setEnlace] = React.useState("https://storage.googleapis.com/support-forums-api/attachment/thread-6219249-11716624739372349952.png");
    const classes = useStyles();
    //Hago la referencia para traer mis objetos Rubros, y Sub_Rubros
    useFirebaseConnect([
        { path: 'Producto' }
    ])
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
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

            <Container style={{zIndex: 100}}>
                {/* Categorias  */}
                <Grid container spacing={4}>
                    {/* Productos */}
                    <Grid item xs={12} md={3}>       
                        <h4>Categorías</h4>
                        <Divider style={{marginBottom: 28}}/>
                        <Drawer titulo="Construcción" handler={handleClick} categorias={construccion}/>
                        <Drawer titulo="Máquinas y Herramientas" handler={handleClick} categorias={maquinas}/>
                        <Drawer titulo="Ferretería Industrial" handler={handleClick} categorias={ferreteria}/>
                    </Grid>
                    <Grid item xs={12} md={9}>
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
                                                {/* <ProductoTabs
                                                    descripcion={item.descripcion}
                                                    enlace={item.enlace}
                                                /> */}

                                                <p className="singleprod-desc">{item.descripcion}</p>
                                                
                                                <div>
                                                    <button className="aboutbtn prodstock">
                                                            Consultar Stock
                                                    </button>
                                                </div>
                                                



                                                <div className="videowrapper">
                                                    <iframe 
                                                        className="ytvideo"
                                                        src={item.enlace} 
                                                        frameborder="0" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" 
                                                        allowfullscreen
                                                    />  
                                                </div>

                                                <div className="share">
                                                    <h4 className="compartir">Compartir:</h4>
                                                    <div className="shareicons">
                                                        <FacebookIcon className="share-icon"/>
                                                        <TwitterIcon className="share-icon"/>
                                                        <PinterestIcon className="share-icon"/>
                                                    </div>
                                                    
                                                </div>
                                                <div className="divline share"></div>
                                            </div>
                                        </div>   
                                        <h3 className="homediv-title prodrel">
                                            Productos Relacionados
                                        </h3>
                                        <div className="divline prod" style={{marginTop: 0}}></div>
                                    </React.Fragment>    
                                                                                                                    
                                        );
                                    }                               
                                })}     
                        </div> 
                    </Grid>
                </Grid>              
            </Container>







            {/* <div className="noticiasbanner prod">
                <h2>Productos</h2>
            </div> */}

            {/* <div className="singleprod-wrap" style={{zIndex: 100}}>
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
                                        {/* <ProductoTabs
                                            descripcion={item.descripcion}
                                            enlace={item.enlace}
                                        /> */}
{/* 
                                        <p className="singleprod-desc">{item.descripcion}</p>
                                        
                                        <div>
                                            <button className="aboutbtn prodstock">
                                                    Consultar Stock
                                            </button>
                                        </div>
                                         



                                        <div className="videowrapper">
                                            <iframe 
                                                className="ytvideo"
                                                src={item.enlace} 
                                                frameborder="0" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" 
                                                allowfullscreen
                                            />  
                                        </div>

                                        <div className="share">
                                            <h4 className="compartir">Compartir:</h4>
                                            <div className="shareicons">
                                                <FacebookIcon className="share-icon"/>
                                                <TwitterIcon className="share-icon"/>
                                                <PinterestIcon className="share-icon"/>
                                            </div>
                                            
                                        </div>
                                        <div className="divline share"></div>
                                    </div>
                                </div>   
                                <h3 className="homediv-title prodrel">
                                    Productos Relacionados
                                </h3>
                                <div className="divline prod" style={{marginTop: 0}}></div>
                            </React.Fragment>    
                                                                                                            
                        );
                    }                               
                })}     
            </div>       */}

        </div>
    )
}

export default ProductoComponent;