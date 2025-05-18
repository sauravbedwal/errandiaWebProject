import React from "react";
import "../../App.css";
import { useDispatch } from "react-redux";
import { modalToggle, setModalTrue } from "../../utils/modalSlice";
import { useTranslation } from "react-i18next";

const GetStartedImage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <div className="container-fluid getStartedImage-Background">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 getStartedImage-Background-Container">
            <div className="getStartedImage-text">
            {t("Find a business, a product or a service within your reach with Errandia, right now!")}
            </div>
            <button
              type="button"
              class="btn btn-primary btn-lg getStartedImageButton"
              onClick={() => {
                dispatch(modalToggle());
                dispatch(setModalTrue());
              }}
            >
              {t("Get Started")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStartedImage;
