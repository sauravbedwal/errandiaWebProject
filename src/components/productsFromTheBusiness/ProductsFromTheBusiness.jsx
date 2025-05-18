import React, { useEffect, useRef, useState } from "react";
import "../../App.css";
import searchProducts from "../../assets/searchProducts.svg";
import productImage from "../../assets/productImage.svg";
import productImage2 from "../../assets/productImage2.svg";
import businessNearYouLocationIcon from "../../assets/businessNearYouLocationIcon.svg";
import leftArrowCarousal from "../../assets/leftArrowCarousal.svg";
import rightArrowCarousel from "../../assets/rightArrowCarousel.svg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import apis, { IMAGE_BASE_URL } from "../../Constant";

const ProductsFromTheBusiness = ({ productDetail }) => {
  const scrollRef = useRef(null);

  const handleScrollLeft = () => {
    scrollRef.current.scrollBy({
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

  const navigate = useNavigate();

  const [productFromBusiness, setProductFromBusiness] = useState(null);
  // console.log("productFromBusiness", productFromBusiness);

  const slugBusiness = productDetail?.shop?.slug;
  // console.log("slugBusiness", slugBusiness);

  const fetchProductFromBusinesses = async (slug) => {
    if (!slug) return;
    try {
      const params = new URLSearchParams({
        service: "0",
      });

      const res = await getApi(
        apis.productsFromBusinesses + `/${slug}/items?${params.toString()}`
      );

      // console.log("fetchProductFromBusinesses", res);
      setProductFromBusiness(res.data.data.items);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 404) {
        console.log("Resource not found!");
        // notify();
      }
    }
  };

  useEffect(() => {
    if (slugBusiness) {
      fetchProductFromBusinesses(slugBusiness);
    }
  }, [slugBusiness]);

  return (
    <>
      <div className="container mt-5">
        {productFromBusiness && productFromBusiness.length != 0 && (
          <>
            {" "}
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 productsFromTheBusiness-productServiceButtons">
                <h6 className="productsFromTheBusiness-section-heading">
                  Products from this Business
                </h6>
                <div className="d-flex align-items-center gap-3 arrowsBox">
                  <div className="arrowContainer" onClick={handleScrollLeft}>
                    <img src={leftArrowCarousal} alt="leftArrowCarousal" />
                  </div>
                  <div className="arrowContainer" onClick={handleScrollRight}>
                    <img src={rightArrowCarousel} alt="rightArrowCarousel" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row   errandos-mobile-tab ">
              <div className="featuredCardsCarousel" ref={scrollRef}>
                {productFromBusiness &&
                  productFromBusiness.map((product) => {
                    return (
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                        <div className="card productsCard-container mt-4 mb-4">
                          <div
                            className="card-body"
                            onClick={() => {
                              navigate(
                                `/search-single-product/${product?.slug}`
                              );
                            }}
                          >
                            <div>
                              <div className="ourErrandosImageContainer">
                                <img
                                  className="ourErrandosImage"
                                  src={
                                    product?.featured_image &&
                                    `${IMAGE_BASE_URL}${product?.featured_image}`
                                  }
                                  alt="searchProducts"
                                  style={{
                                    width: "216px",
                                    height: "180px",
                                    borderRadius: "20px",
                                  }}
                                />
                              </div>
                            </div>
                            <div className="products-text-container">
                              <div className="d-flex align-items-center ourErrandosTextIcon ourErrandosLocationAndText">
                                <img
                                  src={businessNearYouLocationIcon}
                                  alt="Location Icon"
                                />
                                <p className="products-Text">
                                  Buea, South-West
                                </p>
                              </div>

                              <div>
                                <h5 className="card-title products-heading">
                                  {product?.name.length > 10
                                    ? `${product?.name.substring(0, 10)}...`
                                    : product?.name}

                                  {/* {product?.name} */}
                                </h5>
                              </div>

                              <div className="d-flex align-items-center ourErrandosTextIcon mt-1 ourErrandosLocationAndText">
                                <p className="products-Text2">
                                  {product?.unit_price} FCFA
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              {/* <div>
                <button
                  type="button"
                  class="btn btn-primary btn-lg productsFromTheBusiness-productService-Button"
                  onClick={() => {
                    navigate("/search-products");
                  }}
                >
                  View all Products
                </button>
              </div> */}
            </div>
          </>
        )}
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

export default ProductsFromTheBusiness;
