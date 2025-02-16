import React, { Component, useState, useEffect  } from "react"
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import firebase from "firebase/app";
import "firebase/firestore";
import Grid from '@material-ui/core/Grid';
import './Productos.css'
import Drawer from './Drawer.js'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import CatalogoProductos from "./CatalogoProductos"
import ProductosCard from "./ProductoCard"
import ProdComp from "./ProdComp";
import SearchBar from "./SearchBar"

import HeroImageSmall from "../../layout/HeroImageSmall"
import "./catalogoProductos.css"
import { connect } from 'react-redux'
import { createHashHistory } from 'history';
export const history = createHashHistory();

const Productos = (props) => {

    //Hago la referencia para traer mis objetos Rubros, y Sub_Rubros
    useFirebaseConnect([
        { path: 'Rubro' },
        { path: 'Sub_Rubro' },
        { path: 'Producto' }
    ])

    //Const
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImg] = useState("");
    const [subtitulo, setSubtitulo] = useState("");
    const [video, setVideo] = useState("");
    const [categoriaActualName, setCategoriaActualName] = useState("Catálogo");
    const [categoriaActual, setCategoriaActual] = useState("");
    const [categoriaRuta, setCategoriaRuta] = useState("");
    const [productoState, setProductoState] = useState(false);
    const [productTrigger, setProductTrigger] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [title, setTitle] = useState("");
    const [scrollpos, setScrollPos] = useState(0)

    const rubros = useSelector(state => state.firebase.data.Rubro);
    const sub_rubros = useSelector(state => state.firebase.data.Sub_Rubro);
    const productos = useSelector(state => state.firebase.data.Producto);
    const maquinas = [];
    const construccion = [];
    const ferreteria = [];
    var onlyProductos = [];
    var productosArray = [];
    var re = [];


    // const [categoriaActual, setCategoriaActual] = useState("-M163WoG-kWq-0jDt1CJ");
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // categoriaset categorianombre
        window.scroll(0, scrollpos)
        var vardropdownResult = props.dropdownResult;
        var varcategoriaSet = props.categoriaSet;
        if(window.location.hash.includes('#/result?')){
            var search = props.history.location.hash.substr(9);
            setBusqueda(search);
            setCategoriaActualName("Resultado de la busqueda "+"'"+search.toString()+"'"); 
            varcategoriaSet="";
            vardropdownResult="";
        }else if(window.location.hash.includes('#/rubro')){
            var categoriaResult = props.history.location.hash.substr(8);
            // set(search); 
            setCategoriaActual(categoriaResult);
            setBusqueda("");
        }
        //si el resultado del dropdown es distinto a vacio lo seteo
        if(vardropdownResult!=""){
            setCategoriaActual(vardropdownResult); 
            setCategoriaRuta("");   
            setCategoriaActualName(props.dropdownResultName);  
            history.push("/rubro/"+vardropdownResult);
            setBusqueda("");
        }else 
            //Categoria desde ProductoComponent
            if(varcategoriaSet!=""){
            // console.log(props.categoriaSet);
            setCategoriaActual(varcategoriaSet);
            setCategoriaActualName(props.categoriaNombre);
            history.push("/rubro/"+varcategoriaSet);
            setCategoriaRuta("");    
        }
        //!!!!!!!!!!!!!!!!!!!ACA ESTA COMENTADO EL SEARCHBAR DESDE PRODUCTOCOMPONENT.JS
        // else   
        //     if(props.busquedaDesdePC!=""){
        //         var busquedaDesdePC = props.busquedaDesdePC
        //         setCategoriaActual(""); 
        //         setCategoriaActualName("Resultado de la busqueda "+"'"+busquedaDesdePC.toString()+"'"); 
        //         setBusqueda(busquedaDesdePC)
        // } 
        
        // else{
        //     setCategoriaActual(""); 
        // }
        // setCategoriaActual(props.location.search.substr(1));

        // if(props.trigger==false){
        //     setProductTrigger(true);
        // }
    });
 
    // var search = props.history.location.hash.substr(9);
    // console.log(props.history.location.hash.substr(9));
    // var str = props.history.location.hash.toString();
    // console.log(str) ;
    // var n = str.indexOf("#/result?");
    // console.log(n);



    if(rubros){
        const r = Object.values(rubros);
        console.log(r)
    }
    
    if(sub_rubros){
        const categorias = Object.values(sub_rubros);
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
    if(productos){
        console.log(productos)
        re = Object.values(productos);
    }
    if(isLoaded(productos)){
        productosArray = Object.values(productos);
        // Reversed para que los mapee por el ultimo cargado y luego mapeo los ultimos 3 con slice (crotada?)

        productosArray.map((item, i) => { 
            if(item.off == true){ 
                onlyProductos.push(
                    {'id':item.id,
                    'nombre': item.nombre,
                    'img':item.img,
                    'subtitulo': item.subtitulo,
                    'descripcion':item.descripcion},
                )
            }                                                                                                    
        })
        console.log(onlyProductos);
    }

    const handleClick = (e,categoriaNombre) => {
        props.categoriaActualCleanUp();
        console.log(e,categoriaNombre);
        props.cleanUp();
        setCategoriaActual(e);
        setCategoriaActualName(categoriaNombre);
        setBusqueda("");
        history.push("/rubro/"+e);
        // setProductTrigger(false);
    }

    const handleClickRubro = (e) => {
        console.log(e);
        setCategoriaRuta(e + " / ");
    }
    const handlerProductTrigger = (id) =>{
        var ruta = categoriaRuta+categoriaActualName
        props.setRutaToProdComp(ruta);
        props.history.push("/producto?"+id);
    }
    const buscandoResultado = (param) => {
        if(param!=""){
            // props.dropdownResult="";
            setCategoriaRuta("");
            setCategoriaActual("");
            setCategoriaActualName("Resultados de la busqueda "+"'"+param.toString()+"'"); 
            setBusqueda(param);
        } 

        if(window.innerWidth < 960) {
            setScrollPos(520)
        }
    }

    

    return (
        <React.Fragment>

            <Helmet>
                <title>{categoriaActualName} - Productos | Mariutti Hnos</title>
                <meta name="description" content="¿Sos un profesional o tenés un proyecto personal? Conocé acá nuestro variado catálogo de productos."/>
            </Helmet>

            {/* banner */}
            <div className="noticiasbanner prodlist">
                <h2>
                    Productos
                </h2>
            </div>
            <Container style={{zIndex: 100}}>
                {/* Categorias  */}
                <Grid container spacing={4}>
                    {/* Productos */}
                    <Grid item xs={12} md={3}>       
                        {/* <h4>Categorías</h4> */}
                        <h4>Categorías</h4>
                        <Divider style={{marginBottom: 24}}/>
                        <SearchBar buscando={buscandoResultado}/>
                        <Drawer titulo="Obras y Construcción" handlerRuta={handleClickRubro} handler={handleClick} categorias={construccion}/>
                        <Drawer titulo="Máquinas y Herramientas" handlerRuta={handleClickRubro} handler={handleClick} categorias={maquinas}/>
                        <Drawer titulo="Ferretería Industrial" handlerRuta={handleClickRubro} handler={handleClick} categorias={ferreteria}/>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <h4>{categoriaRuta}{categoriaActualName}</h4>
                        {console.log(categoriaRuta)}
                        {console.log(categoriaActualName)}
                        {/* <h4>{nombre}{subtitulo}{video}</h4> */}
                        <Divider/>
                        {/* {productTrigger ? <ProdComp nombre={nombre} descripcion={descripcion} img={imagen} subtitulo={subtitulo} enlace={video}/>  */}
                        <CatalogoProductos categoriaActual={categoriaActual} busquedaResult={busqueda} productTrigger={handlerProductTrigger}/>
                    </Grid>
                </Grid>              
            </Container>
        </React.Fragment>
    );
}

export default Productos
