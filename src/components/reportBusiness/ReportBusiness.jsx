import React, { useEffect } from "react";
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
  setReportSubmittedModalTrue,
} from "../../utils/reportSubmittedSlice";
import ReportSubmitted from "../reportSubmitted/ReportSubmitted";

const ReportBusiness = () => {
  const reportModalBoolean = useSelector((store) => store?.reportModal?.value);

  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize Summernote with a minimalist toolbar
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
      <Modal
        size="lg"
        show={reportModalBoolean}
        aria-labelledby="example-modal-sizes-title-lg"
        className="featuredBusinessProfileShare-modal-Container"
      >
        <Modal.Header
          closeButton
          className="reportBusiness-modal-header"
          onClick={() => {
            dispatch(modalReportToggle());
            dispatch(setReportModalFalse());
          }}
        >
          <Modal.Title
            id="example-modal-sizes-title-lg"
            className="featureBusinessProfileShare-heading"
          >
            Report A Business
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="reportBusiness-social-Handles-container">
            <div className="listYourBusinessHomeForm-two-Inputs">
              <Form.Group
                className="mb-3 listYourBusinessHomeForm-input-tag-container"
                controlId="formBasicEmail"
              >
                <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                  Business Name
                </Form.Label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  style={{ color: "#526277", border: "1px solid #ECEFF2" }}
                >
                  <option selected>select business category</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </Form.Group>

              <Form.Group
                className="mb-3 listYourBusinessHomeForm-input-tag-container"
                controlId="formBasicEmail"
              >
                <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                  Branch
                </Form.Label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  style={{ color: "#526277", border: "1px solid #ECEFF2" }}
                >
                  <option selected>select business category</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </Form.Group>
            </div>

            <div className="mb-3">
              <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                Briefly tell us your concern about this business
              </Form.Label>
              <textarea id="summernote"></textarea>
            </div>

            <Button
              variant="primary"
              className="reportBusiness-call-button"
              onClick={() => {
                dispatch(modalReportToggle());
                dispatch(setReportModalFalse());
                dispatch(modalReportSubmittedToggle());
                dispatch(setReportSubmittedModalTrue());
              }}
            >
              Submit
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <ReportSubmitted />
    </>
  );
};

export default ReportBusiness;
