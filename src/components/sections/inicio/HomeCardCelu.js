import React from 'react';

const HomeCardCelu = (props) => {
    return(
        <div className="homecardcelu" onClick={props.handlerOnClickCatalogo}>
            <img className="homecardcelu-img" src={props.icon}/>
            <p className="homecardcelu-text">
                {props.text}
            </p>
            <div className="hcc-divider" />
        </div>
    )
}

export default HomeCardCelu