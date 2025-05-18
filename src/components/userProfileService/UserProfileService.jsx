import React from "react";
import noBusiness from "../../assets/noBusiness.svg";
import addNoBusiness from "../../assets/addNoBusiness.svg";
import "../../App.css";
import Button from "react-bootstrap/Button";
import { setTrue, toggle } from "../../utils/booleanSlice";
import { useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import PaginationComponent from "../pagination/PaginationComponent";
import searchProducts from "../../assets/searchProducts.svg";
import productImage from "../../assets/productImage.svg";
import productImage2 from "../../assets/productImage2.svg";
import deleteBusinessProfileUser from "../../assets/deleteBusinessProfileUser.svg";
import productsCall from "../../assets/productsCall.svg";
import businessNearYouLocationIcon from "../../assets/businessNearYouLocationIcon.svg";
import editBusinessUserProfile from "../../assets/editBusinessUserProfile.svg";
import { useState } from "react";
import { ButtonGroup, ToggleButton, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import matrixUserBusiness from "../../assets/matrixUserBusiness.svg";
import businessTick from "../../assets/businessTick.svg";
import boost from "../../assets/boost.svg";
import threeDotDropDown from "../../assets/threeDotDropDown.svg";
import addBusinessDropDown from "../../assets/addBusinessDropDown.svg";
import verifyBusiness from "../../assets/verifyBusiness.svg";
import editBusiness from "../../assets/editBusiness.svg";
import deleteBusiness from "../../assets/deleteBusiness.svg";
import {
  modalDeleteToggle,
  setDeleteModalTrue,
} from "../../utils/deleteModalSlice";
import DeleteBusinessModal from "../deleteBusinessModal/DeleteBusinessModal";
import AddBusinessModal from "../addBusinessFormModal/AddBusinessFormModal";
import {
  modalAddBusinessToggle,
  setAddBusinessModalTrue,
} from "../../utils/addBusinessModalSlice";

import {
  modalAddBusinessBranchToggle,
  setAddBusinessBranchModalTrue,
} from "../../utils/addBusinessBranchModalSlice";

import AddBusinessBranchModal from "../addBusinessBranch/AddBusinessBranchModal";
import AddBusinessFormModal from "../addBusinessFormModal/AddBusinessFormModal";
import VerifyBusinessLocation from "../verifyBusinessLocation/VerifyBusinessLocation";
import {
  modalVerifyBusinessToggle,
  setVerifyBusinessModalTrue,
} from "../../utils/verifyBusinessModalSlice";
import productDetailsImage from "../../assets/productDetailsImage.svg";
import AddProductNoBusinessFound from "../addProductNoBusinessFound/AddProductNoBusinessFound";
import {
  modalBranchAddedToggle,
  setBranchAddedModalTrue,
} from "../../utils/branchAddedModalSlice";
import {
  modalAddProductNoBusinessToggle,
  setAddProductNoBusinessModalTrue,
} from "../../utils/addProductNoBusinessModalSlice";
import serviceCardImage from "../../assets/serviceCardImage.svg";
import UserProfileAddService from "../userProfileAddService/UserProfileAddService";
import {
  modalUserProfileAddServiceToggle,
  setUserProfileAddServiceModalTrue,
} from "../../utils/userProfileAddServiceModalSlice";
import {
  modalUserProfileEditServiceToggle,
  setUserProfileEditServiceModalTrue,
} from "../../utils/userProfileEditServiceModalSlice";
import UserProfileEditService from "../userProfileEditService/UserProfileEditService";
import DeleteReportModal from "../deleteReportModal/DeleteReportModal";
import DeleteReportMessage from "../deleteReportMessage/DeleteReportMessage";

const UserProfileService = () => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  // console.log(pathname);

  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 productsFromTheBusiness-productServiceButtons">
            <h6 className="productsFromTheBusiness-section-heading">
              3 Services
            </h6>

            <button
              type="button"
              class="btn btn-primary btn-lg businessUserView-location-whiteButton"
              onClick={() => {
                dispatch(modalUserProfileAddServiceToggle());
                dispatch(setUserProfileAddServiceModalTrue());
              }}
            >
              <img
                src={addNoBusiness}
                alt="addNoBusiness"
                className="img-fluid"
              />
              Add Services
            </button>
          </div>
        </div>

        <div className="row   errandos-mobile-tab">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
            <div className="card serviceBusinessUserProfile-container mt-4 mb-4">
              <div className="card-body">
                <div className="serviceCard-image-text">
                  <div className="serviceCard-ImageContainer">
                    <img
                      className="img-fluid seriveCard-image"
                      src={serviceCardImage}
                      alt="searchProducts"
                    />
                  </div>

                  <div className="products-text-container">
                    <div>
                      <h5 className="card-title products-heading">
                        Custom Tailoring
                      </h5>
                    </div>

                    <div className="d-flex align-items-center ourErrandosTextIcon ourErrandosLocationAndText">
                      <img
                        src={businessNearYouLocationIcon}
                        alt="Location Icon"
                      />
                      <p className="products-Text">Buea, South-West</p>
                    </div>

                    <div className="d-flex align-items-center ourErrandosTextIcon mt-1 ourErrandosLocationAndText">
                      <p className="servicesCard-Text">30,000 CFA</p>
                    </div>
                    <div className="productsBusinessUserProfile-buttons-container">
                      <Button
                        variant="primary"
                        className="products-call-button"
                        onClick={() => {
                          dispatch(modalUserProfileEditServiceToggle());
                          dispatch(setUserProfileEditServiceModalTrue());
                        }}
                      >
                        <img src={editBusinessUserProfile} alt="whatsappIcon" />
                        Edit
                      </Button>
                      <Button
                        variant="primary"
                        className="productsBusinessUserProfile-delete"
                        onClick={() => {
                          dispatch(modalDeleteToggle());
                          dispatch(setDeleteModalTrue());
                        }}
                      >
                        <img
                          src={deleteBusinessProfileUser}
                          alt="whatsappIcon"
                        />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
            <div className="card serviceBusinessUserProfile-container mt-4 mb-4">
              <div className="card-body">
                <div className="serviceCard-image-text">
                  <div className="serviceCard-ImageContainer">
                    <img
                      className="img-fluid seriveCard-image"
                      src={serviceCardImage}
                      alt="searchProducts"
                    />
                  </div>

                  <div className="products-text-container">
                    <div>
                      <h5 className="card-title products-heading">
                        Custom Tailoring
                      </h5>
                    </div>

                    <div className="d-flex align-items-center ourErrandosTextIcon ourErrandosLocationAndText">
                      <img
                        src={businessNearYouLocationIcon}
                        alt="Location Icon"
                      />
                      <p className="products-Text">Buea, South-West</p>
                    </div>

                    <div className="d-flex align-items-center ourErrandosTextIcon mt-1 ourErrandosLocationAndText">
                      <p className="servicesCard-Text">30,000 CFA</p>
                    </div>
                    <div className="productsBusinessUserProfile-buttons-container">
                      <Button
                        variant="primary"
                        className="products-call-button"
                        onClick={() => {
                          dispatch(modalUserProfileEditServiceToggle());
                          dispatch(setUserProfileEditServiceModalTrue());
                        }}
                      >
                        <img src={editBusinessUserProfile} alt="whatsappIcon" />
                        Edit
                      </Button>
                      <Button
                        variant="primary"
                        className="productsBusinessUserProfile-delete"
                        onClick={() => {
                          dispatch(modalDeleteToggle());
                          dispatch(setDeleteModalTrue());
                        }}
                      >
                        <img
                          src={deleteBusinessProfileUser}
                          alt="whatsappIcon"
                        />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
            <div className="card serviceBusinessUserProfile-container mt-4 mb-4">
              <div className="card-body">
                <div className="serviceCard-image-text">
                  <div className="serviceCard-ImageContainer">
                    <img
                      className="img-fluid seriveCard-image"
                      src={serviceCardImage}
                      alt="searchProducts"
                    />
                  </div>

                  <div className="products-text-container">
                    <div>
                      <h5 className="card-title products-heading">
                        Custom Tailoring
                      </h5>
                    </div>

                    <div className="d-flex align-items-center ourErrandosTextIcon ourErrandosLocationAndText">
                      <img
                        src={businessNearYouLocationIcon}
                        alt="Location Icon"
                      />
                      <p className="products-Text">Buea, South-West</p>
                    </div>

                    <div className="d-flex align-items-center ourErrandosTextIcon mt-1 ourErrandosLocationAndText">
                      <p className="servicesCard-Text">30,000 CFA</p>
                    </div>
                    <div className="productsBusinessUserProfile-buttons-container">
                      <Button
                        variant="primary"
                        className="products-call-button"
                        onClick={() => {
                          dispatch(modalUserProfileEditServiceToggle());
                          dispatch(setUserProfileEditServiceModalTrue());
                        }}
                      >
                        <img src={editBusinessUserProfile} alt="whatsappIcon" />
                        Edit
                      </Button>
                      <Button
                        variant="primary"
                        className="productsBusinessUserProfile-delete"
                        onClick={() => {
                          dispatch(modalDeleteToggle());
                          dispatch(setDeleteModalTrue());
                        }}
                      >
                        <img
                          src={deleteBusinessProfileUser}
                          alt="whatsappIcon"
                        />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <AddProductNoBusinessFound /> */}
      <UserProfileAddService />
      <UserProfileEditService />
      <DeleteReportMessage />
    </>
  );
};

export default UserProfileService;
