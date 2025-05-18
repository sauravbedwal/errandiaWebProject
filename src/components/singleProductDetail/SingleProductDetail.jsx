import React, { useEffect, useState } from "react";
import shareSingleProductDetails from "../../assets/shareSingleProductDetails.svg";
import whatsappIcon from "../../assets/whatsappIcon.svg";
import callSingleProductDetails from "../../assets/callSingleProductDetails.svg";
import "../../App.css";
import Button from "react-bootstrap/Button";
import productSmallImage1 from "../../assets/productSmallImage1.svg";
import productSmallImage2 from "../../assets/productSmallImage2.svg";
import productSmallImage3 from "../../assets/productSmallImage3.svg";
import productSmallImage4 from "../../assets/productSmallImage4.svg";
import productSmallImage5 from "../../assets/productSmallImage5.svg";
import singleProductDetail_mainProductImage from "../../assets/images/singleProductDetail_mainProductImage.jpg";
import searchSingleProductDetails from "../../assets/searchSingleProductDetails.svg";
import leftArrowCarousal from "../../assets/leftArrowCarousal.svg";
import rightArrowCarousel from "../../assets/rightArrowCarousel.svg";
import Modal from "react-bootstrap/Modal";
import DescriptionProfileReview from "../descriptionProfileReview/DescriptionProfileReview";
import ProductsFromTheBusiness from "../productsFromTheBusiness/ProductsFromTheBusiness";
import ServiceFromTheBusiness from "../serviceFromTheBusiness/ServiceFromTheBusiness";
import {
  modalShareToggle,
  setShareModalTrue,
} from "../../utils/businessShareSlice";
import { useDispatch, useSelector } from "react-redux";
import FeaturedBusinessProfileShare from "../featuredBusinessProfileShare/FeaturedBusinessProfileShare";
import { modalCallToggle, setCallModalTrue } from "../../utils/callModalSlice";
import CallPopUp from "../callPopUp/CallPopUp";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { addProductDetails } from "../../utils/productDetailsSlice";
import parse from "html-react-parser";
import productDetailsImage from "../../assets/productDetailsImage.svg";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import Loader from "../loader/Loader";
import { setIsPending } from "../../utils/searchProductSlice";

