import React, {useState} from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './ProductCarousel.css'

import ProductoCard from '../sections/productos/ProductoCard.js'
import SlideWrapper from './SlideWrapper.js'

export default function ProductCarousel (props) {

    
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