import React from "react";
import "../../App.css";
import mobilePhoneAdPhoneScreenhome1 from "../../assets/images/mobilePhoneAdPhoneScreenhome1.svg";
import mobilePhoneAdPhoneScreenhome2 from "../../assets/images/mobilePhoneAdPhoneScreenhome2.svg";
import mobilePhoneAdgooglePlaystoreDownload from "../../assets/mobilePhoneAdgooglePlaystoreDownload.svg";
import mobilePhoneAdappstoreDownload from "../../assets/mobilePhoneAdappstoreDownload.svg";
import { useTranslation } from "react-i18next";

const MobilePhonesAd = () => {
  const { t } = useTranslation();

  return (
    <div className="container-fluid mobilePhonesAd-Background">
      <div className="container-fluid mobilePhonesAd-middleBackground">
        <div className="container">
          <div className="row mobileAdPhonesAndText gap-5">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 phoneImage">
              <img
                src={mobilePhoneAdPhoneScreenhome1}
                alt="mobilePhonesAdPhoneScreenhome1"
              />
              <img
                src={mobilePhoneAdPhoneScreenhome2}
                alt="mobilePhonesAdPhoneScreenhome2"
                className="mobilePhonesAd-PhoneScreenhome2"
              />
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mobileText">
              <div className="mobilePhonesAd-text">
                {t("Download the Errandia App from App Store or Play Store")}
              </div>
              <div className="googleApple-images">
                <a
                  href=" https://play.google.com/store/apps/details?id=com.nishangsystems.errandia&hl=en_IN"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePhonesAd;
