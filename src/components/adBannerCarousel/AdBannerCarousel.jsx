import React from "react";
import { useNavigate } from "react-router-dom";
// import "../../App.css";
import FirstAdBannerImage1 from "../../assets/FirstAdBannerImage1.jpeg";
import FirstAdBannerImage2 from "../../assets/FirstAdBannerImage2.jpeg";
import Location from "../location/Location";

const AdBannerCarousel = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="mobileView">
        <Location />
      </div>
      <div className="container">
        <div className="row">
          <div
            id="carouselExampleControls"
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
                <img
                  className="d-block w-100"
                  src={FirstAdBannerImage1}
                  alt="First slide"
                />
              </div>
              <div
                className="carousel-item"
                // onClick={() => {
                //   navigate("/business-profile-user-view");
                // }}
              >
                <img
                  className="d-block w-100"
                  src={FirstAdBannerImage2}
                  alt="Second slide"
                />
              </div>
              <div
                className="carousel-item"
                // onClick={() => {
                //   navigate("/business-profile-user-view");
                // }}
              >
                <img
                  className="d-block w-100"
                  src={FirstAdBannerImage2}
                  alt="Third slide"
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
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
              data-bs-target="#carouselExampleControls"
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

export default AdBannerCarousel;
