import React, {useState, useRef} from 'react';
import './accordion.css';


// const categoriaList = props.categoria

// function toggleAccordion () {
//     if (this.state.active == true) {
//         this.setState({active: false, height: "0px"})
//     } else {
//         this.setState({active: true, height: `${content.current.scrollHeight}px`})
//     }
// }

// class Accordion extends React.Component{

//     render() {
//         return (
//         <div className="accordion">
//             <button className={`accordion-rubro ${setActive}`} onClick={toggleAccordion}>{props.titulo}</button>
//             <div ref={content} style={{maxHeight: `${this.state.height}`}} className="accordion-content">
//                 <button className="accordion-content-categoria">test</button>
//             </div>
//          </div>
//         )
//     }
// }

const Accordion = (props) => {

    // const categoriaList = this.props.categoria;

    // for (let i = 0; i < categoriaList.length; i++) {
            
    //     categoriaList[i] = <button className="accordion-content-categoria">{categoriaList[i]}</button>
        
    // }

    // const renderCategorias = categoriaList =>{
    //     categoriaList = props.categoria;
    //     categoriaList.map((item, i) => {
    //         return(
    //             <button className="accordion-content-categoria">{item}</button>
    //         )
    //     })
    // }

    // const [categorias, setCategorias] = useState(props.categoria);
    // const categorias = props.categoria;
    // const [setActive, setActiveState] = useState("");
    // const [setHeight, setHeightState] = useState("0px");


    // const content = useRef(null);

    // const toggleAccordion = () => {
    //     setActiveState(setActive === "" ? "active" : "");
    //     setHeightState(setActive === "active" ? "0px" : `${content.current.scrollHeight}px`)
    // }

    // return(
    //     <div className="accordion">
    //         <button className={`accordion-rubro ${setActive}`} onClick={toggleAccordion}>{props.titulo}</button>
    //         <div ref={content} style={{maxHeight: `${setHeight}`}} className="accordion-content">
    //             {/* <button className="accordion-content-categoria"> {categorias} </button> */}
    //             {categoriaList}
                
    //         </div>
            
    //     </div>
    // )
}

export default Accordion
