import React from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import SecondAdBannerImage1 from "../../assets/SecondAdBannerImage1.jpeg";
import SecondAdBannerImage2 from "../../assets/SecondAdBannerImage2.jpeg";

const AdBannerCarouselMedium = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <div className="row">
          <div
            id="customCarousel"
            className="carousel slide col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 m-auto mt-4 mb-4"
            data-bs-ride="carousel"
            data-bs-interval="3000"
          >
            <div className="carousel-inner">
              <div
                className="carousel-item active"
                // onClick={() => {
                //   navigate("/business-profile-user-view");
                // }}
              >
                <div className="banner-box">
                  <div className="big-banner">
                    <img
                      className="d-block w-100"
                      src={SecondAdBannerImage1}
                      alt="First image"
                    />
                  </div>
                  <div className="small-banner">
                    <img
                      className="d-block w-100"
                      src={SecondAdBannerImage2}
                      alt="Second image"
                    />
                  </div>
                </div>
              </div>

              <div
                className="carousel-item"
                // onClick={() => {
                //   navigate("/business-profile-user-view");
                // }}
              >
                <div className="banner-box">
                  <div className="big-banner">
                    <img
                      className="d-block w-100"
                      src={SecondAdBannerImage2}
                      alt="Second image full"
                    />
                  </div>
                  <div className="small-banner">
                    <img
                      className="d-block w-100"
                      src={SecondAdBannerImage1}
                      alt="Third image"
                    />
                  </div>
                </div>
              </div>

              <div
                className="carousel-item"
                // onClick={() => {
                //   navigate("/business-profile-user-view");
                // }}
              >
                <div className="banner-box">
                  <div className="big-banner">
                    <img
                      className="d-block w-100"
                      src={SecondAdBannerImage1}
                      alt="Third image full"
                    />
                  </div>
                  <div className="small-banner">
                    <img
                      className="d-block w-100"
                      src={SecondAdBannerImage2}
                      alt="Fourth image"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#customCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#customCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdBannerCarouselMedium;
