import React from "react";
import ListYourBusinessHomeImage from "../../components/listYourBusinessHomeImage/ListYourBusinessHomeImage";
import ListYourBusinessHomeForm from "../../components/listYourBusinessHomeForm/ListYourBusinessHomeForm";

const ListYourBusinessHome = () => {
  return (
    <>
      <div className="container productServices-container">
        <div className="row">
          <div
            className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12"
            // style={{ background: "blue" }}
          >
            <ListYourBusinessHomeImage />
          </div>
          <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-12">
            <ListYourBusinessHomeForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListYourBusinessHome;
