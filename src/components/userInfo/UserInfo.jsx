import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import businessUserProfile from "../../assets/businessUserProfile.svg";
import locationBusinessUserProfile from "../../assets/locationBusinessUserProfile.svg";
import "../../App.css";
import pharmaciesFoundLocation from "../../assets/pharmaciesFoundLocation.svg";
import Button from "react-bootstrap/Button";
import verifiedBusinessUserProfile from "../../assets/verifiedBusinessUserProfile.svg";
import clockBusinessUserProfile from "../../assets/clockBusinessUserProfile.svg";
import shareSingleProductDetails from "../../assets/shareSingleProductDetails.svg";
import reportBusiness from "../../assets/reportBusiness.svg";
import callBusinessUserProfile from "../../assets/callBusinessUserProfile.svg";
import BranchesBusinessUserProfile from "../branchesBusinessUserProfile/BranchesBusinessUserProfile";
import ProductsBusinessUserProfile from "../productsBusinessUserProfile/ProductsBusinessUserProfile";
import { useDispatch, useSelector } from "react-redux";
import {
  modalShareToggle,
  setShareModalTrue,
} from "../../utils/businessShareSlice";
import FeaturedBusinessProfileShare from "../featuredBusinessProfileShare/FeaturedBusinessProfileShare";
import ServiceBusinessUserProfile from "../serviceBusinessUserProfile/ServiceBusinessUserProfile";
import { modalCallToggle, setCallModalTrue } from "../../utils/callModalSlice";
import CallPopUp from "../callPopUp/CallPopUp";
import {
  modalReportToggle,
  setReportModalTrue,
} from "../../utils/reportModalSlice";
import ReportBusiness from "../reportBusiness/ReportBusiness";
import userProfileDp from "../../assets/userProfileDp.svg";
import plusAddBusiness from "../../assets/plusAddBusiness.svg";
import Dropdown from "react-bootstrap/Dropdown";
import businessUserInfo from "../../assets/businessUserInfo.svg";
import errandsUserInfo from "../../assets/errandsUserInfo.svg";
import servicesUserInfo from "../../assets/servicesUserInfo.svg";
import productsUserInfo from "../../assets/productsUserInfo.svg";
import { useNavigate } from "react-router-dom";
import {
  modalErrandsItemFoundToggle,
  setErrandsItemFoundModalTrue,
} from "../../utils/errandsItemFoundModalSlice";
import ErrandsItemFound from "../errandsItemFound/ErrandsItemFound";
import {
  modalWriteReviewToggle,
  setWriteReviewModalTrue,
} from "../../utils/writeReviewModalSlice";
import WriteReview from "../writeReview/WriteReview";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { token } from "../../utils/utils";
import { ToastContainer, toast } from "react-toastify";
import { addUserDetails } from "../../utils/userDetailsSlice";
import ourErrandsImage from "../../assets/images/errandos-image.png";
import { setEditImage } from "../../utils/userprofileEditProductModalSlice";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const UserInfo = ({ detailSelected, setDetailSelected }) => {
  const dispatch = useDispatch();

  const [detailActive, setDetailActive] = useState("Businesses");

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [userData, setUserData] = useState(null);

  // const notify = () => toast("Oops! The request was not found.");

  // useEffect(() => {
  //   const fetchNumberOfBusiness = async () => {
  //     try {
  //       const res = await getApi(apis.totalBusinessesCreatedByAUser, token());
  //       // console.log("totalBusiness", res);
  //       setUserData(res?.data?.data?.count);
  //     } catch (err) {
  //       console.log(err);
  //       if (err.response && err.response.status === 404) {
  //         console.log("Resource not found!");
  //         notify();
  //       }
  //     }
  //   };

  //   fetchNumberOfBusiness();
  // }, []);

  const userDetailsCollection = useSelector((store) => store.userDetails);
  console.log("userDetailsCollection", userDetailsCollection);

  useEffect(() => {
    console.log("user details ai called");
    if (!userDetailsCollection) {
      const fetchUserDetails = async () => {
        try {
          const res = await getApi(apis.userDetails, token());
          // console.log("userdETAILS", res);
          console.log("userdETAILSInfo", res.data.data.item);
          dispatch(addUserDetails(res.data.data.item));
        } catch (err) {
          console.log("fetchUserDetails", err);
        }
      };
      fetchUserDetails();
    }
  }, []);

  // console.log("pathNameInfp", pathname);

  dayjs.extend(relativeTime);

  const formatMemberSince = (dateString) => {
    return dayjs(dateString).fromNow();
  };

  return (
    <>
      <div className="container" style={{ marginTop: "-200px" }}>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card card-container-userInfo">
              {/* <div className="row"> */}
              {/* <div className="col-xl-8 col-lg-7 col-md-7 col-sm-12 col-12 open-container"> */}
              <div className="card-body">
                <div className="d-flex gap-3 businessUserView-image-container">
                  <img
                    className="img-fluid businessPorfileUserView-pharmaciesImage"
                    style={{ borderRadius: "80px" }}
                    src={
                      userDetailsCollection?.photo !== ""
                        ? `${IMAGE_BASE_URL}${userDetailsCollection?.photo}`
                        : ourErrandsImage
                    }
                    alt="Card image cap"
                  />

                  <div
                    className="businessUserView-name-report-container mt-4"
                    style={{ width: "100%" }}
                  >
                    <div style={{ width: "100%" }}>
                      {/* <div className="businessUserView-viewProfile-container">
                        <div className="businessUserView-type">
                          Fashion and style
                        </div>
                        <div className="businessUserView-verified-container">
                          <img
                            src={verifiedBusinessUserProfile}
                            alt="verifiedBusinessUserProfile"
                          />
                          <p className="businessUserView-verified">
                            Not Verified
                          </p>
                        </div>
                      </div> */}
                      <div className="userInfo-headingButtons-container">
                        <div className="userInfo-mobile">
                          <h5 className="card-subtitle text-muted businessUserView-Heading">
                            {userDetailsCollection?.name}
                          </h5>
                          {/* {userDetailsCollection?.address && ( */}
                          <div className="businessUserView--locationTime-container">
                            {/* <div className="d-flex align-items-center gap-2">
                              <p className="businessUserView-Text-grey">
                                Address
                              </p>
                              <p className="businessUserView-Text">
                                Buea, Cameroon
                              </p>
                            </div> */}
                          </div>
                          {/* )} */}
                          <div className="businessUserView--locationTime-container mt-2">
                            <div className="d-flex align-items-center gap-2">
                              <p className="businessUserView-Text-grey">
                                Member since{" "}
                              </p>
                              <p className="businessUserView-Text">
                                {formatMemberSince(
                                  userDetailsCollection?.created_at
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="userInfo-buttons-container"
                          // onClick={() => {
                          //   navigate("/user-profile-edit-business");
                          //   setDetailSelected("EditBusinessForm");
                          // }}
                        >
                          <Link to="/edit-profile">
                            <button
                              type="button"
                              class="btn btn-primary btn-lg businessUserView-location-whiteButton"
                            >
                              My Profile
                            </button>
                          </Link>
                          <div
                            className="allPublicOffices-dropDownContainer"
                            // onClick={() => {
                            //   dispatch(modalCallToggle());
                            //   dispatch(setCallModalTrue());
                            // }}
                          >
                            <Dropdown drop="down">
                              <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                                className="userInfo-dropdown businessUserView-call-button"
                              >
                                <img
                                  src={plusAddBusiness}
                                  alt="plusAddBusiness"
                                />
                                Add Business
                              </Dropdown.Toggle>

                              <Dropdown.Menu className="userInfo-dropDown-container">
                                <Dropdown.Item
                                  href="#/action-1"
                                  className="userInfo-dropDown"
                                >
                                  Add Business
                                </Dropdown.Item>
                                <Dropdown.Item
                                  href="#/action-2"
                                  className="userInfo-dropDown"
                                >
                                  Add Products
                                </Dropdown.Item>
                                <Dropdown.Item
                                  href="#/action-3"
                                  className="userInfo-dropDown"
                                >
                                  Add Services
                                </Dropdown.Item>
                                <Dropdown.Item
                                  href="#/action-3"
                                  className="userInfo-dropDown"
                                >
                                  Run Errand
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>

                          {/* <Button
                        variant="primary"
                        className="businessUserView-call-button"
                      >
                        <img src={plusAddBusiness} alt="plusAddBusiness" />
                        Add Business
                      </Button> */}
                        </div>
                      </div>

                      <div className="userInfo-locationTime-container mt-4">
                        {/* <div className="d-flex align-items-center gap-2"> */}
                        <div className="userInfo-details-container">
                          <div
                            className="userInfo-details-IconText-container"
                            onClick={() => {
                              // dispatch(modalErrandsItemFoundToggle());
                              // dispatch(setErrandsItemFoundModalTrue());
                              // console.log("iiiii");
                              // dispatch(modalWriteReviewToggle());
                              // dispatch(setWriteReviewModalTrue());
                            }}
                          >
                            <img
                              src={businessUserInfo}
                              alt="businessUserInfo"
                            />
                            <p className="businessUserView-Text-grey">
                              Businesses{" "}
                            </p>
                          </div>
                          <p className="userInfo-details-number">
                            {userDetailsCollection?.businesses}
                          </p>
                        </div>

                        <div className="userInfo-details-container">
                          <div className="userInfo-details-IconText-container">
                            <img
                              src={productsUserInfo}
                              alt="productsUserInfo"
                            />
                            <p className="businessUserView-Text-grey">
                              Products
                            </p>
                          </div>
                          <p className="userInfo-details-number">
                            {userDetailsCollection?.products}
                          </p>
                        </div>
                        <div className="userInfo-details-container">
                          <div className="userInfo-details-IconText-container">
                            <img
                              src={servicesUserInfo}
                              alt="servicesUserInfo"
                            />
                            <p className="businessUserView-Text-grey">
                              Services
                            </p>
                          </div>
                          <p className="userInfo-details-number">
                            {" "}
                            {userDetailsCollection?.services}
                          </p>
                        </div>

                        <div className="userInfo-details-container">
                          <div className="userInfo-details-IconText-container">
                            <img src={errandsUserInfo} alt="errandsUserInfo" />
                            <p className="businessUserView-Text-grey">
                              Errands
                            </p>
                          </div>
                          <p className="userInfo-details-number">
                            {userDetailsCollection?.errands}
                          </p>
                        </div>

                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
        {pathname !== "/edit-profile" ? (
          <div className="row mt-5">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="userInfo-details-bar-container">
                <div
                  className={
                    detailActive === "Businesses"
                      ? "userInfo-details-option-container-businesses"
                      : "userInfo-details-option-container-others"
                  }
                >
                  <p
                    className={
                      detailActive === "Businesses"
                        ? "userInfo-details-activeOption"
                        : "userInfo-details-option"
                    }
                    onClick={() => {
                      setDetailActive("Businesses");
                      setDetailSelected("Businesses");
                    }}
                  >
                    Businesses
                  </p>
                  <p
                    className={
                      detailActive === "Products"
                        ? "userInfo-details-activeOption"
                        : "userInfo-details-option"
                    }
                    onClick={() => {
                      setDetailActive("Products");
                      setDetailSelected("Products");
                    }}
                  >
                    Products
                  </p>
                  <p
                    className={
                      detailActive === "Services"
                        ? "userInfo-details-activeOption"
                        : "userInfo-details-option"
                    }
                    onClick={() => {
                      setDetailActive("Services");

                      setDetailSelected("Services");

                      dispatch(setEditImage(null));
                    }}
                  >
                    Services
                  </p>
                  <p
                    className={
                      detailActive === "Errands"
                        ? "userInfo-details-activeOption"
                        : "userInfo-details-option"
                    }
                    onClick={() => {
                      setDetailActive("Errands");

                      setDetailSelected("Errands");
                    }}
                  >
                    Errands
                  </p>
                  <p
                    className={
                      detailActive === "Reports"
                        ? "userInfo-details-activeOption"
                        : "userInfo-details-option"
                    }
                    onClick={() => {
                      setDetailActive("Reports");

                      setDetailSelected("Reports");
                    }}
                  >
                    Reports
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <ErrandsItemFound />
      <WriteReview />
      {/* <ToastContainer /> */}
    </>
  );
};

export default UserInfo;
