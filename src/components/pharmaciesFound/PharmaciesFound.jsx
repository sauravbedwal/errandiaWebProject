import React, { useState, useEffect } from "react";
import pharmaciesImage from "../../assets/images/pharmaciesImage.svg";

import businessNearYouLocationIcon from "../../assets/businessNearYouLocationIcon.svg";
import pharmaciesCall from "../../assets/pharmaciesCall.svg";
import tickPharmaciesOpen from "../../assets/tickPharmaciesOpen.svg";

import "../../App.css";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { setTrue, toggle } from "../../utils/booleanSlice";
import Dropdown from "react-bootstrap/Dropdown";
import pharmaciesFoundClosed from "../../assets/pharmaciesFoundClosed.svg";
import pharmaciesFoundLocation from "../../assets/pharmaciesFoundLocation.svg";
import { useNavigate } from "react-router-dom";
import { addDistance } from "../../utils/searchProductSlice";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { modalCallToggle, setCallModalTrue } from "../../utils/callModalSlice";
import CallPopUp from "../callPopUp/CallPopUp";

import noPharmaciesFound from "../../assets/noPharmaciesFound.svg";
import pharamciesNotFoundRunErrand from "../../assets/pharamciesNotFoundRunErrand.svg";
import PaginationComponent from "../pagination/PaginationComponent";
import Loader from "../loader/Loader";
import { useTranslation } from "react-i18next";
import "../../i18n";
import { format } from "date-fns";
import { modalToggle, setModalTrue } from "../../utils/modalSlice";
import { token } from "../../utils/utils";

