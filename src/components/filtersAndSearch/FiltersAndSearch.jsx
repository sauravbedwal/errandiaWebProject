import React, { useEffect, useState } from "react";
import "../../App.css";
import filterUpArrow from "../../assets/filterUpArrow.svg";
import filterDownArrow from "../../assets/filterDownArrow.svg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import filterSearch from "../../assets/filterSearch.svg";
import filtersAdBanner from "../../assets/filtersAdBanner.svg";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { setFalse, setTrue, toggle } from "../../utils/booleanSlice";
import Collapse from "react-bootstrap/Collapse";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import apis from "../../Constant";
import { token } from "../../utils/utils";
import { addRegions } from "../../utils/regionsSlice";
import { addProductCategories } from "../../utils/productCategoriesSlice";
import { addTownsByRegion } from "../../utils/townsByRegionSlice";
import {
  region,
  selectedCall,
  selectedRegion,
  selectedTown,
  town,
} from "../../utils/searchProductSlice";
import dayjs from "dayjs";
import { addDate } from "../../utils/filterPharmaciesCalenderSlice";
import sideBarAd from "../../assets/sideBarAd.jpeg";
import sideBarAdEnglish from "../../assets/sideBarAdEnglish.jpeg";
import { useTranslation } from "react-i18next";

