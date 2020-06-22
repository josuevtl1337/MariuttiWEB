import React from "react"
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import ProductosCard from "./ProductoCard"

const CatalogoProductos = (props) =>{
    //Hago la referencia para traer mis objetos Rubros, y Sub_Rubros
    useFirebaseConnect([
        { path: 'Producto' }
    ])

    const productos = useSelector(state => state.firebase.data.Producto)
    var onlyProductos = [];
    var productosArray = [];
    var re = [];
    var arrcont;
    var emptyreturn;


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
                    'subtitulo':item.subtitulo,
                    'descripcion':item.descripcion,
                    'enlace':item.enlace
                },
                )
            }                                                                                                    
        })
        console.log(onlyProductos);
        console.log(re);
        re.reverse()

        productosArray.map((item, i) => {
            if(props.categoriaActual == item.sub_rubro){
                arrcont++
            }
        })

        // if(arrcont == null){
        //     emptyreturn = 
        //     <div className="categoria-vacia">
        //         <img src="https://image.flaticon.com/icons/png/512/2422/2422178.png" alt="" className="nocatimg"/>
        //         <h3 className="nocattitle">¡Ups! Parece que no hay nada aquí.</h3>
        //         <p className="nocattext">Esta categoría aún no tiene productos. Estamos trabajando para brindarte el mejor servicio.</p>
        //     </div>
        // } else {
        //     emptyreturn = null;
        // }

        if(arrcont == null && props.busquedaResult == false){
            emptyreturn = 
            <div className="categoria-vacia">
                <img src="https://image.flaticon.com/icons/png/512/2422/2422178.png" alt="" className="nocatimg"/>
                <h3 className="nocattitle">¡Ups! Parece que no hay nada aquí.</h3>
                <p className="nocattext">Esta categoría aún no tiene productos. Estamos trabajando para brindarte el mejor servicio.</p>
            </div>
        } else {
            emptyreturn = null;
        }
        
    }
    const handlerOnClickProducto = (id,nombre,descripcion,img,subtitulo,video) =>{
        props.productTrigger(id,nombre,descripcion,img,subtitulo,video);
        // e.preventDefault();
        // props.history.push("/producto?" + id);
        // setProductoState(true);
        // console.log(productoState);
    }

return(
    <React.Fragment>
        <div className="contenedor-catalogo">
            {re.map((item, i) => {                             
                if(props.categoriaActual == item.sub_rubro){
                    return (
                        <div onClick={()=>handlerOnClickProducto(item.id,item.nombre,item.descripcion,item.img,item.subtitulo,item.enlace)}>
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
                    if(props.categoriaActual == "" && props.busquedaResult==""){
                        return(                                 
                            <div onClick={()=>handlerOnClickProducto(item.id,item.nombre,item.descripcion,item.img,item.subtitulo,item.enlace)}>
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
            {   //Productos Busqueda                          
                re.map((item, i) =>{
                    if(props.busquedaResult!= "" && item.nombre.toUpperCase().includes(props.busquedaResult.toUpperCase())){
                        return(                                 
                            <div onClick={()=>handlerOnClickProducto(item.id,item.nombre,item.descripcion,item.img,item.subtitulo,item.enlace)}>
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
            {emptyreturn}
        </div>
    </React.Fragment>
);
}    

export default CatalogoProductos