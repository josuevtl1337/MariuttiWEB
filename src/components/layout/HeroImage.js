import React from 'react';
import Parallax from 'react-rellax'
import './HeroImage.css'


const rendertext = (props) => {
    if (props.text) {
        return(
            <p>{props.text}</p>
        )
    }
}

const HeroImage = (props) => {
    
    return(
        
            <div className="heroimagewrap">
                <Parallax speed={-6} className="heroimg rellax" style={{width:'', height:'110%'}}>
                    <img src={props.image}  style={{width:'100%', height:'auto'}}/>    
                </Parallax>
                
                <div className="textwrap">
                    <h1 className="herotitle">
                        {props.title}
                    </h1>
                    {rendertext}
                </div>
                
            </div>
        
    )
    
}

export default HeroImage