import React from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import MtnMoney from "../../assets/images/MtnMoney.png";
import OrangeMoney from "../../assets/images/OrangeMoney.png";
import runErrandIcon from "../../assets/runErrandIcon.svg";
import rightArrowFooterIcon from "../../assets/rightArrowFooterIcon.svg";
import searchFooterIcon from "../../assets/searchFooterIcon.svg";
import pharmacyIcon from "../../assets/pharmacyIcon.svg";
import deliveryIcon from "../../assets/deliveryIcon.svg";
import footerLocationIcon from "../../assets/footerLocationIcon.svg";
import emailIcon from "../../assets/emailIcon.svg";
import errandiaLogo from "../../assets/errandiaLogo.svg";
import googlePlaystoreDownload from "../../assets/googlePlaystoreDownload.svg";
import appstoreDownload from "../../assets/appstoreDownload.svg";
import SubscriptionBoxModal from "../subscriptionBoxModal/SubscriptionBoxModal";
import Cookies from "js-cookie";
import {
  modalSubscriptionToggle,
  setSubscriptionModalTrue,
} from "../../utils/subscriptionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const tokenAvailable = Cookies.get("auth_token");

  return (
    <>
      <div>
        <footer className="text-center text-lg-start bg-body-tertiary text-muted">
          <section className="d-flex justify-content-center justify-content-lg-between p-4"></section>
          <section className="">
            <div className="container text-center text-md-start mt-5">
              <div className="row mt-3 footerIcon-bottomLine footer-mobile">
                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4 footer-iconTextContainer">
                  <img src={runErrandIcon} alt="runErrand" />
                  <i className="fas fa-gem me-3"></i>
                  {t("Run Errand")}
                  <img
                    src={rightArrowFooterIcon}
                    alt="rightArrowFooter"
                    className="hide-on-mobile"
                  />
                </div>
                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4 footer-iconTextContainer">
                  <img src={searchFooterIcon} alt="searchFooter" />
                  <i className="fas fa-gem me-3"></i>
                  {t("Search")}
                  <img
                    src={rightArrowFooterIcon}
                    alt="rightArrowFooter"
                    className="hide-on-mobile"
                  />
                </div>
                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4 footer-iconTextContainer">
                  <img src={pharmacyIcon} alt="Pharmacy" />
                  <i className="fas fa-gem me-3"></i>
                  {t("Pharmacy")}
                  <img
                    src={rightArrowFooterIcon}
                    alt="rightArrowFooter"
                    className="hide-on-mobile"
                  />
                </div>
                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
                  <img src={deliveryIcon} alt="delivery" />
                  <i className="fas fa-gem me-3"></i>
                  {t("Delivery")}
                  <img
                    src={rightArrowFooterIcon}
                    alt="rightArrowFooter"
                    className="hide-on-mobile"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="">
            <div className="container text-center text-md-start mt-5">
              <div className="row mt-3 footer-mobile">
                <div className="col-md-6 col-lg-3 mx-auto mb-4">
                  <img src={errandiaLogo} alt="logo" className="mb-4" />
                  <p className="footer-logoText">
                    {t(
                      "Searching for products and services online is now easier than ever. Use Errandia to find the products and services you need, all from the comfort of your own home."
                    )}
                  </p>
                  <div className="col-md-3 col-lg-3 mb-4">
                    <h6 className="text-uppercase fw-bold mb-4 footer-nextText">
                      <i className="fas fa-gem"></i>
                      {t("Download Errandia")}
                    </h6>
                    <div className="footer-downloadLinks">
                      <a
                        href="https://play.google.com/store/games?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={googlePlaystoreDownload}
                          alt="googlePlaystoreDownload"
                        />
                      </a>
                      <a
                        href="https://www.apple.com/in/app-store/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={appstoreDownload} alt="appstoreDownload" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 mx-auto mb-4 ">
                  <h6 className="text-uppercase fw-bold mb-4 footer-nextText">
                    {t("Popular Categories")}
                  </h6>
                  <p>
                    <ul className="footer-infoTextList">
                      <li>Health & Relaxation(20)</li>
                      <li>Video Gaming(15)</li>
                      <li>Home Appliances (12)</li>
                      <li>Nursery & Primary (10)</li>
                      <li>Decors & Planning (9)</li>
                      <li>Phones & Accessories (7)</li>
                    </ul>
                  </p>
                </div>
                <div className="col-md-6 col-lg-3 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">
                    {t("Important links")}
                  </h6>
                  <p>
                    <ul className="footer-infoTextList">
                      {tokenAvailable && (
                        <li
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            dispatch(modalSubscriptionToggle());
                            dispatch(setSubscriptionModalTrue());
                          }}
                        >
                          {t("Subscribe to a package")}
                        </li>
                      )}
                      <li>
                        <Link to="about-us">{t("About Errandia")}</Link>
                      </li>
                      <li>
                        <Link to="faqs">{t("FAQs")}</Link>
                      </li>
                      {tokenAvailable && (
                        <li>
                          <Link to="list-your-business">
                            {t("Register your Business")}
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link to="privacy-policy">{t("Privacy Policy")}</Link>
                      </li>
                      <li>
                        <Link to="terms-condition">
                          {t("Terms of Service")}
                        </Link>
                      </li>
                    </ul>
                  </p>
                </div>
                <div className="col-md-6 col-lg-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">
                    {t("Find us")}
                  </h6>
                  <p>
                    <img src={footerLocationIcon} alt="footerLocation" />
                    <h7 className="footer-officeEmailText">{t("Office")}</h7>
                    <div>
                      <i></i>{" "}
                      {t("St. Claire Building, Molyko, Buea, SWR, Cameroon")}
                    </div>
                  </p>
                  <p>
                    <img src={emailIcon} alt="email" />
                    <h7 className="footer-officeEmailText">{t("Email")}</h7>
                    <div>
                      <i></i>
                      {t("support@errandia.com")}
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="text-center p-4 footer-bottom">
            Let see
            {t("© 2024 errandia.com. All rights reserved.")}
            <div className="footer-bottom-images">
              <div className="text-reset fw-bold">
                {t("Pay securely with")}:
              </div>
              <div className="payment-icons">
                <img
                  src={MtnMoney}
                  alt="mobileMoney"
                  className="payment-icon"
                />
                <img
                  src={OrangeMoney}
                  alt="orangeMoney"
                  className="payment-icon"
                />
              </div>
            </div>
          </div>
        </footer>
      </div>
      {/* <SubscriptionBoxModal /> */}
    </>
  );
};

export default Footer;
