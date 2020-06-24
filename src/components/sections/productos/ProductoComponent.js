import React, { useState, useEffect } from 'react';
import { Link, NavLink, withRouter, Router } from "react-router-dom";

import Helmet from 'react-helmet';

import HomeDivider from '../inicio/HomeDivider'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Divider from '@material-ui/core/Divider';
import Drawer from './Drawer.js'
import Tooltip from '@material-ui/core/Tooltip';
import Share from '../../layout/Share'
import ProductosCard from "./ProductoCard"


import "./ProductoComponent.css"
import { makeStyles } from '@material-ui/core/styles';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
//Importar el storage
import "firebase/firebase-storage";
import firebase from "firebase/app"
import SearchBar from "./SearchBar"

import { createHashHistory } from 'history';
export const history = createHashHistory();

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
    const [categoriaRuta, setCategoriaRuta] = useState("");
    const [categoriaActual, setCategoriaActual] = useState("");
    // const [busqueda, setBusqueda] = useState("");
    var only3Productos = [];
    var reversedProduct= []; 
    var productosArray = [];
    var onlyProductos = [];
    const [ruta, setRuta] = React.useState('Catálaogo');
    const [url, setUrl] = React.useState('');
    const [pdf, setPdf] = React.useState('');
    const [prodnombre, setProdNombre] = React.useState('');
    const [codproducto, setCodProducto] = React.useState('');
    const [enlace, setEnlace] = React.useState("https://storage.googleapis.com/support-forums-api/attachment/thread-6219249-11716624739372349952.png");
    const classes = useStyles();
    const productos = useSelector(state => state.firebase.data.Producto);
    const rubros = useSelector(state => state.firebase.data.Rubro)
    const sub_rubros = useSelector(state => state.firebase.data.Sub_Rubro)
    const maquinas = [];
    const construccion = [];
    const ferreteria = [];
    var re = [];

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        window.scrollTo(0, 0)

        if(props.rutaToProdComp!=""){
            console.log(props.rutaToProdComp)
            setRuta(props.rutaToProdComp+" /")
        }
    });

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
        maquinas.sort(sortFunction);
        construccion.sort(sortFunction);
        ferreteria.sort(sortFunction);
    
        function sortFunction(a, b) {
            if (a[1] === b[1]) {
                return 0;
            }
            else {
                return (a[1] < b[1]) ? -1 : 1;
            }
        }   
        // props.trayendoCategorias(categorias);
    }

    const handleClickRubro = (e) => {
        console.log(e);
        setCategoriaRuta(e + " / ");
    }

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
        // Reversed para que los mapee por el ultimo cargado y luego mapeo los ultimos 3 con slice (crotada?)
        productosArray.map((item, i) => { 
            if(item.off == true){ 
                onlyProductos.push(
                    {'id':item.id,
                    'subtitulo':item.subtitulo,
                    'nombre': item.nombre,
                    'img':item.img,
                    'descripcion':item.descripcion},
                )
            }                                                                                                    
        })  
        reversedProduct = onlyProductos.reverse(); 
        if(onlyProductos.length>3){
            onlyProductos.slice(0,3);
        }
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
    const ifprecio = (string) => {
        if(string){
            return(
                <h4 className="precio">${string}</h4>
            )
        }
    }
    const ifprecioantiguo = (string) => {
        if(string){
            return(
                <h4 className="precio_anterior">${string}</h4>
            )
        }
    }
    const ifcodigo = (string) => {
        if(string){
            return(
                <h4 className="compartir">Cod: {string}</h4>
            )
        }
    }
    const handlePdf = () =>{
        window.open(pdf);
    }

    const appjstr = () => {
        props.tomarNombre(prodnombre, codproducto)
        props.history.push('/contacto')
    }
    const handlerProductTrigger = (id) =>{
        // var ruta = categoriaRuta+categoriaActualName
        props.setRutaToProdComp("Producto Recomendado");
        props.history.push("/producto?"+id);
    }
    const buscandoResultado = (param) => {
        props.history.push("productos?");
        // if(param!=""){
        //     // props.dropdownResult="";
        //     // setCategoriaRuta("");
        //     // setCategoriaActual("");
        //     // setCategoriaActualName("Resultados de la busqueda "+"'"+param.toString()+"'"); 
        //     // setBusqueda(param);
        // } 

        // if(window.innerWidth < 960) {
        //     setScrollPos(520)
        // }
    }

    return (
        <div className="containerprod">

            <Helmet>
                <title>{prodnombre} | Mariutti Hnos</title>
            </Helmet>

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
                        <SearchBar buscando={buscandoResultado}/>
                        <Drawer titulo="Construcción" handlerRuta={handleClickRubro} handler={handleClick} categorias={construccion}/>
                        <Drawer titulo="Máquinas y Herramientas" handlerRuta={handleClickRubro} handler={handleClick} categorias={maquinas}/>
                        <Drawer titulo="Ferretería Industrial" handlerRuta={handleClickRubro} handler={handleClick} categorias={ferreteria}/>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <div className="singleprod-wrap" style={{zIndex: 100}}>
                            <h4>{ruta}</h4>
                            <Divider style={{marginBottom: 28}}/>
                            {productosArray.map((item, i) => {

                                if(search == item.id){
                                    let imagen = item.img;              
                                    if (imagen) {
                                        var pathImagen = firebase
                                        .storage()
                                        .ref(imagen)
                                        .getDownloadURL()
                                        .then(url => {
                                            setUrl(url);
                                            setProdNombre(item.nombre);
                                            setCodProducto(item.codigo);
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
                                                        {ifcodigo(item.codigo)}
                                                        <div className="divline right" style={{marginLeft: 0, marginRight: 0, width: '100%'}}></div>
                                                        {ifprecio(item.precio)}
                                                        {ifprecioantiguo(item.precioAntiguo)}
                                                        <div className="buttonscontainer">
                                                            <button className="aboutbtn prodstock" onClick={appjstr}>
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

                                                    <Share
                                                        url={window.location.href}
                                                        text={prodnombre + " "}
                                                    />

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
                    Productos Recomendados
                    
                </h3>
                <div className="divline prod" style={{marginTop: 0}}/>
                
                <div className="contenedor-catalogo">
                    
                    {/* Mapear aca, renderear el componente de abajo */}
                    {/* <ProductosCard
                        titulo="Black an dequer"
                        subtitulo="la mejor del condado"
                    />
                    <ProductosCard
                        titulo="Black an dequer"
                        subtitulo="la mejor del condado"
                    />
                    <ProductosCard
                        titulo="Black an dequer"
                        subtitulo="la mejor del condado"
                    /> */}
                    {onlyProductos.map((item, i) => {
                            return (
                                <ProductosCard 
                                    handlerOnClick={()=>{handlerProductTrigger(item.id)}}                                     
                                    img={item.img}
                                    titulo={item.nombre}
                                    subtitulo={item.subtitulo}
                                    key={i}
                                />                                                                  
                            );                                                       
                    })} 
                </div>

                            
            </Container>

        </div>
    )
}

export default ProductoComponent;