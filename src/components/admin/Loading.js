import React from "react";
import load from "./load.gif";
function Loading(props) {
  return (
    <React.Fragment>
      <div className="upp">
        <div className="col-md-12 centrar">
  <h1>{props.asd}</h1>
          <img src={load} alt="" className="lo" />
        </div>
      </div>
    </React.Fragment>
  );
}
export default Loading;
