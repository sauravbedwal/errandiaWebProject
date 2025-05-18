import React, { useRef } from "react";
import "../../App.css";
import allErrandsLargeImg from "../../assets/allErrandsLargeImg.svg";
import allErrandsPostedBy from "../../assets/allErrandsPostedBy.svg";
import allErrandsLocation from "../../assets/allErrandsLocation.svg";
import Button from "react-bootstrap/Button";
import leftArrowCarousal from "../../assets/leftArrowCarousal.svg";
import rightArrowCarousel from "../../assets/rightArrowCarousel.svg";
import loggedInSingleErrandCall from "../../assets/loggedInSingleErrandCall.svg";
import loggedInSingleErrandWhatsApp from "../../assets/loggedInSingleErrandWhatsApp.svg";

const LoggedInAllErrands = () => {
  const scrollRef = useRef(null);

  const handleScrollLeft = () => {
    scrollRef?.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    scrollRef?.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 image-text-container">
          <img
            src={allErrandsLargeImg}
            alt="allErrandsLargeImg"
            className="img-fluid allErrands-image"
          />
          <div className="allErrands-text-container">
            <h4 className="loggedInSingleErrand-allErrands-text-heading">
              I need musicians for my upcoming wedding
            </h4>
            <p className="loggedInSingleErrand-allErrands-text-paragraph">
              I'm envisioning a blend of styles to create a unique atmosphere,
              from classical pieces for the ceremony to a lively band for the
              reception. If you know any talented musicians or bands who can
              bring this vision to life, please let me know. Your
              recommendations would be greatly appreciated and would help make
              our special day truly unforgettable.
            </p>
            <div className="allErrands-postedBy-Container">
              <h5 className="allErrands-postedBy">Posted by</h5>
              <div className="d-flex align-items-center gap-2 allErrands-name-time-container">
                <img src={allErrandsPostedBy} />
                <div>
                  <h6 className="allErrands-name">Kimberly Gail</h6>
                  <p className="allErrands-time">3 hours ago</p>
                </div>
              </div>

              <div className="allErrands-Location">
                <div className="allErrands-imageLocation">
                  <img src={allErrandsLocation} className="img-fluid" />
                  <div className="allErrands-region">
                    <div className="allErrands-regionName">Region</div>
                    <div className="allErrands-regionPlace">
                      South West (SW)
                    </div>
                  </div>
                </div>
                <div>
                  <div className="allErrands-regionName">Town</div>
                  <div className="allErrands-regionPlace">Molyko, Buea</div>
                </div>
              </div>
            </div>
            <Button
              variant="primary"
              className="loggedInAllErrands-addErrands-blueButton"
            >
              <img src={loggedInSingleErrandCall} />
              Call
            </Button>
            <Button
              variant="primary"
              className="loggedInAllErrands-addErrands-greenButton"
            >
              <img src={loggedInSingleErrandWhatsApp} />
              Chat on WhatsApp
            </Button>
          </div>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="container mt-4">
            <div className="row allErrands-container">
              <div className="d-flex align-items-center justify-content-end gap-3 allErrands-arrowsBox">
                <div className="arrowContainer" onClick={handleScrollLeft}>
                  <img src={leftArrowCarousal} alt="leftArrowCarousal" />
                </div>
                <div className="arrowContainer" onClick={handleScrollRight}>
                  <img src={rightArrowCarousel} alt="rightArrowCarousel" />
                </div>
              </div>
              <div className="card addErrands-container col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 mt-4 mb-4">
                <div className="card-body">
                  <div>
                    <div className="addErrands-ImageContainer"></div>
                    <div>
                      <div className="recentErrandsCard-preHeading">
                        12 minutes ago
                      </div>
                      <h5 className="card-title recentErrandsCard-heading">
                        I need Marriage Makeup Services
                      </h5>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card addErrands-container col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 mt-4 mb-4">
                <div className="card-body">
                  <div>
                    <div className="addErrands-ImageContainer2"></div>
                    <div>
                      <div className="recentErrandsCard-preHeading">
                        12 minutes ago
                      </div>
                      <h5 className="card-title recentErrandsCard-heading">
                        I need Marriage Makeup Services
                      </h5>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card addErrands-container col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 mt-4 mb-4">
                <div className="card-body">
                  <div>
                    <div className="addErrands-ImageContainer3"></div>
                    <div>
                      <div className="recentErrandsCard-preHeading">
                        12 minutes ago
                      </div>
                      <h5 className="card-title recentErrandsCard-heading">
                        I need Marriage Makeup Services
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-primary btn-lg recentErrandsButton mb-3"
            >
              View all errands
            </button>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default LoggedInAllErrands;
