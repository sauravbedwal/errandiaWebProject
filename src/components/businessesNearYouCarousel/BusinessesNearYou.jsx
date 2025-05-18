import React, { useRef, useEffect, useState } from "react";
import "../../App.css";
import featureCardsImage from "../../assets/featureCardsImage.svg";
import featureCardsImage3 from "../../assets/featureCardsImage3.svg";
import featureCardsImage2 from "../../assets/featureCardsImage2.svg";
import featureCardsImage4 from "../../assets/featureCardsImage4.svg";
import featureCardsImage6 from "../../assets/featureCardsImage6.svg";
import businessNearYouLocationIcon from "../../assets/businessNearYouLocationIcon.svg";
import leftArrowCarousal from "../../assets/leftArrowCarousal.svg";
import rightArrowCarousel from "../../assets/rightArrowCarousel.svg";
import { useNavigate } from "react-router-dom";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import { token } from "../../utils/utils";
import { businessNearYouList } from "../../utils/businessNearYouSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import { addSearchBusiness } from "../../utils/searchBusinessSlice";
import {
  region,
  selectedRegion,
  selectedTown,
  town,
} from "../../utils/searchProductSlice";
import Loader from "../loader/Loader";

const BusinessesNearYou = () => {
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);

  const [filteredBusinesses, setFilteredBusinesses] = useState([]);

  const businessNearYouListData = useSelector(
    (store) => store.businessNearYouData
  );

  useEffect(() => {
    // console.log("Checking businessNearYouData", businessNearYouListData);

    if (!businessNearYouListData) {
      const businessNearYouListHandler = async () => {
        try {
          setLoader(true);
          const res = await getApi(apis.businessNearYou, token());
          // console.log("API Response:", res);

          if (res.data?.data?.items) {
            // console.log(res.data?.data?.items);
            dispatch(businessNearYouList(res.data.data.items));
          } else {
            console.error("Unexpected API response format:", res);
          }
        } catch (err) {
          // console.log("API Error:", err);
          if (err.response && err.response.status === 404) {
            // console.log("Resource not found!");
          }
        } finally {
          setLoader(false);
        }
      };

      businessNearYouListHandler();
    }
  }, [dispatch, businessNearYouListData]);

  // Get user's current location
  useEffect(() => {
    if (businessNearYouListData) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;

          // console.log("User Location:", userLat, userLon);

          const filtered = businessNearYouListData.filter((business) => {
            if (business.latitude && business.longitude) {
              const distance = getDistanceFromLatLonInKm(
                userLat,
                userLon,
                business.latitude,
                business.longitude
              );
              return distance <= 10;
            }
            return false;
          });

          // console.log("Filtered Businesses:", filtered);
          setFilteredBusinesses(filtered);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, [businessNearYouListData]);

  // Haversine formula to calculate distance between two coordinates
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

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

  const searchBusinessHandler = async () => {
    try {
      const params = new URLSearchParams({
        q: "",
        region: regionFromStore ? regionFromStore : "",
        town: townsFromStore ? townsFromStore : "",
        distance: distanceFromStore ? distanceFromStore : "",
        // page: "1",
        // latitude: "4.152914",
        // longitude: "9.2952491",
        // per_page: "10",
        // category: "1",
      });

      const res = await getApi(apis.searchBusiness + `?${params.toString()}`);
      // console.log("searchBusinessHandler", res);
      dispatch(addSearchBusiness(res.data.data.items));
    } catch (err) {
      // console.log(err);
      if (err.response && err.response.status === 404) {
        // console.log("Resource not found!");
        notify();
      }
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
            <rect width="100" height="100" fill="#1006ac "/>
            <text x="50%" y="50%" font-size="40" text-anchor="middle" fill="#fff" dy=".3em">${initials}</text>
        </svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  return (
    <>
      {filteredBusinesses.length > 0 && (
        <div
          className="container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="container d-flex align-items-center justify-content-between mt-2">
            <h4 className="section-heading">{t("Businesses Near You")}</h4>

            <div className="d-flex align-items-center gap-3 arrowsBox">
              <div className="arrowContainer" onClick={handleScrollLeft}>
                <img src={leftArrowCarousal} alt="leftArrowCarousal" />
              </div>
              <div className="arrowContainer" onClick={handleScrollRight}>
                <img src={rightArrowCarousel} alt="rightArrowCarousel" />
              </div>
            </div>
          </div>

          <div
            className="d-flex overflow-auto businessNearYoudCardsCarousel"
            ref={scrollRef}
          >
            {loader && <Loader />}

            {filteredBusinesses.slice(0, 20).map((business, index) => {
              const initials = getInitials(business?.name);
              const fallbackImage = createFallbackImage(initials);
              return (
                <div
                  key={index}
                  className="card businessCard-container col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10 mt-4 mb-4"
                  style={{ width: "12rem" }}
                  onClick={() => {
                    navigate(`/business-profile-user-view/${business?.slug}`);
                  }}
                >
                  <div className="card-body">
                    <div>
                      <div className="businessImageContainer">
                        <img
                          className="businessImage"
                          src={
                            business?.image_path
                              ? `${IMAGE_BASE_URL}${business?.image_path}`
                              : fallbackImage
                          }
                          onError={(e) => {
                            e.target.src = fallbackImage;
                          }}
                        />
                      </div>
                      <div>
                        <div className="businessNearYouCard-preHeading">
                          {business?.category?.name}
                        </div>
                        <h5 className="card-title businessNearYouCard-heading mt-2">
                          {business?.name.length > 15
                            ? `${business?.name.substring(0, 15)}...`
                            : business?.name}
                        </h5>
                      </div>
                    </div>
                    {business?.address ? (
                      <div className="d-flex align-items-center businessNearYouTextIcon mt-3 businessLocationAndText">
                        <img
                          src={businessNearYouLocationIcon}
                          alt="Location Icon"
                        />
                        <p className="businessNearYouText">
                          {business?.address.length > 15
                            ? `${business?.address.substring(0, 15)}...`
                            : business?.address}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="btn btn-primary btn-lg businessNearYouButton"
            onClick={() => {
              dispatch(region(null));
              dispatch(town(null));
              dispatch(selectedRegion(null));
              dispatch(selectedTown(null));
              searchBusinessHandler();
              navigate("/all-business-profile");
            }}
          >
            {t("View all")}
          </button>
        </div>
      )}
      {/* <ToastContainer /> */}
    </>
  );
};

export default BusinessesNearYou;