const FiltersAndSearch = () => {
  const boolean = useSelector((store) => store.boolean.value);
  // const [selectedRegion, setSelectedRegion] = useState(null);
  // console.log("selectedRegion", selectedRegion);
  // const [selectedTown, setSelectedTown] = useState(null);
  const [searchTown, setSearchTown] = useState("");
  console.log("searchTown", searchTown);

  const dispatch = useDispatch();

  const [open, setOpen] = useState({
    region: false,
    town: false,
    categories: false,
    onCall: false,
    showCalender: false,
  });

  const path = window.location.pathname;
  // console.log("path", path);

  const navigate = useNavigate();

  // const [showCalender, setShowCalender] = useState(false);

  const regionsFromStore = useSelector((store) => store?.regions);
  // console.log("regionsFromStore", regionsFromStore);

  // const [regions, setRegions] = useState(regionsFromStore);
  // console.log("regions", regions);

  useEffect(() => {
    if (!regionsFromStore) {
      const fetchRegions = async () => {
        try {
          const res = await getApi(apis.regions);
          // console.log("fetchRegions", res);
          // console.log("fetchRegions", res.data.data);
          dispatch(addRegions(res.data.data));

          // setRegions(res.data.data);
        } catch (err) {
          console.log("fetchRegions", err);
        }
      };
      fetchRegions();
    }
  }, []);

  const productCategoriesFromStore = useSelector(
    (store) => store.productCategories
  );

  // console.log("productCategoriesFromStore", productCategoriesFromStore);

  useEffect(() => {
    if (!productCategoriesFromStore) {
      const fetchProductCategories = async () => {
        try {
          const res = await getApi(apis.productCategories);
          // console.log("fetchProductCategories", res);
          dispatch(addProductCategories(res.data.data));
        } catch (err) {
          console.log("fetchProductCategories", err);
        }
      };
      fetchProductCategories();
    }
  }, []);

  const townsByRegionFromStore = useSelector((store) => store.townsByRegion);
  console.log("townsByRegionFromStore", townsByRegionFromStore);

  // if (!townsByRegionFromStore) {
  const fetchTowns = async (id) => {
    try {
      const params = new URLSearchParams({
        region_id: id,
      });

      dispatch(region(id));

      // console.log("api", apis.townsByRegion + `?${params.toString()}`);
      const res = await getApi(apis.townsByRegion + `?${params.toString()}`);
      // console.log("fetchTowns", res.data.data);
      dispatch(addTownsByRegion(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  // }

  const regionFromStore = useSelector((store) => store.searchProduct.region);
  // console.log("regionFromStore-Filter", regionFromStore);

  const townsFromStore = useSelector((store) => store.searchProduct.town);
  // console.log("townsFromStore-Filter", townsFromStore);

  const callFromStore = useSelector(
    (store) => store?.searchProduct.selectedCall
  );

  // function getTodayDate() {
  //   const today = new Date();
  //   return today.toDateString(); // Example output: "Thu Feb 27 2025"
  // }

  // const todayDate = getTodayDate();
  // console.log("todayDate", todayDate);

  const [selectedDate, setSelectedDate] = useState(dayjs());
  // console.log("selectedDate", selectedDate?.format("YYYY-MM-DD"));

  const [tempDate, setTempDate] = useState(dayjs()); // Temporary state for selecting the date

  useEffect(() => {
    dispatch(addDate(selectedDate?.format("YYYY-MM-DD")));
  }, [selectedDate]);

  // const filterCalenderToday = todayDate == selectedDate?.$d?.toDateString();
  // console.log("boolean", filterCalenderToday);

  const selectedRegionCollection = useSelector(
    (store) => store?.searchProduct?.selectedRegion
  );

  const selectedTownCollection = useSelector(
    (store) => store?.searchProduct?.selectedTown
  );

  // console.log(
  //   "(selectedRegionCollection",
  //   selectedRegionCollection,
  //   selectedTownCollection
  // );

  const { t } = useTranslation();

  const filterTowns =
    searchTown.trim() && searchTown !== ""
      ? townsByRegionFromStore.filter((town) => {
          return town?.name.toLowerCase().includes(searchTown.toLowerCase());
        })
      : [];

  console.log("filterTowns", filterTowns);

  return (
    <>
      <div className="container filter-main-container">
        <div className="row">
          {path === "/loggedInAllErrands" ||
          path === "/all-errands" ||
          path === "/faqs-details" ||
          path === "/featured-business" ? (
            ""
          ) : (
            <div className="filtersAndSearch-headingContainer">
              <h4 className="filtersAndSearch-heading">{t("Filters")}</h4>
              <p
                className="filtersAndSearch-subHeading"
                onClick={() => {
                  dispatch(region(null));
                  dispatch(town(null));
                  dispatch(selectedRegion(null));
                  dispatch(selectedTown(null));
                }}
              >
                {t("Clear All")}
              </p>
            </div>
          )}

          {path === "/search-products" ||
          path === "/search-services" ||
          path === "/search-product-details" ||
          path === "/product-services" ||
          path === "/search-businesses" ||
          path === "/search-pharmacies-no-result" ? (
            <div>
              <div className="filter-container">
                <h4 className="filter-heading">{t("Categories")}</h4>
                <div
                  className="filtersAndSearch-upArrowContainer"
                  onClick={() =>
                    setOpen((prev) => {
                      return { ...prev, categories: !prev.categories };
                    })
                  }
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                >
                  <img
                    src={
                      open.categories === true ? filterUpArrow : filterDownArrow
                    }
                    alt="filterUpArrow"
                    className="img-fluid"
                  />
                </div>
              </div>

              <Collapse in={open.categories}>
                <div id="example-collapse-text">
                  <div className="input-group rounded filter-searchContainer">
                    <input
                      type="search"
                      className="form-control rounded filter-search-input"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="search-addon"
                    />
                    <span
                      className="input-group-text border-0 filter-image"
                      id="search-addon"
                    >
                      <img src={filterSearch} />
                    </span>
                  </div>

                  <Form className="filter-second">
                    {productCategoriesFromStore?.map(
                      (productCategories, key) => {
                        return (
                          <div className="d-flex align-items-center">
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicCheckbox"
                            >
                              <Form.Check
                                type="radio"
                                className="filter-option"
                                key={productCategories.id}
                                label={<p>{productCategories?.name}</p>}
                              />
                            </Form.Group>
                          </div>
                        );
                      }
                    )}
                  </Form>
                </div>
              </Collapse>
            </div>
          ) : (
            ""
          )}

          {path === "/search-pharmacies" ? (
            <div>
              <div className="filter-container">
                <h4 className="filter-heading">{t("On Call")}</h4>
                <div
                  className="filtersAndSearch-upArrowContainer"
                  onClick={() => {
                    if (regionFromStore && townsFromStore) {
                      setOpen((prev) => ({ ...prev, onCall: !prev.onCall }));
                    }
                  }}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                >
                  <img
                    src={open.onCall === true ? filterUpArrow : filterDownArrow}
                    alt="filterUpArrow"
                    className="img-fluid"
                  />
                </div>
              </div>

              <Collapse in={open.onCall}>
                <div id="example-collapse-text">
                  <Form className="calender-filter-first">
                    <div className="d-flex align-items-center">
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <Form.Check
                          type="radio"
                          className="filter-option"
                          label={
                            <p style={{ cursor: "pointer" }}>
                              {t("Pharmacy on Call")}{" "}
                            </p>
                          }
                          checked={callFromStore === true}
                          onClick={() => {
                            if (callFromStore) {
                              dispatch(selectedCall(null));
                              setOpen((prev) => {
                                return {
                                  ...prev,
                                  showCalender: false,
                                };
                              });
                            } else {
                              dispatch(selectedCall(true));
                              setOpen((prev) => {
                                return {
                                  ...prev,
                                  showCalender: true,
                                };
                              });
                            }
                          }}
                        />
                      </Form.Group>
                    </div>
                    {/* {showCalender && (
                     
                    )} */}

                    <Collapse in={open.showCalender}>
                      <div id="example-collapse-text">
                        <>
                          <div>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicCheckbox"
                            >
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateCalendar
                                  className="calender-pharmacies-dropDown"
                                  value={selectedDate} // Set the selected date
                                  // onChange={(newDate) =>
                                  //   setSelectedDate(dayjs(newDate))
                                  // }
                                  onChange={(newDate) =>
                                    setTempDate(dayjs(newDate))
                                  } // Updates tempDate only
                                />
                              </LocalizationProvider>
                            </Form.Group>
                          </div>
                          <Button
                            variant="primary"
                            className="calender-filter-button"
                            onClick={() => setSelectedDate(tempDate)}
                          >
                            {t("Apply Filter")}
                          </Button>
                        </>
                      </div>
                    </Collapse>
                  </Form>
                </div>
              </Collapse>
            </div>
          ) : (
            ""
          )}

          {path === "/loggedInAllErrands" ||
          path === "/all-errands" ||
          path === "/faqs-details" ||
          path === "/featured-business" ? (
            ""
          ) : (
            <div>
              <div className="filter-container">
                <h4 className="filter-heading">{t("Region")}</h4>
                <div
                  className="filtersAndSearch-upArrowContainer"
                  onClick={() =>
                    setOpen((prev) => {
                      return { ...prev, region: !prev.region };
                    })
                  }
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                >
                  <img
                    src={open.region === true ? filterUpArrow : filterDownArrow}
                    alt="filterUpArrow"
                    className="img-fluid"
                  />
                </div>
              </div>

              <Collapse in={open.region}>
                <div id="example-collapse-text">
                  <Form className="filter-first">
                    {regionsFromStore &&
                      regionsFromStore.map((region) => (
                        <div
                          className="d-flex align-items-center"
                          key={region.id}
                        >
                          <Form.Group
                            className="mb-3"
                            controlId={`region-${region.id}`}
                          >
                            <Form.Check
                              type="radio"
                              name="regionGroup"
                              className="filter-option"
                              label={
                                <p style={{ cursor: "pointer" }}>
                                  {region.name}
                                </p>
                              }
                              // checked={selectedRegion === region.id}
                              checked={selectedRegionCollection === region.id}
                              onChange={() => {
                                // console.log("region ID", region.id);
                                dispatch(selectedRegion(region.id));
                                // setSelectedRegion(region.id)
                                dispatch(town(null));
                                dispatch(selectedTown(null));
                                fetchTowns(region.id);
                              }}
                              onClick={() => {
                                setOpen((prev) => {
                                  return { ...prev, region: !prev.region };
                                });
                                if (selectedRegionCollection === region.id) {
                                  // console.log("if working");
                                  fetchTowns(null);
                                  dispatch(selectedRegion(null));
                                  dispatch(town(null));
                                  // dispatch(region(null));
                                  dispatch(selectedTown(null));
                                }
                              }}
                            />
                          </Form.Group>
                        </div>
                      ))}
                  </Form>
                </div>
              </Collapse>
            </div>
          )}

          {path === "/loggedInAllErrands" ||
          path === "/all-errands" ||
          path === "/faqs-details" ||
          path === "/featured-business" ? (
            ""
          ) : (
            <div>
              <div className="filter-container">
                <h4 className="filter-heading">{t("Town")}</h4>
                <div
                  className="filtersAndSearch-upArrowContainer"
                  onClick={() => {
                    setOpen((prev) => {
                      return { ...prev, town: !prev.town };
                    });
                    setSearchTown("");
                  }}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                >
                  <img
                    src={open.town === true ? filterUpArrow : filterDownArrow}
                    alt="filterUpArrow"
                    className="img-fluid"
                  />
                </div>
              </div>

              <Collapse in={open.town}>
                <div id="example-collapse-text">
                  <div className="input-group rounded filter-searchContainer">
                    <input
                      type="search"
                      className="form-control rounded filter-search-input"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="search-addon"
                      value={searchTown}
                      onChange={(e) => {
                        setSearchTown(e.target.value);
                      }}
                      // onKeyDown={(e) => {
                      //   if (e.key === "Enter") {
                      //     e.preventDefault();
                      //     handleSearch();
                      //   }
                      // }}
                    />
                    <span
                      className="input-group-text border-0 filter-image"
                      id="search-addon"
                    >
                      {/* <img src={filterSearch} style={{ cursor: "pointer" }} /> */}
                    </span>
                  </div>

                  <Form className="filter-second">
                    {searchTown !== "" && filterTowns?.length === 0
                      ? "No result found!!!"
                      : (filterTowns && filterTowns?.length !== 0
                          ? filterTowns
                          : townsByRegionFromStore
                        )?.map((towns) => (
                          <div
                            className="d-flex align-items-center"
                            key={towns.id}
                          >
                            <Form.Group
                              className="mb-3"
                              controlId={`town-${towns.id}`}
                            >
                              <Form.Check
                                type="radio"
                                name="townGroup"
                                className="filter-option"
                                label={
                                  <p style={{ cursor: "pointer" }}>
                                    {towns.name}
                                  </p>
                                }
                                checked={selectedTownCollection === towns.id}
                                onChange={() => {
                                  dispatch(selectedTown(towns.id));
                                  dispatch(town(towns.id));
                                }}
                                onClick={() => {
                                  setOpen((prev) => ({
                                    ...prev,
                                    town: !prev.town,
                                  }));

                                  if (selectedTownCollection === towns.id) {
                                    // console.log("selectedTownCollection working");
                                    dispatch(town(null));
                                    dispatch(selectedTown(null));
                                  }

                                  setSearchTown("");
                                }}
                              />
                            </Form.Group>
                          </div>
                        ))}
                  </Form>
                </div>
              </Collapse>
            </div>
          )}

          <div className="filter-adBanner">
            <img
              src={sideBarAd}
              className="img-fluid"
              style={{ borderRadius: "20px" }}
            />
          </div>
          <div className="filter-adBanner">
            <img
              src={sideBarAdEnglish}
              className="img-fluid"
              style={{ borderRadius: "20px" }}
            />
          </div>
        </div>
      </div>

      <Offcanvas show={boolean}>
        <Offcanvas.Body>
          <div className="container filter-offCanvas">
            <div className="row">
              <div className="filtersAndSearch-headingContainer">
                <h4 className="filtersAndSearch-heading">{t("Filters")}</h4>
                <p
                  className="filtersAndSearch-subHeading"
                  onClick={() => {
                    dispatch(region(null));
                    dispatch(town(null));
                    dispatch(selectedRegion(null));
                    dispatch(selectedTown(null));
                    dispatch(toggle());
                    dispatch(setFalse());
                    dispatch(region(null));
                    dispatch(town(null));
                    dispatch(selectedRegion(null));
                    dispatch(selectedTown(null));
                  }}
                >
                  {t("Clear All")}
                </p>
              </div>

              {path === "/search-products" ||
              path === "/search-services" ||
              path === "/search-product-details" ||
              path === "/product-services" ||
              path === "/search-businesses" ||
              path === "/search-pharmacies-no-result" ? (
                <div>
                  <div className="filter-container">
                    <h4 className="filter-heading">{t("Categories")}</h4>
                    <div
                      className="filtersAndSearch-upArrowContainer"
                      onClick={() =>
                        setOpen((prev) => {
                          return { ...prev, categories: !prev.categories };
                        })
                      }
                      aria-controls="example-collapse-text"
                      aria-expanded={open}
                    >
                      <img
                        src={
                          open.categories === true
                            ? filterUpArrow
                            : filterDownArrow
                        }
                        alt="filterUpArrow"
                        className="img-fluid"
                      />
                    </div>
                  </div>

                  <Collapse in={open.categories}>
                    <div id="example-collapse-text">
                      <div className="input-group rounded filter-searchContainer">
                        <input
                          type="search"
                          className="form-control rounded filter-search-input"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="search-addon"
                        />
                        <span
                          className="input-group-text border-0 filter-image"
                          id="search-addon"
                        >
                          <img src={filterSearch} />
                        </span>
                      </div>

                      <Form className="filter-second">
                        {productCategoriesFromStore?.map(
                          (productCategories, key) => {
                            return (
                              <div className="d-flex align-items-center">
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicCheckbox"
                                >
                                  <Form.Check
                                    type="radio"
                                    className="filter-option"
                                    key={productCategories.id}
                                    label={<p>{productCategories?.name}</p>}
                                  />
                                </Form.Group>
                              </div>
                            );
                          }
                        )}
                      </Form>
                    </div>
                  </Collapse>
                </div>
              ) : (
                ""
              )}

              {path === "/search-pharmacies" ? (
                <div>
                  <div className="filter-container">
                    <h4 className="filter-heading">{t("On Call")}</h4>
                    <div
                      className="filtersAndSearch-upArrowContainer"
                      onClick={() => {
                        if (regionFromStore && townsFromStore) {
                          setOpen((prev) => ({
                            ...prev,
                            onCall: !prev.onCall,
                          }));
                        }
                      }}
                      aria-controls="example-collapse-text"
                      aria-expanded={open}
                    >
                      <img
                        src={
                          open.onCall === true ? filterUpArrow : filterDownArrow
                        }
                        alt="filterUpArrow"
                        className="img-fluid"
                      />
                    </div>
                  </div>

                  <Collapse in={open.onCall}>
                    <div id="example-collapse-text">
                      <Form className="calender-filter-first">
                        <div className="d-flex align-items-center">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicCheckbox"
                          >
                            <Form.Check
                              type="radio"
                              className="filter-option"
                              label={
                                <p style={{ cursor: "pointer" }}>
                                  {t("Pharmacy on Call")}{" "}
                                </p>
                              }
                              checked={callFromStore === true}
                              onClick={() => {
                                if (callFromStore) {
                                  dispatch(selectedCall(null));
                                  setOpen((prev) => {
                                    return {
                                      ...prev,
                                      showCalender: false,
                                    };
                                  });
                                } else {
                                  dispatch(selectedCall(true));
                                  setOpen((prev) => {
                                    return {
                                      ...prev,
                                      showCalender: true,
                                    };
                                  });
                                }
                              }}
                            />
                          </Form.Group>
                        </div>
                        {/* {showCalender && (
                     
                    )} */}

                        <Collapse in={open.showCalender}>
                          <div id="example-collapse-text">
                            <>
                              <div>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicCheckbox"
                                >
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DateCalendar
                                      className="calender-pharmacies-dropDown"
                                      value={selectedDate} // Set the selected date
                                      // onChange={(newDate) =>
                                      //   setSelectedDate(dayjs(newDate))
                                      // }
                                      onChange={(newDate) =>
                                        setTempDate(dayjs(newDate))
                                      } // Updates tempDate only
                                    />
                                  </LocalizationProvider>
                                </Form.Group>
                              </div>
                              <Button
                                variant="primary"
                                className="calender-filter-button"
                                onClick={() => setSelectedDate(tempDate)}
                              >
                                {t("Apply Filter")}
                              </Button>
                            </>
                          </div>
                        </Collapse>
                      </Form>
                    </div>
                  </Collapse>
                </div>
              ) : (
                ""
              )}

              <div>
                <div className="filter-container">
                  <h4 className="filter-heading">{t("Region")}</h4>
                  <div
                    className="filtersAndSearch-upArrowContainer"
                    onClick={() =>
                      setOpen((prev) => {
                        return { ...prev, region: !prev.region };
                      })
                    }
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                  >
                    <img
                      src={
                        open.region === true ? filterUpArrow : filterDownArrow
                      }
                      alt="filterUpArrow"
                      className="img-fluid"
                    />
                  </div>
                </div>

                <Collapse in={open.region}>
                  <div id="example-collapse-text">
                    <Form className="filter-first">
                      {regionsFromStore &&
                        regionsFromStore.map((region) => (
                          <div
                            className="d-flex align-items-center"
                            key={region.id}
                          >
                            <Form.Group
                              className="mb-3"
                              controlId={`region-${region.id}`}
                            >
                              <Form.Check
                                type="radio"
                                name="regionGroup"
                                className="filter-option"
                                label={
                                  <p style={{ cursor: "pointer" }}>
                                    {region.name}
                                  </p>
                                }
                                // checked={selectedRegion === region.id}
                                checked={selectedRegionCollection === region.id}
                                onChange={() => {
                                  // console.log("region ID", region.id);
                                  dispatch(selectedRegion(region.id));
                                  // setSelectedRegion(region.id)
                                  dispatch(town(null));
                                  dispatch(selectedTown(null));
                                  fetchTowns(region.id);
                                }}
                                onClick={() => {
                                  setOpen((prev) => {
                                    return { ...prev, region: !prev.region };
                                  });
                                  if (selectedRegionCollection === region.id) {
                                    // console.log("if working");
                                    fetchTowns(null);
                                    dispatch(selectedRegion(null));
                                    dispatch(town(null));
                                    // dispatch(region(null));
                                    dispatch(selectedTown(null));
                                  }
                                }}
                              />
                            </Form.Group>
                          </div>
                        ))}
                    </Form>
                  </div>
                </Collapse>
              </div>

              <div>
                <div className="filter-container">
                  <h4 className="filter-heading">{t("Town")}</h4>
                  <div
                    className="filtersAndSearch-upArrowContainer"
                    onClick={() =>
                      setOpen((prev) => {
                        return { ...prev, town: !prev.town };
                      })
                    }
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                  >
                    <img
                      src={open.town === true ? filterUpArrow : filterDownArrow}
                      alt="filterUpArrow"
                      className="img-fluid"
                    />
                  </div>
                </div>

                <Collapse in={open.town}>
                  <div id="example-collapse-text">
                    <div className="input-group rounded filter-searchContainer">
                      <input
                        type="search"
                        className="form-control rounded filter-search-input"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="search-addon"
                        value={searchTown}
                        onChange={(e) => {
                          setSearchTown(e.target.value);
                        }}
                        // onKeyDown={(e) => {
                        //   if (e.key === "Enter") {
                        //     e.preventDefault();
                        //     handleSearch();
                        //   }
                        // }}
                      />
                      <span
                        className="input-group-text border-0 filter-image"
                        id="search-addon"
                      >
                        {/* <img src={filterSearch} style={{ cursor: "pointer" }} /> */}
                      </span>
                    </div>

                    <Form className="filter-second">
                      {searchTown !== "" && filterTowns?.length === 0
                        ? "No result found!!!"
                        : (filterTowns && filterTowns?.length !== 0
                            ? filterTowns
                            : townsByRegionFromStore
                          )?.map((towns) => (
                            <div
                              className="d-flex align-items-center"
                              key={towns.id}
                            >
                              <Form.Group
                                className="mb-3"
                                controlId={`town-${towns.id}`}
                              >
                                <Form.Check
                                  type="radio"
                                  name="townGroup"
                                  className="filter-option"
                                  label={
                                    <p style={{ cursor: "pointer" }}>
                                      {towns.name}
                                    </p>
                                  }
                                  checked={selectedTownCollection === towns.id}
                                  onChange={() => {
                                    dispatch(selectedTown(towns.id));
                                    dispatch(town(towns.id));
                                  }}
                                  onClick={() => {
                                    setOpen((prev) => ({
                                      ...prev,
                                      town: !prev.town,
                                    }));

                                    if (selectedTownCollection === towns.id) {
                                      // console.log("selectedTownCollection working");
                                      dispatch(town(null));
                                      dispatch(selectedTown(null));
                                    }

                                    setSearchTown("");
                                  }}
                                />
                              </Form.Group>
                            </div>
                          ))}
                    </Form>
                  </div>
                </Collapse>
              </div>

              <div className="filter-adBanner">
                <img
                  src={sideBarAd}
                  className="img-fluid"
                  style={{ borderRadius: "20px" }}
                />
              </div>
              <div className="filter-adBanner">
                <img
                  src={sideBarAdEnglish}
                  className="img-fluid"
                  style={{ borderRadius: "20px" }}
                />
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FiltersAndSearch;
