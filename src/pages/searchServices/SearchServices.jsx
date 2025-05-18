import React from "react";
import FiltersAndSearch from "../../components/filtersAndSearch/FiltersAndSearch";
import ServicesCard from "../../components/servicesCard/ServicesCard";

const SearchServices = () => {
  return (
    <div className="container productServices-container">
      <div className="row">
        <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12 col-12">
          <ServicesCard />
        </div>
        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-12">
          <FiltersAndSearch />
        </div>
      </div>
    </div>
  );
};

export default SearchServices;