// s
const SingleProductDetail = () => {
  const [productDetail, setProductDetail] = useState(null);

  const [isExpanded, setIsExpanded] = useState(false);

  const [whatsAppCall, setWhatsAppCall] = useState(false);

  const maxLength = 80;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const productImages = [
    productSmallImage1,
    productSmallImage2,
    productSmallImage3,
    productSmallImage4,
    productSmallImage5,
  ];

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  // const notify = () => toast("Oops! The request was not found.");

  const [loader, setLoader] = useState(false);

  const { slug } = useParams();
  // console.log("params", slug);

  const fetchProductDetails = async () => {
    try {
      setLoader(true);
      dispatch(setIsPending(true));
      const res = await getApi(apis.productDetails + `/${slug}`);
      setLoader(false);
      dispatch(setIsPending(false));
      setProductDetail(res.data.data.item);
      dispatch(addProductDetails(res.data.data.item));
    } catch (err) {
      setLoader(false);
      dispatch(setIsPending(false));
      console.log(err);
      if (err.response && err.response.status === 404) {
        console.log("Resource not found!");
        notify();
      }
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [slug]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? productDetail?.images?.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === productDetail?.images?.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleImageClick = (index) => {
    setCurrentIndex(index);
  };

  const { t } = useTranslation();
  const isPendingFromStore = useSelector(
    (store) => store?.searchProduct?.isPending
  );

  return (
    <>
      {isPendingFromStore ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            <div className="row">
              <div className="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                <div className="singleProductDetail-mobile-imageContainer">
                  {productDetail?.images &&
                    productDetail?.images.map((image, index) => (
                      <img
                        key={index}
                        src={`${IMAGE_BASE_URL}${image?.url}`}
                        className="img-fluid singleProductDetail-small-image"
                        onClick={() => handleImageClick(index)}
                        style={{
                          cursor: "pointer",
                          borderRadius: "10px",
                          border:
                            currentIndex === index ? "2px solid blue" : "none",
                        }}
                      />
                    ))}
                </div>
              </div>
              <div className="col-xl-7 col-lg-7 col-md-11 col-sm-12 col-12">
                <div className="d-flex align-items-center gap-3 singleProductDetail-arrowsBox">
                  <div className="arrowContainer" onClick={handlePrevious}>
                    <img src={leftArrowCarousal} alt="leftArrowCarousal" />
                  </div>
                  <div className="arrowContainer" onClick={handleNext}>
                    <img src={rightArrowCarousel} alt="rightArrowCarousel" />
                  </div>
                </div>

                <img
                  //  src={
                  //   productDetail?.images.length != 0
                  //     ? currentIndex === 0
                  //       ? `${IMAGE_BASE_URL}${productDetail?.images[0]?.url}`
                  //       : `${IMAGE_BASE_URL}${productDetail?.images[currentIndex]?.url}`
                  //     : `${IMAGE_BASE_URL}${productDetail?.featured_image}`
                  // }
                  src={
                    productDetail?.images?.length > 0
                      ? currentIndex === 0
                        ? `${IMAGE_BASE_URL}${productDetail?.images[0]?.url}`
                        : `${IMAGE_BASE_URL}${productDetail?.images[currentIndex]?.url}`
                      : productDetail?.featured_image
                      ? `${IMAGE_BASE_URL}${productDetail?.featured_image}`
                      : productDetailsImage
                  }
                  className="img-fluid singleProductDetail_mainProductImage"
                  style={{
                    width: "100%",
                    height: "464px",
                    borderRadius: "20px",
                  }}
                />
                <div
                  className="singleProductDetail-arrowContainer"
                  onClick={() => setShow(true)}
                >
                  <img
                    src={searchSingleProductDetails}
                    alt="searchSingleProductDetails"
                    className="img-fluid"
                  />
                </div>
              </div>

              <Modal show={show} fullscreen onHide={() => setShow(false)}>
                <Modal.Header
                  closeButton
                  style={{
                    backgroundColor: "#141414",
                    border: "none",
                    color: "white",
                  }}
                >
                  <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body
                  className="d-flex justify-content-center align-items-center"
                  style={{ backgroundColor: "#141414" }}
                >
                  <div
                    className="singleProductDetail-arrowContainer1"
                    onClick={handlePrevious}
                  >
                    <img src={leftArrowCarousal} alt="leftArrowCarousal" />
                  </div>
                  <img
                    src={
                      productDetail?.images?.length > 0
                        ? currentIndex === 0
                          ? `${IMAGE_BASE_URL}${productDetail?.images[0]?.url}`
                          : `${IMAGE_BASE_URL}${productDetail?.images[currentIndex]?.url}`
                        : productDetail?.featured_image
                        ? `${IMAGE_BASE_URL}${productDetail?.featured_image}`
                        : productDetailsImage
                    }
                    className="img-fluid singleProductDetail-modal-image"
                    style={{
                      // width: "464px",
                      // height: "464px",
                      borderRadius: "20px",
                    }}
                  />
                  <div
                    className="singleProductDetail-arrowContainer2"
                    onClick={handleNext}
                  >
                    <img src={rightArrowCarousel} alt="rightArrowCarousel" />
                  </div>
                </Modal.Body>
              </Modal>

              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <button
                  type="button"
                  class="btn btn-primary btn-lg businessUserView-whiteButton"
                  onClick={() => {
                    // console.log("modal");
                    dispatch(modalShareToggle());
                    dispatch(setShareModalTrue());
                  }}
                >
                  <img src={shareSingleProductDetails} />
                  {t("Share")}{" "}
                </button>
                <h5 className="singleProductDetail-productName">
                  {productDetail?.name}
                </h5>
                {/* <p className="singleProductDetail-productNumber">
                  {productDetail?.unit_price} FCFA
                </p> */}
                <p className="singleProductDetail-productDescription">
                  {productDetail?.description.length > 500 ? (
                    <>
                      {isExpanded
                        ? parse(productDetail?.description)
                        : parse(
                            `${productDetail?.description.slice(0, 500)}... `
                          )}

                      {!isExpanded && (
                        <span
                          onClick={toggleDescription}
                          style={{ color: "blue", cursor: "pointer" }}
                        >
                          {t("more")}
                        </span>
                      )}

                      {isExpanded && (
                        <span
                          onClick={toggleDescription}
                          style={{ color: "red", cursor: "pointer" }}
                        >
                          {" "}
                          {t("show less")}
                        </span>
                      )}
                    </>
                  ) : typeof productDetail?.description === "string" ? (
                    parse(productDetail.description)
                  ) : null}
                </p>
                <Button
                  variant="primary"
                  className="singleProductDetail-call-button"
                  onClick={() => {
                    // dispatch(modalCallToggle());
                    dispatch(setCallModalTrue());
                  }}
                >
                  <img src={callSingleProductDetails} alt="whatsappIcon" />
                  Call
                </Button>
                {productDetail?.shop?.whatsapp && (
                  <Button
                    variant="primary"
                    className="singleProductDetail-whatsAppButton-green my-2"
                    onClick={() => {
                      setWhatsAppCall(true);
                      // dispatch(modalCallToggle());
                      dispatch(setCallModalTrue());
                    }}
                  >
                    <img src={whatsappIcon} alt="whatsappIcon" />
                    Chat on Whatsapp
                  </Button>
                )}
              </div>
            </div>
          </div>
          <DescriptionProfileReview productDetail={productDetail} />
          <ProductsFromTheBusiness productDetail={productDetail} />
          <ServiceFromTheBusiness
            productDetail={productDetail}
            setWhatsAppCall={setWhatsAppCall}
          />
          <FeaturedBusinessProfileShare />
          <CallPopUp
            productDetail={productDetail}
            setWhatsAppCall={setWhatsAppCall}
            whatsAppCall={whatsAppCall}
          />
          {/* <ToastContainer /> */}
        </>
      )}
    </>
  );
};

export default SingleProductDetail;
