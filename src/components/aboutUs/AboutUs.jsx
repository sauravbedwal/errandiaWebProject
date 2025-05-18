import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import aboutImage from "../../assets/images/about-us-img.png";
import aboutImageVision from "../../assets/images/about-vision.png";
import aboutImageMission from "../../assets/images/about-mission.png";
import team1 from "../../assets/images/team1.png";
import team2 from "../../assets/images/team2.png";
import team3 from "../../assets/images/team3.png";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const AboutUs = () => {

  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <section>
        <div className="container mt-5 mb-5">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2>{t("Introducing ERRANDIA: Revolutionizing Business Connections in Cameroon")}</h2>
              <p>
              {t("ERRANDIA is an innovative platform in Cameroon designed to bridge the gap between businesses and customers seamlessly.")}
               {t("It empowers businesses to create accounts, list their products and services, and receive daily notifications about users actively seeking what they offer.")} 
                {t("This smart matching system ensures that businesses can quickly connect with potential clients, fostering efficient and personalized service.")}
                  {t("For users, ERRANDIA offers a simple way to post requests or run errands.")} 
                    {t("The app instantly notifies relevant businesses, providing them with users' contact details to facilitate direct communication and negotiation.")} 
                      {t("This streamlined approach saves time and enhances customer satisfaction.")}
<br />
{t("Additionally, ERRANDIA, through its network of partner delivery agents-ERRANDOS, offers convenient pickup and delivery services. ")}
  {t("Whether it's a business order or a personal package, you can trust ERRANDIA for reliable and timely deliveries.")}
    {t("Need pharmaceutical services? With ERRANDIA, you can easily search for nearby pharmacies and access on-call pharmacies along with their contact numbers for instant assistance.")}
      {t("For those navigating through the city, ERRANDIA also provides free information about public places and offices and guides you effortlessly via Google Maps integration.")}
        {t("With its user-friendly interface and intelligent notifications, ERRANDIA is transforming how businesses and customers interact in Cameroon—making it faster, smarter, and more efficient. ")}
          {t("Join ERRANDIA today and experience a new level of convenience! 🌟")}
            {t("Download the ERRANDIA app today from play store or App store and enjoy and let the running Man do your errands for you.")}

              </p>
            </div>
            <div className="col-md-6 about-main-img-sec ">
              <img src={aboutImage} alt="" className="about-main-img" />
            </div>
          </div>
        </div>
      </section>
      <section className="core-principles">
        <div className="container">
          <h2 className="text-white text-center">Core Principles</h2>
          <div className="row mt-3">
            <div className="col-md-4">
              <svg
                width="134"
                height="134"
                viewBox="0 0 134 134"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_9921_29568)">
                  <rect
                    x="32"
                    y="28"
                    width="70"
                    height="70"
                    rx="16"
                    fill="white"
                    fill-opacity="0.9"
                    shape-rendering="crispEdges"
                  />
                </g>
                <g clip-path="url(#clip0_9921_29568)">
                  <path
                    d="M83 65L77.375 59.375V63.125H69.875V55.625H73.625L68 50L62.375 55.625H66.125V63.125H58.625V59.375L53 65L58.625 70.625V66.875H66.125V74.375H62.375L68 80L73.625 74.375H69.875V66.875H77.375V70.625L83 65Z"
                    fill="#FA080D"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_9921_29568"
                    x="0"
                    y="0"
                    width="134"
                    height="134"
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
                    <feGaussianBlur stdDeviation="16" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.0862745 0 0 0 0 0.027451 0 0 0 0 0.980392 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_9921_29568"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_9921_29568"
                      result="shape"
                    />
                  </filter>
                  <clipPath id="clip0_9921_29568">
                    <rect
                      width="30"
                      height="30"
                      fill="white"
                      transform="translate(53 50)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <h4 className="text-white">Flexibility</h4>
              <p className="text-white mt-3">
                Errandia is designed with adaptability at its core. Whether
                you’re using our intuitive web platform or engaging through our
                seamless mobile app, we ensure a consistent and tailored
                experience. From customizable listings to diverse transaction
                options, our platform evolves to meet your unique needs,
                empowering you to connect and trade effortlessly.
              </p>
            </div>
            <div className="col-md-4">
              <svg
                width="134"
                height="135"
                viewBox="0 0 134 135"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_9921_29548)">
                  <rect
                    x="32"
                    y="28.5"
                    width="70"
                    height="70"
                    rx="16"
                    fill="white"
                    fill-opacity="0.9"
                    shape-rendering="crispEdges"
                  />
                </g>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M67.0007 80.1654C76.2057 80.1654 83.6673 72.7037 83.6673 63.4987C83.6673 54.2937 76.2057 46.832 67.0007 46.832C57.7957 46.832 50.334 54.2937 50.334 63.4987C50.334 72.7037 57.7957 80.1654 67.0007 80.1654ZM67.0007 58.4987C67.8847 58.4987 68.7326 58.1475 69.3577 57.5224C69.9828 56.8973 70.334 56.0494 70.334 55.1654C70.334 54.2813 69.9828 53.4335 69.3577 52.8083C68.7326 52.1832 67.8847 51.832 67.0007 51.832C66.1166 51.832 65.2688 52.1832 64.6436 52.8083C64.0185 53.4335 63.6673 54.2813 63.6673 55.1654C63.6673 56.0494 64.0185 56.8973 64.6436 57.5224C65.2688 58.1475 66.1166 58.4987 67.0007 58.4987ZM57.489 59.0154C57.1862 58.8979 56.8497 58.9028 56.5505 59.0291C56.2513 59.1554 56.013 59.3932 55.8861 59.6921C55.7592 59.991 55.7535 60.3276 55.8704 60.6306C55.9873 60.9335 56.2175 61.1791 56.5123 61.3154L56.5157 61.317L56.519 61.3187L56.5357 61.3254L56.589 61.3487C56.9042 61.4802 57.222 61.6052 57.5423 61.7237C58.1757 61.9654 59.0657 62.287 60.0873 62.607C61.734 63.127 63.814 63.6737 65.7507 63.8537V65.9204C65.7507 66.637 65.544 67.342 65.1557 67.947L60.949 74.4887C60.8601 74.6268 60.7993 74.7811 60.7701 74.9427C60.7408 75.1043 60.7437 75.27 60.7785 75.4305C60.8134 75.591 60.8794 75.7431 60.973 75.878C61.0666 76.013 61.1859 76.1282 61.324 76.217C61.4621 76.3059 61.6163 76.3667 61.7779 76.3959C61.9395 76.4252 62.1053 76.4223 62.2658 76.3875C62.4263 76.3527 62.5784 76.2866 62.7133 76.193C62.8483 76.0994 62.9635 75.9801 63.0523 75.842L67.0023 69.6987L70.949 75.842C71.0378 75.9801 71.153 76.0994 71.288 76.193C71.4229 76.2866 71.575 76.3527 71.7355 76.3875C71.896 76.4223 72.0618 76.4252 72.2234 76.3959C72.385 76.3667 72.5392 76.3059 72.6773 76.217C72.8154 76.1282 72.9347 76.013 73.0283 75.878C73.1219 75.7431 73.1879 75.591 73.2228 75.4305C73.2576 75.27 73.2605 75.1043 73.2312 74.9427C73.202 74.7811 73.1412 74.6268 73.0523 74.4887L68.8457 67.947C68.4569 67.342 68.2504 66.6379 68.2507 65.9187V63.8537C70.1873 63.6737 72.2673 63.127 73.9157 62.607C75.0975 62.2342 76.2639 61.8144 77.4123 61.3487L77.4673 61.3254L77.484 61.3187L77.4873 61.317C77.7871 61.1841 78.0227 60.9388 78.1433 60.6338C78.2638 60.3288 78.2597 59.9887 78.1318 59.6867C78.0039 59.3847 77.7624 59.1451 77.4595 59.0195C77.1565 58.894 76.8164 58.8925 76.5123 59.0154L76.5007 59.0204L76.4557 59.0387L76.2723 59.1137C76.1079 59.1815 75.8745 59.2726 75.5723 59.387C74.9723 59.6154 74.1307 59.9204 73.1657 60.2237C71.2023 60.8404 68.8523 61.4154 67.0007 61.4154C65.149 61.4154 62.8007 60.8404 60.8373 60.2237C59.7257 59.8715 58.6282 59.4762 57.5473 59.0387L57.5007 59.0204L57.489 59.0154Z"
                  fill="#FA080D"
                />
                <defs>
                  <filter
                    id="filter0_d_9921_29548"
                    x="0"
                    y="0.5"
                    width="134"
                    height="134"
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
                    <feGaussianBlur stdDeviation="16" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.0862745 0 0 0 0 0.027451 0 0 0 0 0.980392 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_9921_29548"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_9921_29548"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>

              <h4 className="text-white">Accessibility</h4>
              <p className="text-white mt-3">
                Accessibility is at the heart of Errandia. We bridge the gap
                between buyers and sellers with a user-friendly interface,
                accessible on both desktop and mobile devices. By providing
                intuitive navigation and tools, we ensure that everyone,
                regardless of their location or technical expertise, can find
                and connect with the right businesses.
              </p>
            </div>
            <div className="col-md-4">
              <svg
                width="134"
                height="135"
                viewBox="0 0 134 135"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_9921_29557)">
                  <rect
                    x="32"
                    y="28.5"
                    width="70"
                    height="70"
                    rx="16"
                    fill="white"
                    fill-opacity="0.9"
                    shape-rendering="crispEdges"
                  />
                </g>
                <path
                  d="M49 60.695C48.9981 57.9373 49.9318 55.2605 51.6485 53.102C53.3652 50.9435 55.7634 49.4309 58.4512 48.8114C61.139 48.192 63.9575 48.5023 66.4461 49.6916C67.2559 50.0786 68.0151 50.5512 68.7125 51.0982C71.5282 53.3065 74.2041 55.9849 76.4098 58.8026C76.4661 58.8746 76.5216 58.9472 76.5764 59.0205C77.7384 60.5758 78.512 62.3862 78.8326 64.3009C79.1533 66.2156 79.0118 68.1791 78.4199 70.0281C77.828 71.8771 76.8029 73.5579 75.4299 74.9306C74.0568 76.3034 72.3756 77.3283 70.5263 77.92C68.6769 78.5118 66.7129 78.6533 64.7978 78.3327C62.8827 78.0121 61.0719 77.2387 59.5162 76.0769C59.4416 76.0212 59.3676 75.9646 59.2944 75.9072C56.4796 73.7029 53.8042 71.0296 51.5977 68.2166C51.3321 67.878 51.0839 67.5246 50.8543 67.1576C49.6423 65.2198 48.9998 62.9804 49 60.695ZM63.0022 72.7488C61.5218 72.9711 60.6468 74.7182 61.9683 75.4214C63.2625 76.1101 64.6887 76.515 66.1518 76.6092C67.6148 76.7033 69.0812 76.4845 70.453 75.9674C71.8248 75.4503 73.0706 74.6467 74.1073 73.6102C75.144 72.5738 75.9477 71.3282 76.465 69.9567C76.9822 68.5852 77.2011 67.1192 77.1069 65.6564C77.0127 64.1937 76.6077 62.7678 75.9189 61.4739C75.2154 60.1524 73.4681 61.0278 73.2456 62.5083C73.1623 63.0626 73.0405 63.6123 72.8806 64.1532C72.3039 66.1027 71.2486 67.8771 69.8108 69.3146C68.3729 70.7522 66.5982 71.8073 64.6482 72.3838C64.1069 72.5438 63.5569 72.6655 63.0022 72.7488ZM57.1758 69.995C57.2353 70.1502 57.3578 70.2728 57.513 70.3323C57.5203 70.3351 57.5276 70.3379 57.535 70.3407C58.0995 70.5556 58.4624 69.9003 58.0352 69.4733C57.608 69.0462 56.9529 69.4092 57.1677 69.9738C57.1704 69.9809 57.1731 69.9879 57.1758 69.995ZM61.8182 70.6043C62.0434 70.8295 62.358 70.9457 62.6732 70.9003C63.4639 70.7864 63.7024 69.8354 63.1374 69.2707L58.3581 64.4936C57.8177 63.9535 56.9063 64.1589 56.7469 64.9061C56.6765 65.2362 56.7889 65.5762 57.0277 65.8149L61.8182 70.6043ZM65.6672 69.1485C65.9934 69.4747 66.5006 69.5481 66.8851 69.2933C67.3904 68.9583 67.4201 68.2501 66.9913 67.8215L59.9453 60.7786C59.5226 60.3561 58.8253 60.383 58.4859 60.875C58.2212 61.2588 58.2899 61.7729 58.6196 62.1025L65.6672 69.1485ZM69.115 67.2926C69.1156 67.2926 69.1162 67.2924 69.1166 67.2919C69.272 67.1054 69.4206 66.9138 69.5624 66.717C69.97 66.1512 69.8555 65.3826 69.3625 64.8895L62.5988 58.1242C62.2691 57.7944 61.7551 57.7254 61.371 57.9899C60.8781 58.3292 60.8509 59.0276 61.274 59.4508L69.1135 67.292C69.1139 67.2924 69.1145 67.2926 69.115 67.2926ZM71.0025 63.8767C71.0025 63.8767 71.0025 63.8766 71.0026 63.8765C71.0608 63.6976 71.1141 63.5167 71.1623 63.3339C71.4339 62.3039 71.0199 61.243 70.2666 60.4898L66.3109 56.535C66.0718 56.2959 65.7259 56.1847 65.3953 56.2554C64.6483 56.415 64.4482 57.3239 64.9883 57.8641L71.0013 63.8773C71.0017 63.8777 71.0025 63.8774 71.0025 63.8767ZM69.9694 57.5417C70.3965 57.9687 71.0445 57.5885 70.8296 57.024C70.7701 56.8677 70.6432 56.7408 70.4869 56.6813C69.9223 56.4665 69.5423 57.1146 69.9694 57.5417Z"
                  fill="#FA080D"
                />
                <defs>
                  <filter
                    id="filter0_d_9921_29557"
                    x="0"
                    y="0.5"
                    width="134"
                    height="134"
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
                    <feGaussianBlur stdDeviation="16" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.0862745 0 0 0 0 0.027451 0 0 0 0 0.980392 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_9921_29557"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_9921_29557"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
              <h4 className="text-white">Transparency</h4>
              <p className="text-white mt-3">
                Errandia builds trust through transparency. Our platform ensures
                verified profiles, clear product and service descriptions,
                secure payment processes, and an open review system. We are
                committed to fostering a trustworthy environment where buyers
                and sellers can engage with confidence and clarity.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container mt-5 mb-5">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 about-mission-img-sec">
              <img
                src={aboutImageMission}
                alt=""
                className="about-mission-img"
              />
            </div>
            <div className="col-md-6 mb-3">
              <h2>{t("Mission of Errandia")}</h2>
              <p>
              {t("The mission of Errandia is to increase volume of sales of businesses and enable buyers to find goods and services easily from the comfort of their homes or offices.")}
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <h2>{t("Goal of Errandia")}</h2>
              <p>
              {t("The goal of Errandia is to bridge the information gap between buyers and sellers so they quickly connect to each other and transact businesses.")}
              </p>
            </div>
            <div className="col-md-6 mb-3 text-end about-mission-img-sec">
              <img
                src={aboutImageVision}
                alt=""
                className="about-mission-img"
              />
            </div>
          </div>
        </div>
      </section>
      {/* <section className="team-about">
        <div className="container">
          <h6 className="text-danger text-center">TEAM</h6>
          <h2 className="text-center mt-3">Meet Our Dynamic Team Members</h2>
          <div className="row mt-5">
            <div className="col-md-4 mb-2">
              <div className="card-team">
                <div className="bio-text">
                  <h4 className="mb-0">Mbatu Edgar</h4>
                  <p className="text-danger mt-1 mb-0">CEO</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="card-team2">
                <div className="bio-text">
                  <h4 className="mb-0">Mbatu Edgar</h4>
                  <p className="text-danger mt-1 mb-0">CEO</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="card-team3">
                <div className="bio-text">
                  <h4 className="mb-0">Mbatu Edgar</h4>
                  <p className="text-danger mt-1 mb-0">CEO</p>
                </div>
              </div>
            </div>
          </div>
          <Button className="btn-back mt-3">View All</Button>
        </div>
      </section> */}
    </>
  );
};

export default AboutUs;
