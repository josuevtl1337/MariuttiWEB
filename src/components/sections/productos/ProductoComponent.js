import React, { useState, useEffect } from 'react';
import HomeDivider from '../inicio/HomeDivider'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Divider from '@material-ui/core/Divider';
import Drawer from './Drawer.js'
import Tooltip from '@material-ui/core/Tooltip';

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
import SearchBar from "./SearchBar"

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

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        window.scrollTo(0, 0)
    });

    const [categoriaActualName, setCategoriaActualName] = useState("");
    const [categoriaRuta, setCategoriaRuta] = useState("");
    const [categoriaActual, setCategoriaActual] = useState("");
    const [busqueda, setBusqueda] = useState("");
    var productosArray = [];
    var onlyProductos = [];
    const [url, setUrl] = React.useState('');
    const [pdf, setPdf] = React.useState('');
    const [enlace, setEnlace] = React.useState("https://storage.googleapis.com/support-forums-api/attachment/thread-6219249-11716624739372349952.png");
    const classes = useStyles();
    const productos = useSelector(state => state.firebase.data.Producto);
    const rubros = useSelector(state => state.firebase.data.Rubro)
    const sub_rubros = useSelector(state => state.firebase.data.Sub_Rubro)
    const maquinas = [];
    const construccion = [];
    const ferreteria = [];
    var re = [];
    //Hago la referencia para traer mis objetos Rubros, y Sub_Rubros
    useFirebaseConnect([
        { path: 'Producto' }
    ])



    if(isLoaded(productos)){
        productosArray = Object.values(productos);
        // Reversed para que los mapee por el ultimo cargado y luego mapeo los ultimos 3 con slice (crotada?)

        productosArray.map((item, i) => { 
            if(item.off == true){ 
                onlyProductos.push(
                    {'id':item.id,
                    'nombre': item.nombre,
                    'img':item.img,
                    'subtitulo':item.subtitulo,
                    'descripcion':item.descripcion,
                    'enlace':item.enlace
                },
                )
            }                                                                                                    
        })
        console.log(onlyProductos);
        console.log(re);
    }

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

    const handleClickRubro = (e) => {
        console.log(e);
        setCategoriaRuta(e + " / ");
    }

    // const buscandoResultado = (param) => {
    //     if(param!=""){
    //         props.busquedaResultado(param)
    //         // "Resultado de la busqueda "+"'"+param.toString()+"'"
    //         // props.categoriaActualHandler(param,param); 
    //         // setBusqueda(param)
    //         props.history.push("/productos");
    //     }
        
    // }

    const handleClick = (e,categoriaNombre,categoriaName) =>{
        props.cleanUp();
        setCategoriaActual(e);
        var rutaEspecifica = categoriaName+" / "+categoriaNombre 
        props.categoriaActualHandler(e,rutaEspecifica);
        props.history.push("/productos");
        // setCategoriaActualName(categoriaNombre);
        // console.log(categoriaActual);
    }


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

    const ifvidexists = (string) => {
        if(string){
            return(
                <div className="videowrapper">
                    <iframe 
                        className="ytvideo"
                        src={string} 
                        frameBorder="0" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" 
                        allowFullScreen="true"
                    />  
                </div>
            )
        }
    }
    const handlePdf = () =>{
        window.open(pdf);
    }

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
                        {/* <SearchBar buscando={buscandoResultado}/> */}
                        <Drawer titulo="Construcción" handlerRuta={handleClickRubro} handler={handleClick} categorias={construccion}/>
                        <Drawer titulo="Máquinas y Herramientas" handlerRuta={handleClickRubro} handler={handleClick} categorias={maquinas}/>
                        <Drawer titulo="Ferretería Industrial" handlerRuta={handleClickRubro} handler={handleClick} categorias={ferreteria}/>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <div className="singleprod-wrap" style={{zIndex: 100}}>
                            <h4>Rubro / Subrubro /</h4>
                            <Divider style={{marginBottom: 28}}/>
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
                                        let pdf1 = item.pdf;   
                                        if (pdf1) {
                                            var pathImagen = firebase
                                            .storage()
                                            .ref(pdf1)
                                            .getDownloadURL()
                                            .then(urlparam => {
                                                setPdf(urlparam);                                              
                                            })
                                            .catch(error => {
                                                console.log(error.message);
                                            });
                                        }
                                    }               
                                    return (  
                                        <React.Fragment>
                                            <div className="product-block">
                                                <div className="prodtop">
                                                    
                                                    <div className="left">
                                                        <img className="singleprod-img" src={url} />
                                                    </div>
                                                    <div className="right">
                                                        <h3 className="singleprod-title">{item.nombre}</h3>
                                                        <h4 className="compartir">{item.codigo}</h4>
                                                        <div className="divline right" style={{marginLeft: 0, marginRight: 0, width: '100%'}}></div>
                                                        <h4 className="precio">${item.precio}</h4>
                                                        <h4 className="precio_anterior">${item.precioAntiguo}</h4>
                                                        <div className="buttonscontainer">
                                                            <button className="aboutbtn prodstock">
                                                                Consultar Stock
                                                            </button>
                                                            <Tooltip arrow title="Descargar Ficha Técnica" placement="right">
                                                                <button onClick={handlePdf} className="aboutbtn fichatecnica">
                                                                    <i className="material-icons ficha">play_for_work</i>
                                                                </button>
                                                            </Tooltip>
                                                            
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div className="desc">
                                                    <div className="divline descr"></div>
                                                    <p className="singleprod-sub">{item.subtitulo}</p>


                                                    <p className="singleprod-desc">{item.descripcion}</p>

                                                    {ifvidexists(item.enlace)}

                                                    {/* <div className="share">
                                                        <h4 className="compartir">Compartir:</h4>
                                                        <div className="shareicons">
                                                            <FacebookIcon className="share-icon"/>
                                                            <TwitterIcon className="share-icon"/>
                                                            <PinterestIcon className="share-icon"/>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="divline share"></div> */}

                                                    <div className="divline descr"></div>

                                                </div>
                                            </div>   
                                            
                                        </React.Fragment>    
                                                                                                                        
                                        );
                                }                               
                            })}     
                        </div> 
                    </Grid>
                </Grid>
                <h3 className="homediv-title prodrel">
                    Productos Relacionados
                    {/* {   //Productos destacados                           
                        onlyProductos.map((item, i) =>{
                            if(props.busquedaResult!= "" && item.nombre.toUpperCase().includes(props.busquedaResult.toUpperCase())){
                                return(                                 
                                    <div onClick={()=>handlerOnClickProducto(item.id,item.nombre,item.descripcion,item.img,item.subtitulo,item.enlace)}>
                                    <ProductosCard                                      
                                        img={item.img}
                                        titulo={item.nombre}
                                        subtitulo={item.descripcion}
                                        key={i}
                                    />   
                                </div>    
                                )
                            }
                        })
                    } */}
                </h3>
                <div className="divline prod" style={{marginTop: 0}}></div>              
            </Container>

        </div>
    )
}

export default ProductoComponent;