import React from "react";
import reviewsStarIcon from "../../assets/reviewsStarIcon.svg";
import blackStarReview from "../../assets/blackStarReview.svg";
import commentsImage from "../../assets/commentsImage.svg";
import starSideBar from "../../assets/starSideBar.svg";
import businessNearYouLocationIcon from "../../assets/businessNearYouLocationIcon.svg";
import { useNavigate } from "react-router-dom";

const ReviewsComponent = ({ productDetail }) => {
  // console.log("ReviewsComponent", productDetail?.reviews);
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <div className="row">
          {productDetail?.reviews === 0 ? (
            "No Reviews Found!!!"
          ) : (
            <>
              <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
                <div className="reviewsComponent-rating-Container">
                  <div className="reviewsComponent-rating">
                    <img src={reviewsStarIcon} className="img-fluid" />
                    <h4 className="reviewsComponent-rating-value">4.5</h4>
                    <div className="reviewsComponent-rating-number">
                      1 rating
                    </div>
                  </div>
                  <div>
                    <div className="reviewsComponent-progressBar-container mt-4">
                      <p className="reviewsComponent-total">5</p>
                      <img src={blackStarReview} />
                      <div className="progress progress-bar-custom">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "75%" }}
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="reviewsComponent-total">2</p>
                    </div>
                    <div className="reviewsComponent-progressBar-container">
                      <p className="reviewsComponent-total">4</p>
                      <img src={blackStarReview} />
                      <div className="progress progress-bar-custom">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "100%" }}
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="reviewsComponent-total">1</p>
                    </div>
                    <div className="reviewsComponent-progressBar-container">
                      <p className="reviewsComponent-total">3</p>
                      <img src={blackStarReview} />
                      <div className="progress progress-bar-custom">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "0%" }}
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="reviewsComponent-total">0</p>
                    </div>
                    <div className="reviewsComponent-progressBar-container">
                      <p className="reviewsComponent-total">2</p>
                      <img src={blackStarReview} />
                      <div className="progress progress-bar-custom">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "0%" }}
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="reviewsComponent-total">0</p>
                    </div>
                    <div className="reviewsComponent-progressBar-container mb-4">
                      <p className="reviewsComponent-total">1</p>
                      <img src={blackStarReview} />
                      <div className="progress progress-bar-custom">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "0%" }}
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="reviewsComponent-total">0</p>
                    </div>
                  </div>

                  <div className="reviewsComponent-sendReview-container">
                    <h6 className="reviewsComponent-sendReview-heading">
                      Review this product
                    </h6>
                    <p className="reviewsComponent-sendReview-subText">
                      Let other customers know what you think
                    </p>

                    <button
                      type="button"
                      className="btn btn-primary btn-lg reviewsComponent-sendReview-Button"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Login to Make a Review{" "}
                    </button>
                    <div className="reviewsComponent-sendReview-account-container">
                      <p className="reviewsComponent-sendReview-subText mb-0">
                        OR{" "}
                      </p>
                      <div
                        className="reviewsComponent-sendReview-account"
                        onClick={() => {
                          navigate("/signup");
                        }}
                      >
                        Create your Account
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
                <div className="reviewsComponent-comments-container">
                  <div className="productSuggestion-image-text">
                    <img src={commentsImage} alt="productSuggestionReviews" />
                    <div className="">
                      <div className="productSuggestion-review-heading">
                        Nishang Systems
                      </div>
                      <div className="reviewsComponent-comments-reviews">
                        <p className="productSuggestion-review">29/12/2024</p>
                        <img src={starSideBar} className="img-fluid" />
                        <img src={starSideBar} className="img-fluid" />
                        <img src={starSideBar} className="img-fluid" />
                        <img src={starSideBar} className="img-fluid" />
                        <img src={starSideBar} className="img-fluid" />
                      </div>
                      <div className="mt-2">
                        2 pieces and 3 pieces Men Suits Slim Fit Suit Black
                        Wedding Suit Blazer Jacket
                      </div>
                    </div>
                  </div>
                </div>
                <div className="reviewsComponent-comments-container">
                  <div className="productSuggestion-image-text">
                    <img src={commentsImage} alt="productSuggestionReviews" />
                    <div className="">
                      <div className="productSuggestion-review-heading">
                        Nishang Systems
                      </div>
                      <div className="reviewsComponent-comments-reviews">
                        <p className="productSuggestion-review">29/12/2024</p>
                        <img src={starSideBar} className="img-fluid" />
                        <img src={starSideBar} className="img-fluid" />
                        <img src={starSideBar} className="img-fluid" />
                        <img src={starSideBar} className="img-fluid" />
                        <img src={starSideBar} className="img-fluid" />
                      </div>
                      <div className="mt-2">
                        2 pieces and 3 pieces Men Suits Slim Fit Suit Black
                        Wedding Suit Blazer Jacket
                      </div>
                    </div>
                  </div>
                </div>

                <div className="reviewsComponent-comments-container">
                  <div className="productSuggestion-image-text">
                    <img src={commentsImage} alt="productSuggestionReviews" />
                    <div className="">
                      <div className="productSuggestion-review-heading">
                        Nishang Systems
                      </div>
                      <div className="reviewsComponent-comments-reviews">
                        <p className="productSuggestion-review">29/12/2024</p>
                        <img src={starSideBar} className="img-fluid" />
                        <img src={starSideBar} className="img-fluid" />
                        <img src={starSideBar} className="img-fluid" />
                        <img src={starSideBar} className="img-fluid" />
                        <img src={starSideBar} className="img-fluid" />
                      </div>
                      <div className="mt-2">
                        2 pieces and 3 pieces Men Suits Slim Fit Suit Black
                        Wedding Suit Blazer Jacket
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewsComponent;
