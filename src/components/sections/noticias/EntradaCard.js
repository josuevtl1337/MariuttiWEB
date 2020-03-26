import React from 'react'
import './EntradaCard.css'

const EntradaCard = (props) => {
    return(
        <div className="entradacard">
            <div className="entradacard-imgwrap">
                <img src={props.img} className="entradacard-img"/>
            </div>

            <div className="entrada-contentwrap">
                <p className="entrada-cardtitle">
                    {props.title}
                </p>
                <p className="entrada-date">
                    {props.date}
                </p>
                <p className="entrada-cardtext">
                    {props.text}
                </p>
                <a className="vermas" href="http://">Ver Más</a>
            </div>
        </div>
    )
}

export default EntradaCard