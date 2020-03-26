import React from 'react'
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import HeroImageSmall from "../../layout/HeroImageSmall"
import EntradaCard from './EntradaCard'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'

const Noticias = () => {
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

    return(
        <React.Fragment>

            <HeroImageSmall
                title="Noticias"
                image="https://image.shutterstock.com/z/stock-photo-industrial-factory-in-mechanical-engineering-for-the-manufacture-of-transformers-interior-of-a-1064126297.jpg"
            />
            <Container>
                {/* Listado de todas las noticias */}
                <div className="listado-entradas">
                    {noticiasArray.map((item, i) => {                             
                        return (
                            <div>
                                <EntradaCard                                      
                                    img={item.img}
                                    title={item.nombre}
                                    date={item.createdAt}
                                    text={item.descripcion}
                                    key={i}
                                />   
                            </div>                                                                     
                        );                                                       
                    })}                 
                </div>
                
                
            </Container>
            

            
        </React.Fragment>
        
    )
}

export default Noticias