import React, { Component } from 'react'
import MaterialTable from 'material-table'

class Admin extends Component {
  render() {
    return (
      <div style={{ maxWidth: '80%'}}>
        <MaterialTable
        actions={[
          {
            icon: 'delete',
            tooltip: 'Borrar Producto',
          },
          {
            icon:'edit',
            tooltip:'editar producto'
          }

        ]}
        options={{
          search: true,
          sorting: false,
          columnsButton:true,
          paging:false,         
         }}
          columns={[
            { title: 'Titulo', field: 'titulo' },
            { title: 'Subtitutlo', field: 'subtitulo' },
            { title: 'Descripcion', field: 'descripcion'},
            { title: 'Enlaces', field: 'enlaces' },
            { title: 'Imagen', field: 'imagen'},
            { title: 'Ficha Tecnica', field: 'fichaTecnica'}
          ]}
          data={[{ titulo: 'Taco Fischer metálico FBS', 
          subtitulo: 'Una buena Selladora', 
          descripcion: 'Sellador adhesivo universal con tecnología híbrida de alta performance y agarre inmediato. Pega – Rellena – Sella', 
          enlaces: "https://www.youtube.com/watch?v=2DYYVp4QXew",
          fichaTecnica: 'https://www.youtube.com/watch?v=2DYYVp4QXew' },
          
          { titulo: 'Caballetes Sorrento N° 3', 
          subtitulo: 'Un muy buen Sorrento (Recomendado) :)', 
          descripcion: 'Hormigonera con tambor Bicónico. Pala cargadora con elevación a cable de acero y vibrador incorporado.', 
          enlaces: "https://www.youtube.com/watch?v=B7uMdmCQabc&list=RDB7uMdmCQabc&start_radio=1",
          imagen:'referencia al storage',
          fichaTecnica: 'archivo.PDF' },
          { titulo: 'Taco Fischer metálico FBS', 
          subtitulo: 'Una buena Selladora', 
          descripcion: 'Sellador adhesivo universal con tecnología híbrida de alta performance y agarre inmediato. Pega – Rellena – Sella', 
          enlaces: "https://www.youtube.com/watch?v=2DYYVp4QXew",
          fichaTecnica: 'PDF' },]}
          title="Mariutti Admin"
        />
      </div>
    )
  }
}
export default Admin;