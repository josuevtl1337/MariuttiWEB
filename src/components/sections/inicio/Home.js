import React from "react"
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import './Home.css'
import HomeDivider from './HomeDivider.js'
import HomeCard from './HomeCard.js'
import EntradaMini from './EntradaMini'
import HeroImage from '../../layout/HeroImage'
import ProductoMini from './ProductoMini'
import Container from '@material-ui/core/Container'
import AtencionIcon from '../../../visuals/mail.svg'
import ConstIcon from '../../../visuals/wheelbarrow-y.svg'
import IndustIcon from '../../../visuals/jackhammer.svg'
// import MaquinasIcon from '../../../visuals/screwdriver-y.svg'
import MaquinasIcon from '../../../visuals/saw.svg'
import Parallax from 'react-rellax'
import ProductosCard from "../productos/ProductoCard"


const Home = (props) => {
    useFirebaseConnect([
        { path: 'Noticia' },
        { path: 'Producto' }
    ])
    var noticiasArray = [];
    var reversed=[];
    var onlythree = [];
    var onlyProductos = [];
    var reversedProduct = [];
    var productosArray = [];
    var only4Productos = [];
    
    const noticias = useSelector(state => state.firebase.data.Noticia);
    const productos = useSelector(state => state.firebase.data.Producto);


    // Show message while Rubros y Sub_Rubros are loading
    if ( !isLoaded(noticias)  && !isLoaded(productos)) {
        return <div>Cargando...</div>
    }
    if(isLoaded(noticias)){
        noticiasArray = Object.values(noticias);
        //Reversed para que los mapee por el ultimo cargado y luego mapeo los ultimos 3 con slice (crotada?)
        reversed = noticiasArray.reverse();
        onlythree = reversed.slice(0,3);
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
                    'subtitulo':item.subtitulo},
                )
            }                                                                                                    
        })
        reversedProduct = onlyProductos.reverse(); 
        only4Productos = reversedProduct.slice(0,4);
        console.log(productosArray);
        console.log(onlyProductos);
        console.log(only4Productos);
    }
    //Cambiando el history
    const handlerOnClickProducto = (id) =>{
        // e.preventDefault();
        props.history.push("/producto?" + id);
    }

    return (
        <div className="container">
            <HeroImage 
                title="INICIO"
                // text="Más de 50 años brindando soluciones para el hogar, la construcción y la industria"
                text="La ferretería industrial más completa de la región"
                image="https://st.depositphotos.com/2117297/2183/i/950/depositphotos_21832931-stock-photo-construction-worker.jpg" 
            />

            <Container>

                <div className="about-block">

                    <div className="left">
                        <Parallax speed={1}>
                            <img className="aboutimg" src="https://www.mariutti.com.ar/images/negocio.jpg" alt=""/>
                        </Parallax>
                    </div>
                    <div className="right">
                        <h2>Honestidad, Calidad y Familia</h2>
                        <p>
                            Somos una empresa familiar que hace más de 50 años 
                            se dedica a brindar soluciones para el hogar, la construcción y la industria 
                            
                        </p>
                        <button className="aboutbtn">Leer más ></button>
                    </div>
                </div>

                <div className="cards-container">
                    <HomeCard
                        icon={AtencionIcon} 
                        text="Atención Personalizada"
                    />
                    <HomeCard
                        icon={MaquinasIcon} 
                        text="Máquinas y Herramientas"
                    />
                    <HomeCard 
                        icon={ConstIcon}
                        text="Obras y Construcción"
                    />
                    <HomeCard 
                        icon={IndustIcon} 
                        text="Ferretería Industrial"
                    />
                </div>

                <HomeDivider title="Productos Destacados" />

                    <div className="destacados-inicio">
                        {only4Productos.map((item, i) => { 
                                return (
                                    <div onClick={()=>handlerOnClickProducto(item.id)}     >
                                        <ProductoMini                                                                   
                                            img={item.img}
                                            titulo={item.nombre}                                   
                                            subtitulo={item.subtitulo}
                                            key={i}
                                        />    
                                    </div>                                                                 
                                );                                                                                                        
                        })} 
{/* 
                        <ProductoMini
                            url='https://baumeister.qodeinteractive.com/wp-content/uploads/2017/11/shop-img-1-635x755.jpg'
                            titulo="Electric Drill"
                            subtitulo="Drills"
                            key='1'
                        />                    */}
                    </div>

                <HomeDivider title="Últimas Noticias" />
                    <div className="noticias-inicio">

                    {onlythree.map((item, i) => {                             
                            return (
                                <EntradaMini                                      
                                    img={item.img}
                                    title={item.nombre}
                                    date={item.createdAt}
                                    text={item.descripcion}
                                    key={i}
                                />                                                                  
                            );                                                       
                        })} 
                    </div>
                <div style={{height:'400vh', width:'100%'}}></div>
            </Container>
            
        </div>
    )
}

export default Home
