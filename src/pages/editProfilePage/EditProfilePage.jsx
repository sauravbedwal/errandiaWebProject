import React from "react";
import UserDetails from "../../components/userDetails/UserDetails";
import UserProfileBgImage from "../../components/userProfileBgImage/UserProfileBgImage";
import EditProfile from "../../components/editProfile/EditProfile";
const EditProfilePage = () => {
  return (
    <>
      <UserProfileBgImage />
      <div className="container productServices-container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <EditProfile />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfilePage;
