import React, { Component } from "react"
import ReactDOM from 'react-dom';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import CatalogoProductos from "./CatalogoProductos"
import firebase from "firebase/app";
import "firebase/firestore";
import Grid from '@material-ui/core/Grid';
import Drawer from './Drawer.js';
import './Productos.css'

const Productos = () => {
    const construccion = ["1", "2", "3"];
    const maquinas = ["4", "5", "6"];
    return (
        <React.Fragment>
            <div className="heroimg"/>
            <Container style={{zIndex: 100}}>
                
                <Grid container spacing={4}>
                    <Grid item lg={3} md={12}>
                        <h4>Categorías</h4>
                        <Divider/>
                        {/* <Accordion titulo='Construcción' categoria={construccion} /> 
                        <Accordion titulo='Máquinas y Herramientas' /> 
                        <Accordion titulo='Ferretería Industrial' />  */}
                        <Drawer titulo="Construcción" categorias={construccion}/>
                        <Drawer titulo="Máquinas y Herramientas" categorias={maquinas}/>
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
