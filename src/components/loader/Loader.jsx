import React from "react";
import LoaderGif from "../../assets/images/LoaderGif.gif";

const Loader = ({ width = "150px", height = "150px" }) => {
  return (
    <div className="loader-gif-login">
      <img
        src={LoaderGif}
        alt="Loading..."
        className="loader-gif"
        style={{ width: width, height: height }}
      />
    </div>
  );
};

export default Loader;
