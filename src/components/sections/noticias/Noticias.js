import React from 'react'
import Container from '@material-ui/core/Container';
import './Noticias.css'
import EntradaCard from './EntradaCard'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'

const Noticias = (props) => {
    useFirebaseConnect([
        { path: 'Noticia' }
    ])
    var noticiasArray = [];
    const noticias = useSelector(state => state.firebase.data.Noticia);
    // Show message while Rubros y Sub_Rubros are loading
    if ( !isLoaded(noticias)) {
        return <div>Cargando...</div>
    }
    if(isLoaded(noticias)){
        noticiasArray = Object.values(noticias);
    }
    //Cambiando el history
    const handlerOnClickNoticia = (id) =>{
        // e.preventDefault();
        props.history.push("/entrada?" + id);
        // setProductoState(true);
        // console.log(productoState);
    }

    return(

        <div className="noticiasbody">

            <div className="noticiasbanner">
                <h2>Noticias</h2>
            </div>
            <Container>
                
                {/* Listado de todas las noticias */}
                <div className="listado-entradas">
                    {noticiasArray.map((item, i) => {                             
                        return (
                                <EntradaCard     
                                    click={()=>handlerOnClickNoticia(item.id)}                     
                                    img={item.img}
                                    title={item.nombre}
                                    date={item.createdAt}
                                    text={item.descripcion}
                                    key={i}
                                /> 
                                                                                            
                        );                                                       
                    })}                 
                </div>
            </Container>

        </div>
        
    )
}

export default Noticias