import React , { Component } from 'react';
import SimpleLogo from '../../visuals/logoplano-small.png'
import  "./ListaRubros.css"
import Loading from "./Loading"

class ListaRubros extends Component {
state={
  rubros:"",
  loading:true
}
 componentDidMount (){
    // this.setState({
    //   rubros : Object.keys(this.props.rubros[0])
    // }, () =>{
    //   console.log(this.state.rubros);
    //   // console.log(this.state.rubros[0].valueOf());
    //   // console.log(Object.keys(this.state.rubros[0]));
    //   // const rubrosTitle = Object.keys(this.state.rubros[0]);
      this.setState({
        loading:false
      })
    // })

  }
  render(){
      if(this.state.loading ){
        return (
        <Loading />
        );
      }
      else{
        const handleOnClick = (name) =>{
          this.props.parentCallback(name)
        }      
        const classTree = {
          height: 216,
          flexGrow: 1,
          maxWidth: 400,
          color:'grey'
        };
        return (
          <div className="adminnavwrap">
            <span className="cerrar" onClick={this.props.close}>cerrar sesión</span>

            <div className="listarubroswrap">
            
            <img className="simplelogo" src={SimpleLogo}/>
            
              <div className="navflex">
                <div onClick={()=>{handleOnClick("Sub_Rubro")}}>
                  Subrubros
                </div>
                <div onClick={()=>{handleOnClick("Producto")}}>
                  Productos
                </div>
                <div onClick={()=>{handleOnClick("Noticias")}}>
                  Noticias
                </div>
              </div>
                  
            </div>
          </div>
          
        );
      }
  }
  
}

export default  ListaRubros;



