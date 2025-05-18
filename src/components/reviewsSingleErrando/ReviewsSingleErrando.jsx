import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import goBackArrow from "../../assets/goBackArrow.svg";
import review_user from "../../assets/review_user.svg";
import locationBusinessUserProfile from "../../assets/locationBusinessUserProfile.svg";
import "../../App.css";
import pharmaciesFoundLocation from "../../assets/pharmaciesFoundLocation.svg";
import Button from "react-bootstrap/Button";
import callBusinessUserProfile from "../../assets/callBusinessUserProfile.svg";
import { modalCallToggle, setCallModalTrue } from "../../utils/callModalSlice";
import CallPopUp from "../callPopUp/CallPopUp";
import { useDispatch, useSelector } from "react-redux";
import starSideBar from "../../assets/starSideBar.svg";
import ourErrandsImage from "../../assets/images/errandos-image.png";
import { IMAGE_BASE_URL } from "../../Constant";
import Loader from "../loader/Loader";

const ReviewsSingleErrando = ({ reviews, setReviews }) => {
  const navigate = useNavigate();
  const [allReviews, setAllReviews] = useState(true);
  const { slug } = useParams();
  console.log("'reviews'", reviews);

  const isPendingFromStore = useSelector(
    (store) => store?.searchProduct?.isPending
  );

  return (
    <>
      {isPendingFromStore ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row mt-5">
            {allReviews === true ? (
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 productsFromTheBusiness-productServiceButtons">
                <h6 className="productsFromTheBusiness-section-heading">
                  Reviews {`(${reviews?.length})`}
                </h6>

                <div
                  className="branchesBusinessUserProfile-viewAllBusiness"
                  onClick={() => {
                    setAllReviews(false);
                  }}
                >
                  View All Reviews
                </div>
              </div>
            ) : (
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 productsFromTheBusiness-productServiceButtons">
                <div className="productsBusinessUserProfile-goBack-container">
                  <img
                    style={{ cursor: "pointer" }}
                    className="img-fluid"
                    src={goBackArrow}
                    alt="goBackArrow"
                    onClick={() => {
                      setAllReviews(true);
                      navigate(`/errando-profile/${slug}`);
                    }}
                  />
                  <p className="productsBusinessUserProfile-goBack">Go back</p>
                </div>
                {/* <h6 className="productsBusinessUserProfile-section-heading">
                  Products (9)
                </h6> */}
              </div>
            )}
          </div>
          <div className="row">
            {allReviews &&
              reviews &&
              reviews.slice(0, 2)?.map((review) => {
                return (
                  <div
                    className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-5"
                    key={review?.id}
                  >
                    <div className="card card-container-reviewsSingleErrando">
                      {/* <div className="row"> */}
                      {/* <div className="col-xl-8 col-lg-7 col-md-7 col-sm-12 col-12 open-container"> */}
                      <div className="card-body">
                        <div className="d-flex gap-3 align-items-center branchesBusinessUserProfile-image-container">
                          <div className="branchesBusinessUserProfile-image-bgContainer">
                            <img
                              className="pharmaciesImage"
                              style={{ borderRadius: "60px" }}
                              src={
                                review?.user?.photo !== ""
                                  ? `${IMAGE_BASE_URL}${review?.user?.photo}`
                                  : ourErrandsImage
                              }
                              alt="review_user"
                            />
                          </div>

                          <div
                            className="businessUserView-name-report-container"
                            style={{ width: "100%" }}
                          >
                            <div>
                              <h5 className="card-subtitle text-muted reviewsSingleErrando-Heading">
                                {review?.user?.name}
                              </h5>

                              <div className="reviewSingleErrando-star-reviews">
                                {[
                                  ...Array(Math.round(Number(review?.rating))),
                                ].map((_, index) => (
                                  <img
                                    key={index}
                                    src={starSideBar}
                                    className="img-fluid"
                                    alt="star"
                                  />
                                ))}
                              </div>
                            </div>

                            <p className="reviewSingleErrando-date">
                              {review?.when}
                            </p>
                          </div>
                        </div>
                        <p className="reviewSingleErrando-text mt-3">
                          {review?.review}
                        </p>
                      </div>
                      {/* </div> */}
                      {/* </div> */}
                    </div>
                  </div>
                );
              })}

            {!allReviews && (
              <>
                {reviews &&
                  reviews?.map((review) => {
                    return (
                      <div
                        className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-5"
                        key={review?.id}
                      >
                        <div className="card card-container-reviewsSingleErrando">
                          {/* <div className="row"> */}
                          {/* <div className="col-xl-8 col-lg-7 col-md-7 col-sm-12 col-12 open-container"> */}
                          <div className="card-body">
                            <div className="d-flex gap-3 align-items-center branchesBusinessUserProfile-image-container">
                              <div className="branchesBusinessUserProfile-image-bgContainer">
                                <img
                                  className="pharmaciesImage"
                                  style={{ borderRadius: "60px" }}
                                  src={
                                    review?.user?.photo !== ""
                                      ? `${IMAGE_BASE_URL}${review?.user?.photo}`
                                      : ourErrandsImage
                                  }
                                  alt="review_user"
                                />
                              </div>

                              <div
                                className="businessUserView-name-report-container"
                                style={{ width: "100%" }}
                              >
                                <div>
                                  <h5 className="card-subtitle text-muted reviewsSingleErrando-Heading">
                                    {review?.user?.name}
                                  </h5>

                                  <div className="reviewSingleErrando-star-reviews">
                                    {[
                                      ...Array(
                                        Math.round(Number(review?.rating))
                                      ),
                                    ].map((_, index) => (
                                      <img
                                        key={index}
                                        src={starSideBar}
                                        className="img-fluid"
                                        alt="star"
                                      />
                                    ))}
                                  </div>
                                </div>

                                <p className="reviewSingleErrando-date">
                                  {review?.when}
                                </p>
                              </div>
                            </div>
                            <p className="reviewSingleErrando-text mt-3">
                              {review?.review}
                            </p>
                          </div>
                          {/* </div> */}
                          {/* </div> */}
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewsSingleErrando;
