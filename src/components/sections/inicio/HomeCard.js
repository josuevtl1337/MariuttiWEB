import React from 'react';
import './HomeCard.css'

const HomeCard = (props) => {
    return(
        <div className="homecard">
            <img className="homecard-img" src={props.icon}/>
            <p className="homecard-text">
                {props.text}
            </p>
        </div>
    )
}

export default HomeCard