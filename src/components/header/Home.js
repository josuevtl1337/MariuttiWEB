import React from "react"
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'

const Home = ()=>{
    useFirebaseConnect([
        { path: 'Rubro' },
        { path: 'Sub_Rubro' }
    ])
    const rubros = useSelector(state => state.firebase.ordered.Rubro)
    const sub_rubros = useSelector(state => state.firebase.ordered.Sub_Rubro)
    // Show message while todos are loading
    if (!isLoaded(rubros) && !isLoaded(sub_rubros)) {
        return <div>Loading...</div>
    }
    return (
        <div className="container">
            <h4 className="center">Home</h4>
            <p>{JSON.stringify(rubros)}</p>
            <p>{JSON.stringify(sub_rubros)}</p>
        </div>
    )
}

export default Home
