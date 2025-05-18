import React, { useRef, useEffect, useState } from "react";
import "../../App.css";
import leftArrowCarousal from "../../assets/leftArrowCarousal.svg";
import rightArrowCarousel from "../../assets/rightArrowCarousel.svg";
import pharmaciesImage from "../../assets/images/pharmaciesImage.svg";
import pharmaciesFoundLocation from "../../assets/pharmaciesFoundLocation.svg";
import businessNearYouLocationIcon from "../../assets/businessNearYouLocationIcon.svg";
import pharmaciesCall from "../../assets/pharmaciesCall.svg";
import tickPharmaciesOpen from "../../assets/tickPharmaciesOpen.svg";
import { useNavigate } from "react-router-dom";
import CallPopUp from "../callPopUp/CallPopUp";
import { modalCallToggle, setCallModalTrue } from "../../utils/callModalSlice";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import { token } from "../../utils/utils";
import { pharmaciesList } from "../../utils/pharmaciesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { addSearchPharmacies } from "../../utils/searchPharmaciesSlice";
import { ToastContainer, toast } from "react-toastify";
import { addSearchBusiness } from "../../utils/searchBusinessSlice";
import {
  region,
  selectedCall,
  selectedRegion,
  selectedTown,
  town,
} from "../../utils/searchProductSlice";
import Loader from "../loader/Loader";

