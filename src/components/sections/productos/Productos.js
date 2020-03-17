import React, { Component, useState } from "react"
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
import "./catalogoProductos.css"
import { connect } from 'react-redux'

const Productos = () => {
    //Hago la referencia para traer mis objetos Rubros, y Sub_Rubros
    useFirebaseConnect([
        { path: 'Rubro' },
        { path: 'Sub_Rubro' },
        { path: 'Producto' }
    ])

    const [categoriaActual, setCategoriaActual] = useState();
    const [categoriaActualName, setCategoriaActualName] = useState();

    const rubros = useSelector(state => state.firebase.data.Rubro)
    const sub_rubros = useSelector(state => state.firebase.data.Sub_Rubro)
    const productos = useSelector(state => state.firebase.data.Producto)
    const maquinas = [];
    const construccion = [];
    const ferreteria = [];
    var re = [];

    // Show message while Rubros y Sub_Rubros are loading
    if ( !isLoaded(rubros) && !isLoaded(sub_rubros) && !isLoaded(productos)  ) {
        return <div>Cargando...</div>
    }

    const r = Object.values(rubros);
    console.log(r)
    if(sub_rubros){
        const categorias = Object.values(sub_rubros);
        categorias.forEach(elemento => {
            if (elemento.rubro == "r1") {
                maquinas.push([elemento.id, elemento.nombre])
            } else if (elemento.rubro == "r2") {
                construccion.push([elemento.id, elemento.nombre])
            } else {
                ferreteria.push(new Object([Object.values(elemento)]))
            }
        })
    }
    if(productos){
        console.log(productos)
        re = Object.values(productos);
        console.log(re)
    }
    const handleClick = (e,categoriaNombre) =>{
        console.log(categoriaNombre)
        setCategoriaActual(e);
        setCategoriaActualName(categoriaNombre);
    }

    return (

        <React.Fragment>
            <div className="heroimg-small"/>
            <Container style={{zIndex: 100}}>
                
                <Grid container spacing={4}>
                    <Grid item lg={3} md={12}>
                        <h4>Categorías</h4>
                        <Divider/>
                        <Drawer titulo="Construcción" style="" handler={handleClick} categorias={construccion}/>
                        <Drawer titulo="Máquinas y Herramientas" handler={handleClick} categorias={maquinas}/>
                        <Drawer titulo="Ferretería Industrial" handler={handleClick} categorias={ferreteria}/>
                    </Grid>
                    <Grid item lg={9} md={12}>
                        <h4>{categoriaActualName}</h4>
                        <Divider/>
                        <div className="contenedor-catalogo">
                            {re.map((item, i) => {
                                console.log(item.id);
                                if(categoriaActual == item.sub_rubro){
                                    return (
                                        <ProductosCard
                                        img={item.img}
                                        titulo={item.nombre}
                                        subtitulo={item.descripcion}
                                        key={i}
                                        />
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
