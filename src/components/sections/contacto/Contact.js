import React from "react"
import TextField from '@material-ui/core/TextField';
import './Contact.css'

const Contact = (props)=>{
    
    return (
      <React.Fragment>
        <div className="noticiasbanner contact">
          <h2>
            Contactanos
          </h2>
        </div>
        <div className="contactblock">
            <form className="contactform">
              <h4 className="contactitle" id="izq">¿Tenés alguna duda? Consultanos.</h4>
              <TextField required id="standard-required" label="Su Nombre" defaultValue="" />
              <TextField required id="standard-required" label="Correo Electrónico"  defaultValue="" />
              <TextField required id="standard-required" label="Asunto" multiline rows="4" defaultValue="" />
              <button className="aboutbtn contact">Enviar</button>
            </form>

          <div className="ubicacion">
            <h4 className="contactitle">Encontranos.</h4>
            <div className="map"> </div>
            <p className="quienes-p familia contact">Francia 2399 esquina 1º JUNTA. (3000) Santa Fe, Argentina</p>
          </div>
        </div>
        
      </React.Fragment>
        
    )
}

export default Contact
