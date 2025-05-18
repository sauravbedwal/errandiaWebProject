import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { modalCallToggle } from "../../utils/callModalSlice";
import { setModalFalse } from "../../utils/modalSlice";
import tickCallPopUp from "../../assets/tickCallPopUp.svg";
import productSuggestionReviews from "../../assets/productSuggestionReviews.svg";
import starSideBar from "../../assets/starSideBar.svg";
import callSingleProductDetails from "../../assets/callSingleProductDetails.svg";
import { useLocation, useParams } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../Constant";
import ourErrandsImage from "../../assets/images/errandos-image.png";
import { useTranslation } from "react-i18next";
import { createFallbackImage, getInitials } from "../../utils/utils";

const CallPopUp = ({
  pharmacy,
  productDetail,
  businessDetailsCollection,
  productCall,
  errandoDetails,
  whatsAppCall,
  setWhatsAppCall,
  pharmacyDetail,
  errandDetails,
}) => {
  const callModalBoolean = useSelector((store) => store?.callModal?.value);

  const { pathname } = useLocation();

  const allPharmacies = useSelector((store) => store?.searchPharmacies);

  const dispatch = useDispatch();

  const { slug } = useParams();

  const { t } = useTranslation();

  const handleCall = () => {
    let phoneNumber = "";

    if (pathname === "/searchPharmaciesFound" && pharmacy) {
      phoneNumber = pharmacy?.primary_phone;
    } else if (pathname === `/search-single-product/${slug}` && productDetail) {
      phoneNumber = whatsAppCall
        ? productDetail?.shop?.whatsapp
        : productDetail?.shop?.phone;
    } else if (
      pathname === `/business-profile-user-view/${slug}` &&
      businessDetailsCollection
    ) {
      phoneNumber = whatsAppCall
        ? businessDetailsCollection?.whatsapp
        : businessDetailsCollection?.phone;
    } else if (pathname === "/search-product-details") {
      phoneNumber = productCall?.shop?.phone;
    } else if (pathname === `/errando-profile/${slug}` && errandoDetails) {
      phoneNumber = whatsAppCall
        ? errandoDetails?.whatsapp_number
        : errandoDetails?.phone;
    } else if (pathname === `/single-pharmacies/${slug}` && pharmacyDetail) {
      phoneNumber = pharmacyDetail?.primary_phone;
    } else if (pathname === "/" && pharmacy) {
      phoneNumber = pharmacy?.primary_phone;
    } else if (pathname === `/errand-Single/${slug}` && errandDetails) {
      phoneNumber = whatsAppCall
        ? errandDetails?.user?.whatsapp_number
        : errandDetails?.user?.phone;
    } else {
      phoneNumber = "+237669877423"; // Default number
    }

    console.log("call phoneNumber", phoneNumber, whatsAppCall);

    if (phoneNumber) {
      if (whatsAppCall) {
        const whatsappUrl = `https://wa.me/${phoneNumber}`;
        window.open(whatsappUrl, "_blank");
      } else {
        window.location.href = `tel:${phoneNumber}`;
      }
    }
  };

  console.log("businessDetailsCollection call", businessDetailsCollection);

  const initials = getInitials(businessDetailsCollection?.name);

  const fallbackImage = createFallbackImage(initials);

  return (
    <>
      <Modal
        size="md"
        show={callModalBoolean}
        onClick={() => {
          dispatch(modalCallToggle());
          dispatch(setModalFalse());
          setWhatsAppCall(false);
        }}
        aria-labelledby="example-modal-sizes-title-lg"
        className="featuredBusinessProfileShare-modal-Container custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="example-modal-sizes-title-lg"
            className="featureBusinessProfileShare-heading"
          ></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="callPopUp-social-Handles-container">
            <div className=" callPopUp-social-Handles">
              <div className="card-body">
                <div className="callPopUp-review-container">
                  <div className="productSuggestion-image-text">
                    <img
                      src={
                        pathname === "/search-pharmacies" && pharmacy
                          ? `${IMAGE_BASE_URL}${pharmacy?.cover_image_path}`
                          : pathname === `/search-single-product/${slug}`
                          ? productDetail?.shop?.image
                            ? `${IMAGE_BASE_URL}${productDetail?.shop?.image}`
                            : ourErrandsImage
                          : pathname === `/business-profile-user-view/${slug}`
                          ? businessDetailsCollection?.image
                            ? `${IMAGE_BASE_URL}${businessDetailsCollection?.image}`
                            : fallbackImage
                          : pathname === "/search-product-details"
                          ? productCall?.shop?.image &&
                            productCall?.shop?.image != ""
                            ? `${IMAGE_BASE_URL}${productCall?.shop?.image}`
                            : ourErrandsImage
                          : pathname === `/errando-profile/${slug}`
                          ? errandoDetails?.photo
                            ? `${IMAGE_BASE_URL}${errandoDetails?.photo}`
                            : ourErrandsImage
                          : pathname === `/single-pharmacies/${slug}` &&
                            pharmacyDetail
                          ? `${IMAGE_BASE_URL}${pharmacyDetail?.cover_image_path}`
                          : pathname === "/" && pharmacy
                          ? `${IMAGE_BASE_URL}${pharmacy?.cover_image_path}`
                          : pathname === `/errand-single/${slug}` &&
                            errandDetails?.user?.photo
                          ? `${IMAGE_BASE_URL}${errandDetails?.user?.photo}`
                          : ourErrandsImage
                      }
                      alt="productSuggestionReviews"
                      className="img-fluid"
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "30px",
                      }}
                    />
                    <div>
                      <div className="productSuggestion-review-heading">
                        {pathname === "/search-pharmacies" && pharmacy
                          ? pharmacy?.name
                          : pathname === `/search-single-product/${slug}` &&
                            productDetail
                          ? productDetail?.shop?.name
                          : pathname ===
                              `/business-profile-user-view/${slug}` &&
                            businessDetailsCollection
                          ? businessDetailsCollection?.name
                          : pathname === "/search-product-details"
                          ? productCall?.shop?.name
                          : pathname === `/errando-profile/${slug}` &&
                            errandoDetails
                          ? errandoDetails?.name
                          : pathname === `/single-pharmacies/${slug}` &&
                            pharmacyDetail
                          ? pharmacyDetail?.name
                          : pathname === "/" && pharmacy
                          ? pharmacy?.name
                          : pathname === `/errand-single/${slug}` &&
                            errandDetails?.user?.name
                          ? `${errandDetails?.user?.name.slice(0, 1)}******`
                          : "Nishang Systems"}
                      </div>
                      {/* <div className="productSuggestion-star-reviews">
                        <img src={starSideBar} className="img-fluid" />
                        <img src={starSideBar} className="img-fluid" />
                        <img src={starSideBar} className="img-fluid" />
                        <img src={starSideBar} className="img-fluid" />
                        <img src={starSideBar} className="img-fluid" />
                        <p className="productSuggestion-review">(1 review)</p>
                      </div> */}
                    </div>
                  </div>
                  {/* <div className="callPopUp-business">Business</div> */}
                </div>

                <Button
                  variant="primary"
                  className="singleProductDetail-call-button"
                  onClick={handleCall}
                  // onClick={() => {
                  //   dispatch(modalCallToggle());
                  //   dispatch(setCallModalTrue());
                  //   const phoneNumber =
                  //     pathname === "/searchPharmaciesFound" && pharmacy
                  //       ? pharmacy?.primary_phone
                  //       : pathname === `/searchSingleProduct/${slug}` &&
                  //         productDetail
                  //       ? whatsAppCall === true
                  //         ? productDetail?.shop?.whatsapp
                  //         : productDetail?.shop?.phone
                  //       : pathname === `/businessProfileUserView/${slug}` &&
                  //         businessDetailsCollection
                  //       ? whatsAppCall === true
                  //         ? businessDetailsCollection?.whatsapp
                  //         : businessDetailsCollection?.phone
                  //       : pathname === "/searchProductDetails"
                  //       ? productCall?.user?.phone
                  //       : pathname === `/errandoProfile/${slug}` &&
                  //         errandoDetails
                  //       ? whatsAppCall === true
                  //         ? errandoDetails?.whatsapp_number
                  //         : errandoDetails?.phone
                  //       : pathname === `/singlePharmacies/${slug}` &&
                  //         pharmacyDetail
                  //       ? pharmacyDetail?.primary_phone
                  //       : pathname === "/" && pharmacy
                  //       ? pharmacy?.primary_phone
                  //       : pathname === `/errandSingle/${slug}` && errandDetails
                  //       ? whatsAppCall === true
                  //         ? errandDetails?.user?.whatsapp_number
                  //         : errandDetails?.user?.phone
                  //       : "";
                  //   // Check if the number is a WhatsApp number
                  //   if (whatsAppCall === true && phoneNumber) {
                  //     const whatsappUrl = `https://wa.me/${phoneNumber}`;
                  //     window.open(whatsappUrl, "_blank");
                  //   }
                  // }}
                >
                  <img src={callSingleProductDetails} alt="whatsappIcon" />
                  {pathname === "/search-pharmacies" && pharmacy
                    ? pharmacy?.primary_phone
                    : pathname === `/search-single-product/${slug}` &&
                      productDetail
                    ? whatsAppCall === true
                      ? productDetail?.shop?.whatsapp
                      : productDetail?.shop?.phone
                    : pathname === `/business-profile-user-view/${slug}` &&
                      businessDetailsCollection
                    ? whatsAppCall === true
                      ? businessDetailsCollection?.whatsapp
                      : businessDetailsCollection?.phone
                    : pathname === "/search-product-details"
                    ? productCall?.shop?.phone
                    : pathname === `/errando-profile/${slug}` && errandoDetails
                    ? whatsAppCall === true
                      ? errandoDetails?.whatsapp_number
                      : errandoDetails?.phone
                    : pathname === `/single-pharmacies/${slug}` &&
                      pharmacyDetail
                    ? pharmacyDetail?.primary_phone
                    : pathname === "/" && pharmacy
                    ? pharmacy?.primary_phone
                    : pathname === `/errand-single/${slug}` && errandDetails
                    ? whatsAppCall === true
                      ? errandDetails?.user?.whatsapp_number
                      : errandDetails?.user?.phone
                    : "+237669877423"}
                </Button>
              </div>
            </div>

            <div className="input-group rounded gap-3 callPopUp-check-container">
              <div className="callPopUp-check-heading">
                {t("Tips for a safer transaction")}:
              </div>
              <div className="callPopUp-check">
                <img
                  src={tickCallPopUp}
                  alt="tickCallPopUp"
                  className="img-fluid"
                />
                <p className="callPopUp-check-text">
                  •{" "}
                  {t(
                    "Make sure you meet any person you are doing business with in an open sapce in public for your safety"
                  )}
                </p>
              </div>
              <div className="callPopUp-check">
                <img
                  src={tickCallPopUp}
                  alt="tickCallPopUp"
                  className="img-fluid"
                />
                <p className="callPopUp-check-text">
                  •{" "}
                  {t(
                    "Never go out to meet any business person you contacted on Errandia alone"
                  )}
                </p>
              </div>
              <div className="callPopUp-check">
                <img
                  src={tickCallPopUp}
                  alt="tickCallPopUp"
                  className="img-fluid"
                />
                <p className="callPopUp-check-text">
                  •{" "}
                  {t(
                    "Do not make any online payments without proper verification"
                  )}
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CallPopUp;
