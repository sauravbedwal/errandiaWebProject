import React from "react";
import "../../App.css";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { setTrue, toggle } from "../../utils/booleanSlice";
import Dropdown from "react-bootstrap/Dropdown";
import PaginationComponent from "../pagination/PaginationComponent";
import businessNearYouLocationIcon from "../../assets/businessNearYouLocationIcon.svg";
import featureCardsImage from "../../assets/featureCardsImage.svg";
import featureCardsImage3 from "../../assets/featureCardsImage3.svg";
import featureCardsImage2 from "../../assets/featureCardsImage2.svg";
import featureCardsImage4 from "../../assets/featureCardsImage4.svg";
import featureCardsImage6 from "../../assets/featureCardsImage6.svg";

const BusinessesCard = () => {
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="allPublicOffices-dropDown-filter-Container">
            <div className="allPublicOffices-dropDownContainer">
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
            </div>
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
      <div className="row   errandos-mobile-tab">
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
          <div className="card businessCard-container mt-4 mb-4">
            <div className="card-body">
              <div>
                <div className="businessImageContainer">
                  <img
                    className="businessImage"
                    src={featureCardsImage}
                    alt="Card image cap"
                  />
                </div>
                <div className="businessesCard-mobile-textCenter">
                  <div className="businessNearYouCard-preHeading">
                    Electronics
                  </div>
                  <h5 className="card-title businessNearYouCard-heading">
                    Nishang Systems
                  </h5>
                </div>
              </div>
              <div className="d-flex align-items-center businessNearYouTextIcon mt-3 businessLocationAndText">
                <img src={businessNearYouLocationIcon} alt="Location Icon" />
                <p className="businessNearYouText">Buea, South-West</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
          <div className="card businessCard-container mt-4 mb-4">
            <div className="card-body">
              <div>
                <div className="businessImageContainer">
                  <img
                    className="businessImage"
                    src={featureCardsImage3}
                    alt="Card image cap"
                  />
                </div>
                <div className="businessesCard-mobile-textCenter">
                  <div className="businessNearYouCard-preHeading">
                    Electronics
                  </div>
                  <h5 className="card-title businessNearYouCard-heading">
                    Nishang Systems
                  </h5>
                </div>
              </div>
              <div className="d-flex align-items-center businessNearYouTextIcon mt-3 businessLocationAndText">
                <img src={businessNearYouLocationIcon} alt="Location Icon" />
                <p className="businessNearYouText">Buea, South-West</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
          <div className="card businessCard-container mt-4 mb-4">
            <div className="card-body">
              <div>
                <div className="businessImageContainer">
                  <img
                    className="businessImage"
                    src={featureCardsImage2}
                    alt="Card image cap"
                  />
                </div>
                <div className="businessesCard-mobile-textCenter">
                  <div className="businessNearYouCard-preHeading">
                    Electronics
                  </div>
                  <h5 className="card-title businessNearYouCard-heading">
                    Nishang Systems
                  </h5>
                </div>
              </div>
              <div className="d-flex align-items-center businessNearYouTextIcon mt-3 businessLocationAndText">
                <img src={businessNearYouLocationIcon} alt="Location Icon" />
                <p className="businessNearYouText">Buea, South-West</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
          <div className="card businessCard-container mt-4 mb-4">
            <div className="card-body">
              <div>
                <div className="businessImageContainer">
                  <img
                    className="businessImage"
                    src={featureCardsImage4}
                    alt="Card image cap"
                  />
                </div>
                <div className="businessesCard-mobile-textCenter">
                  <div className="businessNearYouCard-preHeading">
                    Electronics
                  </div>
                  <h5 className="card-title businessNearYouCard-heading">
                    Nishang Systems
                  </h5>
                </div>
              </div>
              <div className="d-flex align-items-center businessNearYouTextIcon mt-3 businessLocationAndText">
                <img src={businessNearYouLocationIcon} alt="Location Icon" />
                <p className="businessNearYouText">Buea, South-West</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
          <div className="card businessCard-container mt-4 mb-4">
            <div className="card-body">
              <div>
                <div className="businessImageContainer">
                  <img
                    className="businessImage"
                    src={featureCardsImage6}
                    alt="Card image cap"
                  />
                </div>
                <div className="businessesCard-mobile-textCenter">
                  <div className="businessNearYouCard-preHeading">
                    Electronics
                  </div>
                  <h5 className="card-title businessNearYouCard-heading">
                    Nishang Systems
                  </h5>
                </div>
              </div>
              <div className="d-flex align-items-center businessNearYouTextIcon mt-3 businessLocationAndText">
                <img src={businessNearYouLocationIcon} alt="Location Icon" />
                <p className="businessNearYouText">Buea, South-West</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaginationComponent />
    </div>
  );
};

export default BusinessesCard;
