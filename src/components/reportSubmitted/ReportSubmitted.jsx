import React from "react";
import Form from "react-bootstrap/Form";

import Modal from "react-bootstrap/Modal";
import whatsapp from "../../assets/images/whatsapp.png";
import Linkedin from "../../assets/Linkedin.svg";
import Facebook from "../../assets/Facebook.svg";
import x from "../../assets/x.svg";
import email from "../../assets/email.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  modalShareToggle,
  setShareModalFalse,
} from "../../utils/businessShareSlice";
import Button from "react-bootstrap/Button";
import "summernote/dist/summernote-lite.css";
import $ from "jquery";
import "summernote/dist/summernote-lite.js";
import {
  modalReportToggle,
  setReportModalFalse,
} from "../../utils/reportModalSlice";
import {
  modalReportSubmittedToggle,
  setReportSubmittedModalFalse,
} from "../../utils/reportSubmittedSlice";
import reportSubmittedTick from "../../assets/reportSubmittedTick.svg";

const ReportSubmitted = () => {
  const reportSubmitModalBoolean = useSelector(
    (store) => store?.reportSubmittedModal?.value
  );

  const dispatch = useDispatch();

  return (
    <>
      <Modal
        size="lg"
        show={reportSubmitModalBoolean}
        aria-labelledby="example-modal-sizes-title-lg"
        className="featuredBusinessProfileShare-modal-Container"
      >
        <Modal.Body>
          <div className="reportBusiness-social-Handles-container">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="reportSubmitted-container">
                <div className="reportBusiness-image-container">
                  <img
                    src={reportSubmittedTick}
                    alt="reportSubmittedTick"
                    className="img-fluid"
                  />
                </div>

                <h4 className="reportSubmitted-heading">Report Submitted</h4>
                <p className="reportSubmitted-subText">
                  Thank You for your complaint. We'll make our findings and act
                  on it ASAP.{" "}
                </p>
              </div>
            </div>

            <div className="reportSubmitted-button-container">
              <Button
                variant="primary"
                className="reportBusiness-call-button"
                onClick={() => {
                  dispatch(modalReportSubmittedToggle());
                  dispatch(setReportSubmittedModalFalse());
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReportSubmitted;
