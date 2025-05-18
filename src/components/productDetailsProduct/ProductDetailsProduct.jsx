import React, { useEffect } from "react";
import "../../App.css";
import Button from "react-bootstrap/Button";
import { setTrue, toggle } from "../../utils/booleanSlice";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import whatsappIcon from "../../assets/whatsappIcon.svg";
import productsCall from "../../assets/productsCall.svg";
import businessNearYouLocationIcon from "../../assets/businessNearYouLocationIcon.svg";
import { useState } from "react";
import { ButtonGroup, ToggleButton, Container } from "react-bootstrap";
import productDetailsImage from "../../assets/productDetailsImage.svg";
import productDetailsImage2 from "../../assets/productDetailsImage2.svg";
import productDetailsImage3 from "../../assets/productDetailsImage3.svg";
import { useNavigate } from "react-router-dom";
import { modalCallToggle, setCallModalTrue } from "../../utils/callModalSlice";
import CallPopUp from "../callPopUp/CallPopUp";
// const image_base_url = process.env.VITE_IMAGE_URL;
//
import parse from "html-react-parser";
import { IMAGE_BASE_URL } from "../../Constant";

import { getApi } from "../../fetchApi/FetchAxiosApi";
import apis from "../../Constant";
import { ToastContainer, toast } from "react-toastify";
import { addProducts } from "../../utils/productsDataSlice";
import {
  addDistance,
  service,
  region,
  town,
  selectedRegion,
  selectedTown,
} from "../../utils/searchProductSlice";
import { token } from "../../utils/utils";
import PaginationComponent from "../pagination/PaginationComponent";
import searchProducts from "../../assets/searchProducts.svg";
import serviceCardImage from "../../assets/serviceCardImage.svg";
import noPharmaciesFound from "../../assets/noPharmaciesFound.svg";
import pharamciesNotFoundRunErrand from "../../assets/pharamciesNotFoundRunErrand.svg";
import { useTranslation } from "react-i18next";
import { addActivePage } from "../../utils/paginationSlice";
import Loader from "../loader/Loader";
import { modalToggle, setModalTrue } from "../../utils/modalSlice";

