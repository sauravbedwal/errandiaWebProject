import React from "react";
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
import deleteBusinessModal from "../../assets/deleteBusinessModal.svg";
import productSuggestionReviews from "../../assets/productSuggestionReviews.svg";
import businessNearYouLocationIcon from "../../assets/businessNearYouLocationIcon.svg";
import deleteBusinessName from "../../assets/deleteBusinessName.svg";
import {
  modalDeleteToggle,
  setDeleteModalFalse,
} from "../../utils/deleteModalSlice";

const DeleteReportModal = () => {
  const deleteModalBoolean = useSelector((store) => store?.deleteModal?.value);
  // console.log("deleteModalBoolean", deleteModalBoolean);

  const dispatch = useDispatch();
  return (
    <>
      <Modal
        size="lg"
        show={deleteModalBoolean}
        aria-labelledby="example-modal-sizes-title-lg"
        className="featuredBusinessProfileShare-modal-Container"
      >
        <Modal.Body>
          <div className="addBusinessModal-social-Handles-container">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="reportSubmitted-container">
                <div className="deleteBusinessModal-imageContainer">
                  <img
                    src={deleteBusinessModal}
                    alt="deleteBusinessModal"
                    className="img-fluid"
                  />
                </div>

                <h4 className="deleteReportModal-heading">
                  Are You Sure You Want to Delete This Report?{" "}
                </h4>
                <p className="deleteReportModal-finalWarning mt-4">
                  The report you made against{" "}
                  <span style={{ color: "#1205D2", fontWeight: 700 }}>
                    StyleCraft Couture?
                  </span>{" "}
                  This report will be permanently deleted and won't be resolved.{" "}
                </p>

                <div className="deleteBusinessModal-review-container mb-5">
                  <div className="deleteBusinessModal-image-text">
                    <img src={deleteBusinessName} alt="deleteBusinessName" />
                    <div>
                      <div className="deleteBusinessModal-review-heading">
                        StyleCraft Couture
                      </div>
                      <div className="deleteBusinessModal-addressImage-container">
                        <img
                          src={businessNearYouLocationIcon}
                          alt="businessNearYouLocationIcon"
                          className="img-fluid"
                        />
                        <div>
                          <p className="deleteBusinessModal-address-heading">
                            Buea, South-west
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="deleteBusinessModal-button-container">
              <Button
                variant="primary"
                className="deleteBusinessModal-call-button"
                onClick={() => {
                  dispatch(modalDeleteToggle());
                  dispatch(setDeleteModalFalse());
                }}
              >
                Yes, Delete
              </Button>

              <button
                type="button"
                class="btn btn-primary btn-lg businessUserView-location-whiteButton"
                onClick={() => {
                  dispatch(modalDeleteToggle());
                  dispatch(setDeleteModalFalse());
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteReportModal;
