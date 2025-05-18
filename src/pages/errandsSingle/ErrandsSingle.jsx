import React from "react";
import "../../App.css";
import AdBannerErrands from "../../components/adBannerErrands/AdBannerErrands";
import AllErrands from "../../components/allErrands/AllErrands";

const ErrandsSingle = () => {
  return (
    <>
      <div className="container errandsSingle-container">
        <div className="row">
          <div className="col-xl-9 col-lg-12 col-md-12 col-sm-12 col-12">
            <AllErrands />
          </div>
          <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12 col-12">
            <AdBannerErrands />
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrandsSingle;
