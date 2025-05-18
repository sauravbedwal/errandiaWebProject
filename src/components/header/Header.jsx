import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import globeIcon from "../../assets/globeIcon.svg";
import errandiaLogo from "../../assets/errandiaLogo.svg";
import locationIcon from "../../assets/locationIcon.svg";
import rightArrowHeaderIcon from "../../assets/rightArrowHeaderIcon.svg";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import filterUpArrow from "../../assets/filterUpArrow.svg";
import Form from "react-bootstrap/Form";
import homeCollapseMobile from "../../assets/homeCollapseMobile.svg";
import Collapse from "react-bootstrap/Collapse";
import homeMobileDownArrow from "../../assets/homeMobileDownArrow.svg";
import googlePlaystoreDownload from "../../assets/googlePlaystoreDownload.svg";
import appstoreDownload from "../../assets/appstoreDownload.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  modalSubscriptionToggle,
  setSubscriptionModalTrue,
} from "../../utils/subscriptionSlice";
import {
  modalErrandiaBoosterToggle,
  setErrandiaBoosterModalTrue,
} from "../../utils/errandiaBoosterSlice";
import { modalToggle, setModalTrue } from "../../utils/modalSlice";
import ErrandiaBooster from "../errandiaBooster/ErrandiaBooster";
import bellNotificationHeader from "../../assets/bellNotificationHeader.svg";
import userImageHeader from "../../assets/userImageHeader.svg";
import user from "../../assets/user.jpg";
import { getApi, isTokenValid } from "../../fetchApi/FetchAxiosApi";
import axios from "axios";
import SubscriptionBoxModal from "../subscriptionBoxModal/SubscriptionBoxModal";
import { useTranslation } from "react-i18next";
import "../../i18n";
import { setLanguage } from "../../utils/languageSlice";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { token } from "../../utils/utils";
import ourErrandsImage from "../../assets/images/errandos-image.png";
import { addUserDetails } from "../../utils/userDetailsSlice";
import Location from "../location/Location";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [location, setLocation] = useState("Fetching location...");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [open, setOpen] = useState({
    region: false,
    town: false,
    more: false,
  });

  const dispatch = useDispatch();

  const [showNoti, setShowNoti] = useState(false);
  // if (!showNoti) return null;

  const [activeTab, setActiveTab] = useState("Announcements");

  const notifications = [
    {
      title: "Hello Errandians!",
      message: "Errandia version 2 is here 😎",
      time: "30 mins",
    },
    {
      title: "Hello Errandians!",
      message: "Errandia version 2 is here 😎",
      time: "1 day",
    },
    {
      title: "Hello Errandians!",
      message: "Errandia version 2 is here 😎",
      time: "2 day",
    },
    {
      title: "Hello Errandians!",
      message: "Errandia version 2 is here 😎",
      time: "2 day",
    },
  ];
  const errandsnotifications = [
    {
      title: "Hello Errandians!",
      message: "Someone is interested in a service you offer",
      time: "30 mins",
    },
    {
      title: "Hello Errandians!",
      message: "Someone is interested in a service you offer",
      time: "30 mins",
    },
    {
      title: "Hello Errandians!",
      message: "Someone is interested in a service you offer",
      time: "30 mins",
    },
    {
      title: "Hello Errandians!",
      message: "Someone is interested in a service you offer",
      time: "30 mins",
    },
  ];
  const deliveriesnotifications = [
    {
      title: "Your Parcel is here",
      message:
        "Erica says she has arrived at the drop-off address with your parcel. Call to confirm.",
    },
    {
      title: "Your Parcel is here",
      message:
        "Erica says she has arrived at the drop-off address with your parcel. Call to confirm.",
    },
    {
      title: "Your Parcel is here",
      message:
        "Erica says she has arrived at the drop-off address with your parcel. Call to confirm.",
    },
    {
      title: "Your Parcel is here",
      message:
        "Erica says she has arrived at the drop-off address with your parcel. Call to confirm.",
    },
  ];

  const { t, i18n } = useTranslation();

  // const tokenAvailable = isTokenValid();
  // console.log(tokenAvailable);

  const tokenAvailable = token();

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       async (position) => {
  //         const { latitude, longitude } = position.coords;

  //         try {
  //           // Reverse geocoding to get city name (using OpenWeather API as an example)
  //           const response = await axios.get(
  //             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  //           );
  //           const city = response.data.address.city || t("Unknown Location");
  //           setLocation(city);
  //         } catch (error) {
  //           console.error("Error fetching location:", error);
  //           setLocation(t("Location not found"));
  //         }
  //       },
  //       (error) => {
  //         console.error("Error getting location:", error);
  //         setLocation(t("Permission Denied"));
  //       }
  //     );
  //   } else {
  //     setLocation(t("Geolocation not supported"));
  //   }
  // }, []);

  // const language = useSelector((store) => store?.language?.language);
  // console.log("languageHeader", language);

  const handleLanguageChange = (lang) => {
    Cookies.set("language", lang);
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
  };

  const language = Cookies.get("language");

  useEffect(() => {
    const savedLanguage = Cookies.get("language") || "en";
    i18n.changeLanguage(savedLanguage);
  }, []);

  const isTokenValid = token();

  const userDetailsCollection = useSelector((store) => store?.userDetails);
  // console.log("userDetailsCollection", userDetailsCollection);

  useEffect(() => {
    // console.log("user details ai called");
    if (!userDetailsCollection && tokenAvailable) {
      const fetchUserDetails = async () => {
        try {
          const res = await getApi(apis.userDetails, token());
          dispatch(addUserDetails(res.data.data.item));
        } catch (err) {
          console.log("fetchUserDetails", err);
        }
      };
      fetchUserDetails();
    }
  }, [isTokenValid]);

  const notiRef = useRef(null);

  const handleClickOutside = (event) => {
    if (notiRef.current && !notiRef.current.contains(event.target)) {
      setShowNoti(false);
    }
  };

  useEffect(() => {
    if (showNoti) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNoti]);

  // console.log("userDetailsCollection?.photo", userDetailsCollection?.photo);
  return (
    <>
      <div className="header-main-full">
        <Navbar className="bg-body-tertiary scam-warning">
          <Container>
            <Navbar.Brand className="scam-waring-text text-wrap">
              {t("scamWarning")}
            </Navbar.Brand>
            <Nav className="ms-auto d-flex align-items-center">
              <img
                src={globeIcon}
                alt="Globe Icon"
                className="globe-icon me-2"
              />
              <NavDropdown
                title={
                  <span style={{ color: "white" }}>
                    {language
                      ? language === "en"
                        ? "English"
                        : "French"
                      : "English"}
                  </span>
                }
                id="basic-nav-dropdown"
                className="scam-warning-box"
                align="end"
                menuVariant="dark"
              >
                <NavDropdown.Item
                  className="scam-warning-dropdown"
                  onClick={() => {
                    handleLanguageChange("en");
                  }}
                >
                  English
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="scam-warning-dropdown"
                  onClick={() => {
                    handleLanguageChange("fr");
                  }}
                >
                  French
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar>

        <Navbar expand="lg" className="bg-body-tertiary scam-warning2">
          <Container>
            <Navbar.Brand className="col-lg-2">
              <img
                style={{ cursor: "pointer" }}
                src={errandiaLogo}
                alt="logo"
                onClick={() => {
                  navigate("/");
                }}
              />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={handleShow}
            />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end"
            >
              <Nav className="d-flex align-items-center header-mobile-noShow">
                {/* Location Section */}
                <Nav.Link className="header-location d-flex me-4">
                  {/* <img src={locationIcon} alt="locationIcon" className="me-2" />
                  <div>
                    <div className="header-location-heading">
                      {t("My Location")}
                    </div>
                    <div className="header-location-red">{location}</div>
                  </div> */}
                  <Location />
                </Nav.Link>

                {/* Sign In/Register Section */}
                {tokenAvailable === null || tokenAvailable === undefined ? (
                  <Nav.Link className="header-location d-flex align-items-center me-4">
                    <div
                      className="me-2 header-signIn-Register"
                      onClick={() => navigate("/login")}
                    >
                      {t("Sign In")}
                    </div>

                    <img
                      src={rightArrowHeaderIcon}
                      alt="rightArrow"
                      className="me-2"
                    />
                    <div
                      className="me-2 header-signIn-Register"
                      onClick={() => navigate("/signup")}
                    >
                      {t("Register")}
                    </div>
                  </Nav.Link>
                ) : (
                  <Nav.Link
                    className="header-location d-flex align-items-center me-4"
                    ref={notiRef}
                  >
                    <img
                      src={bellNotificationHeader}
                      alt="bellNotificationHeader"
                      className="me-2"
                      onClick={() => {
                        // console.log(showNoti);
                        setShowNoti(!showNoti);
                      }}
                    />
                    <div className="header-notification">10</div>

                    {showNoti && (
                      <div className="header-notification-popUp">
                        <div className="p-3  bg-white">
                          {/* Header Section */}
                          <div className="d-flex justify-content-between items-center mb-2">
                            <h5 className="text-xl font-bold">Notifications</h5>
                            <div className="gap-2 d-flex">
                              <button
                                className="text-sm px-2 py-1 border rounded-md"
                                style={{ backgroundColor: "#E5E8FF" }}
                              >
                                3 unread
                              </button>
                            </div>
                          </div>

                          {/* Tabs */}
                          <div
                            className="d-flex justify-content-center mb-4"
                            style={{ borderBottom: "1px solid #677A90" }}
                          >
                            <button
                              onClick={() => setActiveTab("Announcements")}
                              className={`py-2 px-4 w-100 tab-btn ${
                                activeTab === "Announcements"
                                  ? "active"
                                  : "text-gray-500"
                              }`}
                            >
                              Announcements
                            </button>
                            <button
                              onClick={() => setActiveTab("Errands")}
                              className={`py-2 px-4 w-100 tab-btn ${
                                activeTab === "Errands"
                                  ? "active"
                                  : "text-gray-500"
                              }`}
                            >
                              Errands
                            </button>
                            <button
                              onClick={() => setActiveTab("Deliveries")}
                              className={`py-2 px-4 w-100 tab-btn ${
                                activeTab === "Deliveries"
                                  ? "active"
                                  : "text-gray-500"
                              }`}
                            >
                              Deliveries
                            </button>
                          </div>

                          {/* Tab Content */}
                          <div>
                            {activeTab === "Announcements" &&
                              notifications.slice(0, 3).map((notif, index) => (
                                <div
                                  key={index}
                                  className="d-flex justify-content-between items-center p-1 mb-2 bg-gray-50 rounded-lg"
                                  style={{ cursor: "pointer" }}
                                >
                                  <div className="d-flex gap-2">
                                    <div>
                                      <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 50 50"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <g clipPath="url(#clip0_9698_54909)">
                                          <path
                                            d="M50 25C50 38.8072 38.8071 50 25 50C11.1929 50 0 38.8072 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25Z"
                                            fill="#2718FF"
                                          />
                                          <path
                                            d="M50 25C50 38.8072 38.8071 50 25 50C11.1929 50 0 38.8072 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25Z"
                                            stroke="#E5E8FF"
                                          />
                                          <path
                                            d="M23.5722 27.9973L25.7789 33.6225C26.1628 34.605 25.6997 35.7212 24.7438 36.1171C23.7872 36.5116 22.7003 36.0358 22.3148 35.054L18.918 26.4727"
                                            stroke="#E5E8FF"
                                            strokeWidth="1.704"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                          />
                                          <path
                                            d="M30.8804 15.2227L16.5785 19.9058C15.3618 20.2777 14.5764 21.4877 14.7101 22.7841C14.5764 24.0806 15.3618 25.2908 16.5785 25.6625L30.8804 30.3456"
                                            stroke="#E5E8FF"
                                            strokeWidth="1.704"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                          />
                                          <path
                                            d="M31.5806 30.4607C33.6443 30.4607 35.3174 27.0242 35.3174 22.785C35.3174 18.546 33.6443 15.1094 31.5806 15.1094C29.5168 15.1094 27.8438 18.546 27.8438 22.785C27.8438 27.0242 29.5168 30.4607 31.5806 30.4607Z"
                                            stroke="#E5E8FF"
                                            strokeWidth="1.704"
                                            strokeMiterlimit="10"
                                            strokeLinecap="square"
                                          />
                                          <path
                                            d="M32.5059 22.7832C32.5032 21.3241 31.4347 20.0994 30.0227 19.9375C29.8064 20.8695 29.6992 21.8249 29.7032 22.7832C29.6992 23.7414 29.8064 24.6968 30.0227 25.629C31.4347 25.467 32.5032 24.2422 32.5059 22.7832Z"
                                            fill="#E5E8FF"
                                          />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_9698_54909">
                                            <rect
                                              width="50"
                                              height="50"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <div>
                                      <h6 className="font-semibold">
                                        {notif.title}
                                      </h6>
                                      <p
                                        className="text-sm text-gray-600 mb-0"
                                        style={{ fontSize: "12px" }}
                                      >
                                        {notif.message}
                                      </p>
                                    </div>
                                  </div>
                                  <span className="text-sm text-gray-500">
                                    {notif.time}
                                  </span>
                                </div>
                              ))}

                            {/* View All Button */}
                            {activeTab === "Announcements" &&
                              notifications.length > 3 && (
                                <h6
                                  onClick={() => navigate("/notifications")}
                                  className="w-full text-center mt-4"
                                  style={{
                                    cursor: "pointer",
                                    color: "#1607FA",
                                  }}
                                >
                                  See All
                                </h6>
                              )}

                            {activeTab === "Errands" &&
                              errandsnotifications
                                .slice(0, 3)
                                .map((notif, index) => (
                                  <div
                                    key={index}
                                    className="d-flex justify-content-between items-center p-1 mb-2 bg-gray-50 rounded-lg"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <div className="d-flex gap-2">
                                      <div>
                                        <svg
                                          width="50"
                                          height="50"
                                          viewBox="0 0 50 50"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <g clipPath="url(#clip0_9698_54909)">
                                            <path
                                              d="M50 25C50 38.8072 38.8071 50 25 50C11.1929 50 0 38.8072 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25Z"
                                              fill="#2718FF"
                                            />
                                            <path
                                              d="M50 25C50 38.8072 38.8071 50 25 50C11.1929 50 0 38.8072 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25Z"
                                              stroke="#E5E8FF"
                                            />
                                            <path
                                              d="M23.5722 27.9973L25.7789 33.6225C26.1628 34.605 25.6997 35.7212 24.7438 36.1171C23.7872 36.5116 22.7003 36.0358 22.3148 35.054L18.918 26.4727"
                                              stroke="#E5E8FF"
                                              strokeWidth="1.704"
                                              strokeMiterlimit="10"
                                              strokeLinecap="round"
                                            />
                                            <path
                                              d="M30.8804 15.2227L16.5785 19.9058C15.3618 20.2777 14.5764 21.4877 14.7101 22.7841C14.5764 24.0806 15.3618 25.2908 16.5785 25.6625L30.8804 30.3456"
                                              stroke="#E5E8FF"
                                              strokeWidth="1.704"
                                              strokeMiterlimit="10"
                                              strokeLinecap="round"
                                            />
                                            <path
                                              d="M31.5806 30.4607C33.6443 30.4607 35.3174 27.0242 35.3174 22.785C35.3174 18.546 33.6443 15.1094 31.5806 15.1094C29.5168 15.1094 27.8438 18.546 27.8438 22.785C27.8438 27.0242 29.5168 30.4607 31.5806 30.4607Z"
                                              stroke="#E5E8FF"
                                              strokeWidth="1.704"
                                              strokeMiterlimit="10"
                                              strokeLinecap="square"
                                            />
                                            <path
                                              d="M32.5059 22.7832C32.5032 21.3241 31.4347 20.0994 30.0227 19.9375C29.8064 20.8695 29.6992 21.8249 29.7032 22.7832C29.6992 23.7414 29.8064 24.6968 30.0227 25.629C31.4347 25.467 32.5032 24.2422 32.5059 22.7832Z"
                                              fill="#E5E8FF"
                                            />
                                          </g>
                                          <defs>
                                            <clipPath id="clip0_9698_54909">
                                              <rect
                                                width="50"
                                                height="50"
                                                fill="white"
                                              />
                                            </clipPath>
                                          </defs>
                                        </svg>
                                      </div>
                                      <div>
                                        <h6 className="font-semibold">
                                          {notif.title}
                                        </h6>
                                        <p
                                          className="text-sm text-gray-600 mb-0"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {notif.message}
                                        </p>
                                      </div>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                      {notif.time}
                                    </span>
                                  </div>
                                ))}
                            {activeTab === "Errands" &&
                              errandsnotifications.length > 3 && (
                                <h6
                                  onClick={() => navigate("/notifications")}
                                  className="w-full text-center mt-4"
                                  style={{
                                    cursor: "pointer",
                                    color: "#1607FA",
                                  }}
                                >
                                  See All
                                </h6>
                              )}

                            {activeTab === "Deliveries" &&
                              deliveriesnotifications
                                .slice(0, 3)
                                .map((notif, index) => (
                                  <div
                                    key={index}
                                    className="d-flex justify-content-between items-center p-1 mb-2 bg-gray-50 rounded-lg"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <div className="d-flex gap-2">
                                      <div>
                                        <svg
                                          width="50"
                                          height="50"
                                          viewBox="0 0 50 50"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <g clipPath="url(#clip0_9698_54909)">
                                            <path
                                              d="M50 25C50 38.8072 38.8071 50 25 50C11.1929 50 0 38.8072 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25Z"
                                              fill="#2718FF"
                                            />
                                            <path
                                              d="M50 25C50 38.8072 38.8071 50 25 50C11.1929 50 0 38.8072 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25Z"
                                              stroke="#E5E8FF"
                                            />
                                            <path
                                              d="M23.5722 27.9973L25.7789 33.6225C26.1628 34.605 25.6997 35.7212 24.7438 36.1171C23.7872 36.5116 22.7003 36.0358 22.3148 35.054L18.918 26.4727"
                                              stroke="#E5E8FF"
                                              strokeWidth="1.704"
                                              strokeMiterlimit="10"
                                              strokeLinecap="round"
                                            />
                                            <path
                                              d="M30.8804 15.2227L16.5785 19.9058C15.3618 20.2777 14.5764 21.4877 14.7101 22.7841C14.5764 24.0806 15.3618 25.2908 16.5785 25.6625L30.8804 30.3456"
                                              stroke="#E5E8FF"
                                              strokeWidth="1.704"
                                              strokeMiterlimit="10"
                                              strokeLinecap="round"
                                            />
                                            <path
                                              d="M31.5806 30.4607C33.6443 30.4607 35.3174 27.0242 35.3174 22.785C35.3174 18.546 33.6443 15.1094 31.5806 15.1094C29.5168 15.1094 27.8438 18.546 27.8438 22.785C27.8438 27.0242 29.5168 30.4607 31.5806 30.4607Z"
                                              stroke="#E5E8FF"
                                              strokeWidth="1.704"
                                              strokeMiterlimit="10"
                                              strokeLinecap="square"
                                            />
                                            <path
                                              d="M32.5059 22.7832C32.5032 21.3241 31.4347 20.0994 30.0227 19.9375C29.8064 20.8695 29.6992 21.8249 29.7032 22.7832C29.6992 23.7414 29.8064 24.6968 30.0227 25.629C31.4347 25.467 32.5032 24.2422 32.5059 22.7832Z"
                                              fill="#E5E8FF"
                                            />
                                          </g>
                                          <defs>
                                            <clipPath id="clip0_9698_54909">
                                              <rect
                                                width="50"
                                                height="50"
                                                fill="white"
                                              />
                                            </clipPath>
                                          </defs>
                                        </svg>
                                      </div>
                                      <div>
                                        <h6 className="font-semibold">
                                          {notif.title}
                                        </h6>
                                        <p
                                          className="text-sm text-gray-600 mb-0"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {notif.message}
                                        </p>
                                      </div>
                                    </div>
                                    <svg
                                      width="36"
                                      height="37"
                                      viewBox="0 0 36 37"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clip-path="url(#clip0_10838_8439)">
                                        <path
                                          d="M35.5 18.5C35.5 8.83502 27.665 1 18 1C8.33502 1 0.5 8.83502 0.5 18.5C0.5 28.165 8.33502 36 18 36C27.665 36 35.5 28.165 35.5 18.5Z"
                                          stroke="#E00207"
                                        />
                                        <path
                                          d="M19.8866 19.7466L18.6662 20.9504C18.0298 20.5667 17.4386 20.1126 16.9038 19.5967C16.3886 19.0609 15.9346 18.4696 15.55 17.8337L16.7527 16.6133C16.9017 16.462 16.9445 16.2357 16.861 16.0404L15.607 13.1175C15.5046 12.8793 15.2432 12.752 14.9926 12.8182L12.6932 13.4264C12.4567 13.4877 12.294 13.7043 12.301 13.9485C12.4473 16.6228 13.5593 19.1532 15.4303 21.0695C17.347 22.9412 19.8781 24.0534 22.553 24.1994C22.7976 24.2076 23.0149 24.0448 23.0757 23.8078L23.6834 21.5073C23.75 21.2568 23.6228 20.9952 23.3847 20.8928L20.4611 19.6394C20.2657 19.5547 20.0384 19.5971 19.8866 19.7466Z"
                                          stroke="#E00207"
                                          stroke-width="1.368"
                                          stroke-miterlimit="10"
                                          stroke-linecap="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_10838_8439">
                                          <rect
                                            width="36"
                                            height="36"
                                            fill="white"
                                            transform="translate(0 0.5)"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </div>
                                ))}
                            {activeTab === "Deliveries" &&
                              deliveriesnotifications.length > 3 && (
                                <h6
                                  onClick={() => navigate("/notifications")}
                                  className="w-full text-center mt-4"
                                  style={{
                                    cursor: "pointer",
                                    color: "#1607FA",
                                  }}
                                >
                                  See All
                                </h6>
                              )}
                          </div>
                        </div>
                      </div>
                    )}
                    <img
                      src={
                        !userDetailsCollection
                          ? ourErrandsImage
                          : userDetailsCollection?.photo != ""
                          ? `${IMAGE_BASE_URL}${userDetailsCollection?.photo}`
                          : ourErrandsImage
                      }
                      alt="userImageHeader"
                      className="me-2"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "80px",
                        border: "2px solid #1006AC",
                      }}
                      onClick={() => {
                        navigate("/user-profile");
                      }}
                    />

                    {/* <img
                      src={user}
                      alt="userImageHeader"
                      className="me-2"
                      style={{
                        width: "42px",
                        borderRadius: "50%",
                        height: "42px",
                        border: "1px solid red",
                      }}
                    /> */}
                  </Nav.Link>
                )}

                {/* Buttons Section */}
                <div className="d-flex gap-2 ">
                  {tokenAvailable && (
                    <Button
                      variant="primary"
                      className="header-button-red"
                      onClick={() => {
                        dispatch(modalSubscriptionToggle());
                        dispatch(setSubscriptionModalTrue());
                      }}
                      // onClick={() => {
                      //   dispatch(modalErrandiaBoosterToggle());
                      //   dispatch(setErrandiaBoosterModalTrue());
                      // }}
                    >
                      {t("Subscribe")}
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    className="header-button-blue"
                    onClick={() => {
                      if (tokenAvailable) {
                        dispatch(modalToggle());
                        dispatch(setModalTrue());
                      }

                      if (!tokenAvailable) {
                        navigate("/login");
                      }
                    }}
                  >
                    {t("Run An ")}Errand
                  </Button>
                </div>
              </Nav>

              <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>{t("Browse Errandia")}</Offcanvas.Title>
                </Offcanvas.Header>
                <hr />
                <Offcanvas.Body>
                  <div className="d-flex gap-2 ">
                    {tokenAvailable && (
                      <Button
                        variant="primary"
                        className="header-button-red-mobile"
                        onClick={() => {
                          setShow(false);
                          dispatch(modalSubscriptionToggle());
                          dispatch(setSubscriptionModalTrue());
                        }}
                      >
                        {t("Subscribe")}
                      </Button>
                    )}
                    <Button
                      variant="secondary"
                      className="header-button-blue-mobile"
                      // onClick={() => {
                      //   setShow(false);
                      //   dispatch(modalToggle());
                      //   dispatch(setModalTrue());
                      // }}
                      onClick={() => {
                        if (tokenAvailable) {
                          dispatch(modalToggle());
                          dispatch(setModalTrue());
                        }

                        if (!tokenAvailable) {
                          navigate("/login");
                        }
                      }}
                    >
                      {t("Run An ")}Errand
                    </Button>
                  </div>

                  {/* Home  */}

                  <div className="container header-offCanvas">
                    <div className="row">
                      <div className="header-headingContainer">
                        <h4
                          className="header-mobile-heading"
                          onClick={() => {
                            setShow(false);
                            navigate("/");
                          }}
                        >
                          {t("Home")}
                        </h4>
                        <img
                          src={homeCollapseMobile}
                          alt="homeCollapseMobile"
                          className="img-fluid"
                          onClick={() => {
                            setShow(false);
                            navigate("/");
                          }}
                        />
                      </div>

                      <div>
                        <div className="header-container">
                          <h4 className="header-heading">Menu</h4>

                          <img
                            src={homeMobileDownArrow}
                            alt="filterUpArrow"
                            className="img-fluid"
                            onClick={() =>
                              setOpen((prev) => {
                                return { ...prev, region: !prev.region };
                              })
                            }
                            aria-expanded={open}
                          />
                        </div>

                        <Collapse in={open.region}>
                          <div id="example-collapse-text">
                            <Form className="header-filter-first">
                              <div className="d-flex align-items-center header-dropdown-items">
                                <Form.Group controlId="formBasicCheckbox">
                                  <p
                                    className="filter-option"
                                    onClick={() => {
                                      setShow(false);
                                      navigate("/all-errands");
                                    }}
                                  >
                                    {t("Errands")}
                                  </p>
                                </Form.Group>
                              </div>

                              <div className="d-flex align-items-center header-dropdown-items">
                                <Form.Group controlId="formBasicCheckbox">
                                  <p
                                    className="filter-option"
                                    onClick={() => {
                                      setShow(false);
                                      navigate("/search-product-details");
                                    }}
                                  >
                                    {t("Products")}
                                  </p>
                                </Form.Group>
                              </div>

                              <div className="d-flex align-items-center header-dropdown-items">
                                <Form.Group controlId="formBasicCheckbox">
                                  <p
                                    className="filter-option"
                                    onClick={() => {
                                      setShow(false);
                                      navigate("/all-business-profile");
                                    }}
                                  >
                                    Businesses
                                  </p>
                                </Form.Group>
                              </div>

                              <div className="d-flex align-items-center header-dropdown-items">
                                <Form.Group controlId="formBasicCheckbox">
                                  <p
                                    className="filter-option"
                                    onClick={() => {
                                      setShow(false);
                                      navigate("/search-pharmacies");
                                    }}
                                  >
                                    Pharmacies
                                  </p>
                                </Form.Group>
                              </div>
                            </Form>
                          </div>
                        </Collapse>
                      </div>

                      <div className="header-sub-container">
                        <h4
                          className="header-subHeading"
                          onClick={() => {
                            setShow(false);
                            navigate("/errandos");
                          }}
                        >
                          Errando
                        </h4>
                      </div>

                      <div className="header-sub-container">
                        <h4
                          className="header-subHeading"
                          onClick={() => {
                            setShow(false);
                            navigate("/search-pharmacies");
                          }}
                        >
                          Pharmacies
                        </h4>
                      </div>
                      <div className="header-sub-container">
                        <h4
                          className="header-subHeading"
                          onClick={() => {
                            setShow(false);
                            navigate("/public-information");
                          }}
                        >
                          {t("Public Information")}
                        </h4>
                      </div>
                      <div className="header-sub-container">
                        <h4
                          className="header-subHeading"
                          onClick={() => {
                            setShow(false);
                            navigate("/list-your-business");
                          }}
                        >
                          {t("List Your Business")}
                        </h4>
                      </div>
                      <div className="header-sub-container">
                        <h4
                          className="header-subHeading"
                          onClick={() => {
                            navigate("/contact");
                          }}
                        >
                          {t("Contact Us")}
                        </h4>
                      </div>

                      <div>
                        <div
                          className="header-container"
                          style={{ border: "none" }}
                        >
                          <h4 className="header-heading">
                            <Link to="/download-app">
                              {t("Download Errandia app")}
                            </Link>
                          </h4>

                          <img
                            src={homeMobileDownArrow}
                            alt="filterUpArrow"
                            className="img-fluid"
                            onClick={() =>
                              setOpen((prev) => {
                                return { ...prev, town: !prev.town };
                              })
                            }
                            aria-expanded={open}
                          />
                        </div>

                        <Collapse in={open.town}>
                          <div id="example-collapse-text">
                            <Form className="header-filter-Images">
                              <div className="d-flex align-items-center header-dropdown-images">
                                <Form.Group controlId="formBasicCheckbox">
                                  <img
                                    src={googlePlaystoreDownload}
                                    alt="googlePlaystoreDownload"
                                    className="img-fluid"
                                  />
                                </Form.Group>
                              </div>

                              <div className="d-flex align-items-center header-dropdown-images">
                                <Form.Group controlId="formBasicCheckbox">
                                  <img
                                    src={appstoreDownload}
                                    alt="appstoreDownload"
                                    className="img-fluid"
                                  />
                                </Form.Group>
                              </div>
                            </Form>
                          </div>
                        </Collapse>
                      </div>

                      {/* <div className="header-location-mobile d-flex align-items-center">
                        <div className="header-signIn-arrow-container">
                          <div
                            className="header-signIn-Register"
                            onClick={() => {
                              setShow(false);
                              navigate("/login");
                            }}
                          >
                            {t("Sign In")}
                          </div>

                          <img
                            src={rightArrowHeaderIcon}
                            alt="rightArrow"
                            className="img-fluid"
                          />
                        </div>
                        <div>{t("or")}</div>
                        <div
                          className="header-signIn-Register"
                          onClick={() => {
                            setShow(false);
                            navigate("/signup");
                          }}
                        >
                          {t("Register")}
                        </div>
                      </div> */}

                      {tokenAvailable === null ||
                      tokenAvailable === undefined ? (
                        <Nav.Link className="header-location d-flex align-items-center me-4">
                          <div
                            className="me-2 header-signIn-Register"
                            onClick={() => {
                              setShow(false);
                              navigate("/login");
                            }}
                          >
                            {t("Sign In")}
                          </div>

                          <img
                            src={rightArrowHeaderIcon}
                            alt="rightArrow"
                            className="me-2"
                          />
                          <div
                            className="me-2 header-signIn-Register"
                            onClick={() => {
                              setShow(false);
                              navigate("/signUp");
                            }}
                          >
                            {t("Register")}
                          </div>
                        </Nav.Link>
                      ) : (
                        <Nav.Link className="header-location d-flex align-items-center me-4">
                          <img
                            src={
                              !userDetailsCollection
                                ? ourErrandsImage
                                : userDetailsCollection?.photo != ""
                                ? `${IMAGE_BASE_URL}${userDetailsCollection?.photo}`
                                : ourErrandsImage
                            }
                            alt="userImageHeader"
                            className="me-2"
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "80px",
                              border: "2px solid #1006AC",
                              marginBottom: "10px",
                            }}
                            onClick={() => {
                              navigate("/user-profile");
                              setShow(false);
                            }}
                          />

                          {/* <img
                      src={user}
                      alt="userImageHeader"
                      className="me-2"
                      style={{
                        width: "42px",
                        borderRadius: "50%",
                        height: "42px",
                        border: "1px solid red",
                      }}
                    /> */}
                        </Nav.Link>
                      )}

                      <div>
                        <div className="header-container">
                          <h4 className="header-heading">{t("More")}</h4>

                          <img
                            src={homeMobileDownArrow}
                            alt="filterUpArrow"
                            className="img-fluid"
                            onClick={() =>
                              setOpen((prev) => {
                                return { ...prev, more: !prev.more };
                              })
                            }
                            aria-expanded={open}
                          />
                        </div>

                        <Collapse in={open.more}>
                          <div id="example-collapse-text">
                            <Form className="header-filter-first">
                              <div className="d-flex align-items-center header-dropdown-items">
                                <Form.Group controlId="formBasicCheckbox">
                                  <p
                                    className="filter-option"
                                    onClick={() => {
                                      setShow(false);
                                      navigate("/notifications");
                                    }}
                                  >
                                    Notifications
                                  </p>
                                </Form.Group>
                              </div>
                              <div className="d-flex align-items-center header-dropdown-items">
                                <Form.Group controlId="formBasicCheckbox">
                                  <p
                                    className="filter-option"
                                    onClick={() => {
                                      setShow(false);
                                      navigate("/about-us");
                                    }}
                                  >
                                    {t("About Errandia")}
                                  </p>
                                </Form.Group>
                              </div>

                              <div className="d-flex align-items-center header-dropdown-items">
                                <Form.Group controlId="formBasicCheckbox">
                                  <p
                                    className="filter-option"
                                    onClick={() => {
                                      setShow(false);
                                      navigate("/faqs");
                                    }}
                                  >
                                    {t("FAQs")}
                                  </p>
                                </Form.Group>
                              </div>

                              <div className="d-flex align-items-center header-dropdown-items">
                                <Form.Group controlId="formBasicCheckbox">
                                  <p
                                    className="filter-option"
                                    onClick={() => {
                                      setShow(false);

                                      navigate("/privacy-policy");
                                    }}
                                  >
                                    {t("Privacy Policy")}
                                  </p>
                                </Form.Group>
                              </div>

                              <div className="d-flex align-items-center header-dropdown-items">
                                <Form.Group controlId="formBasicCheckbox">
                                  <p
                                    className="filter-option"
                                    onClick={() => {
                                      setShow(false);

                                      navigate("/terms-condition");
                                    }}
                                  >
                                    {t("Terms of Service")}
                                  </p>
                                </Form.Group>
                              </div>
                            </Form>
                          </div>
                        </Collapse>
                      </div>
                    </div>
                  </div>
                </Offcanvas.Body>
              </Offcanvas>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <SubscriptionBoxModal />
    </>
  );
};

export default Header;
