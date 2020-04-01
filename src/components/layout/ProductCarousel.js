import React, {useState} from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './ProductCarousel.css'

export default function ProductCarousel (props) {
    
    return(
        <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={400}
            totalSlides={8}
            visibleSlides={2}
            infinite={true}
            isPlaying={true}
            step={2}
        >
            <Slider style={{height: 400}}>
                <Slide style={{height: '100%'}} index={0}>
                    <div className="slide-producto">
                        <div className="slide-inner">
                            asd
                        </div>
                    </div>
                </Slide>
                <Slide className="slide-producto" index={1}><p>asd</p></Slide>
                <Slide className="slide-producto" index={2}><p>asd</p></Slide>
                <Slide className="slide-producto" index={3}><p>asd</p></Slide>
                <Slide className="slide-producto" index={4}><p>asd</p></Slide>
                <Slide className="slide-producto" index={5}><p>asd</p></Slide>
                <Slide className="slide-producto" index={6}><p>asd</p></Slide>
                <Slide className="slide-producto" index={7}><p>asd</p></Slide>
            </Slider>
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
        </CarouselProvider>
    )

}