import React from "react";
import "../../App.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { setTrue, toggle } from "../../utils/booleanSlice";
import { Link } from "react-router-dom";

const AddedErrands = () => {
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="addedErrands-container">
            <h4 className="addedErrands-heading">All Recent Errands</h4>

            <div className="ddedErrands-dropDownContainer">
              <p className="ddedErrands-dropDownHeading">Sort By :</p>
              <Dropdown drop="down">
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  className="addedErrands-dropdown"
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
              className="addedErrands-offCanvas-button mt-0"
              onClick={() => {
                dispatch(toggle());

                dispatch(setTrue());
              }}
            >
              Filter and Search
            </Button>
          </div>
        </div>

        <div className="container mt-4">
          <div className="row addedErrands-items-container">
            <div className="card addedErrandsCard-container me-3 col-xl-4 col-lg-6 col-md-6 col-sm-6   mt-4 mb-4">
              <div className="card-body">
                <div>
                  <div className="addedErrands-ImageContainer"></div>
                  <div>
                    <div className="addedErrandsCard-preHeading">
                      12 minutes ago
                    </div>
                    <h5 className="card-title addedErrandsCard-heading">
                      I need Marriage Makeup Services
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="card addedErrandsCard-container me-3 col-xl-4 col-lg-6 col-md-6 col-sm-6   mt-4 mb-4">
              <div className="card-body">
                <div>
                  <div className="addedErrands-ImageContainer1"></div>
                  <div>
                    <div className="addedErrandsCard-preHeading">
                      12 minutes ago
                    </div>
                    <h5 className="card-title addedErrandsCard-heading">
                      I need Marriage Makeup Services
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="card addedErrandsCard-container me-3 col-xl-4 col-lg-6 col-md-6 col-sm-6   mt-4 mb-4">
              <div className="card-body">
                <div>
                  <div className="addedErrands-ImageContainer2"></div>
                  <div>
                    <div className="addedErrandsCard-preHeading">
                      12 minutes ago
                    </div>
                    <h5 className="card-title addedErrandsCard-heading">
                      I need Marriage Makeup Services
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="card addedErrandsCard-container me-3 col-xl-4 col-lg-6 col-md-6 col-sm-6   mt-4 mb-4">
              <div className="card-body">
                <div>
                  <div className="addedErrands-ImageContainer2"></div>
                  <div>
                    <div className="addedErrandsCard-preHeading">
                      12 minutes ago
                    </div>
                    <h5 className="card-title addedErrandsCard-heading">
                      I need Marriage Makeup Services
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="card addedErrandsCard-container me-3 col-xl-4 col-lg-6 col-md-6 col-sm-6   mt-4 mb-4">
              <div className="card-body">
                <Link
                  to="/all-errands"
                  style={{ textDecoration: "none" }}
                >
                  <div>
                    <div className="addedErrands-ImageContainer2"></div>
                    <div>
                      <div className="addedErrandsCard-preHeading">
                        12 minutes ago
                      </div>
                      <h5 className="card-title addedErrandsCard-heading">
                        I need Marriage Makeup Services
                      </h5>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="card addedErrandsCard-container me-3 col-xl-4 col-lg-6 col-md-6 col-sm-6   mt-4 mb-4">
              <div className="card-body">
                <Link to="/errand-single" style={{ textDecoration: "none" }}>
                  <div>
                    <div className="addedErrands-ImageContainer3"></div>
                    <div>
                      <div className="addedErrandsCard-preHeading">
                        12 minutes ago
                      </div>
                      <h5 className="card-title addedErrandsCard-heading">
                        I need Marriage Makeup Services
                      </h5>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddedErrands;
