import React from 'react';

const HomeCardCelu = (props) => {
    return(
        <div className="homecardcelu">
            <img className="homecardcelu-img" src={props.icon}/>
            <p className="homecardcelu-text">
                {props.text}
            </p>
            <div className="hcc-divider" />
        </div>
    )
}

export default HomeCardCelu