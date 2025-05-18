import React from "react";
import Header from "../../components/header/Header";
import NavbarWithSearch from "../../components/navbarWithSearch/NavbarWithSearch";
import { ToastContainer } from "react-toastify";

const HeaderComponent = ({ children }) => {
  return (
    <div>
      <Header />
      <NavbarWithSearch />
      {children}
      <ToastContainer />
    </div>
  );
};

export default HeaderComponent;
