import React from 'react'
import './Footer.css'

const Footer = () => {
    return(
        <React.Fragment>
                {/* <div>Icons made by <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
                <div className="footer">
                    <h4>© 2020. MARIUTTI HNOS. S.R.L.</h4>
                    <h5 className="footertext">info@mariutti.com.ar <br/>
                    +54 (0) 342 453-5318 <br/>
                    FRANCIA 2399 esq. 1º JUNTA <br/> 
                    (3000) Santa Fe, Argentina</h5>
                </div>
        </React.Fragment>
    )
}

export default Footer