import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import "summernote/dist/summernote-lite.css";
import $ from "jquery";
import "summernote/dist/summernote-lite.js";
import goBackArrow from "../../assets/goBackArrow.svg";
import user from "../../assets/images/user-1-report.png";
import erra from "../../assets/images/user-1-report-erra.png";
import { useDispatch } from "react-redux";
import {
  modalDeleteToggle,
  setDeleteModalTrue,
} from "../../utils/deleteModalSlice";
import DeleteReportMessage from "../deleteReportMessage/DeleteReportMessage";
import {
  modalUserprofileAddProductToggle,
  setUserprofileAddProductModalTrue,
} from "../../utils/userprofileAddProductModalSlice";
import EditReport from "../editReport/EditReport";

const ViewReportThread = ({ detailSelected, setDetailSelected }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    $("#summernote").summernote({
      placeholder: "Type your message here...",
      height: 200,
      toolbar: [
        ["style", ["style"]],
        ["font", ["bold", "underline", "clear"]],
        ["fontname", ["fontname"]],
        ["para", ["ul", "ol", "paragraph"]],
        ["table", ["table"]],
        ["insert", ["link", "picture", "video"]],
        ["view", ["fullscreen", "codeview"]],
      ],
    });
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 productsFromTheBusiness-productServiceButtons">
            <div className="productsBusinessUserProfile-goBack-container">
              <img
                style={{ cursor: "pointer" }}
                className="img-fluid"
                src={goBackArrow}
                alt="goBackArrow"
                onClick={() => {
                  // navigate("/user-profile");
                  setDetailSelected("Reports");
                }}
              />
              <p className="productsBusinessUserProfile-goBack">
                Back to Reports
              </p>
            </div>
            <h6 className="editBusinessForm-section-heading">MATRIX</h6>
          </div>
        </div>
        <div
          className="row userProfileReportsFound-background-container mt-3 mb-3"
          style={{ height: "100%" }}
        >
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            {/* <div className"> */}
            <div className="userProfileReportsFound-message">
              {/* <div className="row"> */}
              {/* <div className="col-xl-8 col-lg-7 col-md-7 col-sm-12 col-12 open-container"> */}
              <div className="card-body">
                <div className="d-flex gap-3 businessUserView-image-container">
                  <img
                    src={user}
                    alt="reportSign"
                    className=""
                    style={{ width: "60px", height: "60px" }}
                  />

                  <div
                    className="businessUserView-name-report-container"
                    style={{ width: "100%" }}
                  >
                    <div>
                      <div className="userProfileReportsFound-report-container-message">
                        <div className="d-flex align-items-start gap-2">
                          <p className="userProfileReportsFound-viewProfile-container">
                            Martin Lawnin
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

                      <div className="d-flex gap-3">
                        <Button
                          className="btn btn-back"
                          onClick={() => {
                            dispatch(modalUserprofileAddProductToggle());
                            dispatch(setUserprofileAddProductModalTrue());
                          }}
                        >
                          <svg
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.83333 12.6667H4.78333L11.3 6.15L10.35 5.2L3.83333 11.7167V12.6667ZM2.5 14V11.1667L11.3 2.38333C11.4333 2.26111 11.5806 2.16667 11.7417 2.1C11.9028 2.03333 12.0722 2 12.25 2C12.4278 2 12.6 2.03333 12.7667 2.1C12.9333 2.16667 13.0778 2.26667 13.2 2.4L14.1167 3.33333C14.25 3.45556 14.3472 3.6 14.4083 3.76667C14.4694 3.93333 14.5 4.1 14.5 4.26667C14.5 4.44444 14.4694 4.61389 14.4083 4.775C14.3472 4.93611 14.25 5.08333 14.1167 5.21667L5.33333 14H2.5ZM10.8167 5.68333L10.35 5.2L11.3 6.15L10.8167 5.68333Z"
                              fill="#1006AC"
                            />
                          </svg>
                          Edit
                        </Button>
                        <Button
                          className="btn btn-back"
                          onClick={() => {
                            // console.log("delte");
                            dispatch(modalDeleteToggle());
                            dispatch(setDeleteModalTrue());
                          }}
                        >
                          <svg
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.16797 14C4.8013 14 4.48741 13.8694 4.2263 13.6083C3.96519 13.3472 3.83464 13.0333 3.83464 12.6667V4H3.16797V2.66667H6.5013V2H10.5013V2.66667H13.8346V4H13.168V12.6667C13.168 13.0333 13.0374 13.3472 12.7763 13.6083C12.5152 13.8694 12.2013 14 11.8346 14H5.16797ZM11.8346 4H5.16797V12.6667H11.8346V4ZM6.5013 11.3333H7.83464V5.33333H6.5013V11.3333ZM9.16797 11.3333H10.5013V5.33333H9.16797V11.3333Z"
                              fill="#1006AC"
                            />
                          </svg>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}
              {/* </div> */}
            </div>
            <div className="userProfileReportsFound-message">
              {/* <div className="row"> */}
              {/* <div className="col-xl-8 col-lg-7 col-md-7 col-sm-12 col-12 open-container"> */}
              <div className="card-body">
                <div className="d-flex gap-3 businessUserView-image-container">
                  <img
                    src={erra}
                    alt="reportSign"
                    className=""
                    style={{ width: "60px", height: "60px" }}
                  />

                  <div
                    className="businessUserView-name-report-container"
                    style={{ width: "100%" }}
                  >
                    <div>
                      <div className="userProfileReportsFound-report-container-message">
                        <div className="d-flex align-items-start gap-2">
                          <p className="userProfileReportsFound-viewProfile-container">
                            Errandia Support
                          </p>
                        </div>

                        <div className="userProfileReportsFound-time">
                          2 days ago
                        </div>
                      </div>

                      <p className="userProfileReportsFound-viewProfile-para">
                        Hello Martin, we received your report about MATRIX not
                        delivering your Dell charger. We’re here to assist. Can
                        you provide more details about your order?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}
              {/* </div> */}
            </div>
            <div className="userProfileReportsFound-message">
              {/* <div className="row"> */}
              {/* <div className="col-xl-8 col-lg-7 col-md-7 col-sm-12 col-12 open-container"> */}
              <div className="card-body">
                <div className="d-flex gap-3 businessUserView-image-container">
                  <img
                    src={user}
                    alt="reportSign"
                    className=""
                    style={{ width: "60px", height: "60px" }}
                  />

                  <div
                    className="businessUserView-name-report-container"
                    style={{ width: "100%" }}
                  >
                    <div>
                      <div className="userProfileReportsFound-report-container-message">
                        <div className="d-flex align-items-start gap-2">
                          <p className="userProfileReportsFound-viewProfile-container">
                            Martin Lawnin
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

                      <div className="d-flex gap-3">
                        <Button
                          className="btn btn-back"
                          onClick={() => {
                            dispatch(modalUserprofileAddProductToggle());
                            dispatch(setUserprofileAddProductModalTrue());
                          }}
                        >
                          <svg
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.83333 12.6667H4.78333L11.3 6.15L10.35 5.2L3.83333 11.7167V12.6667ZM2.5 14V11.1667L11.3 2.38333C11.4333 2.26111 11.5806 2.16667 11.7417 2.1C11.9028 2.03333 12.0722 2 12.25 2C12.4278 2 12.6 2.03333 12.7667 2.1C12.9333 2.16667 13.0778 2.26667 13.2 2.4L14.1167 3.33333C14.25 3.45556 14.3472 3.6 14.4083 3.76667C14.4694 3.93333 14.5 4.1 14.5 4.26667C14.5 4.44444 14.4694 4.61389 14.4083 4.775C14.3472 4.93611 14.25 5.08333 14.1167 5.21667L5.33333 14H2.5ZM10.8167 5.68333L10.35 5.2L11.3 6.15L10.8167 5.68333Z"
                              fill="#1006AC"
                            />
                          </svg>
                          Edit
                        </Button>
                        <Button
                          className="btn btn-back"
                          onClick={() => {
                            // console.log("delte");
                            dispatch(modalDeleteToggle());
                            dispatch(setDeleteModalTrue());
                          }}
                        >
                          <svg
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.16797 14C4.8013 14 4.48741 13.8694 4.2263 13.6083C3.96519 13.3472 3.83464 13.0333 3.83464 12.6667V4H3.16797V2.66667H6.5013V2H10.5013V2.66667H13.8346V4H13.168V12.6667C13.168 13.0333 13.0374 13.3472 12.7763 13.6083C12.5152 13.8694 12.2013 14 11.8346 14H5.16797ZM11.8346 4H5.16797V12.6667H11.8346V4ZM6.5013 11.3333H7.83464V5.33333H6.5013V11.3333ZM9.16797 11.3333H10.5013V5.33333H9.16797V11.3333Z"
                              fill="#1006AC"
                            />
                          </svg>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}
              {/* </div> */}
            </div>
            <div className="row mt-4 mb-4 align-items-end">
              <div className="col-md-9">
                <textarea
                  id="summernote"
                  className="form-control report-summernote"
                  placeholder="Reply here....."
                ></textarea>
              </div>
              <div className="col-md-3">
                <Button
                  variant="primary"
                  className="listYourBusinessHomeForm-signIn-blue w-100"
                >
                  Reply
                </Button>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
      <DeleteReportMessage />
      <EditReport />
    </>
  );
};

export default ViewReportThread;
