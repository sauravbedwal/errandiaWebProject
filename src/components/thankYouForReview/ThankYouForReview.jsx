import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import tickErrandsItemFound from "../../assets/tickErrandsItemFound.svg";
import UserProfileAddProduct from "../userProfileAddProduct/UserProfileAddProduct";
import {
  modalAddProductNoBusinessToggle,
  setAddProductNoBusinessModalFalse,
} from "../../utils/addProductNoBusinessModalSlice";
import {
  modalUserprofileAddProductToggle,
  setUserprofileAddProductModalTrue,
} from "../../utils/userprofileAddProductModalSlice";
import {
  modalErrandsItemFoundToggle,
  setErrandsItemFoundModalFalse,
} from "../../utils/errandsItemFoundModalSlice";
import {
  modalThankYouForReviewToggle,
  setThankYouForReviewModalFalse,
} from "../../utils/thankYouForReviewModalSlice";
import star_Collection from "../../assets/star_Collection.svg";
const ThankYouForReview = () => {
  const thankYouForReviewModalBoolean = useSelector(
    (store) => store?.thankYouForReview?.value
  );

  // console.log("thankYouForReviewModalBoolean", thankYouForReviewModalBoolean);
  const dispatch = useDispatch();
  return (
    <>
      <Modal
        size="lg"
        show={thankYouForReviewModalBoolean}
        aria-labelledby="example-modal-sizes-title-lg"
        className="featuredBusinessProfileShare-modal-Container"
      >
        <Modal.Body>
          <div className="addProductNoBusinessFound-social-Handles-container">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="reportSubmitted-container">
                <div className="thankYouForReview-image-container">
                  <img
                    src={star_Collection}
                    alt="star_Collection"
                    className="img-fluid"
                  />
                </div>

                <h4 className="reportSubmitted-heading">
                  Thank you for your Review!{" "}
                </h4>
                <p className="thankYouForReview-subText">
                  Errandia highly values your feedback. This will be used to
                  ensure user safety and credibility!
                </p>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-center gap-3">
              <Button
                variant="primary"
                className="errandsItemFound-blueButton"
                onClick={() => {
                  dispatch(modalThankYouForReviewToggle());
                  dispatch(setThankYouForReviewModalFalse());
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

export default ThankYouForReview;
