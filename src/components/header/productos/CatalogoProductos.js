import React, { Component } from 'react'
import ProductosCard from "./ProductoCard"
import "./catalogoProductos.css"
import Grid from '@material-ui/core/Grid'

const CatalogoProductos = () =>{
    return (
        <div className="contenedor-catalogo">
            <ProductosCard/>
            <ProductosCard/>
            <ProductosCard/>
            <ProductosCard/>
            <ProductosCard/>
            <ProductosCard/>
        </div>
    )
};

export default CatalogoProductos
