import React from 'react';
import './HeroImage.css'

const HeroCarousel = (props) => {
    
    return(
        
            <div className="heroimagewrap">

            <div class="slideshow">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
            </div>
                
                {/* <img src="http://www.mariutti.com.ar/images/pasantes/pasante3.jpg" className="heroimg" style={{width:'100%', height:'auto'}}/>    
                <img src="https://miro.medium.com/max/9856/1*gAG21NFA76ZlCbtK6SayVQ.jpeg" className="heroimgcelu"/> */}
                <div background="https://miro.medium.com/max/9856/1*gAG21NFA76ZlCbtK6SayVQ.jpeg" className="heroimgcelu"/>
                
                <div className="textwrap">
                    <div className="textbox" id="hero_const">
                        <h2 className="herotitle">
                            Al servicio de la construcción
                        </h2>

                        <p className="herotext">
                            Tenemos los mejores productos y al mejor precio
                        </p>

                    </div>
                    <div className="textbox" id="hero_asesor">
                        <h2 className="herotitle">
                            Asesoramiento profesional
                        </h2>

                        <p className="herotext">
                            Somos parte de tu equipo
                        </p>

                    </div>
                    <div className="textbox" id="hero_proyectos">
                        <h2 className="herotitle">
                            A la medida de tus proyectos
                        </h2>

                        <p className="herotext">
                            Tenemos los mejores productos y al mejor precio
                        </p>

                    </div>
                    
                    <button className="herobtn" onClick={props.handlerOnClickCatalogo}>Mirá nuestro catálogo</button>

                </div>
                
            </div>
        
    )
    
}

export default HeroCarousel