const ProductDetailsProduct = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("products");
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);

  const [distance, setDistance] = useState(null);
  // console.log("distance", distance);

  useEffect(() => {
    dispatch(addDistance(distance));
  }, [distance]);

  const productItems = useSelector((store) => store?.searchProduct?.data);
  // console.log("productItems from store", productItems);

  const [whatsAppCall, setWhatsAppCall] = useState(false);

  // const [items, setItems] = useState(null);

  // const notify = () => toast("Oops! The request was not found.");

  // useEffect(() => {
  //   if (productItems && productItems.length > 0) {
  //     setItems(productItems);
  //   }
  // }, [productItems?.length]);

  // useEffect(() => {
  //   const productServicesHandler = async () => {
  //     try {
  //       setLoader(true);
  //       const res = await getApi(apis.products, token());
  //       console.log("products", res);
  //       // console.log("productsITems", res.data.data.items);
  //       setLoader(false);
  //       dispatch(addProducts(res?.data?.data?.items));
  //     } catch (err) {
  //       setLoader(false);
  //       console.log(err);
  //       if (err.response && err.response.status === 404) {
  //         console.log("Resource not found!");
  //         notify();
  //       }
  //     }
  //   };

  //   productServicesHandler();
  // }, []);

  useEffect(() => {
    // Set a flag before reload
    const handleBeforeUnload = () => {
      localStorage.setItem("isRefreshed", "true");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Check flag after refresh
    if (localStorage.getItem("isRefreshed") === "true") {
      localStorage.removeItem("isRefreshed"); // Clear flag
      navigate("/"); // Redirect to home
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate]);

  const [productCall, setProductCall] = useState(null);

  const serviceFromStore = useSelector(
    (store) => store?.searchProduct?.service
  );
  // console.log("serviceFromStore", serviceFromStore);

  const { t } = useTranslation();

  const isPendingFromStore = useSelector(
    (store) => store?.searchProduct?.isPending
  );

  const tokenAvailable = token();
  return (
    <>
      {isPendingFromStore ? (
        <Loader />
      ) : productItems && productItems.length > 0 ? (
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-4">
              <div className="allPublicOffices-dropDown-filter-Container">
                <div className="products-services-dropDownContainer">
                  <Container className="products-services-buttons">
                    <ButtonGroup>
                      <ToggleButton
                        type="radio"
                        variant={
                          serviceFromStore === "0"
                            ? "outline-primary active"
                            : "outline-secondary"
                        }
                        checked={serviceFromStore === "0"}
                        onClick={() => {
                          setSelected("products");
                          // navigate("/search-product-details");
                          dispatch(service("0"));
                          dispatch(region(null));
                          dispatch(town(null));
                          dispatch(selectedRegion(null));
                          dispatch(selectedTown(null));
                          dispatch(addActivePage(1));
                        }}
                        className="custom-toggle"
                      >
                        {t("Products")}
                      </ToggleButton>
                      <ToggleButton
                        type="radio"
                        variant={
                          serviceFromStore === "1"
                            ? "outline-primary active"
                            : "outline-secondary"
                        }
                        checked={serviceFromStore === "1"}
                        onClick={() => {
                          setSelected("services");
                          dispatch(service("1"));
                          dispatch(region(null));
                          dispatch(town(null));
                          dispatch(selectedRegion(null));
                          dispatch(selectedTown(null));
                          dispatch(addActivePage(1));
                          // navigate("/search-services");
                        }}
                        className="custom-toggle"
                      >
                        {t("Services")}
                      </ToggleButton>
                    </ButtonGroup>
                  </Container>
                  {/* <p className="allPublicOffices-dropDownHeading">Sort By :</p>
                  <Dropdown drop="down">
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="allPublicOffices-dropdown"
                    >
                      {distance === null
                        ? "Distance(km)"
                        : `${distance} km away`}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          setDistance("1");
                        }}
                      >
                        1km away
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setDistance("10");
                        }}
                      >
                        10km away
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setDistance("20");
                        }}
                      >
                        {" "}
                        20km away
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setDistance("25");
                        }}
                      >
                        {" "}
                        25km away
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> */}
                </div>
                <Button
                  variant="primary"
                  className="addedErrands-offCanvas-button"
                  onClick={() => {
                    dispatch(toggle());

                    dispatch(setTrue());
                  }}
                >
                  Filter and Search
                </Button>
              </div>
            </div>
          </div>
          <div className="row   errandos-mobile-tab">
            {productItems?.map((item) => {
              // console.log("slug", item?.slug);

              return selected === "products" ? (
                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <div className="card productsDetails-Card-container mt-4 mb-4">
                    <div className="card-body">
                      <div
                        onClick={() => {
                          navigate(`/search-single-product/${item?.slug}`);
                        }}
                      >
                        <div className="ourErrandosImageContainer">
                          {/* <img
                          className="ourErrandosImage"
                          src={
                            item.featured_image
                              ? `${IMAGE_BASE_URL}/${item.featured_image}`
                              : productDetailsImage
                          }
                          alt="searchProducts"
                        /> */}
                          {/* <img
                            className="ourErrandosImage"
                            src={productDetailsImage}
                            alt="searchProducts"
                          /> */}
                          <img
                            className="ourErrandosImage"
                            src={`${IMAGE_BASE_URL}${item?.featured_image}`}
                            alt="Feature Image"
                            onError={(e) => {
                              e.target.src = productDetailsImage;
                            }}
                            style={{
                              width: "216px",
                              height: "180px",
                              // borderRadius: "34px",
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className="products-text-container"
                        onClick={() => {
                          navigate(`/search-single-product/${item?.slug}`);
                        }}
                      >
                        <div className="d-flex align-items-center ourErrandosTextIcon ourErrandosLocationAndText">
                          <img
                            src={businessNearYouLocationIcon}
                            alt="Location Icon"
                          />

                          <p className="products-Text  mobile-location-main">
                            {item?.shop?.town && `${item?.shop?.town?.name}, `}

                            {item?.shop?.region && item?.shop?.region?.name}
                          </p>

                          <div className="mobile-location-show">
                            <p className="products-Text">
                              {item?.shop?.town?.name !== undefined ? (
                                `${item?.shop?.town?.name}`
                              ) : (
                                <div style={{ visibility: "hidden" }}>town</div>
                              )}
                            </p>
                            <div className="products-Text">
                              {item?.shop?.region?.name}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="card-title products-details-heading">
                            {item?.name.length > 10
                              ? `${item?.name.substring(0, 10)}...`
                              : item?.name}
                          </h5>
                        </div>

                        {/* <div className="d-flex align-items-center ourErrandosTextIcon mt-1 ourErrandosLocationAndText">
                            <p className="products-Text2">
                              {item?.unit_price} FCFA
                            </p>
                          </div> */}
                      </div>
                      <div className="d-flex flex-wrap gap-2 justify-content-between">
                        <Button
                          variant="primary"
                          className="products-call-button"
                          onClick={() => {
                            dispatch(modalCallToggle());
                            dispatch(setCallModalTrue());
                            setProductCall(item);
                          }}
                        >
                          <img src={productsCall} alt="whatsappIcon" />
                          {/* Call */}
                        </Button>
                        {item?.shop?.whatsapp && (
                          <Button
                            variant="primary"
                            className="products-whatsAppButton-green"
                            onClick={() => {
                              dispatch(modalCallToggle());
                              dispatch(setCallModalTrue());
                              setProductCall(item);
                              setWhatsAppCall(true);
                            }}
                          >
                            <img src={whatsappIcon} alt="whatsappIcon" />
                            {/* Chat on Whatsapp */}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <div className="card serviceCard-container mt-4 mb-4">
                    <div className="card-body">
                      <div
                        className="serviceCard-image-text"
                        onClick={() => {
                          navigate(`/search-single-product/${item?.slug}`);
                        }}
                      >
                        <div className="serviceCard-ImageContainer">
                          {/* <img
                              className="img-fluid seriveCard-image"
                              src={serviceCardImage}
                              alt="searchProducts"
                            /> */}
                          <img
                            className="ourErrandosImage"
                            src={`${IMAGE_BASE_URL}${item?.featured_image}`}
                            alt="Feature Image"
                            onError={(e) => {
                              e.target.src = productDetailsImage;
                            }}
                            style={{
                              width: "168px",
                              height: "140px",
                            }}
                          />
                        </div>

                        <div
                          className="products-text-container"
                          onClick={() => {
                            navigate(`/search-single-product/${item?.slug}`);
                          }}
                        >
                          <div>
                            <h5 className="card-title products-heading">
                              {item?.name.length > 10
                                ? `${item?.name.substring(0, 10)}...`
                                : item?.name}
                            </h5>
                          </div>

                          <div className="d-flex align-items-center ourErrandosTextIcon ourErrandosLocationAndText">
                            <img
                              src={businessNearYouLocationIcon}
                              alt="Location Icon"
                            />
                            <p className="products-Text">
                              {item?.shop?.town && item?.shop?.town?.name}
                              {item?.shop?.town && ", "}
                              {item?.shop?.region && item?.shop?.region?.name}
                            </p>
                          </div>

                          <div className="d-flex align-items-center ourErrandosTextIcon mt-1 ourErrandosLocationAndText">
                            <p className="servicesCard-Text">
                              {item?.unit_price} CFA
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="d-flex flex-wrap gap-2 justify-content-between">
                          <Button
                            variant="primary"
                            className="service-call-button"
                            onClick={() => {
                              dispatch(modalCallToggle());
                              dispatch(setCallModalTrue());
                              setProductCall(item);
                            }}
                          >
                            <img src={productsCall} alt="whatsappIcon" />
                            {/* Call */}
                          </Button>
                          {item?.shop?.whatsapp && (
                            <Button
                              variant="primary"
                              className="products-whatsAppButton-green"
                              onClick={() => {
                                dispatch(modalCallToggle());
                                dispatch(setCallModalTrue());
                                setProductCall(item);
                                setWhatsAppCall(true);
                              }}
                            >
                              <img src={whatsappIcon} alt="whatsappIcon" />
                              {/* Chat on Whatsapp */}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="row   errandos-mobile-tab">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="pharmaciesNoResultFound-container">
              <img
                src={noPharmaciesFound}
                alt="noPharmaciesFound"
                className="img-fluid"
              />

              <h4 className="pharmaciesNoResultFound-heading">
                No Results Found
              </h4>
              <p className="pharmaciesNoResultFound-subText">
                We've searched and searched to no avail.
              </p>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="pharmaciesNoResultFound-bgImage-container">
              <h4 className="pharmaciesNoResultFound-headingErrand">
                May be try running an errand.
              </h4>
              <Button
                variant="primary"
                className="products-call-button-Errand"
                onClick={() => {
                  if (tokenAvailable) {
                    dispatch(modalToggle());
                    dispatch(setModalTrue());
                  }

                  if (!tokenAvailable) {
                    navigate("/login");
                  }
                }}
              >
                <img src={pharamciesNotFoundRunErrand} alt="whatsappIcon" />
                Run Errand
              </Button>{" "}
            </div>
          </div>
        </div>
      )}
      <CallPopUp
        productCall={productCall}
        whatsAppCall={whatsAppCall}
        setWhatsAppCall={setWhatsAppCall}
      />
      {/* <ToastContainer /> */}
      {!isPendingFromStore && productItems && productItems.length > 0 ? (
        <PaginationComponent />
      ) : null}
    </>
  );
};

export default ProductDetailsProduct;
