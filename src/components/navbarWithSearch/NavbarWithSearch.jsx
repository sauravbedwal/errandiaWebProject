import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  Button,
} from "react-bootstrap";
import "../../App.css";
import menuIcon from "../../assets/menuIcon.svg";
import searchIcon from "../../assets/searchIcon.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { modalToggle, setModalTrue } from "../../utils/modalSlice";
import {
  setSignUpModalTrue,
  signUpModalToggle,
} from "../../utils/signUpModalSlice";
import RunErrandPopUp from "../runErrandPopUp/RunErrandPopUp";
import RunErrandPopUpSignUpFormSignUpForm from "../runErrandPopUpSignUpForm/RunErrandPopUpSignUpForm";
import mobileFooterHome from "../../assets/mobileFooterHome.svg";
import mobileFooterErrands from "../../assets/mobileFooterErrands.svg";
import pharmacy from "../../assets/pharmacy.png";
import mobileFooterAccount from "../../assets/mobileFooterAccount.svg";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import apis from "../../Constant";
import { token } from "../../utils/utils";
import { addProducts } from "../../utils/productsDataSlice";
import { ToastContainer, toast } from "react-toastify";
import { addBusiness } from "../../utils/businessDataSlice";
import {
  addSearchProduct,
  region,
  selectedRegion,
  selectedTown,
  setIsPending,
  town,
} from "../../utils/searchProductSlice";
import { addSearchBusiness } from "../../utils/searchBusinessSlice";
import { addSearchPharmacies } from "../../utils/searchPharmaciesSlice";
import { useTranslation } from "react-i18next";
import { errandosList } from "../../utils/errandosSlice";
import { addDate } from "../../utils/filterPharmaciesCalenderSlice";
import {
  addActivePage,
  addPerPage,
  addTotalItems,
} from "../../utils/paginationSlice";
import Cookies from "js-cookie";

