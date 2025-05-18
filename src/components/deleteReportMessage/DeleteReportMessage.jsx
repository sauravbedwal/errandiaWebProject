import React, { useState } from "react";
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
import { deleteApi, getApi } from "../../fetchApi/FetchAxiosApi";
import apis from "../../Constant";
import { notifyError, notifySuccess, token } from "../../utils/utils";
// import { ToastContainer, toast } from "react-toastify";
import { deleteDone } from "../../utils/deleteSlice";
import { addProducts, addServices } from "../../utils/productsDataSlice";

const DeleteReportMessage = ({ deleteSlug, deletePostedErrands, service }) => {
  console.log("DeleteReportMessage", service);
  const deleteModalBoolean = useSelector((store) => store?.deleteModal?.value);
  // console.log("deleteModalBoolean", deleteModalBoolean);
  // console.log("DeleteReportMessage", deleteSlug);

  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const deleteUserProduct = async (slug, service) => {
    try {
      setLoader(true);
      const res = await deleteApi(apis.deleteUserProduct + `/${slug}`, token());
      // console.log("deleteUserProduct", res);
      if (res.status === 200) {
        setLoader(false);
        // notify(res?.data?.message);
        notifySuccess("Deleted Successfully");
        dispatch(deleteDone(true));
      }
      if (service === "0") {
        const resProduct = await getApi(apis.products, token());
        dispatch(addProducts(resProduct?.data?.data?.items));
      } else {
        const resServices = await getApi(apis.services, token());
        dispatch(addServices(resServices?.data?.data?.items));
      }
    } catch (err) {
      setLoader(false);
      console.log("API Error:", err);
      if (err.response && err.response.status === 404) {
        console.log("Resource not found!");
        // notify("Oops! The request was not found.");
        notifyError("Oops! The request was not found.");
      }
    }
  };

  const deleteUserPostedErrands = async (id) => {
    try {
      setLoader(true);
      const res = await deleteApi(
        apis.deleteUserPostedErrands + `/${id}`,
        token()
      );
      // console.log("deleteUserPostedErrands", res);
      if (res.status === 200) {
        setLoader(false);
        // notify(res?.data?.message);
        notifySuccess(res?.data?.message);
        dispatch(deleteDone(true));
      }
    } catch (err) {
      setLoader(false);
      console.log("API Error:", err);
      if (err.response && err.response.status === 404) {
        console.log("Resource not found!");
        // notify("Oops! The request was not found.");
        notifyError("Oops! The request was not found.");
      }
    }
  };

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

                <h4 className="deleteReportMessage-heading mb-5">
                  Are You Sure You Want to Delete?{" "}
                </h4>
              </div>
            </div>

            <div className="deleteBusinessModal-button-container">
              <Button
                variant="primary"
                className="deleteBusinessModal-call-button"
                onClick={() => {
                  dispatch(modalDeleteToggle());
                  dispatch(setDeleteModalFalse());
                  dispatch(deleteDone(false));

                  if (deleteSlug) {
                    deleteUserProduct(deleteSlug, service);
                  }
                  if (deletePostedErrands) {
                    deleteUserPostedErrands(deletePostedErrands);
                  }
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
      {/* <ToastContainer /> */}
    </>
  );
};

export default DeleteReportMessage;
