import React from 'react';

const rendertext = (props) => {
    if (props.text) {
        return(
            <p>{props.text}</p>
        )
    }
}

const HeroImage = (props) => {
    return(
        <div styles={{backgroundImage:`url("${props.image}")`}} className="heroimagewrap">
            <h1 className="herotitle">
                {props.title}
            </h1>
            {rendertext}
        </div>
    )
    
}

export default HeroImage