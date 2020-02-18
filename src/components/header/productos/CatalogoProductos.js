import React, { Component } from 'react'
import ProductosCard from "./ProductoCard"
import "./catalogoProductos.css"
import Paper from '@material-ui/core/Paper'

export class CatalogoProductos extends Component {
    render() {
        return (
            <Paper className="contenedor">
                <ProductosCard />
                <ProductosCard />
                <ProductosCard />
            </Paper>
        )
    }
}

export default CatalogoProductos
