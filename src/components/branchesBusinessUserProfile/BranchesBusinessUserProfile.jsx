import React from "react";
import branchesBusinessUserProfile from "../../assets/branchesBusinessUserProfile.svg";
import locationBusinessUserProfile from "../../assets/locationBusinessUserProfile.svg";
import "../../App.css";
import pharmaciesFoundLocation from "../../assets/pharmaciesFoundLocation.svg";
import Button from "react-bootstrap/Button";
import callBusinessUserProfile from "../../assets/callBusinessUserProfile.svg";
import { modalCallToggle, setCallModalTrue } from "../../utils/callModalSlice";
import CallPopUp from "../callPopUp/CallPopUp";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import addIcon from "../../assets/addIcon.svg";
const BranchesBusinessUserProfile = () => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 productsFromTheBusiness-productServiceButtons">
            <h6 className="productsFromTheBusiness-section-heading">
              Branches (2)
            </h6>

            {pathname === "/user-profile" ? (
              <button
                type="button"
                class="btn btn-primary btn-lg userProfileBusinessSingleProduct-location-whiteButton"
              >
                <img src={addIcon} alt="addIcon" className="img-fluid" />
                Add Busines Branch
              </button>
            ) : (
              <div className="branchesBusinessUserProfile-viewAllBusiness">
                View Business Branches
              </div>
            )}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card card-container-branchesBusinessUserProfile">
              {/* <div className="row"> */}
              {/* <div className="col-xl-8 col-lg-7 col-md-7 col-sm-12 col-12 open-container"> */}
              <div className="card-body">
                <div className="d-flex gap-3 branchesBusinessUserProfile-image-container">
                  <div className="branchesBusinessUserProfile-image-bgContainer">
                    <img
                      className="pharmaciesImage"
                      src={branchesBusinessUserProfile}
                      alt="Card image cap"
                    />
                  </div>

                  <div
                    className="businessUserView-name-report-container"
                    style={{ width: "100%" }}
                  >
                    <div>
                      <h5 className="card-subtitle text-muted businessUserView-Heading">
                        StyleCraft Couture
                      </h5>

                      <div className="businessUserView--locationTime-container">
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={locationBusinessUserProfile}
                            alt="Location Icon"
                          />
                          <p className="businessUserView-Text">
                            Buea, South-West
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="branchesBusinessUserProfile-buttons-container">
                        <Button
                          variant="primary"
                          className="branchesBusinessUserProfile-call-button"
                          onClick={() => {
                            dispatch(modalCallToggle());
                            dispatch(setCallModalTrue());
                          }}
                        >
                          <img
                            src={callBusinessUserProfile}
                            alt="callBusinessUserProfile"
                          />
                          Call this Office
                        </Button>

                        <button
                          type="button"
                          class="btn btn-primary btn-lg branchesBusinessUserProfile-location-whiteButton"
                        >
                          Go There
                          <img src={pharmaciesFoundLocation} />
                        </button>
                      </div>

                      <div className="branchesBusinessUserProfile-reportBusiness">
                        Report Business
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card card-container-branchesBusinessUserProfile">
              {/* <div className="row"> */}
              {/* <div className="col-xl-8 col-lg-7 col-md-7 col-sm-12 col-12 open-container"> */}
              <div className="card-body">
                <div className="d-flex gap-3 branchesBusinessUserProfile-image-container">
                  <div className="branchesBusinessUserProfile-image-bgContainer">
                    <img
                      className="pharmaciesImage"
                      src={branchesBusinessUserProfile}
                      alt="Card image cap"
                    />
                  </div>

                  <div
                    className="businessUserView-name-report-container"
                    style={{ width: "100%" }}
                  >
                    <div>
                      <h5 className="card-subtitle text-muted businessUserView-Heading">
                        StyleCraft Couture
                      </h5>

                      <div className="businessUserView--locationTime-container">
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={locationBusinessUserProfile}
                            alt="Location Icon"
                          />
                          <p className="businessUserView-Text">
                            Buea, South-West
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="branchesBusinessUserProfile-buttons-container">
                        <Button
                          variant="primary"
                          className="branchesBusinessUserProfile-call-button"
                          onClick={() => {
                            dispatch(modalCallToggle());
                            dispatch(setCallModalTrue());
                          }}
                        >
                          <img
                            src={callBusinessUserProfile}
                            alt="callBusinessUserProfile"
                          />
                          Call this Office
                        </Button>

                        <button
                          type="button"
                          class="btn btn-primary btn-lg branchesBusinessUserProfile-location-whiteButton"
                        >
                          Go There
                          <img src={pharmaciesFoundLocation} />
                        </button>
                      </div>

                      <div className="branchesBusinessUserProfile-reportBusiness">
                        Report Business
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* <CallPopUp /> */}
    </>
  );
};

export default BranchesBusinessUserProfile;
