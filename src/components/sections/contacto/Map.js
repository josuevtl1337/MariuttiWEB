import React from "react";
import { GoogleMap , withScriptjs, withGoogleMap, Marker } from "react-google-maps"

const Map = (props) =>{
    //-31.646097, -60.714682

    return(
        <div>
            <GoogleMap defaultZoom={17} defaultCenter={{lat:-31.646097, lng:-60.714682}} />
            <Marker position={{lat:-31.646097, lng:-60.714682}} />
        </div>
    )

}
export default withScriptjs(withGoogleMap(Map))
//export default Map