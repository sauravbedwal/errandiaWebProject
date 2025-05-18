import React, { useRef, useEffect, useState } from "react";
import "../../App.css";
import leftArrowCarousal from "../../assets/leftArrowCarousal.svg";
import rightArrowCarousel from "../../assets/rightArrowCarousel.svg";
import ourErrandsImage from "../../assets/images/errandos-image.png";
import ourErrandsImage2 from "../../assets/images/ourErrandsImage2.svg";
import ourErrandsImage3 from "../../assets/images/ourErrandsImage3.svg";
import ourErrandsImage4 from "../../assets/images/ourErrandsImage4.svg";
import locationOurErrando from "../../assets/locationOurErrando.svg";
import starOurErrando from "../../assets/starOurErrando.svg";
import { useNavigate } from "react-router-dom";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import { token } from "../../utils/utils";
import { errandosList } from "../../utils/errandosSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { selectedRegion, selectedTown } from "../../utils/searchProductSlice";
import Loader from "../loader/Loader";

const OurErrandos = () => {
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);

  const [errandosData, setErrandosData] = useState();

  // const errandosListData = useSelector((store) => store.errandosData);
  // console.log("errandosListData", errandosListData);

  useEffect(() => {
    // if (!errandosListData) {
    const errandosListHandler = async () => {
      try {
        setLoader(true);
        const res = await getApi(apis.errandos);
        // console.log("API Response:", res);
        setLoader(false);
        if (res.data?.data?.items) {
          // console.log(res.data?.data?.items);
          dispatch(errandosList(res.data.data.items));
          setErrandosData(res.data.data.items);
        } else {
          console.error("Unexpected API response format:", res);
        }
      } catch (err) {
        setLoader(false);
        console.log("API Error:", err);
        if (err.response && err.response.status === 404) {
          console.log("Resource not found!");
        }
      }
    };

    errandosListHandler();
    // }
  }, []);

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
  return (
    <>
      {errandosData && errandosData != 0 && (
        <>
          <div
            className="container d-flex align-items-center justify-content-between"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <h4 className="section-heading">{t("Our Errandos")}</h4>
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
              className="d-flex overflow-auto ourErrandosCardsCarousel"
              ref={scrollRef}
            >
              {loader && <Loader />}

              {errandosData &&
                errandosData.slice(0, 20).map((errandos, index) => (
                  <div
                    className="card ourErrandosCard-container col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10 mt-4 mb-4"
                    // me-3
                    style={{ width: "12rem", cursor: "pointer" }}
                    key={index}
                  >
                    <div
                      className="card-body"
                      onClick={() => {
                        navigate(`/errando-profile/${errandos.id}`);
                      }}
                    >
                      <div>
                        <div className="ourErrandosImageContainer">
                          <img
                            style={{
                              width: "167px",
                              height: "167px",
                              borderRadius: "20px",
                            }}
                            className="ourErrandosImage"
                            src={
                              errandos?.photo
                                ? `${IMAGE_BASE_URL}${errandos?.photo}`
                                : ourErrandsImage
                            }
                            onError={(e) => {
                              e.target.src = ourErrandsImage;
                            }}
                          />
                        </div>
                        <div>
                          <h5 className="card-title ourErrandosCard-heading mt-2">
                            {errandos?.name.length > 15
                              ? `${errandos?.name.substring(0, 15)}...`
                              : errandos?.name}
                          </h5>
                        </div>
                      </div>
                      {errandos?.address && (
                        <div className="d-flex align-items-center ourErrandosTextIcon mt-3 ourErrandosLocationAndText">
                          <img src={locationOurErrando} alt="Location Icon" />
                          <p className="ourErrandosText">
                            {errandos.address.length > 15
                              ? `${errandos.address.substring(0, 15)}...`
                              : errandos.address}
                          </p>
                        </div>
                      )}
                      {typeof errandos?.ratings_count !== "undefined" &&
                        typeof errandos?.reviews_count !== "undefined" && (
                          <div className="d-flex align-items-center ourErrandosTextIcon mt-3 ourErrandosLocationAndText">
                            <img src={starOurErrando} alt="Review Icon" />
                            <p className="ourErrandosText">
                              {errandos.ratings_count} ({errandos.reviews_count}{" "}
                              reviews)
                            </p>
                          </div>
                        )}
                    </div>
                  </div>
                ))}
            </div>
            <button
              type="button"
              class="btn btn-primary btn-lg ourErrandosButton"
              onClick={() => {
                dispatch(selectedRegion(null));
                dispatch(selectedTown(null));
                navigate("/errandos");
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

export default OurErrandos;
