import React from "react";
import "../../App.css";
import mobilePhoneAdPhoneScreenhome1 from "../../assets/images/phone-img.png";
import mobilePhoneAdgooglePlaystoreDownload from "../../assets/images/googlePlaystore1.png";
import mobilePhoneAdappstoreDownload from "../../assets/images/appleStore1.png";
import { useTranslation } from "react-i18next";
import "../../i18n";

const MobilePhonesAdAbout = () => {
  
  const { t, i18n } = useTranslation();

  return (
    <div className="container-fluid mobilePhonesAd-Background mt-0">
      <div className="container-fluid mobilePhonesAd-middleBackground">
        <div className="container">
          <div className="row mobileAdPhonesAndText gap-5">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mobileText">
              <div className="mobilePhonesAd-text">
              {t("Download the Errandia App from App Store or Play Store")}
              </div>
              <div className="googleApple-images">
                <a
                  href="https://play.google.com/store/games?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={mobilePhoneAdgooglePlaystoreDownload}
                    alt="mobilePhoneAdgooglePlaystoreDownload"
                  />
                </a>
                <a
                  href="https://www.apple.com/in/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={mobilePhoneAdappstoreDownload}
                    alt="mobilePhoneAdappstoreDownload"
                  />
                </a>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 phoneImage">
              <img
                src={mobilePhoneAdPhoneScreenhome1}
                alt="mobilePhonesAdPhoneScreenhome1"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePhonesAdAbout;
