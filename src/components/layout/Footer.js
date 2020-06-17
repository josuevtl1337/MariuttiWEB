import React from 'react'
import './Footer.css'

const Footer = () => {
    return(
        <React.Fragment>
               <div className="footer">
                    <h4 className="footertitle">© 2020. MARIUTTI HNOS. S.R.L.</h4>
                    <hr/>
                    <div className="footerabajo">

                        <div className="footredes">
                            <a href="https://www.facebook.com/MARIUTTIFERRETERIAINDUSTRIAL/" className="red" target="_blank">
                                <img className="redimg fb footicon" src="https://image.flaticon.com/icons/svg/1384/1384005.svg"/>
                            </a>
                            <a href="https://m.me/ferret.mariutti" className="red" target="_blank">
                                <img className="redimg footicon" src="https://image.flaticon.com/icons/svg/733/733604.svg" alt="" srcset=""/>
                            </a>
                            <a href="https://api.whatsapp.com/send?phone=5493425215000&text=Hola" className="red">
                            <img className="redimg footicon" src="https://image.flaticon.com/icons/svg/733/733641.svg" alt="" srcset=""/>
                        </a>
                            <a href="https://www.instagram.com/ferreteria_mariutti/" className="red">
                                <img className="redimg footicon" src="https://image.flaticon.com/icons/svg/2111/2111491.svg" alt="" srcset=""/>
                            </a>
                        </div>

                        <h5 className="footertext">ventas@mariutti.com.ar <br/>
                        +54 9 3425 21-5000 <br/>
                        FRANCIA 2399 esq. 1º JUNTA <br/> 
                        (3000) Santa Fe, Argentina</h5>
                        
                    </div>
                    
                </div>
        </React.Fragment>
    )
}

export default Footer