import React, { useState } from "react";
import filterUpArrow from "../../assets/filterUpArrow.svg";
import Form from "react-bootstrap/Form";
import filterSearch from "../../assets/filterSearch.svg";
import filtersAdBanner from "../../assets/filtersAdBanner.svg";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { setFalse, setTrue, toggle } from "../../utils/booleanSlice";
import Collapse from "react-bootstrap/Collapse";
import productSuggestionReviews from "../../assets/productSuggestionReviews.svg";
import starIcon from "../../assets/starIcon.png";
import businessNearYouLocationIcon from "../../assets/businessNearYouLocationIcon.svg";
import productSuggestionOptions from "../../assets/productSuggestionOptions.svg";
import starSideBar from "../../assets/starSideBar.svg";
import pharmaciesOption from "../../assets/pharmaciesOption.svg";
import sideBarBusinessProfileUserView from "../../assets/sideBarBusinessProfileUserView.svg";
import martin from "../../assets/martin.svg";
import Button from "react-bootstrap/Button";
import verifyUserProfile from "../../assets/verifyUserProfile.svg";
import sideBarAd from "../../assets/sideBarAd.jpeg";
import sideBarAdEnglish from "../../assets/sideBarAdEnglish.jpeg";

const UserProfileSidebar = () => {
  const boolean = useSelector((store) => store.boolean.value);

  const dispatch = useDispatch();

  const [open, setOpen] = useState({
    region: false,
    town: false,
  });

  const path = window.location.pathname;
  return (
    <>
      <div className="container filter-main-container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card userProfile-Sidebar-verify px-3 mb-3">
              <div className="card-body productSuggestion-card-container">
                <div className="userProfile-Sidebar-verifyContainer">
                  <img src={verifyUserProfile} alt="verifyUserProfile" />
                </div>
                <p className="userProfile-Sidebar-verifyText">
                  Please verify your business location so it can be found by
                  Errandia search engine!
                </p>
                <div className="userProfile-Sidebar-verifyButton">
                  Click here
                </div>
              </div>
            </div>

            <div className="card userProfile-Sidebar px-3">
              <div className="card-body productSuggestion-card-container">
                <div className="userProfile-Sidebar-heading">
                  Upgrade Your Plan
                </div>
                <p className="userProfile-Sidebar-text">
                  You are currently on Errandia's FREE plan. Subscribe to one of
                  our plans to unlock opportunities for your business.
                </p>
                <Button
                  variant="primary"
                  className="userProfile-Sidebar-call-button"
                >
                  Get A Plan{" "}
                </Button>
              </div>
            </div>

            <div className="productSuggestion-adBanner">
              <img
                src={sideBarAd}
                className="img-fluid"
                style={{ borderRadius: "20px" }}
              />
            </div>

            <div className="productSuggestion-adBanner">
              <img
                src={sideBarAdEnglish}
                className="img-fluid"
                style={{ borderRadius: "20px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileSidebar;
