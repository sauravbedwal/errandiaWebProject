import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import ReviewsComponent from "../reviewsComponent/ReviewsComponent";

const DescriptionProfileReview = ({ productDetail }) => {
  const [optionData, setOptionData] = useState("Reviews");
  // console.log("optionData", optionData);
  // const description_content = productDetail.shop.description;
  const profile_content =
    "2 pieces and 3 pieces Men Suits Slim Fit Suit Black Wedding Suit Blazer Jacket";
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <Nav
              defaultActiveKey="/"
              as="ul"
              className="descriptionProfileReview-container"
            >
              {/* <Nav.Item as="li">
                <Nav.Link
                  className="descriptionProfileReview-option"
                  onClick={(e) => {
                    // console.log("event", e.target.textContent);
                    setOptionData(e.target.textContent);
                  }}
                >
                  Description
                </Nav.Link>
              </Nav.Item> */}
              <Nav.Item as="li">
                <Nav.Link
                  eventKey="link-1"
                  className="descriptionProfileReview-option"
                  onClick={(e) => {
                    // console.log("event", e.target.textContent);
                    setOptionData(e.target.textContent);
                  }}
                >
                  Reviews
                </Nav.Link>
              </Nav.Item>
              {/* <Nav.Item as="li">
                <Nav.Link
                  eventKey="link-2"
                  className="descriptionProfileReview-option"
                  onClick={(e) => {
                    // console.log("event", e.target.textContent);
                    setOptionData(e.target.textContent);
                  }}
                >
                  Profile
                </Nav.Link>
              </Nav.Item> */}
            </Nav>
            <div className="descriptionProfileReview-option-details">
              {optionData === "Description" ? (
                productDetail?.shop?.description
              ) : optionData === "Reviews" ? (
                <ReviewsComponent productDetail={productDetail} />
              ) : optionData === "Profile" ? (
                profile_content
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DescriptionProfileReview;
