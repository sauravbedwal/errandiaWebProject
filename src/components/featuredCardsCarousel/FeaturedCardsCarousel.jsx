import React, { useRef, useEffect, useState } from "react";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import featureCardsImage from "../../assets/featureCardsImage.svg";
import featureCardsImage2 from "../../assets/featureCardsImage2.svg";
import featureCardsImage3 from "../../assets/featureCardsImage3.svg";
import featureCardsLocation from "../../assets/featureCardsLocation.svg";
import featureCardsLocation2 from "../../assets/featureCardsLocation2.svg";
import leftArrowCarousal from "../../assets/leftArrowCarousal.svg";
import rightArrowCarousel from "../../assets/rightArrowCarousel.svg";
import { useNavigate } from "react-router-dom";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import { token } from "../../utils/utils";
import { featuredList } from "../../utils/featuredDataSlice";
import { useTranslation } from "react-i18next";
import Loader from "../loader/Loader";

const FeaturedCardsCarousel = () => {
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);

  const featuredListData = useSelector((store) => store.featuredData);

  // console.log("featuredListData", featuredListData);

  useEffect(() => {
    // console.log("Checking featuredListData", featuredListData);

    if (!featuredListData) {
      const featuredListHandler = async () => {
        try {
          setLoader(true);
          const res = await getApi(apis.featured, token());
          console.log("API Response:", res);

          if (res.data?.data?.items) {
            // console.log(res.data?.data?.items)
            dispatch(featuredList(res.data.data.items));
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

      featuredListHandler();
    }
  }, [dispatch, featuredListData]);

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

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleScrollRight();
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const colors = ["#020053", "#CED4FF", "#F1F4FF"];
  const textColors = ["#fff", "#000", "#000"];
  const textColors2 = ["#413FFF", "#413FFF", "#413FFF"];

  const navigate = useNavigate();
  const { t } = useTranslation();

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
    const fontBase64 = "data:font/woff2;base64,PUT_YOUR_BASE64_FONT_HERE";

    const svg = `
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style type="text/css">
                    @font-face {
                        font-family: 'Inter';
                        src: url('${fontBase64}') format('woff2');
                    }
                    text {
                        font-family: 'Inter', sans-serif;
                        font-size: 40px;
                        fill: #fff;
                        text-anchor: middle;
                        dominant-baseline: middle;
                    }
                </style>
            </defs>
            <rect width="100" height="100" fill="#1006ac"/>
            <text x="50%" y="50%">${initials}</text>
        </svg>`;

    return `data:image/svg+xml;base64,${btoa(
      unescape(encodeURIComponent(svg))
    )}`;
  };

  return (
    <>
      {featuredListData && featuredListData.length != 0 && (
        <>
          <div className="container d-flex align-items-center justify-content-between featured-button-box mt-5 mb-2">
            <h4 className="section-heading">{t("Featured")} </h4>
            <div className="d-flex align-items-center gap-3 arrowsBox">
              <div className="arrowContainer" onClick={handleScrollLeft}>
                <img src={leftArrowCarousal} alt="leftArrowCarousal" />
              </div>
              <div className="arrowContainer" onClick={handleScrollRight}>
                <img src={rightArrowCarousel} alt="rightArrowCarousel" />
              </div>
            </div>
          </div>
          <div className="container" onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}>
            <div
              className="d-flex overflow-auto featuredCardsCarousel"
              ref={scrollRef}
            >
              {loader && <Loader />}

              {featuredListData &&
                featuredListData.slice(0, 20).map((feature, index) => {
                  const backgroundColor = colors[index % 3];
                  const textColor = textColors[index % 3];
                  const textColor2 = textColors2[index % 3];
                  const initials = getInitials(feature?.name);

                  // console.log("initials", initials);
                  const fallbackImage = createFallbackImage(initials);
                  return (
                    <div
                      key={index}
                      className="card card-container col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10 mt-4 mb-4 featureContainerMobile"
                      onClick={() => {
                        navigate(
                          `/business-profile-user-view/${feature?.slug}`
                        );
                      }}
                      style={{ backgroundColor, color: textColor }}
                    >
                      <div className="card-body">
                        <div className="d-flex justify-content-around">
                          <img
                            className="featuredCardsMobileImage"
                            src={
                              feature?.image
                                ? `${IMAGE_BASE_URL}${feature.image}`
                                : fallbackImage
                            }
                            alt="Feature Image"
                            onError={(e) => {
                              e.target.src = featureCardsImage2;
                            }}
                          />
                          <div>
                            <h5
                              className="card-title featureCard-heading"
                              style={{ color: textColor }}
                            >
                              {feature?.name.length > 12
                                ? `${feature?.name.substring(0, 12)}...`
                                : feature?.name}
                            </h5>
                            <h6
                              className="card-subtitle mb-2 "
                              style={{ color: textColor2 }}
                            >
                              {feature?.category?.name.length > 20
                                ? `${feature?.category?.name.substring(
                                    0,
                                    20
                                  )}...`
                                : feature?.category?.name}
                            </h6>
                            <h8>Premium</h8>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-3 feautersLocationTextIcon mt-3">
                          <img src={featureCardsLocation} alt="Location Icon" />
                          <p
                            className="feautersLocationText"
                            style={{ color: textColor }}
                          >
                            {feature?.region?.name || "Location Not Available"}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <button
              type="button"
              class="btn btn-primary btn-lg businessNearYouButton mb-5"
              onClick={() => {
                navigate("/featured-business");
              }}
            >
              {t("View all")}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default FeaturedCardsCarousel;
