import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import HeroImageSmall from '../../layout/HeroImageSmall'
import './Entrada.css'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import PinterestIcon from '@material-ui/icons/Pinterest';
import EntradaReciente from './EntradaReciente'


export default function Entrada(props) {

    return(
        <React.Fragment>
            <HeroImageSmall
                title="10 Different Sizes"
                image="https://image.shutterstock.com/z/stock-photo-industrial-factory-in-mechanical-engineering-for-the-manufacture-of-transformers-interior-of-a-1064126297.jpg"
            />
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={9}>
                    <img className="entrada-img" src="https://baumeister.qodeinteractive.com/wp-content/uploads/2017/11/blog-post-1.jpg"/>
                    <div className="entrada-contentwrap">
                        <p className="entrada-cardtitle">
                            10 Different Sizes
                        </p>
                        <p className="entrada-date">
                            30 de Marzo, 2020
                        </p>
                        <p className="entrada-text">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
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
                            <div className="entradasrecienteswrap">
                                <EntradaReciente />
                                <EntradaReciente />
                                <EntradaReciente />
                                <EntradaReciente />
                            </div>
                        </div>
                        
                    </Grid>
                </Grid>
                
            </Container>
        </React.Fragment>
    )
}