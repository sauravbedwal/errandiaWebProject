import React from "react";
import "../../App.css";
import Button from "react-bootstrap/Button";
import { setTrue, toggle } from "../../utils/booleanSlice";
import { useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import PaginationComponent from "../pagination/PaginationComponent";
import searchProducts from "../../assets/searchProducts.svg";
import productImage from "../../assets/productImage.svg";
import productImage2 from "../../assets/productImage2.svg";
import whatsappIcon from "../../assets/whatsappIcon.svg";
import productsCall from "../../assets/productsCall.svg";
import businessNearYouLocationIcon from "../../assets/businessNearYouLocationIcon.svg";
import { useState } from "react";
import { ButtonGroup, ToggleButton, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { modalCallToggle, setCallModalTrue } from "../../utils/callModalSlice";
import CallPopUp from "../callPopUp/CallPopUp";

const Products = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("products");

  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="allPublicOffices-dropDown-filter-Container">
              <div className="products-services-dropDownContainer">
                <Container className="products-services-buttons">
                  <ButtonGroup>
                    <ToggleButton
                      type="radio"
                      variant={
                        selected === "products"
                          ? "outline-primary active"
                          : "outline-secondary"
                      }
                      checked={selected === "products"}
                      onClick={() => {
                        setSelected("products");
                        // navigate("/search-products");
                      }}
                      className="custom-toggle"
                    >
                      Products
                    </ToggleButton>
                    <ToggleButton
                      type="radio"
                      variant={
                        selected === "services"
                          ? "outline-primary active"
                          : "outline-secondary"
                      }
                      checked={selected === "services"}
                      onClick={() => {
                        setSelected("services");
                        navigate("/search-services");
                      }}
                      className="custom-toggle"
                    >
                      Services
                    </ToggleButton>
                  </ButtonGroup>
                </Container>
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
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
            <div className="card productsCard-container mt-4 mb-4">
              <div className="card-body">
                <div>
                  <div className="ourErrandosImageContainer">
                    <img
                      className="ourErrandosImage"
                      src={searchProducts}
                      alt="searchProducts"
                    />
                  </div>
                </div>
                <div className="products-text-container">
                  <div className="d-flex align-items-center ourErrandosTextIcon ourErrandosLocationAndText">
                    <img
                      src={businessNearYouLocationIcon}
                      alt="Location Icon"
                    />
                    <p className="products-Text">Buea, South-West</p>
                  </div>

                  <div>
                    <h5 className="card-title products-heading">
                      Turkey African Party Dresses Long Sleeve Evening
                    </h5>
                  </div>

                  <div className="d-flex align-items-center ourErrandosTextIcon mt-1 ourErrandosLocationAndText">
                    <p className="products-Text2">5,000 FCFA</p>
                  </div>
                </div>
                <Button
                  variant="primary"
                  className="products-call-button"
                  onClick={() => {
                    dispatch(modalCallToggle());
                    dispatch(setCallModalTrue());
                  }}
                >
                  <img src={productsCall} alt="whatsappIcon" />
                  Call
                </Button>
                <Button
                  variant="primary"
                  className="products-whatsAppButton-green"
                  onClick={() => {
                    dispatch(modalCallToggle());
                    dispatch(setCallModalTrue());
                  }}
                >
                  <img src={whatsappIcon} alt="whatsappIcon" />
                  Chat on Whatsapp
                </Button>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
            <div className="card productsCard-container mt-4 mb-4">
              <div className="card-body">
                <div>
                  <div className="ourErrandosImageContainer">
                    <img
                      className="ourErrandosImage"
                      src={productImage}
                      alt="searchProducts"
                    />
                  </div>
                </div>
                <div className="products-text-container">
                  <div className="d-flex align-items-center ourErrandosTextIcon ourErrandosLocationAndText">
                    <img
                      src={businessNearYouLocationIcon}
                      alt="Location Icon"
                    />
                    <p className="products-Text">Buea, South-West</p>
                  </div>

                  <div>
                    <h5 className="card-title products-heading">
                      Turkey African Party Dresses Long Sleeve Evening
                    </h5>
                  </div>

                  <div className="d-flex align-items-center ourErrandosTextIcon mt-1 ourErrandosLocationAndText">
                    <p className="products-Text2">5,000 FCFA</p>
                  </div>
                </div>
                <Button
                  variant="primary"
                  className="products-call-button"
                  onClick={() => {
                    dispatch(modalCallToggle());
                    dispatch(setCallModalTrue());
                  }}
                >
                  <img src={productsCall} alt="whatsappIcon" />
                  Call
                </Button>
                <Button
                  variant="primary"
                  className="products-whatsAppButton-green"
                  onClick={() => {
                    dispatch(modalCallToggle());
                    dispatch(setCallModalTrue());
                  }}
                >
                  <img src={whatsappIcon} alt="whatsappIcon" />
                  Chat on Whatsapp
                </Button>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
            <div className="card productsCard-container mt-4 mb-4">
              <div className="card-body">
                <div>
                  <div className="ourErrandosImageContainer">
                    <img
                      className="ourErrandosImage"
                      src={productImage2}
                      alt="searchProducts"
                    />
                  </div>
                </div>
                <div className="products-text-container">
                  <div className="d-flex align-items-center ourErrandosTextIcon ourErrandosLocationAndText">
                    <img
                      src={businessNearYouLocationIcon}
                      alt="Location Icon"
                    />
                    <p className="products-Text">Buea, South-West</p>
                  </div>

                  <div>
                    <h5 className="card-title products-heading">
                      Turkey African Party Dresses Long Sleeve Evening
                    </h5>
                  </div>

                  <div className="d-flex align-items-center ourErrandosTextIcon mt-1 ourErrandosLocationAndText">
                    <p className="products-Text2">5,000 FCFA</p>
                  </div>
                </div>
                <Button
                  variant="primary"
                  className="products-call-button"
                  onClick={() => {
                    dispatch(modalCallToggle());
                    dispatch(setCallModalTrue());
                  }}
                >
                  <img src={productsCall} alt="whatsappIcon" />
                  Call
                </Button>
                <Button
                  variant="primary"
                  className="products-whatsAppButton-green"
                  onClick={() => {
                    dispatch(modalCallToggle());
                    dispatch(setCallModalTrue());
                  }}
                >
                  <img src={whatsappIcon} alt="whatsappIcon" />
                  Chat on Whatsapp
                </Button>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
            <div className="card productsCard-container mt-4 mb-4">
              <div className="card-body">
                <div>
                  <div className="ourErrandosImageContainer">
                    <img
                      className="ourErrandosImage"
                      src={searchProducts}
                      alt="searchProducts"
                    />
                  </div>
                </div>
                <div className="products-text-container">
                  <div className="d-flex align-items-center ourErrandosTextIcon ourErrandosLocationAndText">
                    <img
                      src={businessNearYouLocationIcon}
                      alt="Location Icon"
                    />
                    <p className="products-Text">Buea, South-West</p>
                  </div>

                  <div>
                    <h5 className="card-title products-heading">
                      Turkey African Party Dresses Long Sleeve Evening
                    </h5>
                  </div>

                  <div className="d-flex align-items-center ourErrandosTextIcon mt-1 ourErrandosLocationAndText">
                    <p className="products-Text2">5,000 FCFA</p>
                  </div>
                </div>
                <Button
                  variant="primary"
                  className="products-call-button"
                  onClick={() => {
                    dispatch(modalCallToggle());
                    dispatch(setCallModalTrue());
                  }}
                >
                  <img src={productsCall} alt="whatsappIcon" />
                  Call
                </Button>
                <Button
                  variant="primary"
                  className="products-whatsAppButton-green"
                  onClick={() => {
                    dispatch(modalCallToggle());
                    dispatch(setCallModalTrue());
                  }}
                >
                  <img src={whatsappIcon} alt="whatsappIcon" />
                  Chat on Whatsapp
                </Button>
              </div>
            </div>
          </div>
        </div>
        <PaginationComponent />
      </div>
      {/* <CallPopUp /> */}
    </>
  );
};

