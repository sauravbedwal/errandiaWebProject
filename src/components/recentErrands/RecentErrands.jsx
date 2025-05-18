import React, { useRef, useEffect, useState } from "react";
import "../../App.css";
import leftArrowCarousal from "../../assets/leftArrowCarousal.svg";
import addedErrandsImage from "../../assets/addedErrandsImage2.svg";
import rightArrowCarousel from "../../assets/rightArrowCarousel.svg";
import { Link, useNavigate } from "react-router-dom";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import { token } from "../../utils/utils";
import { recentErrandsList } from "../../utils/recentErrandsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";
import Loader from "../loader/Loader";

const RecentErrands = () => {
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);

  const recentErrandsListData = useSelector(
    (store) => store?.recentErrandsData
  );

  console.log("recentErrandsListData home", recentErrandsListData);

  useEffect(() => {
    // console.log("Checking featuredListData", recentErrandsListData);

    if (!recentErrandsListData) {
      const recentErrandsListHandler = async () => {
        try {
          setLoader(true);
          const res = await getApi(apis.recentErrands, token());
          // console.log("API Response:", res);

          if (res.data?.data?.items) {
            // console.log(res.data?.data?.items)
            dispatch(recentErrandsList(res.data.data.items));
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

      recentErrandsListHandler();
    }
  }, [recentErrandsListData]);

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

  const navigate = useNavigate();
  const { t } = useTranslation();

  const isTokenAvailable = token();

  return (
    <>
      {recentErrandsListData && recentErrandsListData != 0 && (
        <>
          <div
            className="container d-flex align-items-center justify-content-between mt-5"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <h4 className="section-heading">{t("Recent Errands")}</h4>
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
            <div className="d-flex recentErrandsCardsCarousel" ref={scrollRef}>
              {loader && <Loader />}
              {/* s */}
              {recentErrandsListData &&
                recentErrandsListData.slice(0, 20).map((errands, index) => (
                  <div
                    // className="card recentErrandsCard-container"
                    // style={{ width: "15rem" }}
                    key={index}
                    onClick={() => {
                      if (isTokenAvailable) {
                        navigate(`/errand-single/${errands.id}`);
                      }
                      if (!isTokenAvailable) {
                        navigate("/login");
                      }
                    }}
                  >
                    {/* <div className="card-body recentErrands-Image-Card-container"> */}
                    {/* <div> */}
                    <div
                      className="recentErrandsImageContainer3  col-xl-8 col-lg-8 col-md-6 col-sm-6 col-6 mt-4 mb-1 me-3"
                      style={{ cursor: "pointer" }}
                    >
                      {/* <img src={IMAGE_BASE_URL`${errands?.images?.image_path}`} alt="image" /> */}
                      <img
                        className="recentErrandsImageContainer3"
                        src={
                          Array.isArray(errands?.images) &&
                          errands.images.length > 0
                            ? `${IMAGE_BASE_URL}${errands.images[0].image_path}`
                            : addedErrandsImage
                        }
                        alt="Feature Image"
                        onError={(e) => {
                          e.target.src = addedErrandsImage;
                        }}
                      />
                    </div>
                    {/* <div> */}
                    <div className="recentErrandsCard-preHeading">
                      {errands?.when}
                    </div>
                    <h5 className="card-title recentErrandsCard-heading mt-2">
                      {parse(
                        errands?.description.length > 25
                          ? `${errands?.description.substring(0, 25)}...`
                          : errands?.description
                      )}
                    </h5>
                    {/* </div> */}
                    {/* </div> */}
                    {/* </div> */}
                  </div>
                ))}
            </div>{" "}
            <button
              type="button"
              className="btn btn-primary btn-lg recentErrandsButton mb-3 mt-5"
              onClick={() => {
                navigate("/all-errands");
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

export default RecentErrands;
