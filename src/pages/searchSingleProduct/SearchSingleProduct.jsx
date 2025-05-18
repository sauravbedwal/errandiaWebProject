import React from "react";
import ProductSuggestion from "../../components/productSuggestion/ProductSuggestion";
import SingleProductDetail from "../../components/singleProductDetail/SingleProductDetail";

const SearchSingleProduct = () => {
  return (
    <div className="container productServices-container">
      <div className="row">
        <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12 col-12">
          <SingleProductDetail />
        </div>
        <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 col-12">
          <ProductSuggestion />
        </div>
      </div>
    </div>
  );
};

export default SearchSingleProduct;
