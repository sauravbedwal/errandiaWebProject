import React from "react";
import "../../App.css";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { setTrue, toggle } from "../../utils/booleanSlice";
import Dropdown from "react-bootstrap/Dropdown";
import pharamciesNotFoundRunErrand from "../../assets/pharamciesNotFoundRunErrand.svg";
import noPharmaciesFound from "../../assets/noPharmaciesFound.svg";
import { modalToggle, setModalTrue } from "../../utils/modalSlice";
import RunErrandPopUp from "../runErrandPopUp/RunErrandPopUp";

const PharmaciesNoResultFound = () => {
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
                    Most Popular
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
                  dispatch(modalToggle());
                  dispatch(setModalTrue());
                }}
              >
                <img src={pharamciesNotFoundRunErrand} alt="whatsappIcon" />
                Run Errand
              </Button>{" "}
            </div>
          </div>
        </div>
      </div>
      <RunErrandPopUp />
    </>
  );
};

export default PharmaciesNoResultFound;
