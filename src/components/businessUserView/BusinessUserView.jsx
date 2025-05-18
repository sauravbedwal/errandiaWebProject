import React, { useEffect, useState } from "react";
import businessUserProfile from "../../assets/businessUserProfile.svg";
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
import { getApi } from "../../fetchApi/FetchAxiosApi";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { useParams } from "react-router-dom";
import { addBusinessDetails } from "../../utils/businessDetailsSlice";
import parse from "html-react-parser";
import whatsappIcon from "../../assets/whatsappIcon.svg";
import { setIsPending } from "../../utils/searchProductSlice";
import Loader from "../loader/Loader";
import { useTranslation } from "react-i18next";
import "../../i18n";

const BusinessUserView = () => {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const { slug } = useParams();

  // const notify = () => toast("Oops! The request was not found.");

  const [whatsAppCall, setWhatsAppCall] = useState(false);
  console.log("whatsAppCall bysueess", whatsAppCall);
  const fetchBusinessDetails = async () => {
    try {
      dispatch(setIsPending(true));
      const res = await getApi(apis.businessProductDetails + `/${slug}`);
      // console.log(res);
      dispatch(setIsPending(false));
      dispatch(addBusinessDetails(res.data.data.item));
    } catch (err) {
      console.log(err);
      dispatch(setIsPending(false));
      if (err.response && err.response.status === 404) {
        console.log("Resource not found!");
        notify();
      }
    }
  };

  useEffect(() => {
    fetchBusinessDetails();
  }, []);

  const businessDetailsCollection = useSelector(
    (store) => store?.businessDetails
  );

  console.log("businessDetailsCollection ccc", businessDetailsCollection);

  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 80;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  // const fallBackImageCollection = useSelector((store) => store?.fallBackImage);

  const openGoogleMaps = async (latitude, longitude) => {
    try {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error getting location:", error);
      alert("Unable to retrieve your location.");
    }
  };

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    return words
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const createFallbackImage = (initials) => {
    const svg = `
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="#1006ac"/>
            <text x="50%" y="50%" font-size="40" text-anchor="middle" fill="#fff" dy=".3em">${initials}</text>
        </svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  const initials = getInitials(businessDetailsCollection?.name);
  const fallbackImage = createFallbackImage(initials);

  const isPendingFromStore = useSelector(
    (store) => store?.searchProduct?.isPending
  );

  console.log(
    "asas",
    isExpanded,
    businessDetailsCollection?.description.length
  );
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
                    <div className="d-flex gap-3 businessUserView-image-container">
                      <img
                        className="img-fluid businessPorfileUserView-pharmaciesImage"
                        // src={
                        //   businessDetailsCollection?.image
                        //     ? `${IMAGE_BASE_URL}${businessDetailsCollection?.image}`
                        //     : fallbackImage
                        // }
                        src={
                          businessDetailsCollection?.image
                            ? `${IMAGE_BASE_URL}${businessDetailsCollection?.image}`
                            : fallbackImage
                        }
                        onError={(e) => {
                          e.target.src = fallbackImage;
                          // dispatch(addFallBackImage(fallbackImage));
                        }}
                        // src={`${businessDetailsCollection?.image_path}`}
                        // src={}
                        alt="Card image cap"
                      />

                      <div
                        className="businessUserView-name-report-container"
                        style={{ width: "100%" }}
                      >
                        <div>
                          <div className="businessUserView-viewProfile-container">
                            <div className="businessUserView-type">
                              {businessDetailsCollection?.category?.name}
                            </div>
                            {businessDetailsCollection?.is_location_set ? (
                              <div className="businessUserView-verified-container">
                                <img
                                  src={verifiedBusinessUserProfile}
                                  alt="verifiedBusinessUserProfile"
                                />
                                <p className="businessUserView-verified">
                                  {t("Verified")}
                                </p>
                              </div>
                            ) : (
                              <div className="businessUserView-unverified-container">
                                <img
                                  src={verifiedBusinessUserProfile}
                                  alt="verifiedBusinessUserProfile"
                                />
                                <p className="businessUserView-unverified">
                                  {t("Not Verified")}
                                </p>
                              </div>
                            )}
                          </div>
                          <h5 className="card-subtitle text-muted businessUserView-Heading">
                            {businessDetailsCollection?.name}
                          </h5>

                          <div className="businessUserView--locationTime-container">
                            <div className="d-flex align-items-center gap-2">
                              <img
                                src={locationBusinessUserProfile}
                                alt="Location Icon"
                              />
                              <p className="businessUserView-Text">
                                {businessDetailsCollection?.town &&
                                  `${businessDetailsCollection?.town?.name}, `}
                                {businessDetailsCollection?.region &&
                                  businessDetailsCollection?.region?.name}
                              </p>
                            </div>

                            {/* {businessDetailsCollection?.phone_verified ===
                              1 && (
                              <div className="d-flex align-items-center gap-2">
                                <img
                                  src={clockBusinessUserProfile}
                                  alt="Location Icon"
                                />
                                <p className="businessUserView-Text">
                                  8am - 5pm
                                </p>
                              </div>
                            )} */}
                          </div>
                        </div>

                        <div className="businessUserView-report-share-container">
                          {/* <div
                        className="businessUserView-report-container"
                        onClick={() => {
                          dispatch(modalReportToggle());
                          dispatch(setReportModalTrue());
                        }}
                      >
                        <img src={reportBusiness} alt="reportBusiness" />

                        <p className="businessUserView-report-text">
                          Report Business
                        </p>
                      </div> */}
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
                            {t("Share")}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="businessUserView-buttons-container mt-4">
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
                        {t("Contact Owner")}{" "}
                      </Button>
                      {businessDetailsCollection?.whatsapp &&
                        businessDetailsCollection?.whatsapp !== "null" && (
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
                            {t("Chat")}
                          </Button>
                        )}

                      {businessDetailsCollection?.latitude &&
                        businessDetailsCollection?.longitude && (
                          <button
                            type="button"
                            class="btn btn-primary btn-lg businessUserView-location-whiteButton"
                            onClick={() => {
                              openGoogleMaps(
                                businessDetailsCollection.latitude,
                                businessDetailsCollection.longitude
                              );
                            }}
                          >
                            {t("Go There")}
                            <img src={pharmaciesFoundLocation} />
                          </button>
                        )}
                    </div>
                    <div className="businessUserView-about-container">
                      <h6 className="businessUserView-about">{t("About")}</h6>
                      <p className="businessUserView-about-text">
                        {businessDetailsCollection?.description.length > 150 ? (
                          <>
                            {isExpanded
                              ? parse(businessDetailsCollection?.description)
                              : parse(
                                  `${businessDetailsCollection?.description.slice(
                                    0,
                                    150
                                  )}... `
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
                        ) : typeof businessDetailsCollection?.description ===
                          "string" ? (
                          parse(businessDetailsCollection?.description)
                        ) : null}
                      </p>
                    </div>
                  </div>
                  {/* </div> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
          {/* <BranchesBusinessUserProfile /> */}
          <ProductsBusinessUserProfile
            setWhatsAppCall={setWhatsAppCall}
            businessDetailsCollection={businessDetailsCollection}
          />
          <ServiceBusinessUserProfile
            businessDetailsCollection={businessDetailsCollection}
            setWhatsAppCall={setWhatsAppCall}
          />
          <FeaturedBusinessProfileShare />
          <CallPopUp
            businessDetailsCollection={businessDetailsCollection}
            setWhatsAppCall={setWhatsAppCall}
            whatsAppCall={whatsAppCall}
          />
          <ReportBusiness />
        </>
      )}
    </>
  );
};

export default BusinessUserView;
