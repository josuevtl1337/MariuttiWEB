import React, {useState} from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './ProductCarousel.css'
import SlideWrapper from './SlideWrapper.js'

export default function ProductCarouselGrande (props) {

    
    return(
        <div className="car-wrap">
        <CarouselProvider
            naturalSlideWidth={300}
            naturalSlideHeight={300}
            totalSlides={props.productos.length}
            visibleSlides={4}
            infinite={true}
            isPlaying={true}
            step={1}
            lockOnWindowScroll={true}
        >
 
                <Slider style={{height: 400}}>
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
                <ButtonNext className="car-button material-icons" id="next">keyboard_arrow_right</ButtonNext>
                <DotGroup className="dotgroup"/>
                
                
            </CarouselProvider>
        </div>
    )

}