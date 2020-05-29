import React from 'react'
import Container from '@material-ui/core/Container';
import './Noticias.css'
import EntradaCard from './EntradaCard'
import EntradaMini from '../inicio/EntradaMini'
import EntradaCelu from '../inicio/EntradaCelu'
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

    var tresnoticias = noticiasArray.reverse().slice(0,3);
    var restonoticias = noticiasArray.slice(3)

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
                <h2>Novedades</h2>
            </div>
            <Container>
                <h4 className="contactitle ultimas">más recientes</h4>
                
                {/* Listado de todas las noticias */}
                <div className="listado-entradas">
                    {tresnoticias.map((item, i) => {                             
                        return (
                            <EntradaMini     
                                handlerOnClickNoticia={()=>handlerOnClickNoticia(item.id)}                     
                                img={item.img}
                                title={item.nombre}
                                date={item.createdAt}
                                text={item.descripcion}
                                key={i}
                            />                                                              
                        );                                                       
                    })}                 
                </div>

                <div className="noticias-celu">
                    <h4 className="contactitle news">Noticias Anteriores</h4>

                    {restonoticias.map((item, i) => {                             
                        return (
                            <EntradaCelu 
                                handlerOnClickNoticia={()=>{handlerOnClickNoticia(item.id)}}                                       
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