import React, { useRef, useEffect, useState } from "react";
import "../../App.css";
import allErrandsLargeImg from "../../assets/allErrandsLargeImg.svg";
import allErrandsPostedBy from "../../assets/allErrandsPostedBy.svg";
import allErrandsLocation from "../../assets/allErrandsLocation.svg";
import Button from "react-bootstrap/Button";
import leftArrowCarousal from "../../assets/leftArrowCarousal.svg";
import rightArrowCarousel from "../../assets/rightArrowCarousel.svg";
import { useNavigate } from "react-router-dom";
import RecentErrands from "../recentErrands/RecentErrands";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addErrandDetails } from "../../utils/errandDetailsSlice";
import productsCall from "../../assets/productsCall.svg";
import whatsappIcon from "../../assets/whatsappIcon.svg";
import errandsCall from "../../assets/errandsCall.svg";
import { token } from "../../utils/utils";
import { modalCallToggle, setCallModalTrue } from "../../utils/callModalSlice";
import CallPopUp from "../callPopUp/CallPopUp";
import parse from "html-react-parser";
import ourErrandsImage from "../../assets/images/errandos-image.png";
import { setIsPending } from "../../utils/searchProductSlice";
import SubscriptionBoxModal from "../subscriptionBoxModal/SubscriptionBoxModal";
import {
  modalSubscriptionToggle,
  setSubscriptionModalTrue,
} from "../../utils/subscriptionSlice";
import Loader from "../loader/Loader";
import { useTranslation } from "react-i18next";