const Pharmacies = () => {
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);

  const pharmaciesListData = useSelector((store) => store.pharmaciesData);

  // console.log("pharmaciesListData", pharmaciesListData);

  useEffect(() => {
    // console.log("Checking pharmaciesListData", pharmaciesListData);

    if (!pharmaciesListData) {
      const pharmaciesListHandler = async () => {
        try {
          setLoader(true);
          const res = await getApi(apis.pharmacies, token());
          // console.log("API Response:", res);

          if (res.data?.data?.items) {
            // console.log(res.data?.data?.item);
            dispatch(pharmaciesList(res.data.data.items));
          } else {
            console.error("Unexpected API response format:", res);
          }
        } catch (err) {
          console.log("API Error:", err);
          if (err.response && err.response.status === 404) {
            console.log("Resource not found!");
          }
        } finally {
          setLoader(false);
        }
      };

      pharmaciesListHandler();
    }
  }, [dispatch, pharmaciesListData]);

  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleScrollLeft = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

    if (scrollLeft + clientWidth >= scrollWidth) {
      // Reset scroll to the start when reaching the end
      scrollRef.current.scrollTo({ left: 0, behavior: "instant" });
    } else {
      scrollRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  // useEffect(() => {
  //   if (isPaused) return;

  //   const interval = setInterval(() => {
  //     handleScrollRight();
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, [isPaused]);

  const navigate = useNavigate();
  const { t } = useTranslation();

  // const notify = () => toast("Oops! The request was not found.");

  const regionFromStore = useSelector((store) => store.searchProduct.region);
  // console.log("regionFromStore", regionFromStore);

  const townsFromStore = useSelector((store) => store.searchProduct.town);
  // console.log("townsFromStore", townsFromStore);

  const distanceFromStore = useSelector(
    (store) => store.searchProduct.addDistance
  );
  // console.log("distanceFromStore", distanceFromStore);

  const searchPharmaciesHandler = async () => {
    try {
      const params = new URLSearchParams({
        q: "",
        region: regionFromStore ? regionFromStore : "",
        town: townsFromStore ? townsFromStore : "",
        distance: distanceFromStore ? distanceFromStore : "",
        // page: "1",
        // latitude: "10",
        // longitude: "10",
        // per_page: "10",
        // street: "test",
        // date: "2025-02-12",
      });
      const res = await getApi(apis.searchPharmacies + `?${params.toString()}`);
      // console.log("searchPharmaciesHandler", res);
      dispatch(addSearchPharmacies(res.data.data.items));
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 404) {
        console.log("Resource not found!");
        notify();
      }
    }
  };

  const openGoogleMaps = async (latitude, longitude) => {
    try {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error getting location:", error);
      alert("Unable to retrieve your location.");
    }
  };

  const [pharmacy, setPharmacy] = useState(null);

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // console.log(getTodayDate());

  const todaysDate = getTodayDate();
  // console.log("todaysDate", todaysDate);
  return (
    <>
      {pharmaciesListData && pharmaciesListData != 0 && (
        <>
          <div
            className="container d-flex align-items-center justify-content-between mt-5"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <h4 className="section-heading">{t("Pharmacies")}</h4>
            <div className="d-flex align-items-center gap-3 arrowsBox">
              <div className="arrowContainer" onClick={handleScrollLeft}>
                <img src={leftArrowCarousal} alt="leftArrowCarousal" />
              </div>
              <div className="arrowContainer" onClick={handleScrollRight}>
                <img src={rightArrowCarousel} alt="rightArrowCarousel" />
              </div>
            </div>
          </div>
          <div className="container">
            <div
              className="d-flex flex-column overflow-auto pharmaciesCardsCarousel"
              ref={scrollRef}
            >
              <div style={{ display: "flex" }}>
                {loader && <Loader />}
                {/* {console.log(
              "Checking pharmaciesListData before render:",
              pharmaciesListData
            )} */}
                {Array.isArray(pharmaciesListData) &&
                pharmaciesListData.length > 0 ? (
                  pharmaciesListData.slice(0, 20).map((pharmacies, index) => {
                    const { latitude, longitude } = pharmacies;

                    const pharmaciesDate = pharmacies?.on_calls.filter(
                      (date) => {
                        return date?.on_call_date === todaysDate;
                      }
                    );
                    // console.log("pharmaciesDate", pharmaciesDate);

                    const nextPharmacyDate = pharmacies?.on_calls
                      .map((call) => call.on_call_date)
                      .filter((date) => date > todaysDate)
                      .sort((a, b) => new Date(a) - new Date(b))[0];
                    // console.log("nextPharmacyDate", nextPharmacyDate);

                    return (
                      <div
                        className="card card-container-pharmacies me-3 col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10 mt-4"
                        style={{ width: "36rem" }}
                        key={index}
                      >
                        <div className="row">
                          <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 open-container">
                            <div className="card-body">
                              <div className="d-flex gap-3">
                                <img
                                  style={{
                                    cursor: "pointer",
                                    width: "95px",
                                    height: "95px",
                                    borderRadius: "20px",
                                  }}
                                  onClick={() => {
                                    navigate(
                                      `/single-pharmacies/${pharmacies.id}`
                                    );
                                  }}
                                  className="pharmaciesImage"
                                  // src={pharmacies?.cover_image_path}
                                  src={
                                    pharmacies?.cover_image_path
                                      ? `${IMAGE_BASE_URL}${pharmacies?.cover_image_path}`
                                      : pharmaciesImage
                                  }
                                  onError={(e) => {
                                    e.target.src = pharmaciesImage;
                                  }}
                                />

                                <div>
                                  {pharmacies?.location_address && (
                                    <div
                                      className="d-flex align-items-center gap-2 pharmaciesLocationTextIcon mt-3"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        navigate(
                                          `/single-pharmacies/${pharmacies.id}`
                                        );
                                      }}
                                    >
                                      <img
                                        src={businessNearYouLocationIcon}
                                        alt="Location Icon"
                                      />
                                      <p className="pharmaciesLocationText">
                                        {pharmacies?.location_address.length >
                                        20
                                          ? `${pharmacies?.location_address.substring(
                                              0,
                                              20
                                            )}...`
                                          : pharmacies?.location_address}
                                      </p>
                                    </div>
                                  )}
                                  <h6
                                    className="card-subtitle mt-2 text-muted pharmaciesCard-subHeading"
                                    style={{
                                      color: "wheat",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      navigate(
                                        `/single-pharmacies/${pharmacies.id}`
                                      );
                                    }}
                                  >
                                    {pharmacies?.name.length > 20
                                      ? `${pharmacies?.name.substring(
                                          0,
                                          20
                                        )}...`
                                      : pharmacies?.name}
                                  </h6>

                                  <div className="pharmacies-buttons-container">
                                    <button
                                      type="button"
                                      class="btn btn-primary btn-lg pharmaciesButton"
                                      onClick={() => {
                                        dispatch(modalCallToggle());
                                        dispatch(setCallModalTrue());
                                        setPharmacy(pharmacies);
                                      }}
                                    >
                                      <img src={pharmaciesCall} />
                                      {t("Call")}
                                    </button>

                                    <button
                                      type="button"
                                      class="btn btn-primary btn-lg pharmacies-location-whiteButton"
                                      onClick={() => {
                                        openGoogleMaps(latitude, longitude);
                                      }}
                                    >
                                      {t("Go There")}
                                      <img src={pharmaciesFoundLocation} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                            <div
                              style={{ padding: "0 1rem", cursor: "pointer" }}
                              onClick={() => {
                                navigate(`/single-pharmacies/${pharmacies.id}`);
                              }}
                            >
                              <div className="d-flex align-items-center gap-2 pharmaciesLocationTextIcon">
                                <p className="pharmaciesLocationText-open">
                                  {t("Street")}
                                </p>
                              </div>
                              <h6 className="card-subtitle mb-2 text-muted pharmaciesCard-subHeading-open">
                                {pharmacies?.street.length > 20
                                  ? `${pharmacies?.street.substring(0, 20)}...`
                                  : pharmacies?.street}
                              </h6>

                              {pharmaciesDate && pharmaciesDate.length != 0 && (
                                <button class="pharmaciesButton-open">
                                  <img src={tickPharmaciesOpen} />
                                  {t("open")}
                                </button>
                              )}
                              {pharmacies?.on_calls.length != 0 &&
                                nextPharmacyDate && (
                                  <div>
                                    <h6 className="card-subtitle mt-1 mb-2 text-muted">
                                      <span className="pharmaciesCard-subHeading-status">
                                        {t("Reopening")}:
                                      </span>
                                      <span className="pharmaciesCard-subHeading-date ms-2">
                                        {nextPharmacyDate}
                                      </span>
                                    </h6>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>{t("No pharmacies available ")}</p>
                )}
              </div>
            </div>
            <button
              type="button"
              class="btn btn-primary btn-lg pharmacies-ViewButton mt-4"
              onClick={() => {
                // dispatch(region(null));
                // dispatch(town(null));
                dispatch(region(null));
                dispatch(town(null));
                dispatch(selectedRegion(null));
                dispatch(selectedTown(null));
                dispatch(selectedCall(null));
                // searchPharmaciesHandler();
                navigate("/search-pharmacies");
              }}
            >
              {t("View all")}
            </button>
          </div>
        </>
      )}

      <CallPopUp pharmacy={pharmacy} />
      {/* <ToastContainer /> */}
    </>
  );
};

export default Pharmacies;
