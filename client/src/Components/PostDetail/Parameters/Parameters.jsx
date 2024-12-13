import React from "react";
import "./Parameters.css";

function Parameters(props) {
  return (
    <div className="parameter-row">
      <p className="title">{props.title}</p>
      <p className="value">{props.value}</p>
    </div>
  );
}

export default Parameters;
