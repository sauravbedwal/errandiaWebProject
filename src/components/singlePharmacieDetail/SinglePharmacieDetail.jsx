import React, { useEffect, useState } from "react";
import pharmaciesImage from "../../assets/images/pharmaciesImage.svg";
import businessNearYouLocationIcon from "../../assets/businessNearYouLocationIcon.svg";
import pharmaciesCall from "../../assets/pharmaciesCall.svg";
import tickPharmaciesOpen from "../../assets/tickPharmaciesOpen.svg";
import "../../App.css";
import pharmaciesFoundLocation from "../../assets/pharmaciesFoundLocation.svg";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import contact from "../../assets/contact.svg";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import CallPopUp from "../callPopUp/CallPopUp";
import { modalCallToggle, setCallModalTrue } from "../../utils/callModalSlice";
import { useDispatch } from "react-redux";
import Loader from "../loader/Loader";
import { useTranslation } from "react-i18next";
import "../../i18n";
import { format } from "date-fns";
import dayjs from "dayjs";

const SinglePharmacieDetail = () => {
  const { slug } = useParams();

  const { t, i18n } = useTranslation();

  // const notify = () => toast("Oops! The request was not found.");

  const [pharmacyDetail, setPharmacyDetail] = useState(null);

  const [loader, setLoader] = useState(false);

  const fetchPharmacieDetails = async () => {
    try {
      setLoader(true);
      const res = await getApi(apis.pharmacyDetails + `/${slug}`);
      console.log("fetchPharmacieDetails", res);
      setLoader(false);
      setPharmacyDetail(res.data.data.item);
    } catch (err) {
      setLoader(false);
      console.log(err);
      if (err.response && err.response.status === 404) {
        console.log("Resource not found!");
        notify();
      }
    }
  };

  useEffect(() => {
    fetchPharmacieDetails();
  }, []);

  const dispatch = useDispatch();

  const openGoogleMaps = async (latitude, longitude) => {
    try {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error getting location:", error);
      alert("Unable to retrieve your location.");
    }
  };

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const todaysDate = getTodayDate();
  // console.log("todaysDate", todaysDate);

  const pharmaciesDate = pharmacyDetail?.on_calls.filter((date) => {
    return date?.on_call_date === todaysDate;
  });
  // console.log("pharmaciesDate", pharmaciesDate);

  const nextPharmacyDate = pharmacyDetail?.on_calls
    .map((call) => call.on_call_date)
    .filter((date) => date > todaysDate)
    .sort((a, b) => new Date(a) - new Date(b))[0];
  // console.log("nextPharmacyDate", nextPharmacyDate);

  function getConsecutivePharmacyDates() {
    if (!pharmacyDetail?.on_calls) return [];

    const futureDates = pharmacyDetail.on_calls
      .map((call) => call.on_call_date)
      .sort((a, b) => new Date(a) - new Date(b));

    let selectedDates = [];
    if (nextPharmacyDate) {
      let currentDate = nextPharmacyDate;
      for (let date of futureDates) {
        if (date === currentDate) {
          selectedDates.push(date);
          currentDate = dayjs(date).add(1, "day").format("YYYY-MM-DD"); // Move to next day
        } else if (new Date(date) > new Date(currentDate)) {
          break; // Stop if a gap is found
        }
      }
    }
    return selectedDates;
  }

  const consecutivePharmacyDates = getConsecutivePharmacyDates();

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card card-container-singlePharmacieDetail">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="card-body">
                        <div className="d-flex gap-3 align-items-start pharmaciesFound-image-container">
                          <img
                            className="img-fluid singlePharmacieDetail-Image"
                            src={
                              pharmacyDetail?.cover_image_path &&
                              `${IMAGE_BASE_URL}${pharmacyDetail?.cover_image_path}`
                            }
                            alt="Card image cap"
                            style={{ borderRadius: "10px" }}
                          />

                          <div style={{ width: "100%" }}>
                            <h6 className="card-subtitle mb-2 text-muted pharmaciesDetails-name">
                              {pharmacyDetail?.name}
                            </h6>

                            <div className="pharmacyDetail-address-street">
                              <div className="d-flex align-items-start gap-2 pharmaciesFound-LocationTextIcon">
                                <img
                                  src={businessNearYouLocationIcon}
                                  alt="Location Icon"
                                />
                                <div>
                                  <p className="pharmacyDetail-address">
                                    {t("Address")}
                                  </p>

                                  <p
                                    className="pharmaciesLocationText"
                                    style={{ color: "#020053" }}
                                  >
                                    {/* Buea, South-West */}
                                    {pharmacyDetail?.location_address}
                                  </p>
                                </div>
                              </div>

                              <div className="d-flex align-items-start gap-2 pharmaciesFound-LocationTextIcon">
                                <img
                                  src={businessNearYouLocationIcon}
                                  alt="Location Icon"
                                />
                                <div>
                                  <p className="pharmacyDetail-address">
                                    {t("Street")}
                                  </p>

                                  <p
                                    className="pharmaciesLocationText"
                                    style={{ color: "#020053" }}
                                  >
                                    {pharmacyDetail?.street}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="pharmacyDetail-address-street">
                              <div className="d-flex align-items-start gap-2 pharmaciesFound-LocationTextIcon">
                                <div>
                                  <p className="pharmacyDetail-address">
                                    {t("Status")}
                                  </p>
                                  <div
                                    className="d-flex align-items-center gap-2"
                                    style={{ marginTop: "4px" }}
                                  >
                                    {/* <button
                                      class="pharmaciesButton-open"
                                      style={{ marginTop: "0" }}
                                    >
                                      <img src={tickPharmaciesOpen} />
                                      {t("open")}
                                    </button> */}
                                    {pharmaciesDate &&
                                      pharmaciesDate.length != 0 && (
                                        <button class="pharmaciesButton-open">
                                          <img src={tickPharmaciesOpen} />
                                          {t("open")}
                                        </button>
                                      )}
                                    <div className="pharmacyDetail-date-container">
                                      {pharmacyDetail?.on_calls.length != 0 &&
                                        nextPharmacyDate && (
                                          <h6 className="card-subtitle mt-1 mb-2 text-muted ">
                                            <span className="pharmaciesCard-subHeading-status">
                                              {t("Reopening")}:
                                            </span>
                                            <span className="pharmaciesCard-subHeading-date ms-2">
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

                              <div className="pharmaciesFound-buttons-container mt-2">
                                <button
                                  type="button"
                                  class="btn btn-primary btn-lg pharmaciesFound-whiteButton"
                                  onClick={() => {
                                    openGoogleMaps(
                                      pharmacyDetail?.latitude,
                                      pharmacyDetail?.longitude
                                    );
                                  }}
                                >
                                  {t("Go There")}
                                  <img src={pharmaciesFoundLocation} />
                                </button>

                                <button
                                  type="button"
                                  class="btn btn-primary btn-lg pharmaciesFound-blueButton"
                                  onClick={() => {
                                    dispatch(modalCallToggle());
                                    dispatch(setCallModalTrue());
                                  }}
                                >
                                  <img src={pharmaciesCall} />
                                  {t("Call")}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-xl-5 col-lg-7 col-md-12 col-sm-12 col-12">
                <div className="pharmacyDetails-contact-container">
                  <h6 className="pharmacyDetails-contact-heading">Contact</h6>

                  <div className="pharmacyDetails-phone-container mt-4">
                    <div className="pharmacyDetails-phone-number-container">
                      <div>
                        <p className="pharmacyDetails-phone-heading">
                          {t("Primary Line")}
                        </p>
                        <p
                          className="pharmacyDetails-phone-heading"
                          style={{
                            fontSize: "16px",
                            fontWeight: "700",
                            color: "#1205D2",
                          }}
                        >
                          {pharmacyDetail?.primary_phone}
                        </p>
                      </div>
                      <div
                        className="pharmacyDetails-phone"
                        onClick={() => {
                          dispatch(modalCallToggle());
                          dispatch(setCallModalTrue());
                        }}
                      >
                        <img
                          src={contact}
                          alt="contact"
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>

                  {pharmacyDetail?.other_phones && (
                    <div className="mt-4">
                      <h6
                        className="pharmacyDetails-contact-heading"
                        style={{ color: "#9095A1", border: "none" }}
                      >
                        {t("Others")}
                      </h6>
                      {pharmacyDetail?.other_phones
                        .split(",")
                        .map((phone, index) => {
                          return (
                            <div className="pharmacyDetails-phone-number-container mt-3">
                              <div>
                                <p className="pharmacyDetails-phone-heading">
                                  {t("Line")} {index + 2}
                                </p>
                              </div>
                              <p
                                className="pharmacyDetails-phone-heading"
                                style={{
                                  color: "#3A4552",
                                }}
                              >
                                {phone.trim()}
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
                <div className="pharmacyDetails-calender">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                      value={dayjs(nextPharmacyDate)} // Default selected date
                      shouldDisableDate={(date) =>
                        !consecutivePharmacyDates.includes(
                          date.format("YYYY-MM-DD")
                        )
                      }
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
          </div>
          {/* <ToastContainer /> */}
          <CallPopUp pharmacyDetail={pharmacyDetail} />
        </>
      )}
    </>
  );
};

export default SinglePharmacieDetail;
