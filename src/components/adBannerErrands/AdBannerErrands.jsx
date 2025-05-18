import React from "react";
import "../../App.css";
import sideBarAd from "../../assets/sideBarAd.jpeg";

const AdBannerErrands = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="adBannerErrands-image-container">
          <img src={sideBarAd} style={{ borderRadius: "20px" }} />
        </div>
      </div>
    </div>
  );
};

export default AdBannerErrands;
