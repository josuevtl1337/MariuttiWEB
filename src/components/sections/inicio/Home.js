import React from "react"
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import './Home.css'
import HomeDivider from './HomeDivider.js'
import HomeCard from './HomeCard.js'
import HeroImage from '../../layout/HeroImage'
import Container from '@material-ui/core/Container'
import AtencionIcon from '../../../visuals/mail.svg'
import ConstIcon from '../../../visuals/wheelbarrow-y.svg'
import IndustIcon from '../../../visuals/jackhammer.svg'
// import MaquinasIcon from '../../../visuals/screwdriver-y.svg'
import MaquinasIcon from '../../../visuals/saw.svg'
import Parallax from 'react-rellax'


const Home = () => {
    useFirebaseConnect([
        { path: 'Rubro' },
        { path: 'Sub_Rubro' }
    ])
    const rubros = useSelector(state => state.firebase.data.Rubro)
    const sub_rubros = useSelector(state => state.firebase.ordered.Sub_Rubro)
    // Show message while todos are loading
    if (!isLoaded(rubros)) {
        return <div>Loading...</div>
    };

    const r = Object.values(rubros)
    r.forEach(elemento => console.log(elemento.id))

    return (
        <div className="container">
            <HeroImage 
                title="INICIO"
                // text="Más de 50 años brindando soluciones para el hogar, la construcción y la industria"
                text="La ferretería industrial más completa de la región"
                image="https://st.depositphotos.com/2117297/2183/i/950/depositphotos_21832931-stock-photo-construction-worker.jpg" 
            />

            <Container>

                <div className="about-block">

                    <div className="left">
                        <Parallax speed={1}>
                            <img className="aboutimg" src="https://www.mariutti.com.ar/images/negocio.jpg" alt=""/>
                        </Parallax>
                    </div>
                    <div className="right">
                        <h2>Honestidad, Calidad y Familia</h2>
                        <p>
                            Somos una empresa familiar que hace más de 50 años 
                            se dedica a brindar soluciones para el hogar, la construcción y la industria 
                            
                        </p>
                        <button className="aboutbtn">Leer más ></button>
                    </div>
                </div>

                <div className="cards-container">
                    <HomeCard
                        icon={AtencionIcon} 
                        text="Atención Personalizada"
                    />
                    <HomeCard
                        icon={MaquinasIcon} 
                        text="Máquinas y Herramientas"
                    />
                    <HomeCard 
                        icon={ConstIcon}
                        text="Obras y Construcción"
                    />
                    <HomeCard 
                        icon={IndustIcon} 
                        text="Ferretería Industrial"
                    />
                </div>

                <HomeDivider title="Productos Destacados" />
                <HomeDivider title="Últimas Noticias" />
                <div style={{height:'400vh', width:'100%'}}></div>
                  
            </Container>
            
        </div>
    )
}

export default Home
