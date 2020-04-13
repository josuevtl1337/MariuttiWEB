import React from "react"
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
    //Cambiando el history
    const handlerOnClickProducto = (id) =>{
        // e.preventDefault();
        props.history.push("/producto?" + id);
    }

    return (
        <div className="container">
            <HeroImage 
                title="al servicio de la construccion"
                // text="Más de 50 años brindando soluciones para el hogar, la construcción y la industria"
                // text="La ferretería industrial más completa de la región"
                image="https://miro.medium.com/max/9856/1*gAG21NFA76ZlCbtK6SayVQ.jpeg"
            />

            <img src={BlueTriangle} className="bluetriangle"/>

            <div className="cardscelu-container">
                <HomeCardCelu
                    icon={MaquinasIconCelu} 
                    text="Máquinas y Herramientas"
                />
                <HomeCardCelu
                    icon={ConstIconCelu}
                    text="Obras y Construcción"
                />
                <HomeCardCelu
                    icon={IndustIconCelu} 
                    text="Ferretería Industrial"
                />
                <HomeCardCelu
                    icon={AtencionIconCelu} 
                    text="Atención Personalizada"
                />
            </div>

            <div className="about-block">

                <Container>
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

                    <div className="about-content">
                            <div className="abtleft">
                                <p className="abt-cnt-title">Honestidad, Calidad y Familia</p>
                                <p className="abt-cnt-text">
                                    Somos una empresa familiar que hace más de 50 años se dedica a brindar soluciones para el hogar, 
                                    la construcción y la industria, brindando siempre la mejor atención y asesoramiento.
                                </p>
                                <button className="aboutbtn">Conocenos</button>
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
                    <div style={{width: '100%', marginTop:'0px', marginBottom: '50px'}}>
                        <div style={{maxWidth: 500, margin: '0 auto'}}>
                        <ProductCarousel productos={reversedProduct} handlerOnClickProducto={handlerOnClickProducto}/>              
                        </div>
                    </div>


                    <HomeDivider title="Últimas Noticias" />
                    <div className="noticias-inicio">
                        {onlythree.map((item, i) => {                             
                            return (
                                <EntradaMini                                      
                                    img={item.img}
                                    title={item.nombre}
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