const AllErrands = () => {
  const scrollRef = useRef(null);
  const { t } = useTranslation();

  const [whatsAppCall, setWhatsAppCall] = useState(false);

  const handleScrollLeft = () => {
    scrollRef?.current?.scrollBy({
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

  // const notify = () => toast("Oops! The request was not found.");

  const { slug } = useParams();

  const [errandDetails, setErrandDetails] = useState(null);
  // console.log("errandDetails", errandDetails);

  useEffect(() => {
    const fetchErrandDetails = async () => {
      try {
        dispatch(setIsPending(true));
        const res = await getApi(apis.errandDetails + `/${slug}`);
        // console.log("fetchErrandDetails", res);
        dispatch(setIsPending(false));
        setErrandDetails(res.data.data.item);
        // dispatch(addErrandDetails(res.data.data.item));
      } catch (err) {
        // console.log(err);
        dispatch(setIsPending(false));
        if (err.response && err.response.status === 404) {
          // console.log("Resource not found!");
          notify();
        }
      }
    };

    fetchErrandDetails();
  }, [slug]);

  const checkLogin = token();
  // console.log("checkLogin", checkLogin);

  const isPendingFromStore = useSelector(
    (store) => store?.searchProduct?.isPending
  );

  const userDetailsCollection = useSelector((store) => store?.userDetails);
  // console.log("userDetailsCollection", userDetailsCollection);

  return (
    <>
      {isPendingFromStore ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 image-text-container mb-5">
                {errandDetails?.images.length != 0 && (
                  <img
                    src={`${IMAGE_BASE_URL}${errandDetails?.images[0]?.image_path}`}
                    alt="allErrandsLargeImg"
                    className="img-fluid allErrands-image"
                    style={{ width: "435px", height: "541px" }}
                  />
                )}
                <div className="allErrands-text-container">
                  <h4 className="allErrands-text-heading">
                    {/* {parse(errandDetails?.description) || ""} */}
                    {errandDetails?.title}
                  </h4>
                  <p className="allErrands-text-paragraph">
                    {typeof errandDetails?.description === "string"
                      ? parse(errandDetails.description)
                      : ""}
                  </p>
                  <div className="allErrands-postedBy-Container">
                    <h5 className="allErrands-postedBy">{t("Posted by")}</h5>
                    <div className="d-flex align-items-center gap-2 allErrands-name-time-container">
                      <img
                        src={
                          errandDetails?.user?.photo
                            ? `${IMAGE_BASE_URL}${errandDetails?.user?.photo}`
                            : ourErrandsImage
                        }
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "80px",
                        }}
                      />
                      <div>
                        <h6 className="allErrands-name">
                          {`${errandDetails?.user?.name.slice(0, 1)}******`}
                        </h6>
                        <p className="allErrands-time">{errandDetails?.when}</p>
                      </div>
                    </div>

                    <div className="allErrands-Location">
                      {errandDetails?.region && (
                        <div className="allErrands-imageLocation">
                          <img src={allErrandsLocation} className="img-fluid" />
                          <div className="allErrands-region">
                            <div className="allErrands-regionName">
                              {t("Region")}
                            </div>
                            <div className="allErrands-regionPlace">
                              {errandDetails?.region?.name}
                            </div>
                          </div>
                        </div>
                      )}
                      {errandDetails?.town && (
                        <div>
                          <div className="allErrands-regionName">Town</div>
                          <div className="allErrands-regionPlace">
                            {errandDetails?.town?.name}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {userDetailsCollection?.active_subscription === true ? (
                    // <Button
                    //   variant="primary"
                    //   className="addErrands-blueButton"
                    //   // onClick={() => {
                    //   //   navigate("/all-errands");
                    //   // }}
                    // >
                    //   Login{" "}
                    //   <svg
                    //     width="29"
                    //     height="19"
                    //     viewBox="0 0 29 19"
                    //     fill="none"
                    //     xmlns="http://www.w3.org/2000/svg"
                    //   >
                    //     <mask id="path-1-inside-1_11151_10152" fill="white">
                    //       <path d="M0.5 0.5H28.5V18.5H0.5V0.5Z" />
                    //     </mask>
                    //     <path
                    //       d="M1.5 18.5V0.5H-0.5V18.5H1.5Z"
                    //       fill="white"
                    //       fill-opacity="0.5"
                    //       mask="url(#path-1-inside-1_11151_10152)"
                    //     />
                    //     <path
                    //       fill-rule="evenodd"
                    //       clip-rule="evenodd"
                    //       d="M18.0009 5L16.9434 6.0575L20.3784 9.5L16.9434 12.9425L18.0009 14L22.5009 9.5L18.0009 5Z"
                    //       fill="white"
                    //     />
                    //   </svg>
                    // </Button>
                    <>
                      <Button
                        variant="primary"
                        className="addErrands-blueButton"
                        onClick={() => {
                          dispatch(modalCallToggle());
                          dispatch(setCallModalTrue());
                          // setProductCall(item);
                        }}
                      >
                        <img
                          src={errandsCall}
                          alt="whatsappIcon"
                          style={{ marginRight: "12px" }}
                        />
                        Call
                      </Button>
                      {errandDetails?.user?.whatsapp_number && (
                        <Button
                          variant="primary"
                          className="products-whatsAppButton-green"
                          onClick={() => {
                            dispatch(modalCallToggle());
                            dispatch(setCallModalTrue());
                            // setProductCall(item);
                            setWhatsAppCall(true);
                          }}
                        >
                          <img src={whatsappIcon} alt="whatsappIcon" />
                          Chat on Whatsapp
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button
                      variant="primary"
                      className="errands-button-red"
                      onClick={() => {
                        dispatch(modalSubscriptionToggle());
                        dispatch(setSubscriptionModalTrue());
                      }}
                      // onClick={() => {
                      //   dispatch(modalErrandiaBoosterToggle());
                      //   dispatch(setErrandiaBoosterModalTrue());
                      // }}
                    >
                      Subscribe
                      {/* {t("Subscribe")} */}
                    </Button>
                  )}
                </div>
              </div>

              <RecentErrands />
            </div>
          </div>
          <CallPopUp
            setWhatsAppCall={setWhatsAppCall}
            whatsAppCall={whatsAppCall}
            errandDetails={errandDetails}
          />
        </>
      )}
      <SubscriptionBoxModal />
      {/* <ToastContainer /> */}
    </>
  );
};

export default AllErrands;
