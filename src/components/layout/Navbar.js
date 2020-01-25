import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";

const Navbar = (props) =>{
    // setTimeout(()=>{
    //     props.history.push("/about")
    // },2000)
    console.log(props);
    return (
        <nav className="nav-wrapper yellow darken-3">
            <div className="container">
                <a className="brand-logo">Mariutti</a>
                <ul className="right">
                    <li><Link to="/">Home</Link></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/productos">Productos</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                    {/* <li><NavLink to="/login" className="btn btn-floating pink ligthen-1">NN</NavLink></li> */}
                </ul>
            </div>
        </nav>
    )
}

export default withRouter(Navbar)