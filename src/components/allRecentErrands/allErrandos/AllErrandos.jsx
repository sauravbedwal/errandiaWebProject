import React from "react";
import "../../App.css";
import Button from "react-bootstrap/Button";
import ourErrandsImage from "../../assets/images/ourErrandsImage.svg";
import locationOurErrando from "../../assets/locationOurErrando.svg";
import starOurErrando from "../../assets/starOurErrando.svg";
import { setTrue, toggle } from "../../utils/booleanSlice";
import { useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import PaginationComponent from "../pagination/PaginationComponent";

const AllErrandos = () => {
  const dispatch = useDispatch();

  return (
    <>
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
          {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4"> */}
          <div
            className="card ourErrandosCard-container me-3 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mt-4 mb-4"
            style={{ width: "16rem" }}
          >
            <div className="card-body">
              <div>
                <div className="ourErrandosImageContainer">
                  <img
                    className="ourErrandosImage"
                    src={ourErrandsImage}
                    alt="Card image cap"
                  />
                </div>
              </div>
              <div className="allErrandos-text-container">
                <div>
                  <h5 className="card-title ourErrandosCard-heading">
                    Michelle Robel
                  </h5>
                </div>
                <div className="d-flex align-items-center ourErrandosTextIcon mt-3 ourErrandosLocationAndText">
                  <img src={locationOurErrando} alt="Location Icon" />
                  <p className="ourErrandosText">Buea, South-West</p>
                </div>
                <div className="d-flex align-items-center ourErrandosTextIcon mt-1 ourErrandosLocationAndText">
                  <img src={starOurErrando} alt="Location Icon" />
                  <p className="ourErrandosText">4.8 (252 reviews)</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="card ourErrandosCard-container me-3 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mt-4 mb-4"
            style={{ width: "16rem" }}
          >
            <div className="card-body">
              <div>
                <div className="ourErrandosImageContainer">
                  <img
                    className="ourErrandosImage"
                    src={ourErrandsImage}
                    alt="Card image cap"
                  />
                </div>
              </div>
              <div className="allErrandos-text-container">
                <div>
                  <h5 className="card-title ourErrandosCard-heading">
                    Michelle Robel
                  </h5>
                </div>
                <div className="d-flex align-items-center ourErrandosTextIcon mt-3 ourErrandosLocationAndText">
                  <img src={locationOurErrando} alt="Location Icon" />
                  <p className="ourErrandosText">Buea, South-West</p>
                </div>
                <div className="d-flex align-items-center ourErrandosTextIcon mt-1 ourErrandosLocationAndText">
                  <img src={starOurErrando} alt="Location Icon" />
                  <p className="ourErrandosText">4.8 (252 reviews)</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="card ourErrandosCard-container me-3 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mt-4 mb-4"
            style={{ width: "16rem" }}
          >
            <div className="card-body">
              <div>
                <div className="ourErrandosImageContainer">
                  <img
                    className="ourErrandosImage"
                    src={ourErrandsImage}
                    alt="Card image cap"
                  />
                </div>
              </div>
              <div className="allErrandos-text-container">
                <div>
                  <h5 className="card-title ourErrandosCard-heading">
                    Michelle Robel
                  </h5>
                </div>
                <div className="d-flex align-items-center ourErrandosTextIcon mt-3 ourErrandosLocationAndText">
                  <img src={locationOurErrando} alt="Location Icon" />
                  <p className="ourErrandosText">Buea, South-West</p>
                </div>
                <div className="d-flex align-items-center ourErrandosTextIcon mt-1 ourErrandosLocationAndText">
                  <img src={starOurErrando} alt="Location Icon" />
                  <p className="ourErrandosText">4.8 (252 reviews)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PaginationComponent />
      </div>
    </>
  );
};

export default AllErrandos;
