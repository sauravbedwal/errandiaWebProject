import React, { useEffect } from "react";
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
import goBackArrow from "../../assets/goBackArrow.svg";
import addIcon from "../../assets/addIcon.svg";
import { ToastContainer, toast } from "react-toastify";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { token } from "../../utils/utils";
import whatsappIcon from "../../assets/whatsappIcon.svg";
import { modalCallToggle, setCallModalTrue } from "../../utils/callModalSlice";
import CallPopUp from "../callPopUp/CallPopUp";
import { useTranslation } from "react-i18next";
import "../../i18n";

const ProductsBusinessUserProfile = ({
  setWhatsAppCall,
  businessDetailsCollection,
}) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  // console.log(pathname);

  const [productFromBusiness, setProductFromBusiness] = useState(null);
  // console.log("productFromBusiness", productFromBusiness);

  const slugBusiness = businessDetailsCollection?.slug;
  // console.log("slugBusiness--ProductsBusinessUserProfile", slugBusiness);

  const fetchProductFromBusinesses = async (slug) => {
    if (!slug) return;
    try {
      const params = new URLSearchParams({
        service: "0",
      });

      const res = await getApi(
        apis.productsFromBusinesses + `/${slug}/items?${params.toString()}`
      );

      // console.log(
      //   "fetchProductFromBusinesses-ProductsBusinessUserProfile",
      //   res
      // );
      setProductFromBusiness(res.data.data.items);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 404) {
        console.log("Resource not found!");
        // notify();
      }
    }
  };

  useEffect(() => {
    if (slugBusiness) {
      fetchProductFromBusinesses(slugBusiness);
    }
  }, [slugBusiness]);

  const isLogin = token();
  // console.log("ProductsBusinessUserProfile", isLogin);
  return (
    <>
      <div className="container">
        <div className="row mt-5">
          {pathname === "/business-profile-user-view-products" ? (
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 productsFromTheBusiness-productServiceButtons">
              <div className="productsBusinessUserProfile-goBack-container">
                <img
                  style={{ cursor: "pointer" }}
                  className="img-fluid"
                  src={goBackArrow}
                  alt="goBackArrow"
                  onClick={() => {
                    navigate("/businessProfileUserView");
                  }}
                />
                <p className="productsBusinessUserProfile-goBack">Go back</p>
              </div>
              <h6 className="productsBusinessUserProfile-section-heading">
                {t("Products")} (9)
              </h6>
            </div>
          ) : pathname === "/user-profile" ? (
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 productsFromTheBusiness-productServiceButtons">
              <h6 className="productsFromTheBusiness-section-heading">
                {t("Products")} (9)
              </h6>

              <button
                type="button"
                class="btn btn-primary btn-lg userProfileBusinessSingleProduct-location-whiteButton"
              >
                <img src={addIcon} alt="addIcon" className="img-fluid" />
                Add Products
              </button>
            </div>
          ) : (
            productFromBusiness &&
            productFromBusiness.length != 0 && (
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 productsFromTheBusiness-productServiceButtons">
                <h6 className="productsFromTheBusiness-section-heading">
                  {t("Products")} ({productFromBusiness?.length})
                </h6>

                {/* <div
                className="branchesBusinessUserProfile-viewAllBusiness"
                onClick={() => {
                  navigate("/business-profile-user-view-products");
                }}
              >
                View all
              </div> */}
              </div>
            )
          )}
        </div>

        {productFromBusiness && productFromBusiness.length != 0 && (
          <div className="row   errandos-mobile-tab">
            {productFromBusiness &&
              productFromBusiness?.map((product) => {
                return (
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                    <div className="card productsCard-container mt-4 mb-4">
                      <div className="card-body">
                        <div>
                          <div
                            className="ourErrandosImageContainer"
                            onClick={() => {
                              navigate(
                                `/search-single-product/${product?.slug}`
                              );
                            }}
                          >
                            <img
                              className="ourErrandosImage"
                              src={`${IMAGE_BASE_URL}${product?.featured_image}`}
                              alt="searchProducts"
                              style={{
                                width: "216px",
                                height: "180px",
                                borderRadius: "20px",
                              }}
                            />
                          </div>
                        </div>
                        <div
                          className="products-text-container"
                          onClick={() => {
                            navigate(`/search-single-product/${product?.slug}`);
                          }}
                        >
                          <div className="d-flex align-items-center ourErrandosTextIcon ourErrandosLocationAndText">
                            <img
                              src={businessNearYouLocationIcon}
                              alt="Location Icon"
                            />
                            <p className="products-Text">
                              {product?.shop?.town && product?.shop?.town?.name}{" "}
                              {", "}{" "}
                              {product?.shop?.region &&
                                product?.shop?.region?.name}
                            </p>
                          </div>

                          <div>
                            <h5 className="card-title products-heading">
                              {product?.name}
                            </h5>
                          </div>

                          <div className="d-flex align-items-center ourErrandosTextIcon mt-1 ourErrandosLocationAndText">
                            <p className="products-Text2">
                              {product?.unit_price} FCFA
                            </p>
                          </div>
                        </div>
                        <>
                          <Button
                            variant="primary"
                            className="products-call-button"
                            style={{ width: "100%" }}
                            onClick={() => {
                              dispatch(modalCallToggle());
                              dispatch(setCallModalTrue());
                            }}
                          >
                            <img src={productsCall} alt="whatsappIcon" />
                            {t("Call")}
                          </Button>
                          {product?.shop?.whatsapp && (
                            <Button
                              variant="primary"
                              className="products-whatsAppButton-green"
                              style={{ width: "100%" }}
                              onClick={() => {
                                dispatch(modalCallToggle());
                                dispatch(setCallModalTrue());
                                setWhatsAppCall(true);
                              }}
                            >
                              <img src={whatsappIcon} alt="whatsappIcon" />
                              {t("Chat on Whatsapp")}
                            </Button>
                          )}
                        </>
                        {/* <div className="productsBusinessUserProfile-buttons-container">
                            <Button
                              variant="primary"
                              className="products-call-button"
                              style={{ width: "100%" }}
                            >
                              <img
                                src={editBusinessUserProfile}
                                alt="whatsappIcon"
                              />
                              Edit
                            </Button>
                            <Button
                              variant="primary"
                              className="productsBusinessUserProfile-delete"
                            >
                              <img
                                src={deleteBusinessProfileUser}
                                alt="whatsappIcon"
                              />
                              Delete
                            </Button>
                          </div> */}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      {/* <ToastContainer /> */}
      {/* <CallPopUp
        setWhatsAppCall={() => {
          return;
        }}
      /> */}
    </>
  );
};

export default ProductsBusinessUserProfile;
