import React from "react";
import listYourBusinessHomeImage from "../../assets/listYourBusinessHomeImage.svg";

const ListYourBusinessHomeImage = () => {
  return (
    <div className="container">
      <div className="row">
        <div
          className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 image-mobile"
          // style={{ background: "red" }}
        >
          <img
            src={listYourBusinessHomeImage}
            alt="listYourBusinessHomeImage"
            className="img-fluid listYourBusiness-image"
          />
        </div>
      </div>
    </div>
  );
};

export default ListYourBusinessHomeImage;
