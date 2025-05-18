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
import {
  createFallbackImage,
  getInitials,
  notifyError,
  notifySuccess,
  token,
} from "../../utils/utils";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { deleteApi, getApi } from "../../fetchApi/FetchAxiosApi";
import { addBusiness } from "../../utils/businessDataSlice";
import { setIsPending } from "../../utils/searchProductSlice";
import Loader from "../loader/Loader";

const DeleteBusinessModal = ({ singleBusiness }) => {
  const deleteModalBoolean = useSelector((store) => store?.deleteModal?.value);
  // console.log("deleteModalBoolean", deleteModalBoolean);

  console.log("deleteBusiness", singleBusiness);
  const dispatch = useDispatch();

  const initials = getInitials(singleBusiness?.name);
  const fallbackImage = createFallbackImage(initials);

  const deleteUserBusiness = async (slug) => {
    try {
      dispatch(setIsPending(true));
      const res = await deleteApi(
        apis.deleteUserBusiness + `/${slug}`,
        token()
      );

      dispatch(setIsPending(false));

      if (res.status === 200) {
        notifySuccess(res.data.message);
        const resBusiness = await getApi(apis.business, token());

        dispatch(addBusiness(resBusiness?.data?.data?.items));
      }
    } catch (err) {
      dispatch(setIsPending(false));
      console.log(err);
      notifyError("Oops! The request was not found.");
    }
  };

  const isPendingFromStore = useSelector(
    (store) => store?.searchProduct?.isPending
  );
  return (
    <>
      {isPendingFromStore ? (
        <Loader />
      ) : (
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

                  <h4 className="deleteBusinessModal-heading">
                    Are You Sure You Want to Delete?
                  </h4>
                  <p className="deleteBusinessModal-subText">
                    This action cannot be undone.
                  </p>

                  <p className="deleteBusinessModal-warning">
                    You are about to delete the following business:
                  </p>

                  <div className="deleteBusinessModal-review-container">
                    <div className="deleteBusinessModal-image-text">
                      <img
                        style={{
                          width: "64px",
                          height: "64px",
                          borderRadius: "10px",
                        }}
                        src={
                          singleBusiness?.image
                            ? `${IMAGE_BASE_URL}${singleBusiness?.image}`
                            : fallbackImage
                        }
                        onError={(e) => {
                          e.target.src = fallbackImage;
                          // dispatch(addFallBackImage(fallbackImage));
                        }}
                        alt="deleteBusinessName"
                      />
                      <div>
                        <div className="deleteBusinessModal-review-heading">
                          {singleBusiness?.name}
                        </div>
                        {(singleBusiness?.region?.name ||
                          singleBusiness?.town?.name) && (
                          <div className="deleteBusinessModal-addressImage-container">
                            <img
                              src={businessNearYouLocationIcon}
                              alt="businessNearYouLocationIcon"
                              className="img-fluid"
                            />
                            <div>
                              <p className="deleteBusinessModal-address-heading">
                                {singleBusiness?.town?.name &&
                                  `${singleBusiness?.town?.name}, `}
                                {singleBusiness?.region?.name &&
                                  singleBusiness?.region?.name}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="deleteBusiness-finalWarning">
                    Once deleted, all associated data, including listings,
                    reviews, and transaction history, will be permanently
                    removed from Errandia. Customers will no longer see these
                    listings in the marketplace.
                  </p>
                </div>
              </div>

              <div className="deleteBusinessModal-button-container">
                <Button
                  variant="primary"
                  className="deleteBusinessModal-call-button"
                  onClick={() => {
                    dispatch(modalDeleteToggle());
                    dispatch(setDeleteModalFalse());
                    deleteUserBusiness(singleBusiness?.slug);
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
      )}
    </>
  );
};

export default DeleteBusinessModal;
