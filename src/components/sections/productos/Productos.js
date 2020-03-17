import React, { Component, useState } from "react"
import ReactDOM from 'react-dom';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import CatalogoProductos from "./CatalogoProductos"
import firebase from "firebase/app";
import "firebase/firestore";
import Grid from '@material-ui/core/Grid';
import './Productos.css'
import Drawer from './Drawer.js'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'

const Productos = () => {
    //Hago la referencia para traer mis objetos Rubros, y Sub_Rubros
    useFirebaseConnect([
        { path: 'Rubro' },
        { path: 'Sub_Rubro' }
    ])

    const [categoriaActual, setCategoriaActual] = useState();

    const rubros = useSelector(state => state.firebase.data.Rubro)
    const sub_rubros = useSelector(state => state.firebase.data.Sub_Rubro)
    const maquinas = [];
    const construccion = [];
    const ferreteria = [];

    // Show message while Rubros y Sub_Rubros are loading
    if ( !isLoaded(rubros) && !isLoaded(sub_rubros) ) {
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
    

    return (

        <React.Fragment>
            <div className="heroimg-small"/>
            <Container style={{zIndex: 100}}>
                
                <Grid container spacing={4}>
                    <Grid item lg={3} md={12}>
                        <h4>Categorías</h4>
                        <Divider/>
                        <Drawer titulo="Construcción" categorias={construccion}/>
                        <Drawer titulo="Máquinas y Herramientas" categorias={maquinas}/>
                        <Drawer titulo="Ferretería Industrial" categorias={ferreteria}/>
                    </Grid>
                    <Grid item lg={9} md={12}>
                        <h4>Aspiradoras</h4>
                        <Divider/>
                        <CatalogoProductos />
                    </Grid>
                </Grid>
                
            </Container>
        </React.Fragment>
    );
}


export default Productos
