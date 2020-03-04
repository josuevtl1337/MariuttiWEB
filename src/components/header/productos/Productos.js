import React, { Component } from "react"
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
    const construccion = ["1", "2", "3"];
    const maquinas = ["4", "5", "6"];
    //Hago la referencia para traer mis objetos Rubros, y Sub_Rubros
    useFirebaseConnect([
        { path: 'Rubro' },
        { path: 'Sub_Rubro' }
    ])
    const rubros = useSelector(state => state.firebase.ordered.Rubro)
    const sub_rubros = useSelector(state => state.firebase.ordered.Sub_Rubro)
    const [ru, setRu] = React.useState("");
    const handleChangeSub = () => {
        setRu(rubros);
        console.log(ru);
    };


    // Show message while Rubros y Sub_Rubros are loading
    if (!isLoaded(rubros) && !isLoaded(sub_rubros) ) {
        return <div>Loading...</div>
    }

    return (

        <React.Fragment>
            <button>A</button>
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
