import React, { useState } from "react";
import businessUserProfile from "../../assets/businessUserProfile.svg";
import locationBusinessUserProfile from "../../assets/locationBusinessUserProfile.svg";
import "../../App.css";
import pharmaciesFoundLocation from "../../assets/pharmaciesFoundLocation.svg";
import Button from "react-bootstrap/Button";
import verifiedBusinessUserProfile from "../../assets/verifiedBusinessUserProfile.svg";
import clockBusinessUserProfile from "../../assets/clockBusinessUserProfile.svg";
import shareSingleProductDetails from "../../assets/shareSingleProductDetails.svg";
import reportBusiness from "../../assets/reportBusiness.svg";
import callBusinessUserProfile from "../../assets/callBusinessUserProfile.svg";
import BranchesBusinessUserProfile from "../branchesBusinessUserProfile/BranchesBusinessUserProfile";
import ProductsBusinessUserProfile from "../productsBusinessUserProfile/ProductsBusinessUserProfile";
import { useDispatch } from "react-redux";
import {
  modalShareToggle,
  setShareModalTrue,
} from "../../utils/businessShareSlice";
import FeaturedBusinessProfileShare from "../featuredBusinessProfileShare/FeaturedBusinessProfileShare";
import ServiceBusinessUserProfile from "../serviceBusinessUserProfile/ServiceBusinessUserProfile";
import { modalCallToggle, setCallModalTrue } from "../../utils/callModalSlice";
import CallPopUp from "../callPopUp/CallPopUp";
import {
  modalReportToggle,
  setReportModalTrue,
} from "../../utils/reportModalSlice";
import ReportBusiness from "../reportBusiness/ReportBusiness";
import userProfileDp from "../../assets/userProfileDp.svg";
import plusAddBusiness from "../../assets/plusAddBusiness.svg";
import Dropdown from "react-bootstrap/Dropdown";
import businessUserInfo from "../../assets/businessUserInfo.svg";
import errandsUserInfo from "../../assets/errandsUserInfo.svg";
import servicesUserInfo from "../../assets/servicesUserInfo.svg";
import productsUserInfo from "../../assets/productsUserInfo.svg";
import { useNavigate } from "react-router-dom";

const UserInfoEdit = ({ detailSelected, setDetailSelected }) => {
  const dispatch = useDispatch();

  const [detailActive, setDetailActive] = useState("Businesses");

  const navigate = useNavigate();
  return (
    <>
      <div className="container" style={{ marginTop: "-200px" }}>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card card-container-userInfo">
              {/* <div className="row"> */}
              {/* <div className="col-xl-8 col-lg-7 col-md-7 col-sm-12 col-12 open-container"> */}
              <div className="card-body">
                <div className="d-flex gap-3 businessUserView-image-container">
                  <img
                    className="businessPorfileUserView-pharmaciesImage"
                    src={userProfileDp}
                    alt="Card image cap"
                  />

                  <div
                    className="businessUserView-name-report-container mt-4"
                    style={{ width: "100%" }}
                  >
                    <div style={{ width: "100%" }}>
                      {/* <div className="businessUserView-viewProfile-container">
                        <div className="businessUserView-type">
                          Fashion and style
                        </div>
                        <div className="businessUserView-verified-container">
                          <img
                            src={verifiedBusinessUserProfile}
                            alt="verifiedBusinessUserProfile"
                          />
                          <p className="businessUserView-verified">
                            Not Verified
                          </p>
                        </div>
                      </div> */}
                      <div className="userInfo-headingButtons-container">
                        <div className="d-flex flex-column align-items-center">
                          <h5 className="card-subtitle text-muted businessUserView-Heading">
                            Martin Lawnin
                          </h5>
                          <div className="businessUserView--locationTime-container">
                            <div className="d-flex align-items-center gap-2">
                              <p className="businessUserView-Text-grey">
                                Address
                              </p>
                              <p className="businessUserView-Text">
                                Buea, Cameroon
                              </p>
                            </div>
                          </div>
                          <div className="businessUserView--locationTime-container mt-2">
                            <div className="d-flex align-items-center gap-2">
                              <p className="businessUserView-Text-grey">
                                Member since{" "}
                              </p>
                              <p className="businessUserView-Text">
                                13 months ago
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="userInfo-buttons-container"
                          onClick={() => {
                            navigate("/user-profile-edit-business");
                            setDetailSelected("EditBusinessForm");
                          }}
                        >
                          <button
                            type="button"
                            class="btn btn-primary btn-lg businessUserView-location-whiteButton"
                          >
                            Edit Profile
                          </button>

                          <div
                            className="allPublicOffices-dropDownContainer"
                            // onClick={() => {
                            //   dispatch(modalCallToggle());
                            //   dispatch(setCallModalTrue());
                            // }}
                          >
                            <Dropdown drop="down">
                              <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                                className="userInfo-dropdown businessUserView-call-button"
                              >
                                <img
                                  src={plusAddBusiness}
                                  alt="plusAddBusiness"
                                />
                                Add Business
                              </Dropdown.Toggle>

                              <Dropdown.Menu className="userInfo-dropDown-container">
                                <Dropdown.Item
                                  href="#/action-1"
                                  className="userInfo-dropDown"
                                >
                                  Add Business
                                </Dropdown.Item>
                                <Dropdown.Item
                                  href="#/action-2"
                                  className="userInfo-dropDown"
                                >
                                  Add Products
                                </Dropdown.Item>
                                <Dropdown.Item
                                  href="#/action-3"
                                  className="userInfo-dropDown"
                                >
                                  Add Services
                                </Dropdown.Item>
                                <Dropdown.Item
                                  href="#/action-3"
                                  className="userInfo-dropDown"
                                >
                                  Run Errand
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>

                          {/* <Button
                        variant="primary"
                        className="businessUserView-call-button"
                      >
                        <img src={plusAddBusiness} alt="plusAddBusiness" />
                        Add Business
                      </Button> */}
                        </div>
                      </div>

                      <div className="userInfo-locationTime-container mt-4">
                        {/* <div className="d-flex align-items-center gap-2"> */}
                        <div className="userInfo-details-container">
                          <div className="userInfo-details-IconText-container">
                            <img
                              src={businessUserInfo}
                              alt="businessUserInfo"
                            />
                            <p className="businessUserView-Text-grey">
                              Businesses{" "}
                            </p>
                          </div>
                          <p className="userInfo-details-number">00</p>
                        </div>

                        <div className="userInfo-details-container">
                          <div className="userInfo-details-IconText-container">
                            <img
                              src={productsUserInfo}
                              alt="productsUserInfo"
                            />
                            <p className="businessUserView-Text-grey">
                              Products
                            </p>
                          </div>
                          <p className="userInfo-details-number">00</p>
                        </div>
                        <div className="userInfo-details-container">
                          <div className="userInfo-details-IconText-container">
                            <img
                              src={servicesUserInfo}
                              alt="servicesUserInfo"
                            />
                            <p className="businessUserView-Text-grey">
                              Services
                            </p>
                          </div>
                          <p className="userInfo-details-number">00</p>
                        </div>

                        <div className="userInfo-details-container">
                          <div className="userInfo-details-IconText-container">
                            <img src={errandsUserInfo} alt="errandsUserInfo" />
                            <p className="businessUserView-Text-grey">
                              Errands
                            </p>
                          </div>
                          <p className="userInfo-details-number">00</p>
                        </div>

                        {/* </div> */}
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
    </>
  );
};

export default UserInfoEdit;
