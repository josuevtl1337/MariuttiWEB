import React from 'react';
import Parallax from 'react-rellax'
import './HeroImage.css'


const HeroImage = (props) => {
    
    return(
        
            <div className="heroimagewrap">
                <Parallax speed={-6} className="heroimg rellax" style={{width:'', height:'110%'}}>
                    <img src={props.image}  style={{width:'100%', height:'auto'}}/>    
                </Parallax>
                <img src="https://miro.medium.com/max/9856/1*gAG21NFA76ZlCbtK6SayVQ.jpeg" className="heroimgcelu"/>
                <div background="https://miro.medium.com/max/9856/1*gAG21NFA76ZlCbtK6SayVQ.jpeg" className="heroimgcelu"/>
                
                <div className="textwrap">
                    <div className="textbox">
                        <h2 className="herotitle">
                            {props.title}
                        </h2>

                        <p className="herotext">
                            {props.text}
                        </p>

                        <button className="herobtn" onClick={props.handlerOnClickCatalogo}>Mirá nuestro catálogo</button>
                    </div>
                    
                </div>
                
            </div>
        
    )
    
}

export default HeroImage