const PharmaciesFound = () => {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const allPharmacies = useSelector((store) => store?.searchPharmacies);
  // console.log("allPharmacies collection", allPharmacies);

  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const [distance, setDistance] = useState(null);
  // console.log("distance", distance);

  useEffect(() => {
    dispatch(addDistance(distance));
  }, [distance]);

  useEffect(() => {
    // Set a flag before reload
    const handleBeforeUnload = () => {
      localStorage.setItem("isRefreshed", "true");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Check flag after refresh
    if (localStorage.getItem("isRefreshed") === "true") {
      localStorage.removeItem("isRefreshed"); // Clear flag
      navigate("/"); // Redirect to home
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate]);

  const openGoogleMaps = async (latitude, longitude) => {
    try {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error getting location:", error);
      alert("Unable to retrieve your location.");
    }
  };

  const [pharmacy, setPharmacy] = useState(null);
  // console.log("pharmacy", pharmacy);

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // console.log(getTodayDate());

  const todaysDate = getTodayDate();
  // console.log("todaysDate", todaysDate);
  const isPendingFromStore = useSelector(
    (store) => store?.searchProduct?.isPending
  );

  const tokenAvailable = token();

  return (
    <>
      {isPendingFromStore ? (
        <Loader />
      ) : (
        <div className="container">
          {allPharmacies && allPharmacies.length > 0 && (
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="allPublicOffices-dropDown-filter-Container">
                  {/* <div className="allPublicOffices-dropDownContainer">
                    <p className="allPublicOffices-dropDownHeading">
                      Sort By :
                    </p>
                    <Dropdown drop="down">
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        className="allPublicOffices-dropdown"
                      >
                        {distance === null
                          ? "Distance(km)"
                          : `${distance} km away`}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => {
                            setDistance("1");
                          }}
                        >
                          1km away
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setDistance("10");
                          }}
                        >
                          10km away
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setDistance("20");
                          }}
                        >
                          {" "}
                          20km away
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setDistance("25");
                          }}
                        >
                          {" "}
                          25km away
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div> */}
                  <Button
                    variant="primary"
                    className="addedErrands-offCanvas-button"
                    onClick={() => {
                      dispatch(toggle());

                      dispatch(setTrue());
                    }}
                  >
                    {t("Filter and Search")}
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="row">
            {loader ? (
              <Loader />
            ) : allPharmacies && allPharmacies.length > 0 ? (
              allPharmacies.map((pharmacies) => {
                const { latitude, longitude } = pharmacies;
                // console.log("allPharmacies?.on_calls", pharmacies?.on_calls);
                // console.log("latitude, longitude", latitude, longitude);

                const pharmaciesDate = pharmacies?.on_calls.filter((date) => {
                  return date?.on_call_date === todaysDate;
                });
                // console.log("pharmaciesDate", pharmaciesDate);

                const nextPharmacyDate = pharmacies?.on_calls
                  .map((call) => call.on_call_date)
                  .filter((date) => date > todaysDate)
                  .sort((a, b) => new Date(a) - new Date(b))[0];
                // console.log("nextPharmacyDate", nextPharmacyDate);

                return (
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="card card-container-pharmaciesFound mb-4">
                      <div className="row">
                        <div className="col-xl-8 col-lg-7 col-md-7 col-sm-12 col-12 open-container">
                          <div className="card-body">
                            <div className="d-flex gap-3 pharmaciesFound-image-container">
                              <img
                                className="pharmaciesImage"
                                // src={pharmaciesData?.cover_image_path}
                                src={
                                  pharmacies?.cover_image_path
                                    ? `${IMAGE_BASE_URL}${pharmacies?.cover_image_path}`
                                    : pharmaciesImage
                                }
                                onError={(e) => {
                                  e.target.src = pharmaciesImage;
                                }}
                                onClick={() => {
                                  navigate(
                                    `/single-pharmacies/${pharmacies.id}`
                                  );
                                }}
                              />

                              <div>
                                {pharmacies.location_address === "" ? (
                                  ""
                                ) : (
                                  <div
                                    className="d-flex align-items-center gap-2 pharmaciesFound-LocationTextIcon"
                                    onClick={() => {
                                      navigate(
                                        `/single-pharmacies/${pharmacies.id}`
                                      );
                                    }}
                                  >
                                    <img
                                      src={businessNearYouLocationIcon}
                                      alt="Location Icon"
                                    />
                                    <p className="pharmaciesLocationText">
                                      {pharmacies?.location_address}
                                    </p>
                                  </div>
                                )}

                                <h6
                                  className="card-subtitle mb-2 text-muted pharmaciesCard-subHeading"
                                  style={{ color: "wheat" }}
                                  onClick={() => {
                                    navigate(
                                      `/single-pharmacies/${pharmacies.id}`
                                    );
                                  }}
                                >
                                  {pharmacies?.name}
                                </h6>

                                <div className="pharmaciesFound-buttons-container">
                                  <button
                                    type="button"
                                    class="btn btn-primary btn-lg pharmaciesFound-blueButton"
                                    onClick={() => {
                                      dispatch(modalCallToggle());
                                      dispatch(setCallModalTrue());
                                      setPharmacy(pharmacies);
                                    }}
                                  >
                                    <img src={pharmaciesCall} />
                                    {t("Call")}
                                  </button>

                                  <button
                                    type="button"
                                    className="btn btn-primary btn-lg pharmaciesFound-whiteButton"
                                    onClick={() => {
                                      openGoogleMaps(latitude, longitude);
                                    }}
                                  >
                                    {t("Go There")}
                                    <img
                                      src={pharmaciesFoundLocation}
                                      alt="Location Icon"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-5 col-md-5 col-sm-12 col-12">
                          <div className="card-body">
                            <div
                              className="pharmaciesFound-mobile"
                              style={{ padding: "0 1rem" }}
                              onClick={() => {
                                navigate(`/single-pharmacies/${pharmacies.id}`);
                              }}
                            >
                              <div className="d-flex align-items-center gap-2 pharmaciesLocationTextIcon">
                                <p className="pharmaciesLocationText-open">
                                  {t("Street")}
                                </p>
                              </div>
                              <h6 className="card-subtitle mb-2 text-muted pharmaciesCard-subHeading-open">
                                {pharmacies?.street}
                              </h6>
                              {pharmaciesDate && pharmaciesDate.length != 0 && (
                                <button class="pharmaciesButton-open">
                                  <img src={tickPharmaciesOpen} />
                                  {t("open")}
                                </button>
                              )}{" "}
                              <div>
                                {pharmacies?.on_calls.length != 0 &&
                                  nextPharmacyDate && (
                                    <h6 className="card-subtitle mt-1 mb-2 text-muted pharmacies-reopeningDate">
                                      <span className="pharmaciesCard-subHeading-status">
                                        {t("Reopening")}:
                                      </span>
                                      <span className="pharmaciesCard-subHeading-date">
                                        {/* {pharmacies?.on_calls[0]?.on_call_date} */}
                                        {format(
                                          new Date(nextPharmacyDate),
                                          "dd-MMMM-yyyy"
                                        )}
                                      </span>
                                    </h6>
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
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
                      {t("No Results Found")}
                    </h4>
                    <p className="pharmaciesNoResultFound-subText">
                      {t("We've searched and searched to no avail.")}
                    </p>
                  </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="pharmaciesNoResultFound-bgImage-container">
                    <h4 className="pharmaciesNoResultFound-headingErrand">
                      {t("May be try running an errand.")}
                    </h4>
                    <Button
                      variant="primary"
                      className="products-call-button-Errand"
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
                      <img
                        src={pharamciesNotFoundRunErrand}
                        alt="whatsappIcon"
                      />
                      {t("Run Errand")}
                    </Button>{" "}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <CallPopUp pharmacy={pharmacy} />
      {!isPendingFromStore && allPharmacies && allPharmacies.length > 0 ? (
        <PaginationComponent />
      ) : null}
    </>
  );
};

export default PharmaciesFound;
