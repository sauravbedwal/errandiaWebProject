import React, { useState } from "react";
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
import WriteReview from "../writeReview/WriteReview";
import {
  modalWriteReviewToggle,
  setWriteReviewModalTrue,
} from "../../utils/writeReviewModalSlice";
import { putApi } from "../../fetchApi/FetchAxiosApi";
import apis from "../../Constant";
import { notifyError, notifySuccess, token } from "../../utils/utils";
// import { ToastContainer } from "react-toastify";

const ErrandsItemFound = ({ errandsId }) => {
  console.log("ErrandsItemFound", errandsId);

  const errandsItemFoundModalBoolean = useSelector(
    (store) => store?.errandsItemFound?.value
  );
  const [loader, setLoader] = useState();

  // const notify = (msg) => toast(msg);
  // console.log("errandsItemFoundModalBoolean", errandsItemFoundModalBoolean);
  const dispatch = useDispatch();

  const markAsFound = async (id) => {
    try {
      setLoader(true);
      const res = await putApi(
        apis.markErrandsFound + `/${id}/marked_as_found`,
        {},
        token()
      );
      setLoader(false);
      console.log("markAsFound", res);
      if (res.status === 200) {
        // notify(res?.data?.message);
        notifySuccess(res?.data?.message);
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
        show={errandsItemFoundModalBoolean}
        aria-labelledby="example-modal-sizes-title-lg"
        className="featuredBusinessProfileShare-modal-Container"
      >
        <Modal.Body>
          <div className="addProductNoBusinessFound-social-Handles-container">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="reportSubmitted-container">
                <div className="reportBusiness-image-container">
                  <img
                    src={tickErrandsItemFound}
                    alt="tickErrandsItemFound"
                    className="img-fluid"
                  />
                </div>

                <h4 className="reportSubmitted-heading">
                  Happy to know you found it!
                </h4>
                <p className="addProductNoBusinessFound-subText">
                  Could you please share a few details about your found item?
                </p>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-center gap-3">
              <Button
                variant="primary"
                className="errandsItemFound-blueButton"
                onClick={() => {
                  dispatch(modalErrandsItemFoundToggle());
                  dispatch(setErrandsItemFoundModalFalse());
                  // dispatch(modalWriteReviewToggle());
                  // dispatch(setWriteReviewModalTrue());
                  markAsFound(errandsId);
                }}
              >
                Sure!{" "}
              </Button>
              <button
                type="button"
                class="btn btn-primary btn-lg editBusiness-location-whiteButton"
                onClick={() => {
                  dispatch(modalErrandsItemFoundToggle());
                  dispatch(setErrandsItemFoundModalFalse());
                }}
              >
                Not Now
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <WriteReview />
    </>
  );
};

export default ErrandsItemFound;
