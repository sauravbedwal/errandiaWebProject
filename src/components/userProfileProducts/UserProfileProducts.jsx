import React, { useEffect } from "react";
import noBusiness from "../../assets/noBusiness.svg";
import addNoBusiness from "../../assets/addNoBusiness.svg";
import "../../App.css";
import Button from "react-bootstrap/Button";
import { setTrue, toggle } from "../../utils/booleanSlice";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import PaginationComponent from "../pagination/PaginationComponent";
import searchProducts from "../../assets/searchProducts.svg";
import productImage from "../../assets/productImage.svg";
import productImage2 from "../../assets/productImage2.svg";
import deleteBusinessProfileUser from "../../assets/deleteBusinessProfileUser.svg";
import productsCall from "../../assets/productsCall.svg";
import businessNearYouLocationIcon from "../../assets/businessNearYouLocationIcon.svg";
import editBusinessUserProfile from "../../assets/editBusinessUserProfile.svg";
import { useState } from "react";
import { ButtonGroup, ToggleButton, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import matrixUserBusiness from "../../assets/matrixUserBusiness.svg";
import businessTick from "../../assets/businessTick.svg";
import boost from "../../assets/boost.svg";
import threeDotDropDown from "../../assets/threeDotDropDown.svg";
import addBusinessDropDown from "../../assets/addBusinessDropDown.svg";
import verifyBusiness from "../../assets/verifyBusiness.svg";
import editBusiness from "../../assets/editBusiness.svg";
import deleteBusiness from "../../assets/deleteBusiness.svg";
import {
  modalDeleteToggle,
  setDeleteModalTrue,
} from "../../utils/deleteModalSlice";
import DeleteBusinessModal from "../deleteBusinessModal/DeleteBusinessModal";
import AddBusinessModal from "../addBusinessFormModal/AddBusinessFormModal";
import {
  modalAddBusinessToggle,
  setAddBusinessModalTrue,
} from "../../utils/addBusinessModalSlice";

import {
  modalAddBusinessBranchToggle,
  setAddBusinessBranchModalTrue,
} from "../../utils/addBusinessBranchModalSlice";

import AddBusinessBranchModal from "../addBusinessBranch/AddBusinessBranchModal";
import AddBusinessFormModal from "../addBusinessFormModal/AddBusinessFormModal";
import VerifyBusinessLocation from "../verifyBusinessLocation/VerifyBusinessLocation";
import {
  modalVerifyBusinessToggle,
  setVerifyBusinessModalTrue,
} from "../../utils/verifyBusinessModalSlice";
import productDetailsImage from "../../assets/productDetailsImage.svg";
import AddProductNoBusinessFound from "../addProductNoBusinessFound/AddProductNoBusinessFound";
import {
  modalBranchAddedToggle,
  setBranchAddedModalTrue,
} from "../../utils/branchAddedModalSlice";
import {
  modalAddProductNoBusinessToggle,
  setAddProductNoBusinessModalTrue,
} from "../../utils/addProductNoBusinessModalSlice";
import {
  setModal,
  modalUserprofileAddProductToggle,
  setUserprofileAddProductModalTrue,
} from "../../utils/userprofileAddProductModalSlice";
import {
  modalUserprofileEditProductToggle,
  setUserprofileEditProductModalTrue,
} from "../../utils/userprofileEditProductModalSlice";
import UserProfileEditProduct from "../userProfileEditProduct/UserProfileEditProduct";
import DeleteReportMessage from "../deleteReportMessage/DeleteReportMessage";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import { token } from "../../utils/utils";
import { addProducts, addServices } from "../../utils/productsDataSlice";
import UserProfileAddProduct from "../userProfileAddProduct/UserProfileAddProduct";
import { deleteDone } from "../../utils/deleteSlice";
import UserProfileNoProductsFound from "../userProfileNoProductsFound/UserProfileNoProductsFound";
import Loader from "../loader/Loader";

const UserProfileProducts = ({ service }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  // console.log(pathname);
  const [loader, setLoader] = useState(false);

  const [deleteSlug, setDeleteSlug] = useState(null);

  const [editSlug, setEditSlug] = useState();

  const [productData, setProductData] = useState(null);

  const navigate = useNavigate();

  const productsCollection = useSelector(
    (store) => store?.productsData?.products
  );
  // console.log("productsCollection", productsCollection);

  const servicesCollection = useSelector(
    (store) => store?.productsData?.services
  );
  // console.log("servicesCollection", servicesCollection);

  // const [items, setItems] = useState(productsCollection);

  const [productAdded, setProductAdded] = useState(null);

  const isProductDeleted = useSelector((store) => store?.delete);
  // console.log("isProductDeleted", isProductDeleted);

  const editImageFromStore = useSelector(
    (store) => store?.userprofileEditProduct?.editImage
  );

  // console.log("editImageFromStore", editImageFromStore);

  const fetchUserProducts = async () => {
    try {
      setLoader(true);
      const res = await getApi(apis.products, token());
      // console.log("products", res);
      // console.log("productsITems", res.data.data.items);
      setLoader(false);
      setProductAdded(false);
      dispatch(deleteDone(false));
      dispatch(addProducts(res.data.data.items));
      // setProductItems(res?.data?.data?.items);
    } catch (err) {
      setLoader(false);
      // console.log(err);
      if (err.response && err.response.status === 404) {
        // console.log("Resource not found!");
        // notify();
      }
    }
  };

  const fetchUserServices = async () => {
    try {
      setLoader(true);
      const res = await getApi(apis.services, token());
      // console.log("services", res);
      // console.log("productsITems", res.data.data.items);
      setLoader(false);
      setProductAdded(false);
      dispatch(deleteDone(false));
      dispatch(addServices(res?.data?.data?.items));
      // setProductItems(res?.data?.data?.items);
    } catch (err) {
      setLoader(false);
      // console.log(err);
      if (err.response && err.response.status === 404) {
        // console.log("Resource not found!");
        // notify();
      }
    }
  };

  useEffect(() => {
    // console.log("productsCollection", productsCollection?.length);
    // if (productsCollection && productsCollection.length > 0) return;
    if (service === "0" && !productsCollection) {
      fetchUserProducts();
    }

    if (service === "1" && !servicesCollection) {
      fetchUserServices();
    }
  }, []);

  return (
    <>
      <div className="container">
        {loader ? (
          <Loader />
        ) : (service === "0" &&
            (!productsCollection || productsCollection?.length === 0)) ||
          (service === "1" &&
            (!servicesCollection || servicesCollection?.length === 0)) ? (
          <UserProfileNoProductsFound service={service} />
        ) : (
          <>
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 productsFromTheBusiness-productServiceButtons">
                <h6 className="productsFromTheBusiness-section-heading">
                  {service === "0"
                    ? productsCollection && productsCollection.length
                    : servicesCollection && servicesCollection.length}{" "}
                  {service === "0" ? "Products" : "Services"}
                </h6>

                <button
                  type="button"
                  class="btn btn-primary btn-lg businessUserView-location-whiteButton"
                  onClick={() => {
                    // dispatch(modalUserprofileAddProductToggle());
                    dispatch(setUserprofileAddProductModalTrue());
                    // dispatch(setModal("Add Products"));
                    // dispatch(modalAddProductNoBusinessToggle());
                    // dispatch(setAddProductNoBusinessModalTrue());
                  }}
                >
                  <img
                    src={addNoBusiness}
                    alt="addNoBusiness"
                    className="img-fluid"
                  />
                  {service === "0" ? "Add Products" : "Add Services"}
                </button>
              </div>
            </div>

            <div className="row   errandos-mobile-tab">
              {((service === "0" && productsCollection) ||
                (service === "1" && servicesCollection)) &&
                (service === "0"
                  ? productsCollection
                  : servicesCollection
                )?.map((product) => {
                  return (
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                      <div className="card productsDetails-Card-container mt-4 mb-4">
                        <div className="card-body">
                          <div
                          // onClick={() => {
                          //   navigate("/search-single-product");
                          // }}
                          >
                            <div className="ourErrandosImageContainer">
                              <img
                                className="ourErrandosImage"
                                // src={
                                //   !editImageFromStore &&
                                //   product &&
                                //   product?.featured_image
                                //     ? `${IMAGE_BASE_URL}${product?.featured_image}`
                                //     : editImageFromStore &&
                                // `${IMAGE_BASE_URL}${
                                //   product?.images[
                                //     product?.images.length - 1
                                //   ]?.url
                                // }`
                                // }
                                src={
                                  product.images.length > 0
                                    ? `${IMAGE_BASE_URL}${
                                        product?.images[
                                          product?.images.length - 1
                                        ]?.url
                                      }`
                                    : `${IMAGE_BASE_URL}${product?.featured_image}`
                                }
                                alt="searchProducts"
                              />

                              {/* <img
                            className="ourErrandosImage"
                            src={
                              product.featured_image
                                ? `${IMAGE_BASE_URL}/${product.featured_image}`
                                : productDetailsImage
                            }
                            alt="searchProducts"
                          /> */}
                            </div>
                          </div>
                          <div
                            className="products-text-container"
                            onClick={() => {
                              navigate(
                                `/search-single-product/${product?.slug}`
                              );
                            }}
                          >
                            <div className="d-flex align-items-center ourErrandosTextIcon ourErrandosLocationAndText">
                              <img
                                src={businessNearYouLocationIcon}
                                alt="Location Icon"
                              />
                              <p className="products-Text">
                                {product?.shop?.town &&
                                  product?.shop?.town?.name}
                                {product?.shop?.town && ", "}
                                {product?.shop?.region &&
                                  product?.shop?.region?.name}
                              </p>
                            </div>

                            <div>
                              <h5 className="card-title products-details-heading">
                                {product?.name}
                              </h5>
                            </div>

                            {/* <div className="d-flex align-items-center ourErrandosTextIcon mt-1 ourErrandosLocationAndText">
                              <p className="products-Text2">
                                {product?.unit_price} FCFA
                              </p>
                            </div> */}
                          </div>
                          {pathname ===
                          "/business-profile-user-view-products" ? (
                            ""
                          ) : (
                            <div className="productsBusinessUserProfile-buttons-container">
                              <Button
                                variant="primary"
                                className="products-call-button"
                                style={{ width: "100%" }}
                                onClick={() => {
                                  dispatch(modalUserprofileEditProductToggle());
                                  dispatch(
                                    setUserprofileEditProductModalTrue()
                                  );
                                  setEditSlug(product?.slug);
                                  setProductData(product);
                                  // dispatch(modalUserprofileAddProductToggle());
                                  // dispatch(setUserprofileAddProductModalTrue());
                                  // dispatch(setModal("Edit"));
                                }}
                              >
                                <img
                                  src={editBusinessUserProfile}
                                  alt="whatsappIcon"
                                />
                                Edit
                              </Button>
                              <Button
                                variant="primary"
                                className="productsBusinessUserProfile-delete"
                                onClick={() => {
                                  dispatch(modalDeleteToggle());
                                  dispatch(setDeleteModalTrue());
                                  setDeleteSlug(product?.slug);
                                }}
                              >
                                <img
                                  src={deleteBusinessProfileUser}
                                  alt="whatsappIcon"
                                />
                                Delete
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <UserProfileAddProduct
              productAdded={productAdded}
              setProductAdded={setProductAdded}
              service={service}
            />
            <UserProfileEditProduct
              editSlug={editSlug}
              productAdded={productAdded}
              setProductAdded={setProductAdded}
              service={service}
              productData={productData}
            />
            <DeleteReportMessage deleteSlug={deleteSlug} service={service} />
          </>
        )}
      </div>
      {/* <AddProductNoBusinessFound /> */}
    </>
  );
};

export default UserProfileProducts;
