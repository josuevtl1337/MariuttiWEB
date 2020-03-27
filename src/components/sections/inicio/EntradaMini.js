import React from 'react'
import '../noticias/EntradaCard.css'

export default function EntradaMini (props) {

    return(
        <div className="entradamini">
            <div className="entradamini-imgwrap">
                <img src={props.img} className="entradacard-img"/>
            </div>

            <div className="entrada-contentwrap">
                <p className="entradamini-cardtitle">
                    {props.title}
                </p>
                <p className="entrada-cardtext" style={{marginBottom: 8, fontSize: 15, letterSpacing: 'unset'}}>
                    {props.text}
                </p>
            </div>
        </div>
    )
}