import React from "react";
import "../../App.css";
import { useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import whatsappIcon from "../../assets/whatsappIcon.svg";
import { useState } from "react";
import { ButtonGroup, ToggleButton, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { modalCallToggle, setCallModalTrue } from "../../utils/callModalSlice";
import addNoBusiness from "../../assets/addNoBusiness.svg";
import errandsReceived from "../../assets/errandsReceived.svg";
import "../../App.css";
import Button from "react-bootstrap/Button";
import deleteErrands from "../../assets/deleteErrands.svg";
import {
  modalReportToggle,
  setReportModalTrue,
} from "../../utils/reportModalSlice";
import deleteReport from "../../assets/deleteReport.svg";
import reportedAccount from "../../assets/reportedAccount.svg";
import reportSign from "../../assets/reportSign.svg";
import {
  modalDeleteToggle,
  setDeleteModalTrue,
} from "../../utils/deleteModalSlice";
import DeleteReportModal from "../deleteReportModal/DeleteReportModal";

const UserProfileReportsFound = ({ detailSelected, setDetailSelected }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("received");
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div className="row userProfileReportsFound-background-container">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            {/* <div className"> */}
            <div className="card card-container-userProfileReportsFound">
              {/* <div className="row"> */}
              {/* <div className="col-xl-8 col-lg-7 col-md-7 col-sm-12 col-12 open-container"> */}
              <div className="card-body">
                <div className="d-flex gap-3 businessUserView-image-container"
                
                style={{cursor:"pointer"}}
                onClick={() => {
                            setDetailSelected("ViewReportThread");
                          }}>
                  <img
                    className="businessPorfileUserView-pharmaciesImage"
                    src={reportedAccount}
                    alt="reportedAccount"
                  />

                  <div
                    className="businessUserView-name-report-container"
                    style={{ width: "100%" }}
                  >
                    <div >
                      <div className="userProfileReportsFound-report-container">
                        <div className="d-flex align-items-start gap-2">
                          <img
                            src={reportSign}
                            alt="reportSign"
                            className="img-fluid"
                          />
                          <p className="userProfileReportsFound-viewProfile-container">
                            You reported{" "}
                            <span
                              className="userProfileReportsFound-viewProfile-span"
                              onClick={() => {
                                // console.log("first1212");
                                setDetailSelected("ViewReportThread");
                              }}
                              
                            >
                              MATRIX
                            </span>{" "}
                          </p>
                        </div>

                        <div className="userProfileReportsFound-time">
                          2 days ago
                        </div>
                      </div>

                      <p className="userProfileReportsFound-viewProfile-para">
                        Hello sir. I ordered a Dell Laptop Charger from Matrix 2
                        days ago and haven't received it. Please help me
                      </p>

                      <div>
                        <Button
                          variant="primary"
                          className="userProfileReportsFound-delete-thread"
                          onClick={() => {
                            dispatch(modalDeleteToggle());
                            dispatch(setDeleteModalTrue());
                          }}
                        >
                          <img src={deleteReport} alt="deleteReport" />
                          Delete Thread
                        </Button>
                      </div>
                      {/* <div className="businessUserView--locationTime-container">
                        <div className="userProfileErrandsReceived-buttons">
                          <Button
                            variant="primary"
                            className="service-call-button"
                            onClick={() => {
                              dispatch(modalCallToggle());
                              dispatch(setCallModalTrue());
                            }}
                          >
                            <img src={productsCall} alt="whatsappIcon" />
                            Call Now
                          </Button>
                          <Button
                            variant="primary"
                            className="products-whatsAppButton-green"
                            onClick={() => {
                              dispatch(modalCallToggle());
                              dispatch(setCallModalTrue());
                            }}
                          >
                            <img src={whatsappIcon} alt="whatsappIcon" />
                            Whatsapp Chat
                          </Button>
                        </div>
                        <div className="userProfileErrandsRecieved-time">
                          12 minutes ago
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
                {/* <div className="businessProducts-buttons-container">
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
              </div> */}
              </div>
              {/* </div> */}
              {/* </div> */}
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
      <DeleteReportModal />
    </>
  );
};

export default UserProfileReportsFound;
