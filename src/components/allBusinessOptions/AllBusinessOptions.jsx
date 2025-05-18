import React, { useState, useEffect } from "react";
import "../../App.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { setTrue, toggle } from "../../utils/booleanSlice";
import featureCardsImage from "../../assets/featureCardsImage.svg";
import featureCardsImage3 from "../../assets/featureCardsImage3.svg";
import featureCardsImage2 from "../../assets/featureCardsImage2.svg";
import featureCardsImage4 from "../../assets/featureCardsImage4.svg";
import featureCardsImage6 from "../../assets/featureCardsImage6.svg";
import businessNearYouLocationIcon from "../../assets/businessNearYouLocationIcon.svg";
import PaginationComponent from "../pagination/PaginationComponent";
import { useNavigate } from "react-router-dom";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { ToastContainer, toast } from "react-toastify";
import { addBusiness } from "../../utils/businessDataSlice";
import { addDistance } from "../../utils/searchProductSlice";
import { addFallBackImage } from "../../utils/fallBackImageSlice";
import noPharmaciesFound from "../../assets/noPharmaciesFound.svg";
import pharamciesNotFoundRunErrand from "../../assets/pharamciesNotFoundRunErrand.svg";
import Loader from "../loader/Loader";
import { modalToggle, setModalTrue } from "../../utils/modalSlice";
import { token } from "../../utils/utils";

const AllBusinessOptions = () => {
  const dispatch = useDispatch();

  // const notify = () => toast("Oops! The request was not found.");

  const [distance, setDistance] = useState(null);
  // console.log("distance", distance);

  useEffect(() => {
    dispatch(addDistance(distance));
  }, [distance]);

  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const allBusinesses = useSelector((store) => store?.searchBusiness);
  // console.log("allBusinesses collection", allBusinesses);

  const [businessData, setBusinessData] = useState(null);

  // useEffect(() => {
  //   if (allBusinesses && allBusinesses.length > 0) {
  //     setBusinessData(allBusinesses);
  //     setLoader(false);
  //   }
  // }, [allBusinesses]);
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
    const svg = `
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="#1006ac"/>
            <text x="50%" y="50%" font-size="40" text-anchor="middle" fill="#fff" dy=".3em">${initials}</text>
        </svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  // const initials = getInitials(business?.name);
  // const fallbackImage = createFallbackImage(initials);
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
          {allBusinesses && allBusinesses.length > 0 && (
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12  ">
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
                    Filter and Search
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="row mobile-cards-center">
            {loader ? (
              <Loader />
            ) : allBusinesses && allBusinesses.length > 0 ? (
              allBusinesses?.map((business) => {
                const initials = getInitials(business?.name);
                const fallbackImage = createFallbackImage(initials);

                return (
                  <div className="card businessCard-container  col-xl-3 col-lg-3 col-md-6 col-sm-6   mt-4 mb-4 me-2">
                    <div
                      className="card-body"
                      onClick={() => {
                        navigate(
                          `/business-profile-user-view/${business?.slug}`
                        );
                      }}
                    >
                      <div>
                        <div className="businessImageContainer">
                          <img
                            className="businessImage"
                            src={
                              business?.image
                                ? `${IMAGE_BASE_URL}${business?.image}`
                                : fallbackImage
                            }
                            onError={(e) => {
                              e.target.src = fallbackImage;
                              // dispatch(addFallBackImage(fallbackImage));
                            }}
                          />
                        </div>
                        <div>
                          <div className="businessNearYouCard-preHeading">
                            {business?.category?.name}
                          </div>
                          <h5 className="card-title businessNearYouCard-heading mt-2">
                            {business?.name.length > 10
                              ? `${business?.name.substring(0, 10)}...`
                              : business?.name}
                          </h5>
                        </div>
                      </div>
                      <div className="d-flex align-items-center businessNearYouTextIcon mt-3 businessLocationAndText">
                        <img
                          src={businessNearYouLocationIcon}
                          alt="Location Icon"
                        />
                        <p className="businessNearYouText">
                          {business?.town?.name} {business?.region?.name}
                        </p>
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
                      Run Errand
                    </Button>{" "}
                  </div>
                </div>
              </div>
            )}
          </div>
          {!isPendingFromStore && allBusinesses && allBusinesses.length > 0 ? (
            <PaginationComponent />
          ) : null}
          {/* <ToastContainer /> */}
        </div>
      )}
    </>
  );
};

export default AllBusinessOptions;
// ss
