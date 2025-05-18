import React from "react";
import noServicesUserProfile from "../../assets/noServicesUserProfile.svg";
import addNoBusiness from "../../assets/addNoBusiness.svg";

const UserProfileNoServiceFound = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="userProfileNoBusinessFound-container">
            <div className="userProfileNoBusinessFound-image-container">
              <img
                src={noServicesUserProfile}
                alt="noServicesUserProfile"
                className="img-fluid"
              />
            </div>
            <h4 className="pharmaciesNoResultFound-heading">
              You don't have any services yet.{" "}
            </h4>
            <p className="pharmaciesNoResultFound-subText">Create one now.</p>
            <button
              type="button"
              class="btn btn-primary btn-lg businessUserView-location-whiteButton"
            >
              <img
                src={addNoBusiness}
                alt="addNoBusiness"
                className="img-fluid"
              />
              Add Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileNoServiceFound;
