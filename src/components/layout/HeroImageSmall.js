import React from 'react'
import Parallax from 'react-rellax'
import './HeroImage.css'

const HeroImageSmall = (props) => {

    return(
        <div className="heroimagesmall">
            <Parallax speed={-1} className="heroimg rellax" style={{width:'', height:'110%'}}>
                <img src={props.image}  style={{width:'100%', height:'auto'}}/>    
            </Parallax>

            <div className="textwrap-small">
                    <h2 className="herotitle-small">
                        {props.title}
                    </h2>
                
            </div>
        </div>
    )
}

export default HeroImageSmall