import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import {
  modalBranchAddedToggle,
  setBranchAddedModalFalse,
} from "../../utils/branchAddedModalSlice";
import branchAdded from "../../assets/branchAdded.svg";
import {
  modalVerifyBusinessConfirmedToggle,
  setVerifyBusinessConfirmedModalFalse,
} from "../../utils/verifyBusinessConfirmedModalSlice";

const VerifyBusinessLocationConfirmed = () => {
  const verifyConfirmedModalBoolean = useSelector(
    (store) => store?.verifyConfirmed?.value
  );
  // console.log("verifyConfirmedModalBoolean", verifyConfirmedModalBoolean);
  const dispatch = useDispatch();
  return (
    <>
      <Modal
        size="lg"
        show={verifyConfirmedModalBoolean}
        aria-labelledby="example-modal-sizes-title-lg"
        className="featuredBusinessProfileShare-modal-Container"
      >
        <Modal.Body>
          <div className="reportBusiness-social-Handles-container">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="reportSubmitted-container">
                <div className="reportBusiness-image-container">
                  <img
                    src={branchAdded}
                    alt="branchAdded"
                    className="img-fluid"
                  />
                </div>

                <h4 className="reportSubmitted-heading">Thank You! </h4>
                <p className="verifyBusinessLocationConfirmed-subText">
                  We'll review your business location and get back at you
                  shortly. Please check your email within 3 business days.
                </p>
                <div className="verifyBusiness-note-container">
                  <p style={{ color: "#3a3333", fontWeight: "700" }}>
                    Note:
                    <span className="verifyBusiness-note">
                      Errandia values every business and ensures the safety of
                      its users.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="reportSubmitted-button-container">
              <Button
                variant="primary"
                className="reportBusiness-call-button"
                onClick={() => {
                  dispatch(modalVerifyBusinessConfirmedToggle());
                  dispatch(setVerifyBusinessConfirmedModalFalse());
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

export default VerifyBusinessLocationConfirmed;
