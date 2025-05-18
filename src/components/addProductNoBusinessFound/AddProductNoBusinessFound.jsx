import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import noBusinessAddProductUserProfile from "../../assets/noBusinessAddProductUserProfile.svg";
import UserProfileAddProduct from "../userProfileAddProduct/UserProfileAddProduct";
import {
  modalAddProductNoBusinessToggle,
  setAddProductNoBusinessModalFalse,
} from "../../utils/addProductNoBusinessModalSlice";
import {
  modalUserprofileAddProductToggle,
  setUserprofileAddProductModalTrue,
} from "../../utils/userprofileAddProductModalSlice";

const AddProductNoBusinessFound = () => {
  const addProductNoBusinessModalBoolean = useSelector(
    (store) => store?.addProductNoBusiness?.value
  );

  // console.log(
  //   "addProductNoBusinessModalBoolean",
  //   addProductNoBusinessModalBoolean
  // );
  const dispatch = useDispatch();
  return (
    <>
      <Modal
        size="lg"
        show={addProductNoBusinessModalBoolean}
        aria-labelledby="example-modal-sizes-title-lg"
        className="featuredBusinessProfileShare-modal-Container"
      >
        <Modal.Body>
          <div className="addProductNoBusinessFound-social-Handles-container">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="reportSubmitted-container">
                <div className="reportBusiness-image-container">
                  <img
                    src={noBusinessAddProductUserProfile}
                    alt="noBusinessAddProductUserProfile"
                    className="img-fluid"
                  />
                </div>

                <h4 className="reportSubmitted-heading">No Business Found! </h4>
                <p className="addProductNoBusinessFound-subText">
                  You need to add at least on business before adding a product{" "}
                </p>
              </div>
            </div>

            <div className="reportSubmitted-button-container">
              <Button
                variant="primary"
                className="addProductNoBusinessFound-call-button"
                onClick={() => {
                  // dispatch(modalAddProductNoBusinessToggle());
                  // dispatch(setAddProductNoBusinessModalFalse());
                  // dispatch(modalUserprofileAddProductToggle());
                  // dispatch(setUserprofileAddProductModalTrue());
                }}
              >
                Add Business{" "}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* <UserProfileAddProduct /> */}
    </>
  );
};

export default AddProductNoBusinessFound;
