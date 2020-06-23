import React from "react";
import './Loading.css'

function Loading(props) {
  return (
    <div class="backdrop">
      <div className="loadingcontainer">

        <div class="spinner"></div>
        <div class="loadingtext">{props.text}</div>

      </div>
    </div>
  );
}

export default Loading;
