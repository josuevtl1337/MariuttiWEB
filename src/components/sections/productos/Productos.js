import React, { Component, useState, useEffect  } from "react"
import ReactDOM from 'react-dom';
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

    // const [categoriaActual, setCategoriaActual] = useState("-M163WoG-kWq-0jDt1CJ");
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // console.log(props.categoriaSet);
        console.log(props.location.search.substr(1));
        console.log(props.categoriaSet);
        window.scrollTo(0, 0)

        if(window.location.hash.includes('#/result?')){
            var search = props.history.location.hash.substr(9);
            setBusqueda(search);
        }else if(window.location.hash.includes('#/Rubro')){
            var categoriaResult = props.history.location.hash.substr(8);
            // set(search); 
            setCategoriaActual(categoriaResult)
        }
        //si el resultado del dropdown es distinto a vacio lo seteo

        //!!!!!!!!!!!!!!!!!!!DROPDOWN COMENTADO!!!!!!!!!!!!!!!!!!!!
        // if(props.dropdownResult!=''){
        //     setCategoriaActual(props.dropdownResult); 
        //     setCategoriaRuta("");   
        //     setCategoriaActualName(props.dropdownResultName);  
        // }
        if(props.dropdownResult!=""){
            setCategoriaActual(props.dropdownResult); 
            setCategoriaRuta("");   
            setCategoriaActualName(props.dropdownResultName);  
            history.push("/Rubro/"+props.dropdownResult);
        }else 
            if(props.categoriaSet!=""){
            console.log(props.categoriaSet);
            setCategoriaActual(props.categoriaSet);
            setCategoriaActualName(props.categoriaNombre);
            setCategoriaRuta("");   
            // setCategoriaActualName(props.dropdownResultName);  
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
    //Const
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImg] = useState("");
    const [subtitulo, setSubtitulo] = useState("");
    const [video, setVideo] = useState("");
    const [categoriaActualName, setCategoriaActualName] = useState("Productos Destacados");
    const [categoriaActual, setCategoriaActual] = useState("");
    const [categoriaRuta, setCategoriaRuta] = useState("");
    const [productoState, setProductoState] = useState(false);
    const [productTrigger, setProductTrigger] = useState(false);
    const [busqueda, setBusqueda] = useState("");

    const rubros = useSelector(state => state.firebase.data.Rubro);
    const sub_rubros = useSelector(state => state.firebase.data.Sub_Rubro);
    const productos = useSelector(state => state.firebase.data.Producto);
    const maquinas = [];
    const construccion = [];
    const ferreteria = [];
    var onlyProductos = [];
    var productosArray = [];
    var re = [];
    
    
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
        history.push("/Rubro/"+e);
        // setProductTrigger(false);
    }

    const handleClickRubro = (e) => {
        console.log(e);
        setCategoriaRuta(e + " / ");
    }
    const handlerURL = (id) => (e) =>{
        if(productTrigger==true){
            console.log(props.history);
            e.preventDefault()
            props.history.push("/productos/"+ id);
        
        }else{
            console.log(props.history);
            e.preventDefault()
            props.history.push("/productos");
        }
    }
    const handlerProductTrigger = (id,nomb,descripcion,img,subt,vid) =>{
        // props.history.push("/productos?" + id);
        // if(productTrigger==true){           
        //     setProductTrigger(false);
        // }else{
        //     props.history.push("/productos?");
        //     setProductTrigger(true);
        // }

        // setId(id);
        // setNombre(nomb);
        // setSubtitulo(subt);
        // setDescripcion(descripcion);
        // setImg(img);
        // setVideo(vid);
        // handlerURL(id);
        // props.history.push(categoriaRuta+categoriaActualName+"/"+id)

        // <---LEER: Esto de abajo agrega el id de producto a la url, pero luego no funciona clickear una categoria de la izquierda.
        // e.preventDefault();
        var ruta = categoriaRuta+categoriaActualName

        props.history.push("/producto?"+id);
    }
    const buscandoResultado = (param) => {
        if(param!=""){
            setCategoriaActual(""); 
            // props.dropdownResult="";
            setCategoriaActualName("Resultado de la busqueda "+"'"+param.toString()+"'"); 
            setBusqueda(param)
        } 
    }

    return (
        <React.Fragment>
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
                        {/* <h4>{nombre}{subtitulo}{video}</h4> */}
                        <Divider/>
                        {/* {productTrigger ? <ProdComp nombre={nombre} descripcion={descripcion} img={imagen} subtitulo={subtitulo} enlace={video}/>  */}
                        <CatalogoProductos categoriaActual={categoriaActual} busquedaResult={busqueda} productTrigger={handlerProductTrigger}/>
                        {/* 
                        <div className="contenedor-catalogo">
                            
                            {re.map((item, i) => {                             
                                if(categoriaActual == item.sub_rubro){
                                    return (
                                        <div onClick={()=>handlerOnClickProducto(item.id,item.nombre,item.descripcion)}>
                                            <ProductosCard                                      
                                                img={item.img}
                                                titulo={item.nombre}
                                                subtitulo={item.descripcion}
                                                key={i}
                                            />   
                                        </div>                                                                     
                                    );
                                }
                            })}    
                            {            
                                //Productos destacados                           
                                onlyProductos.map((item, i) =>{
                                    if(categoriaActual == ""){
                                        return(                                 
                                            <div onClick={()=>handlerOnClickProducto(item.id,item.nombre,item.descripcion)}>
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
                            } 
                        </div>*/}
                    </Grid>
                </Grid>              
            </Container>
        </React.Fragment>
    );
}

export default Productos
