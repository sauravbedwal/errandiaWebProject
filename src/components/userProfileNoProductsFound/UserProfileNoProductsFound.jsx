import React from "react";
import noProductsUserProfile from "../../assets/noProductsUserProfile.svg";
import addNoBusiness from "../../assets/addNoBusiness.svg";
import noServicesUserProfile from "../../assets/noServicesUserProfile.svg";
import { useDispatch } from "react-redux";
import { setUserprofileAddProductModalTrue } from "../../utils/userprofileAddProductModalSlice";
import UserProfileAddProduct from "../userProfileAddProduct/UserProfileAddProduct";

const UserProfileNoProductsFound = ({ service }) => {
  const dispatch = useDispatch();

  // console.log("service", service);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="userProfileNoBusinessFound-container">
              <div className="userProfileNoBusinessFound-image-container">
                <img
                  src={
                    service === "0"
                      ? noProductsUserProfile
                      : noServicesUserProfile
                  }
                  alt="noPharmaciesFound"
                  className="img-fluid"
                />
              </div>
              <h4 className="pharmaciesNoResultFound-heading">
                {service === "0"
                  ? "You don't have any products yet."
                  : "You don't have any services yet."}
              </h4>
              <p className="pharmaciesNoResultFound-subText">Create one now.</p>
              <button
                style={{ marginTop: "20px" }}
                type="button"
                class="btn btn-primary btn-lg businessUserView-location-whiteButton"
                onClick={() => {
                  dispatch(setUserprofileAddProductModalTrue());
                }}
              >
                <img
                  src={addNoBusiness}
                  alt="addNoBusiness"
                  className="img-fluid"
                />
                {service === "0" ? "Add Products" : "Add Service"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserProfileAddProduct service={service} />
    </>
  );
};

export default UserProfileNoProductsFound;