const NavbarWithSearch = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // const notify = () => toast("Oops! The request was not found.");

  const [search, setSearch] = useState("");
  // console.log("search", search);

  const [selectedScreen, setSelectedScreen] = useState(null);

  const regionFromStore = useSelector((store) => store.searchProduct.region);
  // console.log("regionFromStore", regionFromStore);

  const townsFromStore = useSelector((store) => store.searchProduct.town);
  // console.log("townsFromStore", townsFromStore);

  const distanceFromStore = useSelector(
    (store) => store.searchProduct.addDistance
  );
  // console.log("distanceFromStore", distanceFromStore);

  const dateFromStore = useSelector((store) => store?.filterPharmaciesCalender);
  // console.log("dateFromStore", dateFromStore);

  const serviceFromStore = useSelector(
    (store) => store?.searchProduct?.service
  );
  // console.log("serviceFromStore", serviceFromStore);

  const { pathname } = useLocation();
  // console.log("pathnameOutside", pathname);

  const perPageFromStore = useSelector((store) => store?.pagination?.perPage);

  const activePageFromStore = useSelector(
    (store) => store?.pagination?.activePage
  );
  // console.log("activePageFromStore navbar", activePageFromStore);

  const searchProductsHandler = async () => {
    try {
      const params = new URLSearchParams({
        q: search,
        region: regionFromStore ? regionFromStore : "",
        town: townsFromStore ? townsFromStore : "",
        distance: distanceFromStore ? distanceFromStore : "",
        service: serviceFromStore ? serviceFromStore : "",
        page: activePageFromStore ? activePageFromStore : "1",
        per_page: perPageFromStore ? perPageFromStore : "10",
        // latitude: "",
        // longitude: "",
      });

      // console.log("api", apis.products + `?${params.toString()}`);
      dispatch(setIsPending(true));
      const res = await getApi(
        apis.searchProducts + `?${params.toString()}`,
        token()
      );
      dispatch(setIsPending(false));

      // console.log("searchProductsHandler", res);
      // console.log("searchProductsHandler", res?.data?.data?.items);
      dispatch(addSearchProduct(res?.data?.data?.items));
      dispatch(addPerPage(res.data.data.per_page));
      dispatch(addTotalItems(res.data.data.total));
      setSearch("");
    } catch (err) {
      console.log(err);
      dispatch(setIsPending(false));
      if (err.response && err.response.status === 404) {
        console.log("Resource not found!");
        notify();
      }
    }
  };

  const searchBusinessHandler = async () => {
    try {
      const params = new URLSearchParams({
        q: search,
        region: regionFromStore ? regionFromStore : "",
        town: townsFromStore ? townsFromStore : "",
        distance: distanceFromStore ? distanceFromStore : "",
        page: activePageFromStore ? activePageFromStore : "1",
        per_page: perPageFromStore ? perPageFromStore : "10",
        // latitude: "4.152914",
        // longitude: "9.2952491",
        // category: "1",
      });

      dispatch(setIsPending(true));
      const res = await getApi(apis.searchBusiness + `?${params.toString()}`);
      console.log("searchBusinessHandler", res);
      dispatch(setIsPending(false));

      dispatch(addSearchBusiness(res.data.data.items));
      dispatch(addPerPage(res.data.data.per_page));
      dispatch(addTotalItems(res.data.data.total));
      setSearch("");
    } catch (err) {
      console.log(err);
      dispatch(setIsPending(false));
      if (err.response && err.response.status === 404) {
        console.log("Resource not found!");
        notify();
      }
    }
  };

  const searchPharmaciesHandler = async () => {
    try {
      const params = new URLSearchParams({
        q: search,
        region: regionFromStore ? regionFromStore : "",
        town: townsFromStore ? townsFromStore : "",
        distance: distanceFromStore ? distanceFromStore : "",
        date:
          dateFromStore && regionFromStore && townsFromStore
            ? dateFromStore
            : "",
        page: activePageFromStore ? activePageFromStore : "1",
        per_page: perPageFromStore ? perPageFromStore : "10",

        // latitude: "10",
        // longitude: "10",
        // street: "test",
      });
      dispatch(setIsPending(true));

      const res = await getApi(apis.searchPharmacies + `?${params.toString()}`);
      // console.log("searchPharmaciesHandler", res);
      dispatch(setIsPending(false));
      dispatch(addSearchPharmacies(res.data.data.items));
      dispatch(addPerPage(res.data.data.per_page));
      dispatch(addTotalItems(res.data.data.total));
      setSearch("");
    } catch (err) {
      console.log(err);
      dispatch(setIsPending(false));
      if (err.response && err.response.status === 404) {
        console.log("Resource not found!");
        notify();
      }
    }
  };

  const searchErrandosHandler = async () => {
    try {
      const params = new URLSearchParams({
        q: search,
        region: regionFromStore ? regionFromStore : "",
        town: townsFromStore ? townsFromStore : "",
        distance: distanceFromStore ? distanceFromStore : "",
        page: activePageFromStore ? activePageFromStore : "1",
        per_page: perPageFromStore ? perPageFromStore : "10",
        // latitude: "10",
        // longitude: "10",
        // category: "1"
      });

      dispatch(setIsPending(true));
      const res = await getApi(apis.errandos + `?${params.toString()}`);
      // console.log("searchErrandosHandler", res);
      dispatch(setIsPending(false));
      dispatch(errandosList(res.data.data.items));
      dispatch(addPerPage(res.data.data.per_page));
      dispatch(addTotalItems(res.data.data.total));
      setSearch("");
    } catch (err) {
      console.log(err);
      dispatch(setIsPending(false));
      if (err.response && err.response.status === 404) {
        console.log("Resource not found!");
        notify();
      }
    }
  };

  const publicInformationHandler = async () => {
    try {
      const params = new URLSearchParams({
        q: search,
        region: regionFromStore ? regionFromStore : "",
        town: townsFromStore ? townsFromStore : "",
        distance: distanceFromStore ? distanceFromStore : "",
        page: activePageFromStore ? activePageFromStore : "1",
        per_page: perPageFromStore ? perPageFromStore : "10",
        business_type: "public",
        // latitude: "4.152914",
        // longitude: "9.2952491",
        // category: "1",
      });

      dispatch(setIsPending(true));
      const res = await getApi(apis.searchBusiness + `?${params.toString()}`);
      // console.log("publicInformationHandler", res);
      dispatch(setIsPending(false));

      dispatch(addSearchBusiness(res.data.data.items));
      dispatch(addPerPage(res.data.data.per_page));
      dispatch(addTotalItems(res.data.data.total));
      setSearch("");
    } catch (err) {
      console.log(err);
      dispatch(setIsPending(false));
      if (err.response && err.response.status === 404) {
        console.log("Resource not found!");
        notify();
      }
    }
  };

  useEffect(() => {
    if (selectedScreen === "Products/Services") {
      searchProductsHandler();
    }

    if (
      selectedScreen === "Businesses" ||
      pathname == "/all-business-profile"
    ) {
      searchBusinessHandler();
    }

    if (selectedScreen === "Pharmacies" || pathname == "/search-pharmacies") {
      searchPharmaciesHandler();
    }

    if (selectedScreen === "Errando" || pathname == "/errandos") {
      searchErrandosHandler();
    }

    if (pathname === "/public-information") {
      publicInformationHandler();
    }
  }, [
    regionFromStore,
    townsFromStore,
    dateFromStore,
    distanceFromStore,
    serviceFromStore,
    activePageFromStore,
  ]);

  // useEffect(() => {
  //   if
  // }, [regionFromStore, townsFromStore]);

  const errandosFromStore = useSelector((store) => store?.errandosData);
  // console.log("errandosFromStore", errandosFromStore);

  const pharmaciesFromStore = useSelector((store) => store?.searchPharmacies);
  // console.log("pharmaciesFromStore", pharmaciesFromStore);
  //
  // const searchedErrandos = errandosFromStore?.filter((errandos) => {
  //   return errandos.name.toLowerCase().includes(search.toLowerCase());
  // });

  // useEffect(() => {
  //   dispatch(errandosList(searchedErrandos));
  // }, [searchedErrandos]);

  // console.log("searchedErrandos", searchedErrandos);

  const handleSearch = () => {
    dispatch(addActivePage(1));

    if (selectedScreen === "Products/Services") {
      dispatch(region(null));
      dispatch(town(null));
      dispatch(selectedRegion(null));
      dispatch(selectedTown(null));
      navigate("/search-product-details");
      searchProductsHandler();
    }

    if (selectedScreen === "Businesses") {
      dispatch(region(null));
      dispatch(town(null));
      dispatch(selectedRegion(null));
      dispatch(selectedTown(null));
      dispatch(addActivePage(1));
      navigate("/all-business-profile");
      searchBusinessHandler();
    }

    if (selectedScreen === "Pharmacies") {
      dispatch(region(null));
      dispatch(town(null));
      dispatch(addDate(null));
      dispatch(selectedRegion(null));
      dispatch(selectedTown(null));
      dispatch(addActivePage(1));
      navigate("/search-pharmacies");
      // if (!pharmaciesFromStore || search != "") {
      searchPharmaciesHandler();
      // }
    }

    if (selectedScreen === "Errando") {
      dispatch(region(null));
      dispatch(town(null));
      dispatch(selectedRegion(null));
      dispatch(selectedTown(null));
      dispatch(addActivePage(1));
      navigate("/errandos");
      // if (!errandosFromStore || search != "") {
      searchErrandosHandler();
      // }
    }
    // navigate("/search-pharmacies-no-result");
  };

  const isLogin = token();

  // const businessHandler = async () => {
  //   try {
  //     const params = new URLSearchParams({
  //       page: "1",
  //       q: "computer",
  //       service: "",
  //       region: "",
  //       town: "",
  //     });
  //     const res = await getApi(
  //       apis.products + `?${params.toString()}`,
  //       token()
  //     );
  //     console.log("api", apis.products + `?${params.toString()}`);
  //     console.log("business", res);
  //     // console.log("businessItems", res?.data?.data?.items);
  //     dispatch(addBusiness(res?.data?.data?.items));
  //   } catch (err) {
  //     console.log(err);
  //     if (err.response && err.response.status === 404) {
  //       console.log("Resource not found!");
  //       notify();
  //     }
  //   }
  // };

  // const productServicesHandler = async () => {
  //   try {
  //     const res = await getApi(apis.products, token());
  //     console.log("products", res);
  //     // console.log("productsITems", res.data.data.items);
  //     dispatch(addProducts(res?.data?.data?.items));
  //   } catch (err) {
  //     console.log(err);
  //     if (err.response && err.response.status === 404) {
  //       console.log("Resource not found!");
  //       notify();
  //     }
  //   }
  // };

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = Cookies.get("language") || "en";
    i18n.changeLanguage(savedLanguage);
  }, []);

  return (
    <>
      <div className="image-background">
        <Navbar expand="lg" className="navbar-custom">
          <Container className="navbar-items-container">
            <Nav className="navbar-items d-flex align-items-center flex-row flex-wrap gap-2 justify-content-center">
              <Nav.Link className="d-flex align-items-center mobile-view-menu">
                <img
                  src={menuIcon}
                  alt="Menu Icon"
                  style={{ background: "black" }}
                />
                <NavDropdown
                  title={t("Menu")}
                  id="menu-dropdown"
                  align="start"
                  menuVariant="dark"
                  className="custom-dropdown"
                >
                  <NavDropdown.Item
                    onClick={() => {
                      // console.log("business");
                      searchBusinessHandler();
                      navigate("/all-business-profile");
                    }}
                  >
                    Businesses
                  </NavDropdown.Item>
                  {isLogin ? (
                    ""
                  ) : (
                    <NavDropdown.Item
                      onClick={() => {
                        // console.log("Register");
                        navigate("/login");
                      }}
                    >
                      {t("Register/Login")}
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Item
                    onClick={() => {
                      navigate("/contact");
                    }}
                  >
                    {t("Contact Us")}
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    className="dropdown-item-run-errands"
                    onClick={() => {
                      // console.log("first");
                      dispatch(modalToggle());
                      dispatch(setModalTrue());
                    }}
                  >
                    {t("Run An Errand")}
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/all-business-profile");
                  searchBusinessHandler();
                  // businessHandler();
                }}
              >
                Businesses
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/errandos");
                }}
              >
                {t("Errando")}
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/search-pharmacies");
                  searchPharmaciesHandler();
                }}
              >
                {t("Pharmacies")}
              </Nav.Link>

              <Nav.Link
                onClick={() => {
                  dispatch(addActivePage(1));
                  navigate("/public-information");
                  publicInformationHandler();
                }}
              >
                {t("Public Information")}
              </Nav.Link>
            </Nav>

            <Nav className="navbar-items d-flex align-items-center flex-row flex-wrap gap-2 justify-content-center">
              <Nav.Link
                onClick={() => {
                  navigate("/contact");
                }}
              >
                {t("Contact Us")}
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/list-your-business");
                }}
              >
                {t("List Your Business")}
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/download-app");
                }}
              >
                {t("Download Errandia App")}
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <div className="container" style={{ zIndex: 10 }}>
          <div className="row">
            <div className="mobile-fixedFooter-container">
              <div
                className="mobile-footer-imageText"
                onClick={() => {
                  navigate("/");
                }}
              >
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.02148 11.143L12.4501 3.42871L21.8786 11.143"
                    stroke="white"
                    stroke-width="2.05714"
                    stroke-miterlimit="10"
                    stroke-opacity="0.5"
                  />
                  <path
                    d="M10.7363 21.4289V16.2861H14.1649V21.4289"
                    stroke="white"
                    stroke-width="2.05714"
                    stroke-miterlimit="10"
                    stroke-opacity="0.5"
                  />
                  <path
                    d="M5.5918 12.8574V19.7145C5.5918 20.6617 6.35895 21.4288 7.30609 21.4288H17.5918C18.5389 21.4288 19.3061 20.6617 19.3061 19.7145V12.8574"
                    stroke="white"
                    stroke-width="2.05714"
                    stroke-miterlimit="10"
                    stroke-linecap="square"
                    stroke-opacity="0.5"
                  />
                </svg>

                <p className="mobile-footer-paraText">{t("Home")}</p>
              </div>
              <div
                className="mobile-footer-imageText"
                onClick={() => {
                  navigate("/all-errands");
                }}
              >
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.5994 8.25C15.1928 8.25 15.7728 8.07405 16.2661 7.74441C16.7595 7.41477 17.144 6.94623 17.3711 6.39805C17.5981 5.84987 17.6575 5.24667 17.5418 4.66473C17.426 4.08279 17.1403 3.54824 16.7208 3.12868C16.3012 2.70912 15.7666 2.4234 15.1847 2.30765C14.6028 2.19189 13.9996 2.2513 13.4514 2.47836C12.9032 2.70543 12.4347 3.08994 12.105 3.58329C11.7754 4.07664 11.5994 4.65666 11.5994 5.25C11.5994 6.04565 11.9155 6.80871 12.4781 7.37132C13.0407 7.93393 13.8038 8.25 14.5994 8.25ZM14.5994 3.75C14.8961 3.75 15.1861 3.83797 15.4328 4.0028C15.6795 4.16762 15.8717 4.40189 15.9853 4.67598C16.0988 4.95007 16.1285 5.25167 16.0706 5.54264C16.0127 5.83361 15.8699 6.10088 15.6601 6.31066C15.4503 6.52044 15.183 6.6633 14.8921 6.72118C14.6011 6.77906 14.2995 6.74935 14.0254 6.63582C13.7513 6.52229 13.5171 6.33003 13.3522 6.08336C13.1874 5.83668 13.0994 5.54667 13.0994 5.25C13.0994 4.85218 13.2575 4.47065 13.5388 4.18934C13.8201 3.90804 14.2016 3.75 14.5994 3.75ZM20.9097 13.1888C20.8526 13.215 20.2076 13.4963 19.0657 13.4963C17.7672 13.4963 15.8266 13.1325 13.376 11.6213C13.003 12.6801 12.5187 13.6964 11.9313 14.6531C12.9864 14.9779 13.9789 15.4791 14.8666 16.1353C16.6544 17.4984 17.5994 19.4391 17.5994 21.75C17.5994 21.9489 17.5204 22.1397 17.3798 22.2803C17.2391 22.421 17.0483 22.5 16.8494 22.5C16.6505 22.5 16.4598 22.421 16.3191 22.2803C16.1785 22.1397 16.0994 21.9489 16.0994 21.75C16.0994 17.8406 12.8472 16.4334 11.0238 15.9516C10.9722 16.0172 10.9188 16.0838 10.8654 16.1484C9.02414 18.3797 6.71695 19.5403 4.15008 19.5403C3.85771 19.5417 3.56546 19.5282 3.27445 19.5C3.07554 19.4801 2.89268 19.382 2.76609 19.2273C2.6395 19.0726 2.57956 18.8739 2.59945 18.675C2.61935 18.4761 2.71744 18.2932 2.87216 18.1666C3.02687 18.0401 3.22554 17.9801 3.42445 18C5.85445 18.2419 7.96852 17.2978 9.7057 15.1875C10.8766 13.7681 11.6744 12.0366 12.0729 10.7813C8.42414 8.65781 6.09352 10.4653 6.0682 10.485C5.99181 10.5502 5.90308 10.5995 5.80729 10.6297C5.7115 10.66 5.6106 10.6708 5.51059 10.6613C5.41057 10.6519 5.31347 10.6224 5.22506 10.5747C5.13664 10.527 5.05871 10.462 4.99589 10.3836C4.93307 10.3052 4.88665 10.215 4.85936 10.1183C4.83208 10.0216 4.8245 9.92045 4.83708 9.82077C4.84965 9.7211 4.88212 9.62497 4.93256 9.53809C4.983 9.45121 5.05038 9.37534 5.1307 9.315C5.27133 9.2025 8.62008 6.59625 13.5222 9.93094C17.7851 12.8288 20.2657 11.835 20.2891 11.8238C20.379 11.7813 20.4764 11.7572 20.5756 11.7527C20.6749 11.7482 20.7741 11.7635 20.8674 11.7977C20.9607 11.8319 21.0463 11.8843 21.1192 11.9518C21.192 12.0193 21.2508 12.1007 21.292 12.1911C21.3331 12.2816 21.3559 12.3793 21.359 12.4786C21.3621 12.5779 21.3454 12.6769 21.31 12.7697C21.2745 12.8625 21.2209 12.9473 21.1524 13.0193C21.0838 13.0912 21.0007 13.1488 20.9097 13.1888Z"
                    fill="white"
                    fill-opacity="0.5"
                  />
                </svg>

                <p className="mobile-footer-paraText">{t("Errands")}</p>
              </div>
              <div
                className="mobile-footer-imageText"
                onClick={() => {
                  navigate("/search-pharmacies");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M184 48l144 0c4.4 0 8 3.6 8 8l0 40L176 96l0-40c0-4.4 3.6-8 8-8zm-56 8l0 40 0 32 0 352 256 0 0-352 0-32 0-40c0-30.9-25.1-56-56-56L184 0c-30.9 0-56 25.1-56 56zM96 96L64 96C28.7 96 0 124.7 0 160L0 416c0 35.3 28.7 64 64 64l32 0L96 96zM416 480l32 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64l-32 0 0 384zM224 208c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 48 48 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-48 0 0 48c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-48-48 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l48 0 0-48z"
                    fill="white"
                    fill-opacity="0.5"
                  />
                </svg>
                <p className="mobile-footer-paraText">Pharmacies</p>
              </div>
              {/* <div
                className="mobile-footer-imageText"
                onClick={() => {
                  navigate("/notifications");
                }}
              >
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2.5C11.2 2.5 10.5 3.2 10.5 4V4.69531C7.90808 5.35916 6 7.69554 6 10.5V15.3379L5.2793 17.5H4V19.5H10.2715C10.0961 19.8038 10.0037 20.1483 10.0035 20.4991C10.0034 20.8499 10.0955 21.1945 10.2706 21.4985C10.4457 21.8024 10.6977 22.0549 11.0012 22.2307C11.3048 22.4065 11.6492 22.4994 12 22.5C12.3511 22.5001 12.696 22.4077 13.0001 22.2322C13.3042 22.0567 13.5567 21.8042 13.7323 21.5002C13.9079 21.1961 14.0004 20.8512 14.0004 20.5001C14.0004 20.149 13.908 19.8041 13.7324 19.5H20V17.5H18.7207L18 15.3379V10.5C18 7.69554 16.0919 5.35916 13.5 4.69531V4C13.5 3.2 12.8 2.5 12 2.5ZM12 6.5C14.2762 6.5 16 8.22381 16 10.5V15.6621L16.6113 17.5H7.38867L8 15.6621V10.5C8 8.22381 9.72381 6.5 12 6.5Z"
                    fill="white"
                    fill-opacity="0.5"
                  />
                </svg>

                <p className="mobile-footer-paraText">{t("Notifications")}</p>
              </div> */}
              <div
                className="mobile-footer-imageText"
                onClick={() => {
                  if (isLogin) {
                    navigate("/user-profile");
                  } else {
                    navigate("/login");
                  }
                }}
              >
                <img src={mobileFooterAccount} className="img-fluid" />
                <p className="mobile-footer-paraText">{t("Account")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <Nav
            variant="underline"
            defaultActiveKey="/"
            className="phone-smallScreen custom-nav"
          >
            <Nav.Item>
              <Nav.Link
                eventKey="link-1"
                className="nav-search-items"
                // onClick={() => {
                //   navigate("/search-product-details");
                //   // productServicesHandler();
                // }}

                onClick={() => {
                  setSelectedScreen("Products/Services");
                }}
              >
                {t("Products/Services")}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-2"
                className="nav-search-items"
                // onClick={() => {
                //   navigate("/all-business-profile");
                //   // businessHandler();
                // }}

                onClick={() => {
                  setSelectedScreen("Businesses");
                }}
              >
                Businesses
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-3"
                className="nav-search-items"
                // onClick={() => {
                //   navigate("/search-pharmacies");
                // }}

                onClick={() => {
                  setSelectedScreen("Pharmacies");
                }}
              >
                {t("Pharmacies")}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-4"
                className="nav-search-items"
                // onClick={() => {
                //   navigate("/errandos");
                // }}

                onClick={() => {
                  setSelectedScreen("Errando");
                }}
              >
                {t("Errando")}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <div className="search-bar-container">
          <div className="search-bar">
            <Form
              className="d-flex"
              onSubmit={(e) => {
                e.preventDefault(); // Prevent page reload
                handleSearch();
              }}
            >
              <Form.Control
                type="text"
                placeholder={t("What are you looking for?")}
                className="search-input"
                value={search}
                onChange={(e) => {
                  // console.log("search", e.target.value);
                  setSearch(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
              />
              <Button
                className="d-flex align-items-center gap-2 searchButton"
                // onClick={handleSearch}
                type="submit"
              >
                <img src={searchIcon} alt="searchIcon" />
                {t("Search")}
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <RunErrandPopUp />
      <RunErrandPopUpSignUpFormSignUpForm />
      {/* <ToastContainer /> */}
    </>
  );
};

export default NavbarWithSearch;
