import React from "react";
import businessUserProfile from "../../assets/businessUserProfile.svg";
import locationBusinessUserProfile from "../../assets/locationBusinessUserProfile.svg";
import "../../App.css";
import pharmaciesFoundLocation from "../../assets/pharmaciesFoundLocation.svg";
import Button from "react-bootstrap/Button";
import whatsappIcon from "../../assets/whatsappIcon.svg";
import verifiedBusinessUserProfile from "../../assets/verifiedBusinessUserProfile.svg";
import clockBusinessUserProfile from "../../assets/clockBusinessUserProfile.svg";
import shareSingleProductDetails from "../../assets/shareSingleProductDetails.svg";
import reportBusiness from "../../assets/reportBusiness.svg";
import callBusinessUserProfile from "../../assets/callBusinessUserProfile.svg";
import ProductsBusinessUserProfile from "../productsBusinessUserProfile/ProductsBusinessUserProfile";
import { useDispatch } from "react-redux";
import {
  modalShareToggle,
  setShareModalTrue,
} from "../../utils/businessShareSlice";
import FeaturedBusinessProfileShare from "../featuredBusinessProfileShare/FeaturedBusinessProfileShare";
import { modalCallToggle, setCallModalTrue } from "../../utils/callModalSlice";
import CallPopUp from "../callPopUp/CallPopUp";
import ReportBusiness from "../reportBusiness/ReportBusiness";
import {
  modalReportToggle,
  setReportModalTrue,
} from "../../utils/reportModalSlice";

const BusinessProducts = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card card-container-businessProducts">
              {/* <div className="row"> */}
              {/* <div className="col-xl-8 col-lg-7 col-md-7 col-sm-12 col-12 open-container"> */}
              <div className="card-body">
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
                      <div className="businessUserView-viewProfile-container">
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
                      </div>
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

                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={clockBusinessUserProfile}
                            alt="Location Icon"
                          />
                          <p className="businessUserView-Text">8am - 5pm</p>
                        </div>
                      </div>
                    </div>

                    <div className="businessUserView-report-share-container">
                      <div
                        className="businessUserView-report-container"
                        onClick={() => {
                          dispatch(modalReportToggle());
                          dispatch(setReportModalTrue());
                        }}
                      >
                        <img src={reportBusiness} alt="reportBusiness" />

                        <p className="businessUserView-report-text">
                          Report Business
                        </p>
                      </div>
                      <button
                        type="button"
                        class="btn btn-primary btn-lg businessUserView-whiteButton"
                        onClick={() => {
                          dispatch(modalShareToggle());
                          dispatch(setShareModalTrue());
                        }}
                      >
                        <img src={shareSingleProductDetails} />
                        Share{" "}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="businessProducts-buttons-container">
                  <Button
                    variant="primary"
                    className="businessUserView-call-button"
                    onClick={() => {
                      dispatch(modalCallToggle());
                      dispatch(setCallModalTrue());
                    }}
                  >
                    <img
                      src={callBusinessUserProfile}
                      alt="callBusinessUserProfile"
                    />
                    Contact Owner{" "}
                  </Button>
                  <Button
                    variant="primary"
                    className="businessUserView-whatsAppButton"
                  >
                    <img src={whatsappIcon} alt="whatsappIcon" />
                    Chat
                  </Button>
                  <button
                    type="button"
                    class="btn btn-primary btn-lg businessUserView-location-whiteButton"
                  >
                    Go There
                    <img src={pharmaciesFoundLocation} />
                  </button>
                </div>
              </div>
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
      <ProductsBusinessUserProfile />
      <FeaturedBusinessProfileShare />
      {/* <CallPopUp /> */}
      <ReportBusiness />
    </>
  );
};

export default BusinessProducts;
