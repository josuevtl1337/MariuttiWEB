import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';

import TextField from '@material-ui/core/TextField';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import PinterestIcon from '@material-ui/icons/Pinterest';
import Messenger from '../../../visuals/messenger.png'

import './Contact.css'
import Map from "./Map"
import credentials from "./Credentials"

const Contact = (props)=>{
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
    const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credentials.mapsKey}`;
    return (
      <React.Fragment>

        <Helmet>
          <title>Contacto | Mariutti Hnos</title>
          <meta name="description" content="Encontrá toda nuestra información de contacto."/>
        </Helmet>

        <div className="noticiasbanner contact">
          <h2>
            Contacto
          </h2>
        </div>
        <div className="contactblock">
          <div className="izquierda">
          <form className="contactform">
              <h4 className="contactitle" id="izq">¿Tenés alguna duda? Consultanos.</h4>
              <TextField required id="standard-required" label="Su Nombre" defaultValue="" />
              <TextField required id="standard-required" label="Correo Electrónico"  defaultValue="" />
              <TextField required id="standard-required" label="Asunto" multiline rows="6" defaultValue={props.mensaje} />
              <button className="aboutbtn contact">Enviar</button>
            </form>


            <h4 className="contactitle" id="izq">Redes</h4>

            <div className="redes">
              
              <a href="tel:+54 342 453-5318" className="red">
                <img className="redimg tel" src="https://image.flaticon.com/icons/png/512/455/455705.png" alt="" srcset=""/>
                <p className="redtxt tel">+54 342 453-5318</p>
              </a>

              <a href="https://www.facebook.com/MARIUTTIFERRETERIAINDUSTRIAL/" className="red" target="_blank">
                <img className="redimg fb" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/768px-Facebook_Logo_%282019%29.png"/>
                <p className="redtxt fb">Encontranos en Facebook</p>
              </a>
              
              <a href="https://www.instagram.com/ferreteria_mariutti/" className="red" target="_blank">
                <img className="redimg " src="https://image.flaticon.com/icons/svg/2111/2111463.svg"/>
                <p className="redtxt ig">Seguinos en Instagram</p>
              </a>

              <a href="https://m.me/ferret.mariutti" className="red" target="_blank">
                <img className="redimg" src="https://image.flaticon.com/icons/svg/733/733548.svg" alt="" srcset=""/>
                <p className="redtxt msn">Escribinos en Messenger</p>
              </a>
              
            </div>
          </div>
            

          <div className="ubicacion">
            <h4 className="contactitle">Encontranos.</h4>
            <div className="map">
              <Map 
                className="map"
                googleMapURL = {mapURL}
                containerElement={<div style={{height:"100%"}} />}
                mapElement={<div style={{height:"100%"}} />}
                loadingElement={<h4>Cargando...</h4>}
              />
            </div>
            
            <p className="quienes-p familia contact">Francia 2399 esquina 1º JUNTA. (3000) Santa Fe, Argentina</p>
          </div>
        </div>
        
      </React.Fragment>
        
    )
}

export default Contact
