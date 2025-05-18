import React from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import ThirdAdBannerImage1 from "../../assets/ThirdAdBannerImage1.jpeg";
import ThirdAdBannerImage2 from "../../assets/ThirdAdBannerImage2.jpeg";
import ThirdAdBannerImage3 from "../../assets/ThirdAdBannerImage3.jpeg";

const AdBannerCarouselsmall = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <div className="row">
          <div
            id="threeImageCarousel"
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
                <div className="banner-buttonbox justify-content-between">
                  <div className="image-box">
                    <img
                      className="d-block w-100"
                      src={ThirdAdBannerImage1}
                      alt="First image"
                    />
                  </div>
                  <div className="image-box">
                    <img
                      className="d-block w-100"
                      src={ThirdAdBannerImage2}
                      alt="Second image"
                    />
                  </div>
                  <div className="image-box1">
                    <img
                      className="d-block w-100"
                      src={ThirdAdBannerImage3}
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
                <div className="banner-buttonbox justify-content-between">
                  <div className="image-box">
                    <img
                      className="d-block w-100"
                      src={ThirdAdBannerImage1}
                      alt="Fourth image"
                    />
                  </div>
                  <div className="image-box">
                    <img
                      className="d-block w-100"
                      src={ThirdAdBannerImage2}
                      alt="Fifth image"
                    />
                  </div>
                  <div className="image-box1">
                    <img
                      className="d-block w-100"
                      src={ThirdAdBannerImage3}
                      alt="Sixth image"
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
                <div className="banner-buttonbox justify-content-between">
                  <div className="image-box">
                    <img
                      className="d-block w-100"
                      src={ThirdAdBannerImage1}
                      alt="Seventh image"
                    />
                  </div>
                  <div className="image-box">
                    <img
                      className="d-block w-100"
                      src={ThirdAdBannerImage2}
                      alt="Eighth image"
                    />
                  </div>
                  <div className="image-box1">
                    <img
                      className="d-block w-100"
                      src={ThirdAdBannerImage3}
                      alt="Ninth image"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#threeImageCarousel"
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
              data-bs-target="#threeImageCarousel"
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

export default AdBannerCarouselsmall;
