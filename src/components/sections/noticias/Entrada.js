import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import './Entrada.css'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import PinterestIcon from '@material-ui/icons/Pinterest';
import EntradaReciente from './EntradaReciente'
import Divider from '@material-ui/core/Divider';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
//Importar el storage
import "firebase/firebase-storage";
import firebase from "firebase/app"



export default function Entrada(props) {
    var noticiasArray = [];
    const [url, setUrl] = React.useState('');
    var reversed=[];
    var onlythree = [];
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    //Hago la referencia para traer mis objetos Rubros, y Sub_Rubros
    useFirebaseConnect([
        { path: 'Noticia' }
    ])
    const noticias = useSelector(state => state.firebase.data.Noticia)
    // Show message while Rubros y Sub_Rubros are loading
    if (!isLoaded(noticias)) {
        return <div>Cargando...</div>
    }
    if(isLoaded(noticias)){
        noticiasArray = Object.values(noticias);
        console.log(props.history)
        console.log(noticiasArray)
        reversed = noticiasArray.reverse();
        onlythree = reversed.slice(0,3);
    }
    let search = props.history.location.search.substr(1);
    console.log(search);
    //Cambiando el history
    const handlerOnClickRecientes= (id) =>{
        // e.preventDefault();
        props.history.push("/entrada?" + id);
        // setProductoState(true);
        // console.log(productoState);
    }

    const fechaParseada = (dia, mes, año) => {
        var months = ['de Enero,','de Febrero,','de Marzo,','de Abril,','de Mayo,','de Junio,','de Julio,','de Agosto,','de Septiembre,','de Octubre,','de Noviembre,','de Diciembre,'];

        // var date = new Date(item.createdAt);
    
        // var day = date.getDate();
        // var month = months[date.getMonth()];
        // var year = date.getFullYear();

        var day = dia;
        var month = months[mes];
        var year = año;

    
        return day + ' ' + month + ' ' + year + ' ';
    }
    

    return(
        <React.Fragment>
            <div className="noticiasbanner">
                <h2>Novedades</h2>
            </div>
            <Container>
                
                {noticiasArray.map((item, i) => {   
                console.log(item.id)                           
                if(search == item.id){
                    let imagen = item.img;
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
                        var date = new Date(item.createdAt);

                        
                    }
                    return(
                        <React.Fragment>
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={9}>
                                <img className="entrada-img" src={url}/>
                                <div className="entrada-contentwrap">
                                    <p className="entrada-title">
                                        {item.nombre}
                                    </p>
                                    <p className="entrada-date" style={{marginTop: 16}}>
                                        {fechaParseada(date.getDate(), date.getMonth(), date.getFullYear())}
                                    </p>
                                    <div className="divline descr" style={{marginBottom: 8}}></div>
                                    <p className="entrada-text">
                                       {item.descripcion} 
                                    </p>
                                </div>
                                <div className="share-wrap" style={{marginBottom: 32}}>
                                    <h4 style={{fontSize: 14, marginLeft: 25, marginRight: 25}}>Compartir</h4>
                                    <FacebookIcon className="share-icon"/>
                                    <TwitterIcon className="share-icon"/>
                                    <PinterestIcon className="share-icon"/>
                                </div>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <div className="postsrecientes-paper">
                                        <h4 className="postsrecientes">Noticias Recientes</h4>
                                        <Divider style={{}}/>
                                        <div className="entradasrecienteswrap">
                                            {onlythree.map((item, i) => {    
                                                var daterec = new Date(item.createdAt);
                                                
                                                return (
                                                    <div onClick={()=>handlerOnClickRecientes(item.id)}>
                                                    <EntradaReciente                                      
                                                        img={item.img}
                                                        title={item.nombre}
                                                        date={fechaParseada(daterec.getDate(), daterec.getMonth(), daterec.getFullYear())}
                                                        key={i}
                                                    />    
                                                    </div>                                                                                                             
                                                );                                                       
                                            })}          
                                        </div>
                                    </div>
                                    
                                </Grid>
                            </Grid>
                        </React.Fragment>                  
                )
                }                        
                }
                )}         
                
            </Container>
        </React.Fragment>
    )
}