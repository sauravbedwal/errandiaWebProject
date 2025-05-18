import React from "react";

const UserProfileEditErrands = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 productsFromTheBusiness-productServiceButtons">
          <div className="productsBusinessUserProfile-goBack-container">
            <img
              style={{ cursor: "pointer" }}
              className="img-fluid"
              src={goBackArrow}
              alt="goBackArrow"
              onClick={() => {
                // navigate("/user-profile");
                setDetailSelected("Businesses");
              }}
            />
            <p className="productsBusinessUserProfile-goBack">
              Back to businesses
            </p>
          </div>
          <h6 className="editBusinessForm-section-heading">Edit Errand</h6>
        </div>
      </div>
    </div>
  );
};

export default UserProfileEditErrands;
