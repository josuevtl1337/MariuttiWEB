import React, { useState, useEffect } from 'react';
import './About.css'
import FactoryImg from '../../../visuals/factory.png'
import WorkerImg from '../../../visuals/logistics.png'

const About = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    //Cambiando el history Para Quienes somos
    const handlerOnClick = (param) =>{
        // e.preventDefault();
        props.history.push("/"+param);
    }
    return (
        <React.Fragment>
            <div className="quienes-block">
                <div className="quienes-text">
                    <h2 className="quienes-title">
                        Quiénes Somos
                    </h2>
                    <p className="quienes-p">
                        Mariutti Hnos es una empresa familiar comprometida en brindar, 
                        desde el año 1969, asesoramiento técnico y soluciones para el hogar, 
                        para el sector de la construcción y la industria.
                    </p>
                    <button className="aboutbtn quienes-btn" onClick={()=>{handlerOnClick("productos")}}>
                        Mirá nuestro catálogo
                    </button>
                </div>

                <div className="quienes-img" />
            </div>

            <div className="familia-block" id="first">
                <div className="familia-text">
                    <h2 className="quienes-title familia">
                        Una Familia Dedicada
                    </h2>
                    <p className="quienes-p familia">
                        Integrada por su fundador, Dante Mariutti, cuyo nombre representó muchos años la denominación 
                        de la empresa. Hoy continúa aportando su vasta experiencia y dedicación a la sociedad, constituida 
                        como MARIUTTI HNOS SRL a cargo de sus hijos.
                        <br/>
                        <br/>
                        Padre, hijos y empleados, conforman una gran familia que busca día a día mejorar la relación 
                        con la extensa cartera de clientes, ofreciendo más allá de artículos variados y productos especiales… 
                        soluciones adecuadas a la necesidad de cada cliente, en un marco de honestidad, calidad y buenos precios.
                    </p>
                </div>
                
                <img className="familia-img" src={FactoryImg}/>
            </div>

            <div className="familia-block">
                <img className="familia-img" src={WorkerImg}/>
                <div className="familia-text">
                    <h2 className="quienes-title familia">
                        La Empresa
                    </h2>
                    <p className="quienes-p familia">
                        A partir del año 1992 incursiona en el rubro ferretero, afianzándose con el correr del tiempo en una de las ferreterías industriales más importantes de la región.
                        <br/>
                        Cuenta con un amplio local de atención al público y con dos puntos de atención personalizada destinados a cotizaciones importantes y proyectos de envergadura.
                        <br/>
                        Asimismo, dispone de un depósito sectorizado muy importante, pudiendo abastecer a grandes empresas y a pequeños comercios del rubro ferretero.
                    </p>
                </div>
            </div>

            <div className="quienes-block hoy">
                <div className="quienes-text">
                    <h2 className="quienes-title">
                        Hoy
                    </h2>
                    <p className="quienes-p">
                        Con el objetivo de estar presentes en toda obra constructiva 
                        y en cada hogar, MARIUTTI HNOS SRL continúa incorporando conocimientos 
                        y experiencias, "base para comprender, solucionar y ofrecer lo que el 
                        cliente necesita"
                    </p>
                    <button className="aboutbtn quienes-btn" onClick={()=>{handlerOnClick("noticias")}}>
                        Últimas Novedades
                    </button>
                </div>

                <div className="quienes-img hoy" />
            </div>

            <div className="quienes-contacto">
                <h2 onClick={()=>{handlerOnClick("contacto")}}>Contactanos</h2>
            </div>

        </React.Fragment>
    )
}

export default About
