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
import whatsappIcon from "../../assets/whatsappIcon.svg";
import addIcon from "../../assets/addIcon.svg";
import serviceCardImage from "../../assets/serviceCardImage.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { token } from "../../utils/utils";
import CallPopUp from "../callPopUp/CallPopUp";
import { modalCallToggle, setCallModalTrue } from "../../utils/callModalSlice";
import { useTranslation } from "react-i18next";
import "../../i18n";

const ServiceBusinessUserProfile = ({
  businessDetailsCollection,
  setWhatsAppCall,
}) => {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const [productFromBusiness, setProductFromBusiness] = useState(null);
  // console.log("productFromBusiness", productFromBusiness);

  const slugBusiness = businessDetailsCollection?.slug;
  // console.log("slugBusiness--ProductsBusinessUserProfile", slugBusiness);

  const fetchProductFromBusinesses = async (slug) => {
    if (!slug) return;
    try {
      const params = new URLSearchParams({
        service: "1",
      });

      const res = await getApi(
        apis.productsFromBusinesses + `/${slug}/items?${params.toString()}`
      );

      console.log(
        "fetchProductFromBusinesses-ProductsBusinessUserProfile",
        res
      );
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

  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        {productFromBusiness && productFromBusiness?.length != 0 && (
          <>
            <div className="row mt-5">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 productsFromTheBusiness-productServiceButtons">
                <h6 className="productsBusinessUserProfile-section-heading">
                  {t("Services")} ({productFromBusiness?.length})
                </h6>

                {pathname === "/user-profile" ? (
                  <button
                    type="button"
                    class="btn btn-primary btn-lg userProfileBusinessSingleProduct-location-whiteButton"
                  >
                    <img src={addIcon} alt="addIcon" className="img-fluid" />
                    Add Services{" "}
                  </button>
                ) : (
                  ""
                  // <div className="branchesBusinessUserProfile-viewAllBusiness">
                  //   View all
                  // </div>
                )}
              </div>
            </div>

            <div className="row   errandos-mobile-tab">
              {productFromBusiness &&
                productFromBusiness?.map((product) => {
                  return (
                    <>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                        <div className="card serviceBusinessUserProfile-container mt-4 mb-4">
                          <div
                            className="card-body"
                            style={{ cursor: "pointer" }}
                          >
                            <div className="serviceCard-image-text">
                              <div
                                className="serviceCard-ImageContainer"
                                onClick={() => {
                                  console.log("slugg wlk");
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
                                    width: "168px",
                                    height: "168px",
                                    borderRadius: "20px",
                                  }}
                                />
                              </div>

                              <div className="products-text-container">
                                <div>
                                  <h5
                                    className="card-title products-heading"
                                    onClick={() => {
                                      console.log("slugg wlk");
                                      navigate(
                                        `/search-single-product/${product?.slug}`
                                      );
                                    }}
                                  >
                                    {product?.name}
                                  </h5>
                                </div>

                                <div
                                  className="d-flex align-items-center ourErrandosTextIcon ourErrandosLocationAndText"
                                  onClick={() => {
                                    console.log("slugg wlk");
                                    navigate(
                                      `/search-single-product/${product?.slug}`
                                    );
                                  }}
                                >
                                  <img
                                    src={businessNearYouLocationIcon}
                                    alt="Location Icon"
                                  />
                                  <p className="products-Text">
                                    {product?.shop?.town &&
                                      product?.shop?.town?.name}
                                    {", "}{" "}
                                    {product?.shop?.region &&
                                      product?.shop?.region?.name}
                                  </p>
                                </div>

                                <div
                                  className="d-flex align-items-center ourErrandosTextIcon mt-1 ourErrandosLocationAndText"
                                  onClick={() => {
                                    console.log("slugg wlk");
                                    navigate(
                                      `/search-single-product/${product?.slug}`
                                    );
                                  }}
                                >
                                  <p className="servicesCard-Text">
                                    {product?.unit_price} CFA
                                  </p>
                                </div>

                                <div className="serviceCard-buttons">
                                  <Button
                                    variant="primary"
                                    className="service-call-button"
                                    style={{ width: "100%" }}
                                    onClick={() => {
                                      dispatch(modalCallToggle());
                                      dispatch(setCallModalTrue());
                                    }}
                                  >
                                    <img
                                      src={productsCall}
                                      alt="whatsappIcon"
                                    />
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
                                      <img
                                        src={whatsappIcon}
                                        alt="whatsappIcon"
                                      />
                                      {t("Chat on Whatsapp")}
                                    </Button>
                                  )}
                                </div>

                                {/* <div className="productsBusinessUserProfile-buttons-container">
                                    <Button
                                      variant="primary"
                                      className="products-call-button"
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
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </>
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

export default ServiceBusinessUserProfile;
