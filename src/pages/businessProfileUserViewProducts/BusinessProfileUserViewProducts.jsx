import React from "react";
import "../../App.css";
import PharmaciesOptions from "../../components/pharmaciesOptions/PharmaciesOptions";
import BusinessProducts from "../../components/businessProducts/BusinessProducts";

const BusinessProfileUserViewProducts = () => {
  return (
    <div className="container productServices-container">
      <div className="row">
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <BusinessProducts />
        </div>
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
          <PharmaciesOptions />
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileUserViewProducts;
