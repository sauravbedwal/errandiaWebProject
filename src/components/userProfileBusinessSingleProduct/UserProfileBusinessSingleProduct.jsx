import React from "react";
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
import goBackArrow from "../../assets/goBackArrow.svg";
import notVerifiedSingleBusiness from "../../assets/notVerifiedSingleBusiness.svg";
import boost from "../../assets/boost.svg";
import addBusinessSingleProduct from "../../assets/addBusinessSingleProduct.svg";
import verifyBusinessSingleBusiness from "../../assets/verifyBusinessSingleBusiness.svg";
import editSingleBusiness from "../../assets/editSingleBusiness.svg";

const UserProfileBusinessSingleProduct = ({
  detailSelected,
  setDetailSelected,
}) => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="productsBusinessUserProfile-goBack-container">
              <img
                style={{ cursor: "pointer" }}
                className="img-fluid"
                src={goBackArrow}
                alt="goBackArrow"
                onClick={() => {
                  setDetailSelected("Businesses");
                }}
              />
              <p className="productsBusinessUserProfile-goBack">
                Back to businesses
              </p>
            </div>
            <div className="card card-container-businessUserView mt-4">
              {/* <div className="row"> */}
              {/* <div className="col-xl-8 col-lg-7 col-md-7 col-sm-12 col-12 open-container"> */}

              <div className="card-body mt-3">
                <div className="d-flex gap-3 businessUserView-image-container">
                  <img
                    className="businessPorfileUserView-pharmaciesImage"
                    src={businessUserProfile}
                    alt="Card image cap"
                  />

                  <div
                    className="businessUserView-name-report-container"
                    style={{ width: "100%" }}
                  >
                    <div>
                      <div className="userProfileBusinessSingleProduct-viewProfile-container">
                        <div className="businessUserView-type">
                          Fashion and style
                        </div>
                      </div>
                      <h5 className="card-subtitle text-muted userProfileBusinessSingleProduct-Heading">
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

                        {/* <div className="d-flex align-items-center gap-2">
                          <img
                            src={clockBusinessUserProfile}
                            alt="Location Icon"
                          />
                          <p className="businessUserView-Text">8am - 5pm</p>
                        </div> */}
                      </div>
                    </div>

                    <div className="businessUserView-report-share-container">
                      <Button
                        variant="primary"
                        className="userProfileBusinessFound-delete"
                      >
                        <img src={boost} alt="boost" />
                        Boost
                      </Button>
                      {/* <button
                        type="button"
                        class="btn btn-primary btn-lg businessUserView-whiteButton"
                        onClick={() => {
                          // console.log("modal");
                          dispatch(modalShareToggle());
                          dispatch(setShareModalTrue());
                        }}
                      >
                        <img src={shareSingleProductDetails} />
                        Share{" "}
                      </button> */}
                      <div className="userProfileBusinessSingleProduct-verified-container">
                        <img
                          src={notVerifiedSingleBusiness}
                          alt="notVerifiedSingleBusiness"
                        />
                        <p className="userProfileBusinessSingleProduct-verified">
                          Not Verified
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="userProfileBusinessSingleProduct-buttons-pair-container">
                  <div className="userProfileBusinessSingleProduct-buttons-container mt-3">
                    <Button
                      variant="primary"
                      className="userProfileBusinessSingleProduct-call-button"
                      // onClick={() => {
                      //   dispatch(modalCallToggle());
                      //   dispatch(setCallModalTrue());
                      // }}
                    >
                      <img
                        src={addBusinessSingleProduct}
                        alt="addBusinessSingleProduct"
                      />
                      Add Business Branch
                    </Button>
                    {/* <Button
                    variant="primary"
                    className="businessUserView-whatsAppButton"
                  >
                    <img src={whatsappIcon} alt="whatsappIcon" />
                    Chat
                  </Button> */}
                    <button
                      type="button"
                      class="btn btn-primary btn-lg userProfileBusinessSingleProduct-call-button"
                    >
                      <img
                        src={verifyBusinessSingleBusiness}
                        alt="verifyBusinessSingleBusiness"
                        className="img-fluid"
                      />
                      Verify Business
                    </button>
                  </div>

                  <div className="userProfileBusinessSingleProduct-buttons-container mt-3 gap-4">
                    <Button
                      variant="primary"
                      className="userProfileBusinessSingleProduct-call-button"
                      style={{ width: "67px" }}
                      // onClick={() => {
                      //   dispatch(modalCallToggle());
                      //   dispatch(setCallModalTrue());
                      // }}
                    >
                      <img src={editSingleBusiness} alt="editSingleBusiness" />
                      Edit
                    </Button>
                    {/* <Button
                    variant="primary"
                    className="businessUserView-whatsAppButton"
                  >
                    <img src={whatsappIcon} alt="whatsappIcon" />
                    Chat
                  </Button> */}
                    <div class="userProfileBusinessSingleProduct-delete-button">
                      Delete Business
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
      <BranchesBusinessUserProfile />
      <ProductsBusinessUserProfile />
      <ServiceBusinessUserProfile />
    </>
  );
};

export default UserProfileBusinessSingleProduct;
