import React, { useEffect, useState } from "react";
import errandoSingle from "../../assets/errandoSingle.svg";
import locationBusinessUserProfile from "../../assets/locationBusinessUserProfile.svg";
import "../../App.css";
import pharmaciesFoundLocation from "../../assets/pharmaciesFoundLocation.svg";
import Button from "react-bootstrap/Button";
import verifiedBusinessUserProfile from "../../assets/verifiedBusinessUserProfile.svg";
import clockBusinessUserProfile from "../../assets/clockBusinessUserProfile.svg";
import shareSingleProductDetails from "../../assets/shareSingleProductDetails.svg";
import reportBusiness from "../../assets/reportBusiness.svg";
import callBusinessUserProfile from "../../assets/callBusinessUserProfile.svg";
import BranchesBusinessUserProfile from "../branchesBusinessUserProfile/BranchesBusinessUserProfile";
import ProductsBusinessUserProfile from "../productsBusinessUserProfile/ProductsBusinessUserProfile";
import { useDispatch, useSelector } from "react-redux";
import {
  modalShareToggle,
  setShareModalTrue,
} from "../../utils/businessShareSlice";
import FeaturedBusinessProfileShare from "../featuredBusinessProfileShare/FeaturedBusinessProfileShare";
import ServiceBusinessUserProfile from "../serviceBusinessUserProfile/ServiceBusinessUserProfile";
import { modalCallToggle, setCallModalTrue } from "../../utils/callModalSlice";
import CallPopUp from "../callPopUp/CallPopUp";
import {
  modalReportToggle,
  setReportModalTrue,
} from "../../utils/reportModalSlice";
import ReportBusiness from "../reportBusiness/ReportBusiness";
import star_errandoSingle from "../../assets/star_errandoSingle.svg";
import time_singleErrando from "../../assets/time_singleErrando.svg";
import avaialbleTick from "../../assets/avaialbleTick.svg";
import delivery from "../../assets/delivery.svg";
import errandsUserInfo from "../../assets/errandsUserInfo.svg";
import servicesUserInfo from "../../assets/servicesUserInfo.svg";
import productsUserInfo from "../../assets/productsUserInfo.svg";
import delivery_truck from "../../assets/delivery_truck.svg";
import whatsappIcon from "../../assets/whatsappIcon.svg";
import ReviewsSingleErrando from "../reviewsSingleErrando/ReviewsSingleErrando";
import { useParams } from "react-router-dom";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { ToastContainer, toast } from "react-toastify";
import errandoFallBackImage from "../../assets/images/errandoFallBackImage.png";
import cross from "../../assets/cross.svg";
import parse from "html-react-parser";
import Loader from "../loader/Loader";
import { useTranslation } from "react-i18next";
import "../../i18n";
import { setIsPending } from "../../utils/searchProductSlice";

