import React from "react";
import PharmaciesOptions from "../../components/pharmaciesOptions/PharmaciesOptions";
import SingleErrandoDetail from "../../components/singleErrandoDetail/SingleErrandoDetail";

const ErrandoProfile = () => {
  return (
    <div className="container productServices-container">
      <div className="row">
        <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12 col-12">
          <SingleErrandoDetail />
        </div>
        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-12">
          <PharmaciesOptions />
        </div>
      </div>
    </div>
  );
};

export default ErrandoProfile;
