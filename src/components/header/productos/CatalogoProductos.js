import React, { Component } from 'react'
import ProductosCard from "./ProductoCard"
import "./catalogoProductos.css"

export class CatalogoProductos extends Component {
    render() {
        return (
            <div className="contenedor">
                <ProductosCard />
            </div>
        )
    }
}

export default CatalogoProductos
