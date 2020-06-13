import React from "react";
import './Loading.css'

function Loading(props) {
  return (
    <div class="backdrop">
      <div className="loadingcontainer">

        <div class="spinner"></div>
        <div class="logo">cargando admin</div>
      
      </div>
    </div>
  );
}

export default Loading;
