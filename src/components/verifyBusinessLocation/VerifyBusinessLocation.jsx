import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import PhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";
import "summernote/dist/summernote-lite.css";
import $ from "jquery";
import "summernote/dist/summernote-lite.js";
import {
  modalAddBusinessBranchToggle,
  setAddBusinessBranchModalFalse,
} from "../../utils/addBusinessBranchModalSlice";
import locationBusinessUserProfile from "../../assets/locationBusinessUserProfile.svg";
import BusinessLocationIcon from "../../assets/BusinessLocationIcon.svg";
import {
  modalBranchAddedToggle,
  setBranchAddedModalTrue,
} from "../../utils/branchAddedModalSlice";
import {
  modalVerifyBusinessToggle,
  setVerifyBusinessModalFalse,
} from "../../utils/verifyBusinessModalSlice";
import VerifyBusinessLocationConfirmed from "../verifyBusinessLocationConfirmed/VerifyBusinessLocationConfirmed";
import {
  modalVerifyBusinessConfirmedToggle,
  setVerifyBusinessConfirmedModalFalse,
  setVerifyBusinessConfirmedModalTrue,
} from "../../utils/verifyBusinessConfirmedModalSlice";

const VerifyBusinessLocation = () => {
  const verifyBusinessModalBoolean = useSelector(
    (store) => store?.verifyBusiness?.value
  );

  //   console.log("verifyBusinessModalBoolean", verifyBusinessModalBoolean);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <>
      <Modal
        size="lg"
        show={verifyBusinessModalBoolean}
        aria-labelledby="example-modal-sizes-title-lg"
        className="featuredBusinessProfileShare-modal-Container"
      >
        <Modal.Header
          closeButton
          className="featureBusinessProfileShare-modal-header"
          onClick={() => {
            dispatch(modalVerifyBusinessToggle());
            dispatch(setVerifyBusinessModalFalse());
          }}
        >
          <Modal.Title
            id="example-modal-sizes-title-lg"
            className="featureBusinessProfileShare-heading"
          >
            Verify Business Location
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <Form className="addBusinessBranchModal-form">
                  <div>
                    <div>
                      <Form.Group
                        className="mb-3 listYourBusinessHomeForm-input-tag-container"
                        controlId="formBasicEmail"
                      >
                        <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                          Location
                          <span style={{ color: "#677A90" }}>(optional)</span>
                        </Form.Label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          style={{
                            color: "#526277",
                            border: "1px solid #ECEFF2",
                          }}
                        >
                          <img
                            src={locationBusinessUserProfile}
                            alt="locationBusinessUserProfile"
                            className="img-fluid"
                          />
                          <option selected>select location</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </Form.Group>
                      <div className="listYourBusinessHomeForm-location-button mt-2">
                        <Button
                          variant="primary"
                          className="listYourBusinessHomeForm-goBack"
                          style={{ border: "1px solid #1006AC" }}
                        >
                          <img
                            src={BusinessLocationIcon}
                            alt="BusinessLocationIcon"
                          />
                          Get My Address
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column align-items-start gap-3 mt-2 mb-2">
                    <Button
                      variant="primary"
                      className="listYourBusinessHomeForm-signIn-blue"
                      // style={{ width: "62%" }}
                      onClick={() => {
                        dispatch(modalVerifyBusinessToggle());
                        dispatch(setVerifyBusinessModalFalse());
                        dispatch(modalVerifyBusinessConfirmedToggle());
                        dispatch(setVerifyBusinessConfirmedModalTrue());
                      }}
                    >
                      Confirm
                    </Button>
                  </div>
                </Form>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <iframe
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: "10px" }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=Cameroon&output=embed"
                ></iframe>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <VerifyBusinessLocationConfirmed />
    </>
  );
};

export default VerifyBusinessLocation;
