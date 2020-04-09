import React from 'react'
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
    return(
        <React.Fragment>
            <div className="noticiasbanner">
                <h2>Noticias</h2>
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
                        var months = ['de Enero','de Febrero','de Marzo,','de Abril,','de Mayo,','de Junio,','de Julio,','de Agosto,','de Septiembre,','de Octubre,','de Noviembre,','de Diciembre,'];

                        var date = new Date(item.createdAt);
                    
                        var day = date.getDate();
                        var month = months[date.getMonth()];
                        var year = date.getFullYear();
                    
                        var fechaParseada = day + ' ' + month + ' ' + year + ' ';
                    }
                    return(
                        <React.Fragment>
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={9}>
                                <img className="entrada-img" src={url}/>
                                <div className="entrada-contentwrap">
                                    <p className="entrada-cardtitle">
                                        {item.nombre}
                                    </p>
                                    <p className="entrada-date">
                                        {fechaParseada}
                                    </p>
                                    <p className="entrada-text">
                                       {item.descripcion} 
                                    </p>
                                </div>
                                <div className="share-wrap">
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
                                                return (
                                                    <div onClick={()=>handlerOnClickRecientes(item.id)}>
                                                    <EntradaReciente                                      
                                                        img={item.img}
                                                        title={item.nombre}
                                                        date={fechaParseada}
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