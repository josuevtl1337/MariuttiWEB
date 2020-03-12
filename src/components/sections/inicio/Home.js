import React from "react"
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import HomeDivider from './HomeDivider.js'
import HeroImage from '../../layout/HeroImage'
import Container from '@material-ui/core/Container'

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
            {/* <div className="heroimg home"/> */}
            <HeroImage title="Inicio" image="https://st.depositphotos.com/2117297/2183/i/950/depositphotos_21832931-stock-photo-construction-worker.jpg" />
            <HomeDivider title="Productos Destacados" />
        </div>
    )
}

export default Home
