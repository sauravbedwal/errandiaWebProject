import React, { useState } from "react";
import mobilePhoneAdgooglePlaystoreDownload from "../../assets/images/googlePlaystore1.png";
import mobilePhoneAdappstoreDownload from "../../assets/images/appleStore1.png";
import imgPhone from "../../assets/images/downloas-app-img.png";
import img1 from "../../assets/images/download-features-img1.png";
import img2 from "../../assets/images/download-features-img2.png";
import img3 from "../../assets/images/download-features-img3.png";
import $ from "jquery";
window.$ = $;
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import "../../i18n";

const DownloadApp = () => {

  const { t, i18n } = useTranslation();

  const testimonials = [
    {
      name: "Adrienne Besong",
      text: "Using Errandia has been of so much ease to me. Finding products without any form of inconvenience a has been the best thing for me as a stay home. Recommending this app to everyone ",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Marie-Claire",
      text: "Using Errandia has been of so much ease to me. Finding products without any form of inconvenience a has been the best thing for me as a stay home. Recommending this app to everyone ",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      name: "John Doe",
      text: "Using Errandia has been of so much ease to me. Finding products without any form of inconvenience a has been the best thing for me as a stay home. Recommending this app to everyone ",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Jane Smith",
      text: "Using Errandia has been of so much ease to me. Finding products without any form of inconvenience a has been the best thing for me as a stay home. Recommending this app to everyone ",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      name: "Michael Brown",
      text: "Using Errandia has been of so much ease to me. Finding products without any form of inconvenience a has been the best thing for me as a stay home. Recommending this app to everyone ",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  ];

  return (
    <>
      <section>
        <div className="container mt-5">
          <h3 className="download-app-head">
          {t("Ready To Kick-of Your Journey On Errandia?")} <br /> 
          {t("Download The Mobile App Now")}
          </h3>
          <div className="googleApple-images justify-content-center">
            <a
              href="https://play.google.com/store/apps/details?id=com.nishangsystems.errandia&hl=en_IN"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={mobilePhoneAdgooglePlaystoreDownload}
                alt="mobilePhoneAdgooglePlaystoreDownload"
              />
            </a>
            <a
              href="https://apps.apple.com/us/app/errandia/id6544787901"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={mobilePhoneAdappstoreDownload}
                alt="mobilePhoneAdappstoreDownload"
              />
            </a>
          </div>
          <div className="d-flex  justify-content-center mt-5">
            <img src={imgPhone} alt="" className="text-center app-mobile-img" />
          </div>
        </div>
      </section>
      <section className="download-features">
        <div className="container">
          <h4 className="text-white text-center">{t("FEATURES")}</h4>
          <h2 className="text-white text-center">
          {t("Explore The Best Of What Errandia Offers")}
          </h2>
          <div className="row mt-5">
            <div className="col-md-4 mb-3">
              <div className="d-flex justify-content-center">
                <img src={img1} className="app-mobile-img-card" alt="" />
              </div>
              <h4 className="text-white mt-5">{t("Connecting Sellers and Buyers")}</h4>
              <p className="text-white mt-3">
              {t("Errandia functions as an intermediary, facilitating connections between sellers and buyers in the business ecosystem. Sellers have the option to create listings on the platform to showcase their products and services.")}
              </p>
            </div>
            <div className="col-md-4 mb-3">
              <div className="d-flex justify-content-center">
                <img src={img2} className="app-mobile-img-card" alt="" />
              </div>
              <h4 className="text-white mt-5">{t("Role of Errandia")}</h4>
              <p className="text-white mt-3">
              {t(" At the core, Errandia provides the foundation for buyers and sellers to engage in business transactions. Beyond this pivotal role, the company has put in place a simple algorithm to ensure that buyers see only the products/services they are looking for and at the same time sellers will receive leads and notifications only for the products/services they have.")}
              </p>
            </div>
            <div className="col-md-4 mb-3">
              <div className="d-flex justify-content-center">
                <img src={img3} className="app-mobile-img-card" alt="" />
              </div>
              <h4 className="text-white mt-5">{t("24/7 Availability")}</h4>
              <p className="text-white mt-3">
              {t("The all-time availability of Errandia is an extra benefit for both retailers and vendors who are transitioning from offline selling to online selling. Sellers and buyers can contact each other at any time due to the availability. Time and space are no longer concerns for building supplier-buyer relationships.")}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <section>
        <div className="d-flex gap-2 p-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.36875 16.5L5.5875 11.2313L1.5 7.6875L6.9 7.21875L9 2.25L11.1 7.21875L16.5 7.6875L12.4125 11.2313L13.6313 16.5L9 13.7063L4.36875 16.5Z"
              fill="#F0B41F"
            />
          </svg>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.36875 16.5L5.5875 11.2313L1.5 7.6875L6.9 7.21875L9 2.25L11.1 7.21875L16.5 7.6875L12.4125 11.2313L13.6313 16.5L9 13.7063L4.36875 16.5Z"
              fill="#F0B41F"
            />
          </svg>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.36875 16.5L5.5875 11.2313L1.5 7.6875L6.9 7.21875L9 2.25L11.1 7.21875L16.5 7.6875L12.4125 11.2313L13.6313 16.5L9 13.7063L4.36875 16.5Z"
              fill="#F0B41F"
            />
          </svg>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.36875 16.5L5.5875 11.2313L1.5 7.6875L6.9 7.21875L9 2.25L11.1 7.21875L16.5 7.6875L12.4125 11.2313L13.6313 16.5L9 13.7063L4.36875 16.5Z"
              fill="#F0B41F"
            />
          </svg>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.6375 13.3687L9 11.9438L11.3625 13.3875L10.7437 10.6875L12.825 8.8875L10.0875 8.64375L9 6.09375L7.9125 8.625L5.175 8.86875L7.25625 10.6875L6.6375 13.3687ZM4.36875 16.5L5.5875 11.2313L1.5 7.6875L6.9 7.21875L9 2.25L11.1 7.21875L16.5 7.6875L12.4125 11.2313L13.6313 16.5L9 13.7063L4.36875 16.5Z"
              fill="#8697AA"
            />
          </svg>
        </div>
        <div className="container mt-5 mb-5">
          <h3 className="text-center">TESTIMONIALS</h3>
          <p className="text-center">
            Here what our users are saying about Errandia
          </p>
          <div className="testimonials-container">
            <Swiper
              breakpoints={{
                320: { slidesPerView: 1, centeredSlides: true },
                768: { slidesPerView: 1, centeredSlides: true },
                1024: { slidesPerView: 3, centeredSlides: true },
              }}
              spaceBetween={20}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              loop={true}
              modules={[Navigation]}
              className="testimonials-slider"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index} className="testimonial-slide">
                  <div className="testimonial-card">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="testimonial-img"
                    />
                    <h3>{testimonial.name}</h3>
                    <svg
                      width="107"
                      height="19"
                      viewBox="0 0 107 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.86875 17.293L6.0875 12.0242L2 8.48047L7.4 8.01172L9.5 3.04297L11.6 8.01172L17 8.48047L12.9125 12.0242L14.1313 17.293L9.5 14.4992L4.86875 17.293Z"
                        fill="#F0B41F"
                      />
                      <path
                        d="M26.8688 17.293L28.0875 12.0242L24 8.48047L29.4 8.01172L31.5 3.04297L33.6 8.01172L39 8.48047L34.9125 12.0242L36.1313 17.293L31.5 14.4992L26.8688 17.293Z"
                        fill="#F0B41F"
                      />
                      <path
                        d="M48.8688 17.293L50.0875 12.0242L46 8.48047L51.4 8.01172L53.5 3.04297L55.6 8.01172L61 8.48047L56.9125 12.0242L58.1313 17.293L53.5 14.4992L48.8688 17.293Z"
                        fill="#F0B41F"
                      />
                      <path
                        d="M70.8688 17.293L72.0875 12.0242L68 8.48047L73.4 8.01172L75.5 3.04297L77.6 8.01172L83 8.48047L78.9125 12.0242L80.1313 17.293L75.5 14.4992L70.8688 17.293Z"
                        fill="#F0B41F"
                      />
                      <path
                        d="M95.1375 14.1617L97.5 12.7367L99.8625 14.1805L99.2437 11.4805L101.325 9.68047L98.5875 9.43672L97.5 6.88672L96.4125 9.41797L93.675 9.66172L95.7563 11.4805L95.1375 14.1617ZM92.8688 17.293L94.0875 12.0242L90 8.48047L95.4 8.01172L97.5 3.04297L99.6 8.01172L105 8.48047L100.913 12.0242L102.131 17.293L97.5 14.4992L92.8688 17.293Z"
                        fill="#8697AA"
                      />
                    </svg>

                    <p>{testimonial.text}</p>
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 17H5L9 7H13L9 17H7ZM17 17H15L19 7H23L19 17H17Z"
                        fill="#D32F2F"
                      />
                    </svg>
                  </div>
                </SwiperSlide>
              ))}
              <div className="swiper-button-prev" style={{ fontSize: "40px" }}>
                <svg
                  width="76"
                  height="76"
                  viewBox="0 0 76 76"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_9924_29819)">
                    <path
                      d="M16 20C16 15.5817 19.5817 12 24 12H52C56.4183 12 60 15.5817 60 20V48C60 52.4183 56.4183 56 52 56H24C19.5817 56 16 52.4183 16 48V20Z"
                      fill="white"
                      shape-rendering="crispEdges"
                    />
                    <path
                      d="M16.5 20C16.5 15.8579 19.8579 12.5 24 12.5H52C56.1421 12.5 59.5 15.8579 59.5 20V48C59.5 52.1421 56.1421 55.5 52 55.5H24C19.8579 55.5 16.5 52.1421 16.5 48V20Z"
                      stroke="#F1F4FF"
                      shape-rendering="crispEdges"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M41.41 29.41L40 28L34 34L40 40L41.41 38.59L36.83 34L41.41 29.41Z"
                      fill="#8697AA"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_9924_29819"
                      x="0"
                      y="0"
                      width="76"
                      height="76"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="8" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.00784314 0 0 0 0 0 0 0 0 0 0.32549 0 0 0 0.1 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_9924_29819"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_9924_29819"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className="swiper-button-next" style={{ fontSize: "40px" }}>
                <svg
                  width="76"
                  height="76"
                  viewBox="0 0 76 76"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_9924_29820)">
                    <path
                      d="M16 20C16 15.5817 19.5817 12 24 12H52C56.4183 12 60 15.5817 60 20V48C60 52.4183 56.4183 56 52 56H24C19.5817 56 16 52.4183 16 48V20Z"
                      fill="white"
                      shape-rendering="crispEdges"
                    />
                    <path
                      d="M16.5 20C16.5 15.8579 19.8579 12.5 24 12.5H52C56.1421 12.5 59.5 15.8579 59.5 20V48C59.5 52.1421 56.1421 55.5 52 55.5H24C19.8579 55.5 16.5 52.1421 16.5 48V20Z"
                      stroke="#F1F4FF"
                      shape-rendering="crispEdges"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M35.9998 28L34.5898 29.41L39.1698 34L34.5898 38.59L35.9998 40L41.9998 34L35.9998 28Z"
                      fill="#8697AA"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_9924_29820"
                      x="0"
                      y="0"
                      width="76"
                      height="76"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="8" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.00784314 0 0 0 0 0 0 0 0 0 0.32549 0 0 0 0.1 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_9924_29820"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_9924_29820"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
            </Swiper>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default DownloadApp;
