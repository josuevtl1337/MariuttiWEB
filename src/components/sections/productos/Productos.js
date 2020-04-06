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
import ProductosCard from "./ProductoCard"
import HeroImageSmall from "../../layout/HeroImageSmall"
import "./catalogoProductos.css"
import { connect } from 'react-redux'



const Productos = (props) => {

    //Hago la referencia para traer mis objetos Rubros, y Sub_Rubros
    useFirebaseConnect([
        { path: 'Rubro' },
        { path: 'Sub_Rubro' },
        { path: 'Producto' }
    ])

    const [categoriaActual, setCategoriaActual] = useState("-M163WoG-kWq-0jDt1CJ");

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
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
    const productos = useSelector(state => state.firebase.data.Producto)
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
                ferreteria.push(new Object([Object.values(elemento)]))
            }
        })
        // props.trayendoCategorias(categorias);
    }
    if(productos){
        console.log(productos)
        re = Object.values(productos);
    }

    const handleClick = (e,categoriaNombre) =>{
        props.cleanUp();
        setCategoriaActual(e);
        setCategoriaActualName(categoriaNombre);
        console.log(categoriaActual)
    }
    //Cambiando el history
    const handlerOnClickProducto = (id) =>{
        // e.preventDefault();
        props.history.push("/producto?" + id);
        setProductoState(true);
        console.log(productoState);
    }


    return (
        <React.Fragment>
            {/* banner */}
            {/* <div className="heroimg-small"/> */}
            <HeroImageSmall 
                title="Productos"
                image='https://media.istockphoto.com/photos/set-of-hand-various-work-tools-on-grey-background-picture-id596042932'    
            />
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
                        <h4>{categoriaActualName}</h4>
                        <Divider/>
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
                        </div>
                    </Grid>
                </Grid>              
            </Container>
        </React.Fragment>
    );
}

export default Productos
