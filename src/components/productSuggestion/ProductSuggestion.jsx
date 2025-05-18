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
import { IMAGE_BASE_URL } from "../../Constant";
import sideBarAd from "../../assets/sideBarAd.jpeg";
import sideBarAdEnglish from "../../assets/sideBarAdEnglish.jpeg";
import ourErrandsImage from "../../assets/images/errandos-image.png";

const ProductSuggestion = () => {
  const boolean = useSelector((store) => store.boolean.value);

  const dispatch = useDispatch();

  const [open, setOpen] = useState({
    region: false,
    town: false,
  });

  const productDetailsCollection = useSelector(
    (store) => store?.productDetails
  );

  console.log("productDetailsCollection", productDetailsCollection);

  return (
    <>
      <div className="container productSuggestion-main-container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card productSuggestion-first px-3">
              <div className="card-body productSuggestion-card-container">
                <div className="productSuggestion-review-container">
                  <div className="productSuggestion-image-text">
                    <img
                      src={
                        productDetailsCollection?.shop?.image
                          ? `${IMAGE_BASE_URL}${productDetailsCollection?.shop?.image}`
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
                        {productDetailsCollection?.shop?.name}{" "}
                        {/* Nishang Systems */}
                      </div>
                      {productDetailsCollection?.shop?.reviews_count !== 0 && (
                        <div className="productSuggestion-star-reviews">
                          {Array.from(
                            {
                              length:
                                productDetailsCollection?.shop?.reviews_count ||
                                0,
                            },
                            (_, i) => (
                              <img
                                key={i}
                                src={starSideBar}
                                className="img-fluid"
                                alt="star"
                              />
                            )
                          )}

                          <img src={starSideBar} className="img-fluid" />
                          <img src={starSideBar} className="img-fluid" />
                          <img src={starSideBar} className="img-fluid" />
                          <img src={starSideBar} className="img-fluid" />
                          <p className="productSuggestion-review">(1 review)</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {productDetailsCollection?.shop?.address && (
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
                        {productDetailsCollection?.shop?.address}
                        {/* Hotel St Claire, Molyko, Buea */}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* <div className="card productSuggestion-second px-3">
              <div className="card-body productSuggestion-card-container">
                <h6 className="productSuggestion-options-heading">
                  Also From: Nishang Systems
                </h6>

                <div className="productSuggestion-addressImage-second-container">
                  <img
                    src={productSuggestionOptions}
                    alt="businessNearYouLocationIcon"
                    className="img-fluid"
                  />
                  <div>
                    <p className="productSuggestion-options-product-heading">
                      2-In-1-Touch-Screen-La...
                    </p>
                    <p className="productSuggestion-options-subText">
                      Molyko, Buea
                    </p>

                    <p className="productSuggestion-options-subText">
                      5000 FRS
                    </p>
                  </div>
                </div>

                <div className="productSuggestion-addressImage-second-container">
                  <img
                    src={productSuggestionOptions}
                    alt="businessNearYouLocationIcon"
                    className="img-fluid"
                  />
                  <div>
                    <p className="productSuggestion-options-product-heading">
                      2-In-1-Touch-Screen-La...
                    </p>
                    <p className="productSuggestion-options-subText">
                      Molyko, Buea
                    </p>

                    <p className="productSuggestion-options-subText">
                      5000 FRS
                    </p>
                  </div>
                </div>

                <div className="productSuggestion-addressImage-second-container">
                  <img
                    src={productSuggestionOptions}
                    alt="businessNearYouLocationIcon"
                    className="img-fluid"
                  />
                  <div>
                    <p className="productSuggestion-options-product-heading">
                      2-In-1-Touch-Screen-La...
                    </p>
                    <p className="productSuggestion-options-subText">
                      Molyko, Buea
                    </p>

                    <p className="productSuggestion-options-subText">
                      5000 FRS
                    </p>
                  </div>
                </div>
              </div>
            </div> */}

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

export default ProductSuggestion;

{
  /* <Offcanvas
        show={boolean}
        onClick={() => {
          dispatch(toggle());
          dispatch(setFalse());
        }}
      >
        <Offcanvas.Body>
          <div className="container filter-offCanvas">
            <div className="row">
              <div className="filtersAndSearch-headingContainer">
                <h4 className="filtersAndSearch-heading">Filters</h4>
                <p
                  className="filtersAndSearch-subHeading"
                  onClick={() => {
                    dispatch(toggle());
                    dispatch(setTrue());
                  }}
                >
                  Clear All
                </p>
              </div>
              <div className="filter-first">
                <div className="filter-container">
                  <h4 className="filter-heading">Region</h4>
                  <div className="filtersAndSearch-upArrowContainer">
                    <img
                      src={filterUpArrow}
                      alt="filterUpArrow"
                      className="img-fluid"
                    />
                  </div>
                </div>

                <Form>
                  <div className="d-flex align-items-center">
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        className="filter-option"
                        label={<p>Adamawa - AD (10) </p>}
                      />
                    </Form.Group>
                  </div>

                  <div className="d-flex align-items-center">
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        className="filter-option"
                        label={<p>Centre - CE (20) </p>}
                      />
                    </Form.Group>
                  </div>

                  <div className="d-flex align-items-center">
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        className="filter-option"
                        label={<p>Far North - FN (16) </p>}
                      />
                    </Form.Group>
                  </div>

                  <div className="d-flex align-items-center">
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        className="filter-option"
                        label={<p>South-West - SW (24) </p>}
                      />
                    </Form.Group>
                  </div>
                </Form>
              </div>

              <div className="filter-second">
                <div className="filter-container">
                  <h4 className="filter-heading">Town</h4>
                  <div className="filtersAndSearch-upArrowContainer">
                    <img
                      src={filterUpArrow}
                      alt="filterUpArrow"
                      className="img-fluid"
                    />
                  </div>
                </div>

                <div className="input-group rounded filter-searchContainer">
                  <input
                    type="search"
                    className="form-control rounded filter-search-input"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                  />
                  <span
                    className="input-group-text border-0 filter-image"
                    id="search-addon"
                  >
                    <img src={filterSearch} />
                  </span>
                </div>

                <Form>
                  <div className="d-flex align-items-center">
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        className="filter-option"
                        label={<p>Buea (10) </p>}
                      />
                    </Form.Group>
                  </div>

                  <div className="d-flex align-items-center">
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        className="filter-option"
                        label={<p>Kumba (4)</p>}
                      />
                    </Form.Group>
                  </div>

                  <div className="d-flex align-items-center">
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        className="filter-option"
                        label={<p>Limbe (6) </p>}
                      />
                    </Form.Group>
                  </div>

                  <div className="d-flex align-items-center">
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        className="filter-option"
                        label={<p>Mutengene (2)</p>}
                      />
                    </Form.Group>
                  </div>
                </Form>
              </div>

              <div className="filter-adBanner">
                <img src={filtersAdBanner} className="img-fluid" />
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas> */
}

// star-icon
