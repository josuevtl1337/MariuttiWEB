import React , {useState } from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import "./catalogoProductos.css";
import ProductosCard from "./ProductoCard";
import { makeStyles } from '@material-ui/core/styles';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { connect } from 'react-redux'
//Importar el storage
import "firebase/firebase-storage";
import firebase from "firebase/app"

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));

const ProductoComponent = (props) =>{
    var productosArray = [];
    const [productoState, setProductoState] = useState(false);
    const classes = useStyles();

    //Hago la referencia para traer mis objetos Rubros, y Sub_Rubros
    useFirebaseConnect([
        { path: 'Producto' }
    ])
    const productos = useSelector(state => state.firebase.data.Producto)
    // Show message while Rubros y Sub_Rubros are loading
    if (!isLoaded(productos)) {
        return <div>Cargando...</div>
    }
    if(productos){
        var searchresultSTR = props.busquedaResult;
        console.log(searchresultSTR.toString());
        console.log(productos);
        productosArray = Object.values(productos);
        console.log(props.history);
    }


    //Cambiando el history
    const handlerOnClickProducto = (id) =>{
        // e.preventDefault();
        props.history.push("/producto?" + id);
        setProductoState(true);
        console.log(productoState);
    }

    return (
        <div className="container">
            <div className="heroimg-small"/>
            <Container style={{zIndex: 100}}>
                {/* Categorias  */}
                <Grid container spacing={4}>
                    {/* Productos */}
                    <Grid  className={classes.paper} item xs={12} md={12}>       
                       {productosArray.map((item, i) => {    
                                if(props.busquedaResult == ""){
                                    props.history.push("/productos");
                                }                           
                                else if(item.nombre.toUpperCase().includes(props.busquedaResult.toUpperCase())){
                                    return(
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
                    </Grid>
                </Grid>              
            </Container>       
        </div>
    )
}

export default ProductoComponent;