import React, {useState} from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './ProductCarousel.css'

import ProductoCard from '../sections/productos/ProductoCard.js'
import SlideWrapper from './SlideWrapper.js'

export default function ProductCarousel (props) {
  
    // if(isLoaded(productos)){
    //     productosArray = Object.values(productos);
    //     // Reversed para que los mapee por el ultimo cargado y luego mapeo los ultimos 3 con slice (crotada?);
    //     productosArray.map((item, i) => { 
    //         if(item.off == true){ 
    //             onlyProductos.push(
    //                 {'id':item.id,
    //                 'nombre': item.nombre,
    //                 'img':item.img,
    //                 'subtitulo':item.subtitulo},
    //             )
    //         }                                                                                                    
    //     })
    //     reversedProduct = onlyProductos.reverse(); 
    //     only4Productos = reversedProduct.slice(0,4);
    //     console.log(productosArray);
    //     console.log(onlyProductos);
    //     console.log(only4Productos);
    // }

    
    return(
        <div className="car-wrap">
        <CarouselProvider
            naturalSlideWidth={150}
            naturalSlideHeight={300}
            totalSlides={props.productos.length}
            visibleSlides={1}
            infinite={true}
            isPlaying={true}
            step={1}
            lockOnWindowScroll={true}
        >
 
                <Slider style={{height: 280}}>
                {props.productos.map((item, i) => {     
                    console.log(props.productos)                   
                        return (
                            <Slide index={i}>                                                                        
                                <SlideWrapper nombre={item.nombre} descripcion={item.descripcion} img={item.img} id={item.id} handlerOnClickProducto={props.handlerOnClickProducto}/>
                            </Slide>                                                               
                        );                                                       
                    })}                                   

                </Slider>
                <ButtonBack className="car-button material-icons" id="back">keyboard_arrow_left</ButtonBack>
                <ButtonNext className="car-button material-icons">keyboard_arrow_right</ButtonNext>
                <DotGroup className="dotgroup"/>
                
                
            </CarouselProvider>
        </div>
    )

}