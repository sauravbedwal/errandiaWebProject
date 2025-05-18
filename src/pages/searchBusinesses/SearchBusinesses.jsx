import React from "react";
import FiltersAndSearch from "../../components/filtersAndSearch/FiltersAndSearch";
import BusinessesCard from "../../components/businessesCard/BusinessesCard";

const SearchBusinesses = () => {
  return (
    <div className="container productServices-container">
      <div className="row">
        <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12 col-12">
          <BusinessesCard />
        </div>
        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-12">
          <FiltersAndSearch />
        </div>
      </div>
    </div>
  );
};

export default SearchBusinesses;
