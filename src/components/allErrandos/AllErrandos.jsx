import React, { useRef, useEffect, useState } from "react";
import "../../App.css";
import Button from "react-bootstrap/Button";
import ourErrandsImage from "../../assets/images/errandos-image.png";
import locationOurErrando from "../../assets/locationOurErrando.svg";
import starOurErrando from "../../assets/starOurErrando.svg";
import { setTrue, toggle } from "../../utils/booleanSlice";
import Dropdown from "react-bootstrap/Dropdown";
import PaginationComponent from "../pagination/PaginationComponent";
import ourErrandsImage2 from "../../assets/images/ourErrandsImage2.svg";
import ourErrandsImage3 from "../../assets/images/ourErrandsImage3.svg";
import { useNavigate } from "react-router-dom";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import { token } from "../../utils/utils";
import { errandosList } from "../../utils/errandosSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import noPharmaciesFound from "../../assets/noPharmaciesFound.svg";
import pharamciesNotFoundRunErrand from "../../assets/pharamciesNotFoundRunErrand.svg";
import Loader from "../loader/Loader";
import { modalToggle, setModalTrue } from "../../utils/modalSlice";

const AllErrandos = () => {
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);

  const errandosListData = useSelector((store) => store?.errandosData);

  // console.log("errandosListData", errandosListData);

  useEffect(() => {
    // console.log("Checking errandosData", errandosListData);

    if (!errandosListData) {
      const errandosListHandler = async () => {
        try {
          setLoader(true);
          const res = await getApi(apis.errandos, token());
          // console.log("API Response:", res);

          setLoader(false);
          if (res.data?.data?.items) {
            // console.log(res.data?.data?.items);

            dispatch(errandosList(res.data.data.items));
          } else {
            console.error("Unexpected API response format:", res);
          }
        } catch (err) {
          setLoader(false);
          // console.log("API Error:", err);
          if (err.response && err.response.status === 404) {
            // console.log("Resource not found!");
          }
        }
      };

      errandosListHandler();
    }
  }, [dispatch, errandosListData]);

  const navigate = useNavigate();

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
          <div className="row">
            {errandosListData && errandosListData.length > 0 && (
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="allPublicOffices-dropDown-filter-Container">
                  {/* <div className="allPublicOffices-dropDownContainer mb-3">
                    <p className="allPublicOffices-dropDownHeading">
                      Sort By :
                    </p>
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
                    Filter and Search
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="row   errandos-mobile-tab">
            {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4"> */}
            {/* {loader && <p>Loading...</p>} */}

            {errandosListData && errandosListData.length > 0
              ? errandosListData.map((errandos, index) => (
                  <div
                    className="card ourErrandosCard-container me-1 col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-4"
                    // mt-4
                    // style={{ width: "16rem" }}
                  >
                    <div
                      style={{ cursor: "pointer" }}
                      className="card-body"
                      onClick={() => {
                        navigate(`/errando-profile/${errandos.id}`);
                      }}
                    >
                      <div>
                        <div className="ourErrandosImageContainer">
                          <img
                            className="ourErrandosImage"
                            style={{
                              width: "212px",
                              height: "212px",
                              borderRadius: "20px",
                            }}
                            src={
                              errandos?.photo
                                ? `${IMAGE_BASE_URL}${errandos?.photo}`
                                : ourErrandsImage
                            }
                            onError={(e) => {
                              e.target.src = ourErrandsImage;
                            }}
                          />
                        </div>
                      </div>
                      <div className="allErrandos-text-container">
                        <div>
                          <h5 className="card-title ourErrandosCard-heading">
                            {errandos?.name.length > 15
                              ? `${errandos?.name.substring(0, 15)}...`
                              : errandos?.name}
                          </h5>
                        </div>
                        {errandos?.address && (
                          <div className="d-flex align-items-center ourErrandosTextIcon mt-3 ourErrandosLocationAndText">
                            <img src={locationOurErrando} alt="Location Icon" />
                            <p className="ourErrandosText">
                              {errandos.address.length > 15
                                ? `${errandos.address.substring(0, 15)}...`
                                : errandos.address}
                            </p>
                          </div>
                        )}
                        {typeof errandos?.ratings_count !== "undefined" &&
                          typeof errandos?.reviews_count !== "undefined" && (
                            <div className="d-flex align-items-center ourErrandosTextIcon mt-3 ourErrandosLocationAndText">
                              <img src={starOurErrando} alt="Review Icon" />
                              <p className="ourErrandosText">
                                {errandos.ratings_count} (
                                {errandos.reviews_count} reviews)
                              </p>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                ))
              : !loader && (
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
          {!isPendingFromStore &&
          errandosListData &&
          errandosListData.length > 0 ? (
            <PaginationComponent />
          ) : null}
        </div>
      )}
    </>
  );
};

export default AllErrandos;
