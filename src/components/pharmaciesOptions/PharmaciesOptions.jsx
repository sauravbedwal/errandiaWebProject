import React, { useState } from "react";
import filterUpArrow from "../../assets/filterUpArrow.svg";
import Form from "react-bootstrap/Form";
import filterSearch from "../../assets/filterSearch.svg";
import filtersAdBanner from "../../assets/filtersAdBanner.svg";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { setFalse, setTrue, toggle } from "../../utils/booleanSlice";
import Collapse from "react-bootstrap/Collapse";
import productSuggestionReviews from "../../assets/productSuggestionReviews.svg";
import starIcon from "../../assets/starIcon.png";
import businessNearYouLocationIcon from "../../assets/businessNearYouLocationIcon.svg";
import productSuggestionOptions from "../../assets/productSuggestionOptions.svg";
import starSideBar from "../../assets/starSideBar.svg";
import pharmaciesOption from "../../assets/pharmaciesOption.svg";
import sideBarBusinessProfileUserView from "../../assets/sideBarBusinessProfileUserView.svg";
import martin from "../../assets/martin.svg";
import errandosProfile from "../../assets/errandosProfile.svg";
import { useParams } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../Constant";
import sideBarAd from "../../assets/sideBarAd.jpeg";
import sideBarAdEnglish from "../../assets/sideBarAdEnglish.jpeg";
import ourErrandsImage from "../../assets/images/errandos-image.png";

