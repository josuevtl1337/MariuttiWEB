import React from "react";
import { GoogleMap , withScriptjs, withGoogleMap, Marker } from "react-google-maps"

const Map = (props) =>{
    //-31.646097, -60.714682

    return(
        <React.Fragment>
        <GoogleMap defaultZoom={17} defaultCenter={{lat:-31.646097, lng:-60.714682}} />
        <Marker position={{lat:-31.646097, lng:-60.714682}} />
        </React.Fragment>
    )

}
export default withScriptjs(withGoogleMap(Map))
//export default Map