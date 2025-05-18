import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import {
  modalBranchAddedToggle,
  setBranchAddedModalFalse,
} from "../../utils/branchAddedModalSlice";
import branchAdded from "../../assets/branchAdded.svg";

const BranchAddedPopUp = () => {
  const branchAddedModalBoolean = useSelector(
    (store) => store?.branchAdded?.value
  );

  const dispatch = useDispatch();
  return (
    <>
      <Modal
        size="lg"
        show={branchAddedModalBoolean}
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

                <h4 className="reportSubmitted-heading">
                  Branch Added Successfully
                </h4>
                <p className="reportSubmitted-subText">
                  We'll add this location as your business branch.
                </p>
              </div>
            </div>

            <div className="reportSubmitted-button-container">
              <Button
                variant="primary"
                className="reportBusiness-call-button"
                onClick={() => {
                  dispatch(modalBranchAddedToggle());
                  dispatch(setBranchAddedModalFalse());
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

export default BranchAddedPopUp;