const PharmaciesOptions = () => {
  const boolean = useSelector((store) => store.boolean.value);

  const dispatch = useDispatch();

  const [open, setOpen] = useState({
    region: false,
    town: false,
  });

  const path = window.location.pathname;

  const { slug } = useParams();

  const businessDetailsCollection = useSelector(
    (store) => store?.businessDetails
  );

  return (
    <>
      <div className="container filter-main-container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            {path === `/business-profile-user-view/${slug}` ||
            path === "/business-profile-user-view-products" ? (
              <>
                <div className="card productSuggestion-first px-3">
                  <div className="card-body productSuggestion-card-container">
                    <div className="productSuggestion-review-container">
                      <div className="productSuggestion-image-text">
                        <img
                          src={
                            businessDetailsCollection?.user?.photo
                              ? `${IMAGE_BASE_URL}${businessDetailsCollection?.user?.photo}`
                              : ourErrandsImage
                          }
                          alt="productSuggestionReviews"
                          className="img-fluid"
                          style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "30px",
                          }}
                        />
                        <div>
                          <div className="productSuggestion-review-heading">
                            {businessDetailsCollection &&
                              businessDetailsCollection?.user?.name}
                          </div>
                          {/* <p className="PharmaciesOptions-role">Co-Founder</p> */}
                        </div>
                      </div>
                    </div>
                    {businessDetailsCollection?.user?.town ||
                      (businessDetailsCollection?.user?.region && (
                        <div className="productSuggestion-addressImage-container">
                          <img
                            src={businessNearYouLocationIcon}
                            alt="businessNearYouLocationIcon"
                            className="img-fluid"
                          />
                          <div>
                            <p className="productSuggestion-address-heading">
                              Business Addresss
                            </p>
                            <p className="productSuggestion-address-subText">
                              {businessDetailsCollection?.user?.town !== "" &&
                                `${businessDetailsCollection?.user?.town}, `}
                              {businessDetailsCollection?.user?.region !== "" &&
                                `${businessDetailsCollection?.user?.region}`}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* <div className="card pharmaciesOptions-second px-3">
                  <div className="card-body productSuggestion-card-container">
                    <h6 className="productSuggestion-options-heading">
                      Businesses in Buea
                    </h6>

                    <div className="pharmaciesOptions-addressImage-second-container">
                      <img
                        src={sideBarBusinessProfileUserView}
                        alt="businessNearYouLocationIcon"
                        className="img-fluid"
                      />
                      <div>
                        <p className="productSuggestion-options-product-heading">
                          Matrix systems
                        </p>
                        <p className="productSuggestion-options-subText">
                          Molyko, Buea
                        </p>
                      </div>
                    </div>

                    <div className="pharmaciesOptions-addressImage-second-container">
                      <img
                        src={sideBarBusinessProfileUserView}
                        alt="businessNearYouLocationIcon"
                        className="img-fluid"
                      />
                      <div>
                        <p className="productSuggestion-options-product-heading">
                          Matrix systems
                        </p>
                        <p className="productSuggestion-options-subText">
                          Molyko, Buea
                        </p>
                      </div>
                    </div>

                    <div className="pharmaciesOptions-addressImage-second-container">
                      <img
                        src={sideBarBusinessProfileUserView}
                        alt="businessNearYouLocationIcon"
                        className="img-fluid"
                      />
                      <div>
                        <p className="productSuggestion-options-product-heading">
                          Matrix systems
                        </p>
                        <p className="productSuggestion-options-subText">
                          Molyko, Buea
                        </p>
                      </div>
                    </div>
                  </div>
                </div> */}
              </>
            ) : path === "/errando-profile" ? (
              <div className="card pharmaciesOptions-second px-3">
                <div className="card-body productSuggestion-card-container">
                  <h6 className="productSuggestion-options-heading">
                    Errandos in Buea
                  </h6>

                  <div className="pharmaciesOptions-addressImage-second-container">
                    <img
                      src={errandosProfile}
                      alt="errandosProfile"
                      className="img-fluid"
                    />
                    <div>
                      <p className="productSuggestion-options-product-heading">
                        Vera Jaskolski
                      </p>
                      <p className="productSuggestion-options-subText">
                        Molyko, Buea
                      </p>
                    </div>
                  </div>

                  <div className="pharmaciesOptions-addressImage-second-container">
                    <img
                      src={errandosProfile}
                      alt="errandosProfile"
                      className="img-fluid"
                    />
                    <div>
                      <p className="productSuggestion-options-product-heading">
                        Vera Jaskolski
                      </p>
                      <p className="productSuggestion-options-subText">
                        Molyko, Buea
                      </p>
                    </div>
                  </div>

                  <div className="pharmaciesOptions-addressImage-second-container">
                    <img
                      src={errandosProfile}
                      alt="errandosProfile"
                      className="img-fluid"
                    />
                    <div>
                      <p className="productSuggestion-options-product-heading">
                        Vera Jaskolski
                      </p>
                      <p className="productSuggestion-options-subText">
                        Molyko, Buea
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
              // <div className="card pharmaciesOptions-second px-3">
              //   <div className="card-body productSuggestion-card-container">
              //     <h6 className="productSuggestion-options-heading">
              //       Pharmacies in Buea{" "}
              //     </h6>

              //     <div className="pharmaciesOptions-addressImage-second-container">
              //       <img
              //         src={pharmaciesOption}
              //         alt="businessNearYouLocationIcon"
              //         className="img-fluid"
              //       />
              //       <div>
              //         <p className="productSuggestion-options-product-heading">
              //           Salvation Pharmacy
              //         </p>
              //         <p className="productSuggestion-options-subText">
              //           Molyko, Buea
              //         </p>
              //       </div>
              //     </div>

              //     <div className="pharmaciesOptions-addressImage-second-container">
              //       <img
              //         src={pharmaciesOption}
              //         alt="businessNearYouLocationIcon"
              //         className="img-fluid"
              //       />
              //       <div>
              //         <p className="productSuggestion-options-product-heading">
              //           Salvation Pharmacy
              //         </p>
              //         <p className="productSuggestion-options-subText">
              //           Molyko, Buea
              //         </p>
              //       </div>
              //     </div>

              //     <div className="pharmaciesOptions-addressImage-second-container">
              //       <img
              //         src={pharmaciesOption}
              //         alt="businessNearYouLocationIcon"
              //         className="img-fluid"
              //       />
              //       <div>
              //         <p className="productSuggestion-options-product-heading">
              //           Salvation Pharmacy
              //         </p>
              //         <p className="productSuggestion-options-subText">
              //           Molyko, Buea
              //         </p>
              //       </div>
              //     </div>
              //   </div>
              // </div>
            )}

            <div className="productSuggestion-adBanner">
              <img
                src={sideBarAd}
                className="img-fluid"
                style={{ borderRadius: "20px" }}
              />
            </div>

            <div className="productSuggestion-adBanner">
              <img
                src={sideBarAdEnglish}
                className="img-fluid"
                style={{ borderRadius: "20px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PharmaciesOptions;
