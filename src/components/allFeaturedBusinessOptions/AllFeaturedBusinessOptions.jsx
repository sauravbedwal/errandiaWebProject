import React, { useRef, useEffect, useState } from "react";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { setTrue, toggle } from "../../utils/booleanSlice";
import featureCardsImage from "../../assets/featureCardsImage.svg";
import businessNearYouLocationIcon from "../../assets/businessNearYouLocationIcon.svg";
import { useNavigate } from "react-router-dom";
import FeaturedBusinessProfileShare from "../featuredBusinessProfileShare/FeaturedBusinessProfileShare";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import { token } from "../../utils/utils";
import { featuredList } from "../../utils/featuredDataSlice";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import noPharmaciesFound from "../../assets/noPharmaciesFound.svg";
import pharamciesNotFoundRunErrand from "../../assets/pharamciesNotFoundRunErrand.svg";
import Loader from "../loader/Loader";
import "../../i18n";

const AllFeaturedBusinessOptions = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const [loader, setLoader] = useState(false);

  // const notify = () => toast("Oops! The request was not found.");

  const featuredListData = useSelector((store) => store?.featuredData);
  // console.log("allfeaturedListData", featuredListData);

  const navigate = useNavigate();

  useEffect(() => {
    if (!featuredListData) {
      const featuredListHandler = async () => {
        try {
          setLoader(true);
          const res = await getApi(apis.featured, token());
          // console.log("API Response:", res);
          // console.log(res.data?.data?.items)
          setLoader(false);
          dispatch(featuredList(res.data.data.items));
        } catch (err) {
          setLoader(false);
          // console.log("API Error:", err);
          if (err.response && err.response.status === 404) {
            // console.log("Resource not found!");
            notify();
          }
        }
      };

      featuredListHandler();
    }
  }, [dispatch, featuredListData]);

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    return words
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const createFallbackImage = (initials) => {
    const fontBase64 = "data:font/woff2;base64,PUT_YOUR_BASE64_FONT_HERE";

    const svg = `
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style type="text/css">
                    @font-face {
                        font-family: 'Inter';
                        src: url('${fontBase64}') format('woff2');
                    }
                    text {
                        font-family: 'Inter', sans-serif;
                        font-size: 40px;
                        fill: #fff;
                        text-anchor: middle;
                        dominant-baseline: middle;
                    }
                </style>
            </defs>
            <rect width="100" height="100" fill="#1006ac"/>
            <text x="50%" y="50%">${initials}</text>
        </svg>`;

    return `data:image/svg+xml;base64,${btoa(
      unescape(encodeURIComponent(svg))
    )}`;
  };

  return (
    <>
      {!featuredListData ? (
        <Loader />
      ) : featuredListData && featuredListData.length > 0 ? (
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div className="addedErrands-container">
                <h4 className="addedErrands-heading">
                  {t("Featured Businesses")}
                </h4>

                {/* <div className="ddedErrands-dropDownContainer">
                  <p className="ddedErrands-dropDownHeading">Sort By :</p>
                  <Dropdown drop="down">
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="addedErrands-dropdown"
                    >
                      Distance (km)
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div> */}

                {/* <Button
                  variant="primary"
                  className="addedErrands-offCanvas-button mt-0"
                  onClick={() => {
                    dispatch(toggle());

                    dispatch(setTrue());
                  }}
                >
                  {t("Filter and Search")}
                </Button> */}
              </div>
            </div>
          </div>
          <div className="row mobile-cards-center">
            {/* justify-content-between */}
            {featuredListData &&
              featuredListData.map((feature, index) => {
                const initials = getInitials(feature?.name);

                // console.log("initials", initials);
                const fallbackImage = createFallbackImage(initials);
                return (
                  <div
                    className="card businessCard-container  col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 mt-4 mb-4 me-2"
                    style={{ width: "12rem" }}
                    key={index}
                  >
                    <div
                      className="card-body"
                      onClick={() => {
                        navigate(
                          `/business-profile-user-view/${feature?.slug}`
                        );
                      }}
                    >
                      <div>
                        <div className="businessImageContainer">
                          <img
                            className="businessImage"
                            src={
                              feature?.image
                                ? `${IMAGE_BASE_URL}${feature?.image}`
                                : fallbackImage
                              //  fallbackImage
                              // featureCardsImage
                            }
                            // onError={(e) => {
                            //   e.target.src = featureCardsImage;
                            // }}
                          />
                        </div>
                        <div>
                          <div className="businessNearYouCard-preHeading">
                            {feature?.category?.name ||
                              "Category Not Available"}
                          </div>
                          <h5 className="card-title businessNearYouCard-heading">
                            {feature?.name.length > 10
                              ? `${feature?.name.substring(0, 10)}...`
                              : feature?.name}
                          </h5>
                        </div>
                      </div>
                      <div className="d-flex align-items-center businessNearYouTextIcon mt-3 businessLocationAndText">
                        <img
                          src={businessNearYouLocationIcon}
                          alt="Location Icon"
                        />
                        <p className="businessNearYouText">
                          {feature?.region?.name || "Location Not Available"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div className="row   errandos-mobile-tab">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="pharmaciesNoResultFound-container">
              <img
                src={noPharmaciesFound}
                alt="noPharmaciesFound"
                className="img-fluid"
              />

              <h4 className="pharmaciesNoResultFound-heading">
                No Results Found
              </h4>
              <p className="pharmaciesNoResultFound-subText">
                We've searched and searched to no avail.
              </p>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="pharmaciesNoResultFound-bgImage-container">
              <h4 className="pharmaciesNoResultFound-headingErrand">
                May be try running an errand.
              </h4>
              <Button
                variant="primary"
                className="products-call-button-Errand"
                onClick={() => {
                  dispatch(modalToggle());
                  dispatch(setModalTrue());
                }}
              >
                <img src={pharamciesNotFoundRunErrand} alt="whatsappIcon" />
                Run Errand
              </Button>{" "}
            </div>
          </div>
        </div>
      )}

      <FeaturedBusinessProfileShare />
      {/* <ToastContainer /> */}
    </>
  );
};

export default AllFeaturedBusinessOptions;
