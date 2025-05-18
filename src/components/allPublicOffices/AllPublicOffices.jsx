import React, { useEffect, useState } from "react";
import "../../App.css";
import Dropdown from "react-bootstrap/Dropdown";
import publicOfficesImage from "../../assets/publicOfficesImage.svg";
import publicOfficesImage2 from "../../assets/publicOfficesImage2.svg";
import publicOfficesImage3 from "../../assets/publicOfficesImage3.svg";
import businessNearYouLocationIcon from "../../assets/businessNearYouLocationIcon.svg";
import pharmaciesCall from "../../assets/pharmaciesCall.svg";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { setTrue, toggle } from "../../utils/booleanSlice";
import goThere_publicOffices from "../../assets/goThere_publicOffices.svg";
import {
  addSearchProduct,
  region,
  selectedRegion,
  selectedTown,
  setIsPending,
  town,
} from "../../utils/searchProductSlice";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { addSearchBusiness } from "../../utils/searchBusinessSlice";
import {
  addActivePage,
  addPerPage,
  addTotalItems,
} from "../../utils/paginationSlice";
import Loader from "../loader/Loader";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../i18n";

const AllPublicOffices = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const allBusinesses = useSelector((store) => store?.searchBusiness);
  // console.log("allBusinesses public", allBusinesses);

  const isPendingFromStore = useSelector(
    (store) => store?.searchProduct?.isPending
  );

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

  const openGoogleMaps = async (latitude, longitude) => {
    try {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error getting location:", error);
      alert("Unable to retrieve your location.");
    }
  };

  const navigate = useNavigate();

  return (
    <>
      {isPendingFromStore ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="allPublicOffices-dropDown-filter-Container">
                  {/* <div className="allPublicOffices-dropDownContainer">
                <p className="allPublicOffices-dropDownHeading">Sort By :</p>
                <Dropdown drop="down">
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    className="allPublicOffices-dropdown"
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
            <div className="row">
              {allBusinesses?.map((business) => {
                const initials = getInitials(business?.name);
                const fallbackImage = createFallbackImage(initials);

                const { latitude, longitude } = business;

                return (
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-3">
                    <div className="card card-container-allPublicOffices me-3 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="row">
                        <div
                          className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 open-container"
                          onClick={() => {
                            navigate(
                              `/business-profile-user-view/${business?.slug}`
                            );
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="card-body">
                            <div className="allPublicOffices-imageHeading-container">
                              <img
                                className="allPublicOffices-Image"
                                src={
                                  business?.image
                                    ? `${IMAGE_BASE_URL}${business?.image}`
                                    : fallbackImage
                                }
                                onError={(e) => {
                                  e.target.src = fallbackImage;
                                  // dispatch(addFallBackImage(fallbackImage));
                                }}
                                alt="Card image cap"
                              />

                              <div>
                                <h6 className="card-subtitle mb-1 text-muted allPublicOffices-Heading">
                                  {business?.name}
                                </h6>

                                {(business?.town?.name ||
                                  business?.region?.name) && (
                                  <div className="d-flex align-items-center gap-2 pharmaciesLocationTextIcon">
                                    <img
                                      src={businessNearYouLocationIcon}
                                      alt="Location Icon"
                                    />
                                    <p className="pharmaciesLocationText">
                                      {business?.town?.name
                                        ? `${business?.town?.name}, `
                                        : ""}
                                      {business?.region?.name
                                        ? business?.region?.name
                                        : ""}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 allPublicOffices-callButton-container">
                          {business?.street && (
                            <div>
                              <div className="d-flex align-items-center gap-2 pharmaciesLocationTextIcon">
                                <p className="pharmaciesLocationText-open">
                                  {t("Street")}
                                </p>
                              </div>
                              <h6 className="card-subtitle mb-2 text-muted pharmaciesCard-subHeading-open">
                                {business?.street}
                              </h6>
                            </div>
                          )}

                          <button
                            type="button"
                            class="btn btn-primary btn-lg allPublicOfficesButton"
                            onClick={() => {
                              openGoogleMaps(latitude, longitude);
                            }}
                          >
                            {t("Go There")}
                            <svg
                              width="26"
                              height="17"
                              viewBox="0 0 26 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id="path-1-inside-1_11088_10393"
                                fill="white"
                              >
                                <path d="M0 0.5H26V16.5H0V0.5Z" />
                              </mask>
                              <path
                                d="M1 16.5V0.5H-1V16.5H1Z"
                                fill="white"
                                fill-opacity="0.5"
                                mask="url(#path-1-inside-1_11088_10393)"
                              />
                              <path
                                d="M17.9987 15.1663C17.8431 15.1663 17.7098 15.1219 17.5987 15.033C17.4876 14.9441 17.4043 14.8275 17.3487 14.683C17.1376 14.0608 16.8709 13.4775 16.5487 12.933C16.2376 12.3886 15.7987 11.7497 15.232 11.0163C14.6654 10.283 14.2043 9.58301 13.8487 8.91634C13.5043 8.24967 13.332 7.44412 13.332 6.49967C13.332 5.19967 13.782 4.09967 14.682 3.19967C15.5931 2.28856 16.6987 1.83301 17.9987 1.83301C19.2987 1.83301 20.3987 2.28856 21.2987 3.19967C22.2098 4.09967 22.6654 5.19967 22.6654 6.49967C22.6654 7.51079 22.4709 8.35523 22.082 9.03301C21.7043 9.69967 21.2654 10.3608 20.7654 11.0163C20.1654 11.8163 19.7098 12.483 19.3987 13.0163C19.0987 13.5386 18.8487 14.0941 18.6487 14.683C18.5931 14.8386 18.5043 14.9608 18.382 15.0497C18.2709 15.1275 18.1431 15.1663 17.9987 15.1663ZM17.9987 12.783C18.1876 12.4052 18.3987 12.033 18.632 11.6663C18.8765 11.2997 19.232 10.8108 19.6987 10.1997C20.1765 9.57745 20.5654 9.00523 20.8654 8.48301C21.1765 7.94967 21.332 7.28856 21.332 6.49967C21.332 5.57745 21.0043 4.79412 20.3487 4.14967C19.7043 3.49412 18.9209 3.16634 17.9987 3.16634C17.0765 3.16634 16.2876 3.49412 15.632 4.14967C14.9876 4.79412 14.6654 5.57745 14.6654 6.49967C14.6654 7.28856 14.8154 7.94967 15.1154 8.48301C15.4265 9.00523 15.8209 9.57745 16.2987 10.1997C16.7654 10.8108 17.1154 11.2997 17.3487 11.6663C17.5931 12.033 17.8098 12.4052 17.9987 12.783ZM17.9987 8.16634C18.4654 8.16634 18.8598 8.00523 19.182 7.68301C19.5043 7.36079 19.6654 6.96634 19.6654 6.49967C19.6654 6.03301 19.5043 5.63856 19.182 5.31634C18.8598 4.99412 18.4654 4.83301 17.9987 4.83301C17.532 4.83301 17.1376 4.99412 16.8154 5.31634C16.4931 5.63856 16.332 6.03301 16.332 6.49967C16.332 6.96634 16.4931 7.36079 16.8154 7.68301C17.1376 8.00523 17.532 8.16634 17.9987 8.16634Z"
                                fill="#F6F7F9"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AllPublicOffices;

// const [search, setSearch] = useState("");
//   const regionFromStore = useSelector((store) => store.searchProduct.region);
//   // console.log("regionFromStore", regionFromStore);

//   const townsFromStore = useSelector((store) => store.searchProduct.town);

//   const distanceFromStore = useSelector(
//     (store) => store.searchProduct.addDistance
//   );

//   const activePageFromStore = useSelector(
//     (store) => store?.pagination?.activePage
//   );

//   const perPageFromStore = useSelector((store) => store?.pagination?.perPage);

//   const publicInformationHandler = async () => {
//     try {
//       const params = new URLSearchParams({
//         q: search,
//         region: regionFromStore ? regionFromStore : "",
//         town: townsFromStore ? townsFromStore : "",
//         distance: distanceFromStore ? distanceFromStore : "",
//         page: activePageFromStore ? activePageFromStore : "1",
//         per_page: perPageFromStore ? perPageFromStore : "10",
//         business_type: "public",
//         // latitude: "4.152914",
//         // longitude: "9.2952491",
//         // category: "1",
//       });

//       dispatch(setIsPending(true));
//       const res = await getApi(apis.searchBusiness + `?${params.toString()}`);
//       console.log("searchBusinessHandler", res);
//       dispatch(setIsPending(false));

//       dispatch(addSearchBusiness(res.data.data.items));
//       dispatch(addPerPage(res.data.data.per_page));
//       dispatch(addTotalItems(res.data.data.total));
//       setSearch("");
//     } catch (err) {
//       console.log(err);
//       if (err.response && err.response.status === 404) {
//         console.log("Resource not found!");
//         notify();
//       }
//     }
//   };

//   // useEffect(() => {
//   //   dispatch(addActivePage(1));
//   //   publicInformationHandler();
//   // }, []);
