import React, { Component, useState, useEffect  } from "react"
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
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

    const ifvidexists = (string) => {
        if(string){
            return(
                <div className="videowrapper">
                    <iframe 
                        className="ytvideo"
                        src={string} 
                        frameborder="0" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" 
                        allowfullscreen
                    />  
                </div>
            )
        }
    }

    console.log(props.subtitulo)

    return(
        <div className="singleprod-wrap" style={{zIndex: 100}}>
            <div className="product-block">
                <div className="prodtop">
                    
                    <div className="left">
                        <img className="singleprod-img" src={url} />
                    </div>
                    <div className="right">
                        <h3 className="singleprod-title">{props.nombre}</h3>
                        <div className="divline right" style={{marginLeft: 0, marginRight: 0, width: '100%'}}></div>
                        <h4 className="precio">$3.500,00</h4>
                        <div className="buttonscontainer">
                            <button className="aboutbtn prodstock">
                                Consultar Stock
                            </button>
                            <Tooltip arrow title="Descargar Ficha Técnica" placement="right">
                                <button className="aboutbtn fichatecnica">
                                    <i className="material-icons ficha">play_for_work</i>
                                </button>
                            </Tooltip>
                            
                        </div>
                    </div>
                    
                </div>
                <div className="desc">
                    <div className="divline descr"></div>
                    <p className="singleprod-sub">{props.subtitulo}</p>

                    <p className="singleprod-desc">{props.descripcion}</p>

                    {ifvidexists(props.enlace)}

                    <div className="divline descr"></div>

                    <div className="share">
                        <h4 className="compartir">Compartir:</h4>
                        <div className="shareicons">
                            <FacebookIcon className="share-icon"/>
                            <TwitterIcon className="share-icon"/>
                            <PinterestIcon className="share-icon"/>
                        </div>
                    </div>

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