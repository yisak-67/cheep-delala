import React from "react";
import "./Loader.css";
import loadingGif1 from "../../assets/Infinity.gif";
import loadingGif2 from "../../assets/Spinner.gif";

function Loader() {
  return (
    <div className="loader">
      <div className="loader__image">
        <img src={loadingGif1} alt="" />
      </div>
    </div>
  );
}

export default Loader;