const SingleErrandoDetail = () => {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const { slug } = useParams();

  // const notify = () => toast("Oops! The request was not found.");

  const [whatsAppCall, setWhatsAppCall] = useState(false);

  const [loader, setLoader] = useState(false);

  const [errandoDetails, setErrandoDetails] = useState(null);

  console.log("errandoDetails", errandoDetails);

  const [reviews, setReviews] = useState(null);

  const fetchErrandoDetails = async () => {
    try {
      setLoader(true);
      dispatch(setIsPending(true));
      const res = await getApi(apis.errandoDetails + `/${slug}`);
      // console.log("fetchErrandoDetails", res.data.data.item);
      setLoader(false);
      dispatch(setIsPending(false));
      setErrandoDetails(res.data.data.item);
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

  const [isExpanded, setIsExpanded] = useState(false);

  const maxLength = 80;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const isPendingFromStore = useSelector(
    (store) => store?.searchProduct?.isPending
  );

  const fetchErrandoReviews = async (id) => {
    try {
      const params = new URLSearchParams({
        page: "1",
        per_page: "15",
        item_id: id,
        entity: "errando",
      });
      dispatch(setIsPending(true));

      const res = await getApi(apis.errandoReviews + `?${params}`);
      console.log("fetchErrandoReviews", res);
      dispatch(setIsPending(false));
      setReviews(res.data.data.items);
    } catch (err) {
      dispatch(setIsPending(false));
      console.log(err);
    }
  };

  useEffect(() => {
    fetchErrandoDetails();
  }, []);

  useEffect(() => {
    if (errandoDetails) {
      fetchErrandoReviews(errandoDetails?.id);
    }
  }, [errandoDetails]);
  return (
    <>
      {isPendingFromStore ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card card-container-businessUserView">
                  {/* <div className="row"> */}
                  {/* <div className="col-xl-8 col-lg-7 col-md-7 col-sm-12 col-12 open-container"> */}
                  <div className="card-body">
                    <div className="businessUserView-image-container">
                      <img
                        className="img-fluid businessPorfileUserView-pharmaciesImage"
                        src={
                          errandoDetails?.photo === ""
                            ? errandoFallBackImage
                            : `${IMAGE_BASE_URL}${errandoDetails?.photo}`
                        }
                        alt="errandoSingle"
                      />

                      <div
                        className="businessUserView-name-report-container"
                        style={{ width: "100%" }}
                      >
                        <div
                          className="businessUserView-name-report-inner-container"
                          style={{ width: "100%" }}
                        >
                          <div className="singleErrandoDetail-viewProfile-container">
                            <div className="singleErrandoDetail-star-reviews-container">
                              <img
                                src={star_errandoSingle}
                                alt="star_errandoSingle"
                                className="img-fluid"
                              />
                              <p className="singleErrandoDetail-star-reviews">
                                {errandoDetails?.ratings_count} (
                                {errandoDetails?.reviews_count} reviews)
                              </p>
                            </div>
                            {/* <div className="businessUserView-type">
                          Fashion and style
                        </div>
                        <div className="businessUserView-verified-container">
                          <img
                            src={verifiedBusinessUserProfile}
                            alt="verifiedBusinessUserProfile"
                          />
                          <p className="businessUserView-verified">
                            Not Verified
                          </p>
                        </div> */}
                          </div>
                          <h5 className="card-subtitle text-muted businessUserView-Heading">
                            {errandoDetails?.name}
                          </h5>

                          <div className="singleErrandoDetail-locationTime-container">
                            <div className="d-flex align-items-center gap-2">
                              <img
                                src={locationBusinessUserProfile}
                                alt="Location Icon"
                                className="img-fluid"
                                style={{ width: "10.5px", height: "15px" }}
                              />
                              <p className="businessUserView-Text">
                                {errandoDetails?.town && errandoDetails?.town}
                                {", "}
                                {errandoDetails?.region &&
                                  errandoDetails?.region}
                              </p>
                            </div>

                            <div className="singleErrandoDetail-available">
                              <img
                                src={time_singleErrando}
                                alt="time_singleErrando"
                              />
                              <p className="businessUserView-Text">
                                {t("Availability")}:
                              </p>

                              {errandoDetails &&
                              errandoDetails?.is_available === 1 ? (
                                <>
                                  <div className="singleErrandoDetail-avaialble-container">
                                    <img
                                      src={avaialbleTick}
                                      alt="avaialbleTick"
                                    />
                                    <p className="singleErrandoDetail-avaialble-text">
                                      {t("Available")}
                                    </p>
                                  </div>
                                </>
                              ) : (
                                <div className="singleErrandoDetail-unavaialble-container">
                                  <img
                                    src={cross}
                                    alt="cross"
                                    className="img-fluid"
                                  />
                                  <p className="singleErrandoDetail-unavaialble-text">
                                    {t("Unavailable")}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="singleErrandoDetail-stats-container mt-4">
                            {/* <div className="d-flex align-items-center gap-2"> */}
                            <div className="userInfo-details-stats-container">
                              <div
                                className="userInfo-details-IconText-container"
                                onClick={() => {
                                  // dispatch(modalErrandsItemFoundToggle());
                                  // dispatch(setErrandsItemFoundModalTrue());
                                  // console.log("iiiii");
                                  // dispatch(modalWriteReviewToggle());
                                  // dispatch(setWriteReviewModalTrue());
                                }}
                              >
                                <img src={delivery} alt="delivery" />
                                <p className="singleErrandoDetail-Text-grey">
                                  {t("Done Deliveries")}
                                </p>
                              </div>
                              <p className="userInfo-details-number">
                                {errandoDetails?.deliveries}
                              </p>
                            </div>

                            <div className="userInfo-details-container">
                              <div className="userInfo-details-IconText-container">
                                <img
                                  src={delivery_truck}
                                  alt="delivery_truck"
                                />
                                <p className="singleErrandoDetail-Text-grey">
                                  {t("Transport")}
                                </p>
                              </div>
                              <p className="userInfo-details-number">
                                {errandoDetails?.transport}
                              </p>
                            </div>

                            {/* </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="businessUserView-buttons-share-container">
                      <div className="businessUserView-buttons-container mt-2">
                        <Button
                          variant="primary"
                          className="businessUserView-call-button"
                          onClick={() => {
                            dispatch(modalCallToggle());
                            dispatch(setCallModalTrue());
                          }}
                        >
                          <img
                            src={callBusinessUserProfile}
                            alt="callBusinessUserProfile"
                          />
                          {t("Book Me")}
                        </Button>
                        {errandoDetails?.whatsapp_number && (
                          <Button
                            variant="primary"
                            className="businessUserView-whatsAppButton"
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
                        {/* <button
                    type="button"
                    class="btn btn-primary btn-lg businessUserView-location-whiteButton"
                  >
                    Go There
                    <img src={pharmaciesFoundLocation} />
                  </button> */}
                      </div>
                      <div className="businessUserView-report-share-container">
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
                      </div>
                    </div>
                    <div className="businessUserView-about-container">
                      <h6 className="businessUserView-about">{t("About")}</h6>
                      <p className="businessUserView-about-text">
                        {errandoDetails?.bio.length > 1000 ? (
                          <>
                            {" "}
                            {isExpanded
                              ? parse(errandoDetails?.bio)
                              : parse(
                                  `${errandoDetails?.bio.slice(
                                    0,
                                    maxLength
                                  )}...`
                                )}
                            {!isExpanded && (
                              <span
                                onClick={toggleDescription}
                                style={{ color: "blue", cursor: "pointer" }}
                                className="businessUserView-about-seeMore"
                              >
                                {t("See more")}
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
                        ) : typeof errandoDetails?.bio === "string" ? (
                          parse(errandoDetails.bio)
                        ) : null}
                      </p>
                      {/* <p className="businessUserView-about-seeMore">See more</p> */}
                    </div>
                  </div>
                  {/* </div> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
          <ReviewsSingleErrando reviews={reviews} setReviews={setReviews} />
          <FeaturedBusinessProfileShare />
          <CallPopUp
            errandoDetails={errandoDetails}
            whatsAppCall={whatsAppCall}
            setWhatsAppCall={setWhatsAppCall}
          />
          {/* <ToastContainer /> */}
        </>
      )}
    </>
  );
};

export default SingleErrandoDetail;
