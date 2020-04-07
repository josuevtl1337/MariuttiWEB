import React, {useState} from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './ProductCarousel.css'
import ProductoCard from '../sections/productos/ProductoCard.js'

export default function ProductCarousel (props) {
    
    return(
        <div className="car-wrap">
            <CarouselProvider
                naturalSlideWidth={150}
                naturalSlideHeight={300}
                totalSlides={2}
                visibleSlides={1}
                infinite={true}
                isPlaying={true}
                step={1}
            >
                
                <Slider style={{height: 280}}>
                    <Slide index={0}>
                        <div className="slide-wrapper">
                            <div className="car-prod-card">
                                <div className="imgwrap carousel">
                                    
                                    <img className="prodimg" src="https://baumeister.qodeinteractive.com/wp-content/uploads/2017/11/shop-img-7-635x755.jpg"/>
                                    
                                </div>
                                <div className="car-prod-text">
                                    <p className="entrada-cardtitle carousel">Titulo</p>
                                    <p className="entrada-cardtext carousel">Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de</p>
                                </div>
                            </div>
                        </div>
                    </Slide>
                    
                    <Slide index={1}>
                        <div className="slide-wrapper">
                            <div className="car-prod-card">
                                <div className="imgwrap carousel">
                                    
                                    <img className="prodimg" src="https://baumeister.qodeinteractive.com/wp-content/uploads/2017/11/shop-img-7-635x755.jpg"/>
                                    
                                </div>
                                <div className="car-prod-text">
                                    <p className="entrada-cardtitle carousel">Titulo</p>
                                    <p className="entrada-cardtext">Subtitulo</p>
                                </div>
                            </div>
                        </div>
                    </Slide>
                    
                    
                    

                </Slider>
                <ButtonBack className="car-button material-icons" id="back">keyboard_arrow_left</ButtonBack>
                <ButtonNext className="car-button material-icons">keyboard_arrow_right</ButtonNext>
                <DotGroup className="dotgroup"/>
                
                
            </CarouselProvider>
        </div>
    )

}