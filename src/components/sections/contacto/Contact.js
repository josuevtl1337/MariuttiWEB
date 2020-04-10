import React from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './Contact.css'

const Contact = (props)=>{
    
    return (
      <React.Fragment>
        <div className="contactblock">
          <div>
            <form className="contactform">
                  <h4 className="center">Contact</h4>
                  <p>Lorem, icta culpa, ipsum itaque aliquid, doloribus se perspiciatis.</p>
                  <TextField required id="standard-required" label="Nombre" defaultValue="" />
                  <TextField required id="standard-required" label="Email"  defaultValue="" />
                  <TextField required id="standard-required" label="Asunto" multiline rows="4" defaultValue="" />
                  <Button variant="contained" color="primary">Enviar</Button>
            </form>
          </div>
        </div>
        
      </React.Fragment>
        
    )
}

export default Contact
