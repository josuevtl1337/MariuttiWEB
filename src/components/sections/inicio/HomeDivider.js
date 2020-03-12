import React from "react"
import './HomeDivider.css'

const HomeDivider = (props) => {
    return(
        <div className="homediv-wrap">
            <h3 className="homediv-title">
                {props.title}
            </h3>
            <div className="homediv-line"></div>
        </div>
    )
}

export default HomeDivider