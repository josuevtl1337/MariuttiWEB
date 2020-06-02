import React, { useState, useEffect } from 'react';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import './Home.css'
import HomeDivider from './HomeDivider.js'
import HomeCard from './HomeCard.js'
import HomeCardCelu from './HomeCardCelu'
import EntradaMini from './EntradaMini'
import EntradaCelu from './EntradaCelu'
import HeroImage from '../../layout/HeroImage'
import ProductCarousel from '../../layout/ProductCarousel'
import ProductCarouselGrande from '../../layout/ProductCarouselGrande'
import Container from '@material-ui/core/Container'

import AtencionIcon from '../../../visuals/mail.svg'
import ConstIcon from '../../../visuals/wheelbarrow-y.svg'
import IndustIcon from '../../../visuals/jackhammer.svg'
import MaquinasIcon from '../../../visuals/saw.svg'

import AtencionIconCelu from '../../../visuals/mail-celu.svg'
import ConstIconCelu from '../../../visuals/wheelbarrow-celu.svg'
import IndustIconCelu from '../../../visuals/jackhammer-celu.svg'
import MaquinasIconCelu from '../../../visuals/saw-celu.svg'

import aboutimg from '../../../visuals/about-block-img.png'
import BlueTriangle from '../../../visuals/bluetriangle.svg'


const Home = (props) => {
    useFirebaseConnect([
        { path: 'Noticia' },
        { path: 'Producto' }
    ])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
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
        //Reversed para que los mapee por el ultimo cargado y luego mapeo los ultimos 3 con slice (crotada?) // No, re bien
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
                    'descripcion':item.descripcion},
                )
            }                                                                                                    
        })
        reversedProduct = onlyProductos.reverse(); 
        only4Productos = reversedProduct.slice(0,4);
        console.log(productosArray);
        console.log(onlyProductos);
        console.log(only4Productos);
    }
    //Cambiando el history Para los Productos
    const handlerOnClickProducto = (id) =>{
        // e.preventDefault();
        // props.history.push("/producto?" + id);
    }
    //Cambiando el history Para las Noticias
    const handlerOnClickNoticia = (id) =>{
        // e.preventDefault();
        props.history.push("/entrada?" + id);
    }
    //Cambiando el history Para los Productos
    const handlerOnClickCatalogo = () =>{
        // e.preventDefault();
        props.history.push("/productos");
    }
        //Cambiando el history Para Quienes somos
    const handlerOnClickAbout = () =>{
        // e.preventDefault();
        props.history.push("/nosotros");
    }
    //Cambiando el history Para Quienes somos
    const handlerOnClickContact = () =>{
        // e.preventDefault();
        props.history.push("/contacto");
    }

    return (
        <div className="container">
            <HeroImage 
                handlerOnClickCatalogo={handlerOnClickCatalogo}
                title="al servicio de la construcción"
                // text="Más de 50 años brindando soluciones para el hogar, la construcción y la industria"
                // text="La ferretería industrial más completa de la región"
                image="https://miro.medium.com/max/9856/1*gAG21NFA76ZlCbtK6SayVQ.jpeg"
            />

            <img src={BlueTriangle} className="bluetriangle"/>

            <div className="cardscelu-container" >
                <HomeCardCelu
                    handlerOnClickCatalogo={handlerOnClickCatalogo}
                    icon={MaquinasIconCelu} 
                    text="Máquinas y Herramientas"
                />
                <HomeCardCelu
                    handlerOnClickCatalogo={handlerOnClickCatalogo}    
                    icon={ConstIconCelu}
                    text="Obras y Construcción"
                />
                <HomeCardCelu
                    handlerOnClickCatalogo={handlerOnClickCatalogo}
                    icon={IndustIconCelu} 
                    text="Ferretería Industrial"
                />
                <HomeCardCelu
                    handlerOnClickCatalogo={handlerOnClickContact}
                    icon={AtencionIconCelu} 
                    text="Atención Personalizada"
                />
            </div>

            <div className="about-block">

                <Container>
                    <div className="cards-container">
                        <HomeCard
                            handlerOnClickCatalogo={handlerOnClickContact}
                            icon={AtencionIcon} 
                            text="Atención Personalizada"
                        />
                        <HomeCard
                            handlerOnClickCatalogo={handlerOnClickCatalogo}
                            icon={MaquinasIcon} 
                            text="Máquinas y Herramientas"
                        />
                        <HomeCard 
                            handlerOnClickCatalogo={handlerOnClickCatalogo}
                            icon={ConstIcon}
                            text="Obras y Construcción"
                        />
                        <HomeCard 
                            handlerOnClickCatalogo={handlerOnClickCatalogo}
                            icon={IndustIcon} 
                            text="Ferretería Industrial"
                        />
                    </div>

                    <div className="about-content">
                            <div className="abtleft">
                                <p className="abt-cnt-title">Honestidad, Calidad y Familia</p>
                                <p className="abt-cnt-text">
                                    Somos una empresa familiar que hace más de 50 años se dedica a brindar soluciones para el hogar, 
                                    la construcción y la industria, brindando siempre la mejor atención y asesoramiento.
                                </p>
                                <button className="aboutbtn" onClick={handlerOnClickAbout}>Conocenos</button>
                            </div>

                            <div className="abtright">
                                <img className="aboutimg" src={aboutimg} alt=""/>
                            </div>
                    </div>
                </Container>

                
            </div>

            <div className="prod-block">
                <Container>
                    <HomeDivider title="Productos Destacados" />

                    {/* Carousel de productos destacados */}
                    <div className="carouselcontainer celu">
                        <div style={{maxWidth: 500, margin: '0 auto'}}>
                        <ProductCarousel productos={reversedProduct} handlerOnClickProducto={handlerOnClickProducto}/>              
                        </div>
                    </div>

                    <div className="carouselcontainer desk">
                        <div style={{margin: '0 auto'}}>
                        <ProductCarouselGrande productos={reversedProduct} handlerOnClickProducto={handlerOnClickProducto}/>              
                        </div>
                    </div>


                    <HomeDivider title="Últimas Noticias" />
                    <div className="listado-entradas home">
                        {onlythree.map((item, i) => {
                            return (
                                <EntradaMini 
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

                    <div className="noticias-inicio-celu">
                        {onlythree.map((item, i) => {                             
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
        </div>
    )
}

export default Home
