import React, { Component, useState, useEffect  } from "react"
import Divider from '@material-ui/core/Divider';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import PinterestIcon from '@material-ui/icons/Pinterest';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import firebase from "firebase/app"

const ProdComp = (props) =>{
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

      const [url, setUrl] = React.useState('');
    
      let imagen = props.img;
      if (imagen) {
        var pathImagen = firebase
          .storage()
          .ref(imagen)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
          })
          .catch(error => {
            console.log(error.message);
        });
    }

    return(
        <div className="singleprod-wrap" style={{zIndex: 100}}>
            <div className="product-block">
                <div className="left">
                    <img className="singleprod-img" src={url} />
                </div>
                <div className="right">
                    <h3 className="singleprod-title">{props.nombre}</h3>
                    <p className="singleprod-sub">{props.subtitulo}</p>
                    <div className="divline" style={{marginLeft: 0, marginRight: 0, width: '100%'}}></div>
                    <p className="singleprod-desc">{props.descripcion}</p>
                    
                    <div>
                        <button className="aboutbtn prodstock">
                                Consultar Stock
                        </button>
                    </div>
                    

                    <div className="videowrapper">
                        <iframe 
                            className="ytvideo"
                            src={props.enlace} 
                            frameborder="0" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" 
                            allowfullscreen
                        />  
                    </div>

                    <div className="share">
                        <h4 className="compartir">Compartir:</h4>
                        <div className="shareicons">
                            <FacebookIcon className="share-icon"/>
                            <TwitterIcon className="share-icon"/>
                            <PinterestIcon className="share-icon"/>
                        </div>
                        
                    </div>
                    <div className="divline share"></div>
                </div>
            </div>   
            <h3 className="homediv-title prodrel">
                Productos Relacionados
            </h3>
            <div className="divline prod" style={{marginTop: 0}}></div>
        </div>
    )
}

export default ProdComp