export default Products;

{
  /* <div
className="card productsCard-container me-3 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mt-4 mb-4"
style={{ width: "16rem" }}
>
<div className="card-body">
  <div>
    <div className="ourErrandosImageContainer">
      <img
        className="ourErrandosImage"
        src={searchProducts}
        alt="searchProducts"
      />
    </div>
  </div>
  <div className="products-text-container">
    <div className="d-flex align-items-center ourErrandosTextIcon ourErrandosLocationAndText">
      <img src={businessNearYouLocationIcon} alt="Location Icon" />
      <p className="products-Text">Buea, South-West</p>
    </div>

    <div>
      <h5 className="card-title products-heading">
        Turkey African Party Dresses Long Sleeve Evening
      </h5>
    </div>

    <div className="d-flex align-items-center ourErrandosTextIcon mt-1 ourErrandosLocationAndText">
      <p className="products-Text2">5,000 FCFA</p>
    </div>
  </div>
  <Button variant="primary" className="products-call-button">
    <img src={productsCall} alt="whatsappIcon" />
    Call
  </Button>
  <Button
    variant="primary"
    className="products-whatsAppButton-green"
  >
    <img src={whatsappIcon} alt="whatsappIcon" />
    Chat on Whatsapp
  </Button>
</div>
</div> */
}
