import React, { useRef, useState, useEffect } from "react";
import "../../App.css";
import Button from "react-bootstrap/Button";
import businessNearYouLocationIcon from "../../assets/businessNearYouLocationIcon.svg";
import leftArrowCarousal from "../../assets/leftArrowCarousal.svg";
import rightArrowCarousel from "../../assets/rightArrowCarousel.svg";
import whatsappIcon from "../../assets/whatsappIcon.svg";
import productsCall from "../../assets/productsCall.svg";
import serviceCardImage from "../../assets/serviceCardImage.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modalCallToggle, setCallModalTrue } from "../../utils/callModalSlice";
import { ToastContainer, toast } from "react-toastify";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import CallPopUp from "../callPopUp/CallPopUp";

const ServiceFromTheBusiness = ({ productDetail, setWhatsAppCall }) => {
  const scrollRef = useRef(null);

  const handleScrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    scrollRef?.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [productFromBusiness, setProductFromBusiness] = useState(null);
  console.log("productFromBusiness", productFromBusiness);

  const slugBusiness = productDetail?.shop?.slug;
  console.log("slugBusiness", slugBusiness);

  const fetchProductFromBusinesses = async (slug) => {
    if (!slug) return;
    try {
      const params = new URLSearchParams({
        service: "1",
      });

      const res = await getApi(
        apis.productsFromBusinesses + `/${slug}/items?${params.toString()}`
      );

      console.log("fetchProductFromBusinesses", res);
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

  return (
    <>
      <div className="container mt-5">
        {productFromBusiness && productFromBusiness.length != 0 && (
          <>
            {" "}
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 productsFromTheBusiness-productServiceButtons">
                <h6 className="productsFromTheBusiness-section-heading">
                  Services from this Business{" "}
                </h6>
                <div className="d-flex align-items-center gap-3 arrowsBox">
                  <div className="arrowContainer" onClick={handleScrollLeft}>
                    <img src={leftArrowCarousal} alt="leftArrowCarousal" />
                  </div>
                  <div className="arrowContainer" onClick={handleScrollRight}>
                    <img src={rightArrowCarousel} alt="rightArrowCarousel" />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="row   errandos-mobile-tab"> */}
            <div className="featuredCardsCarousel" ref={scrollRef}>
              <div className="row d-flex flex-column errandos-mobile-tab">
                <div className="d-flex">
                  {productFromBusiness &&
                    productFromBusiness.map((product) => {
                      return (
                        // col-xl-6 col-lg-6 col-md-8 col-sm-5 col-5
                        <div className="me-3">
                          <div className="card serviceCard-container mt-4 mb-4">
                            <div className="card-body">
                              <div
                                className="serviceCard-image-text"
                                onClick={() => {
                                  navigate(
                                    `/search-single-product/${product?.slug}`
                                  );
                                }}
                              >
                                <div className="serviceCard-ImageContainer">
                                  <img
                                    className="img-fluid seriveCard-image"
                                    src={
                                      product?.featured_image &&
                                      `${IMAGE_BASE_URL}${product?.featured_image}`
                                    }
                                    alt="searchProducts"
                                    style={{
                                      width: "168px",
                                      height: "140px",
                                      borderRadius: "20px",
                                    }}
                                  />
                                </div>

                                <div className="products-text-container">
                                  <div>
                                    <h5 className="card-title products-heading">
                                      {product?.name}
                                    </h5>
                                  </div>

                                  <div className="d-flex align-items-center ourErrandosTextIcon ourErrandosLocationAndText">
                                    <img
                                      src={businessNearYouLocationIcon}
                                      alt="Location Icon"
                                    />
                                    <p className="products-Text">
                                      Buea, South-West
                                    </p>
                                  </div>

                                  <div className="d-flex align-items-center ourErrandosTextIcon mt-1 ourErrandosLocationAndText">
                                    <p className="servicesCard-Text">
                                      {product?.unit_price} CFA
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="serviceCard-buttons">
                                <Button
                                  variant="primary"
                                  className="service-call-button"
                                  style={{ width: "185px" }}
                                  // style={{ width: "100%" }}
                                  onClick={() => {
                                    dispatch(modalCallToggle());
                                    dispatch(setCallModalTrue());
                                  }}
                                >
                                  <img src={productsCall} alt="whatsappIcon" />
                                  Call
                                </Button>
                                {product?.shop?.whatsapp && (
                                  <Button
                                    variant="primary"
                                    className="products-whatsAppButton-green"
                                    // style={{ width: "100%" }}
                                    style={{ width: "185px" }}
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
                                    Chat on Whatsapp
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            {/* <div>
              <button
                type="button"
                class="btn btn-primary btn-lg productsFromTheBusiness-productService-Button"
                onClick={() => {
                  navigate("/search-services");
                }}
              >
                View all Services
              </button>
            </div> */}
          </>
        )}
      </div>
      {/* <CallPopUp
        setWhatsAppCall={setWhatsAppCall}
        whatsAppCall={whatsAppCall}
        productDetail={productDetail}
      /> */}
    </>
  );
};

export default ServiceFromTheBusiness;
