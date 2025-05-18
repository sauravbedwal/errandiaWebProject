import React, { useState, useEffect } from "react";
import addNoBusiness from "../../assets/addNoBusiness.svg";
import "../../App.css";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import businessNearYouLocationIcon from "../../assets/businessNearYouLocationIcon.svg";
import { useNavigate } from "react-router-dom";
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
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import {
  createFallbackImage,
  getInitials,
  notifyError,
  token,
} from "../../utils/utils";
import { addBusiness } from "../../utils/businessDataSlice";
import Loader from "../loader/Loader";
import { setIsPending } from "../../utils/searchProductSlice";
import UserProfileNoBusinessFound from "../userProfileNoBusinessFound/UserProfileNoBusinessFound";
import ErrandiaBooster from "../errandiaBooster/ErrandiaBooster";
import {
  modalErrandiaBoosterToggle,
  setErrandiaBoosterModalTrue,
} from "../../utils/errandiaBoosterSlice";

const UserProfileBusinessFound = ({
  detailSelected,
  setDetailSelected,
  setErrandDetailsId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [singleBusiness, setSingleBusiness] = useState(null);
  const [plans, setPlans] = useState(null);
  const [shopId, setShopId] = useState(null);
  // console.log("shopId", shopId);
  const [paymentId, setPaymentId] = useState(null); // Add paymentId state
  const [paymentStatus, setPaymentStatus] = useState("PENDING"); // Add paymentStatus state

  // console.log("paymentStatus", paymentStatus);

  const [isModalLoader, setIsModalLoader] = useState(false);
  const [checkStatus, setCheckStatus] = useState(false);

  const [businessName, setBusinessName] = useState(null);

  const businessCollection = useSelector((store) => store?.businessData);
  console.log("businessCollection", businessCollection);

  // Fetch business data
  useEffect(() => {
    if (!businessCollection) {
      const businessHandler = async () => {
        try {
          // setLoader(true);
          dispatch(setIsPending(true));
          const res = await getApi(apis.business, token());
          setLoader(false);
          dispatch(setIsPending(false));
          dispatch(addBusiness(res?.data?.data?.items));
        } catch (err) {
          // setLoader(false);
          dispatch(setIsPending(false));
          // console.log(err);
          if (err.response && err.response.status === 404) {
            notifyError("Oops! The request was not found.");
          }
        }
      };
      businessHandler();
    }
  }, []);

  // Fetch booster plans
  useEffect(() => {
    const fetchAllBoosterPlans = async () => {
      try {
        const params = new URLSearchParams({
          type: "boosting",
        });
        // dispatch(setIsPending(true));
        setIsModalLoader(true);
        const res = await getApi(apis.getAllPlans + `?${params}`);
        // dispatch(setIsPending(false));
        setIsModalLoader(false);
        setPlans(res.data.data.items);
      } catch (err) {
        // dispatch(setIsPending(false));
        setIsModalLoader(false);
        // console.log(err);
        notifyError("Oops! The request was not found.");
      }
    };
    if (isOpen) {
      fetchAllBoosterPlans();
    }
  }, [isOpen]);

  // Polling logic for payment status
  useEffect(() => {
    if (!paymentId || paymentStatus !== "PENDING") {
      return;
    }

    const interval = setInterval(async () => {
      try {
        setCheckStatus(true);
        const resStatus = await getApi(
          apis.subscriptionStatus + `/${paymentId}/check-status`,
          token()
        );

        const status = resStatus?.data?.data?.item?.status?.trim();

        if (status === "FAILED" || status === "SUCCESS") {
          setCheckStatus(false);
          clearInterval(interval);
          setPaymentStatus(status);

          if (status === "FAILED") {
            setCheckStatus(false);
            // notifyError("Payment Unsuccessful. Please try again.");
          } else {
            setCheckStatus(false);
            notifySuccess("Payment Successful!");
          }
        }
      } catch (err) {
        // console.log("Error checking payment status:", err);
        clearInterval(interval);
        // notifyError(
        //   "Payment Unsuccessful. An error occurred while processing your payment."
        // );
      }
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [paymentId, paymentStatus]);

  const isPendingFromStore = useSelector(
    (store) => store?.searchProduct?.isPending
  );
  return (
    <>
      {isPendingFromStore ? (
        <Loader />
      ) : !businessCollection || businessCollection.length === 0 ? (
        <UserProfileNoBusinessFound />
      ) : (
        <>
          {" "}
          <div className="container">
            <>
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 productsFromTheBusiness-productServiceButtons">
                  <h6 className="productsFromTheBusiness-section-heading">
                    {businessCollection && businessCollection.length} Businesses
                  </h6>

                  <button
                    type="button"
                    class="btn btn-primary btn-lg businessUserView-location-whiteButton"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      dispatch(modalAddBusinessToggle());
                      dispatch(setAddBusinessModalTrue());
                    }}
                  >
                    <img
                      src={addNoBusiness}
                      alt="addNoBusiness"
                      className="img-fluid"
                    />
                    Add Business
                  </button>
                </div>
              </div>

              <div className="row   errandos-mobile-tab">
                {businessCollection &&
                  businessCollection.map((business) => {
                    const initials = getInitials(business?.name);
                    const fallbackImage = createFallbackImage(initials);
                    return (
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                        <div className="card userProfileBusinessFound-container mt-4 mb-4">
                          <div className="card-body">
                            <div
                              onClick={() => {
                                navigate(
                                  `/business-profile-user-view/${business?.slug}`
                                );
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="ourErrandosImageContainer">
                                <img
                                  className="ourErrandosImage"
                                  src={
                                    business?.image
                                      ? `${IMAGE_BASE_URL}${business?.image}`
                                      : fallbackImage
                                  }
                                  onError={(e) => {
                                    e.target.src = fallbackImage;
                                    // dispatch(addFallBackImage(fallbackImage));
                                  }}
                                  alt="matrixUserBusiness"
                                />
                              </div>
                            </div>
                            <div
                              className="userProfileBusinessFound-text-container"
                              onClick={() => {
                                navigate(
                                  `/business-profile-user-view/${business?.slug}`
                                );
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              <img src={businessTick} alt="businessTick" />

                              <p className="userProfileBusinessFound-category">
                                {business?.category?.name}
                              </p>
                              <div>
                                <h5 className="card-title userProfileBusinessFound-heading">
                                  {business?.name}
                                </h5>
                              </div>

                              <div className="d-flex align-items-center ourErrandosTextIcon ourErrandosLocationAndText">
                                <img
                                  src={businessNearYouLocationIcon}
                                  alt="Location Icon"
                                />
                                <p className="userProfileBusinessFound-Text">
                                  {business?.town &&
                                    `${business?.town?.name}, `}

                                  {business?.region && business?.region?.name}
                                </p>
                              </div>
                            </div>

                            <div className="productsBusinessUserProfile-buttons-container">
                              <Button
                                variant="primary"
                                className="userProfileBusinessFound-delete"
                                // onClick={() => {
                                //   dispatch(modalErrandiaBoosterToggle());
                                //   dispatch(setErrandiaBoosterModalTrue());
                                //   setIsOpen(true);
                                //   setShopId(business?.id);
                                // }}
                                onClick={() => {
                                  dispatch(modalErrandiaBoosterToggle());
                                  dispatch(setErrandiaBoosterModalTrue());
                                  setIsOpen(true);
                                  setShopId(business?.id);
                                  setBusinessName(business?.name);
                                }}
                              >
                                <img src={boost} alt="boost" />
                                Boost
                              </Button>

                              <div className="allPublicOffices-dropDownContainer">
                                <Dropdown drop="down">
                                  <Dropdown.Toggle
                                    variant="success"
                                    id="dropdown-basic"
                                    className="userProfileBusinessFound-call-button"
                                    bsPrefix="custom-dropdown-toggle"
                                  >
                                    <img
                                      src={threeDotDropDown}
                                      alt="threeDotDropDown"
                                    />
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu className="userProfileBusinessFound-dropDown-container">
                                    <Dropdown.Item
                                      className="userProfileBusinessFound-dropDown"
                                      onClick={() => {
                                        // console.log("1");
                                        dispatch(
                                          modalAddBusinessBranchToggle()
                                        );
                                        dispatch(
                                          setAddBusinessBranchModalTrue()
                                        );
                                      }}
                                    >
                                      <img
                                        src={addBusinessDropDown}
                                        alt="addBusinessDropDown"
                                      />
                                      Add Business Branch{" "}
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      className="userProfileBusinessFound-dropDown"
                                      onClick={() => {
                                        // console.log("1");
                                        dispatch(modalVerifyBusinessToggle());
                                        dispatch(setVerifyBusinessModalTrue());
                                      }}
                                    >
                                      <img
                                        src={verifyBusiness}
                                        alt="verifyBusiness"
                                      />
                                      Verify Business{" "}
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      className="userProfileBusinessFound-dropDown"
                                      onClick={() => {
                                        setDetailSelected("EditBusinessForm");
                                        setErrandDetailsId(business);
                                      }}
                                    >
                                      <img
                                        src={editBusiness}
                                        alt="editBusiness"
                                      />
                                      Edit Business{" "}
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      className="userProfileBusinessFound-dropDown"
                                      style={{ color: "red" }}
                                      onClick={() => {
                                        // console.log("first");
                                        dispatch(modalDeleteToggle());
                                        dispatch(setDeleteModalTrue());
                                        setSingleBusiness(business);
                                      }}
                                    >
                                      <img
                                        src={deleteBusiness}
                                        alt="deleteBusiness"
                                      />
                                      Delete Business{" "}
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </>
          </div>
          {/* Modals */}
          <DeleteBusinessModal singleBusiness={singleBusiness} />
          <AddBusinessFormModal />
          <AddBusinessBranchModal />
          <VerifyBusinessLocation />
          {/* ErrandiaBooster Modal */}
          {isOpen && (
            <ErrandiaBooster
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              plans={plans}
              setPlans={setPlans}
              shopId={shopId}
              paymentId={paymentId} // Pass paymentId as prop
              setPaymentId={setPaymentId} // Pass setPaymentId as prop
              paymentStatus={paymentStatus} // Pass paymentStatus as prop
              setPaymentStatus={setPaymentStatus} // Pass setPaymentStatus as prop
              isModalLoader={isModalLoader}
              setIsModalLoader={setIsModalLoader}
              checkStatus={checkStatus}
              setCheckStatus={setCheckStatus}
              setBusinessName={setBusinessName}
              businessName={businessName}
            />
          )}
        </>
      )}
    </>
  );
};

export default UserProfileBusinessFound;
