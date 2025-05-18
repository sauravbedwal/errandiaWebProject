import React from "react";
import "../../App.css";
import UserDetails from "../../components/userDetails/UserDetails";
import UserProfileBgImage from "../../components/userProfileBgImage/UserProfileBgImage";

const UserProfile = () => {
  return (
    <>
      <UserProfileBgImage />
      <div className="container productServices-container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <UserDetails />
          </div>
          {/* <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
          <PharmaciesOptions />
        </div> */}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
