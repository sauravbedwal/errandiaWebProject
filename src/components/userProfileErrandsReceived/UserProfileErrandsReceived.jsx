import React, { useEffect } from "react";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import whatsappIcon from "../../assets/whatsappIcon.svg";
import { useState } from "react";
import { ButtonGroup, ToggleButton, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { modalCallToggle, setCallModalTrue } from "../../utils/callModalSlice";
import addNoBusiness from "../../assets/addNoBusiness.svg";
import errandsReceived from "../../assets/errandsReceived.svg";
import "../../App.css";
import Button from "react-bootstrap/Button";
import deleteErrands from "../../assets/deleteErrands.svg";
import {
  modalReportToggle,
  setReportModalTrue,
} from "../../utils/reportModalSlice";
import productsCall from "../../assets/productsCall.svg";
import {
  modalRunErrandNewToggle,
  setRunErrandNewModalTrue,
} from "../../utils/runErrandNewModalSlice";
import RunErrandNew from "../runErrandNew/RunErrandNew";
import { deleteApi, getApi } from "../../fetchApi/FetchAxiosApi";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { notifyError, notifySuccess, token } from "../../utils/utils";
import {
  addPostedErrands,
  addReceivedErrands,
} from "../../utils/userReceivedErrandsSlice";
import UserProfileNoErrands from "../userProfileNoErrands/UserProfileNoErrands";
import userErrandsFallback from "../../assets/userErrandsFallback.jpeg";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import editErrand from "../../assets/editErrand.svg";
import viewErrand from "../../assets/viewErrand.svg";
import markAsFound from "../../assets/markAsFound.svg";
import viewResults from "../../assets/viewResults.svg";
import DeleteReportMessage from "../deleteReportMessage/DeleteReportMessage";
import {
  modalDeleteToggle,
  setDeleteModalTrue,
} from "../../utils/deleteModalSlice";
import {
  modalErrandsItemFoundToggle,
  setErrandsItemFoundModalTrue,
} from "../../utils/errandsItemFoundModalSlice";
import ErrandsItemFound from "../errandsItemFound/ErrandsItemFound";
import ViewErrand from "../viewErrand/ViewErrand";
import Loader from "../loader/Loader";
import { setIsPending } from "../../utils/searchProductSlice";

const UserProfileErrandsReceived = ({
  detailSelected,
  setDetailSelected,
  setErrandDetailsId,
}) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("received");

  // console.log("selected--UserProfileErrandsReceived", selected);

  const navigate = useNavigate();

  // const notify = (msg) => toast(msg);

  const [loader, setLoader] = useState(false);

  const [errandsId, setErrandsId] = useState(null);

  const receivedErrandsCollection = useSelector(
    (store) => store?.userReceivedErrands?.receivedErrands
  );

  // console.log("receivedErrandsCollection", receivedErrandsCollection);

  // const postedErrandsCollection = useSelector(
  //   (store) => store?.userReceivedErrands?.postedErrands
  // );

  // console.log("postedErrandsCollection", postedErrandsCollection);

  const isPostedErrandsDeleted = useSelector((store) => store?.delete);
  // console.log("isPostedErrandsDeleted", isPostedErrandsDeleted);

  const fetchReceivedErrands = async () => {
    try {
      setLoader(true);
      dispatch(setIsPending(true));
      const res = await getApi(apis.userErrandsReceived, token());
      setLoader(false);
      dispatch(setIsPending(false));
      dispatch(addReceivedErrands(res.data.data.items));
    } catch (err) {
      setLoader(false);
      dispatch(setIsPending(false));
      // console.log(err);
      notify("Oops! The request was not found.");
    }
  };

  const rejectReceivedErrands = async (slug) => {
    try {
      setLoader(true);
      dispatch(setIsPending(true));
      const res = await deleteApi(
        apis.rejectReceivedErrands + `/${slug}`,
        token()
      );
      dispatch(setIsPending(false));
      if (res.status === 200) {
        setLoader(false);
        notifySuccess(res?.data?.message);
        fetchReceivedErrands();
      }
      // console.log("rejectReceivedErrands", res);
    } catch (err) {
      setLoader(false);
      dispatch(setIsPending(false));
      // console.log(err);
      notifyError("Oops! The request was not found.");
    }
  };

  const fetchPostedErrands = async () => {
    try {
      setLoader(true);
      dispatch(setIsPending(true));
      const res = await getApi(apis.userErrandsPosted, token());
      // console.log("fetchPostedErrands", res);
      setLoader(false);
      dispatch(setIsPending(false));
      dispatch(addReceivedErrands(res.data.data.items));
      // dispatch(addPostedErrands(res.data.data.items));
    } catch (err) {
      setLoader(false);
      dispatch(setIsPending(false));
      // console.log(err);
      notify("Oops! The request was not found.");
    }
  };

  useEffect(() => {
    if (selected === "received") {
      fetchReceivedErrands();
    }

    if (selected === "posted") {
      fetchPostedErrands();
    }
  }, [selected, isPostedErrandsDeleted]);

  const serviceFromStore = useSelector(
    (store) => store?.searchProduct?.service
  );

  const { t } = useTranslation();

  const isPendingFromStore = useSelector(
    (store) => store?.searchProduct?.isPending
  );
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="allPublicOffices-dropDown-filter-Container">
              <div className="products-services-dropDownContainer">
                {/* <Container className="products-services-buttons">
                  <ButtonGroup>
                    <ToggleButton
                      type="radio"
                      variant={
                        selected === "received"
                          ? "outline-primary active"
                          : "outline-secondary"
                      }
                      checked={selected === "received"}
                      onClick={() => {
                        setSelected("received");
                        setDetailSelected("Errands");
                      }}
                      className="custom-toggle"
                    >
                      Received
                    </ToggleButton>
                    <ToggleButton
                      type="radio"
                      variant={
                        selected === "posted"
                          ? "outline-primary active"
                          : "outline-secondary"
                      }
                      checked={selected === "posted"}
                      onClick={() => {
                        // console.log("errandsPosted");
                        setSelected("posted");
                        setDetailSelected("ErrandsPosted");
                        //   navigate("/search-services");
                      }}
                      className="custom-toggle"
                    >
                      Posted{" "}
                    </ToggleButton>
                  </ButtonGroup>
                </Container> */}
                <Container className="products-services-buttons">
                  <ButtonGroup>
                    <ToggleButton
                      type="radio"
                      variant={
                        selected === "received"
                          ? "outline-primary active"
                          : "outline-secondary"
                      }
                      checked={selected === "received"}
                      onClick={() => {
                        setSelected("received");
                        // navigate("/search-product-details");
                        // dispatch(service("0"));
                        // dispatch(region(null));
                        // dispatch(town(null));
                        // dispatch(selectedRegion(null));
                        // dispatch(selectedTown(null));
                      }}
                      className="custom-toggle"
                    >
                      Received
                    </ToggleButton>
                    <ToggleButton
                      type="radio"
                      variant={
                        selected === "posted"
                          ? "outline-primary active"
                          : "outline-secondary"
                      }
                      checked={selected === "posted"}
                      onClick={() => {
                        // setDetailSelected("ErrandsPosted");
                        setSelected("posted");
                        // dispatch(service("1"));
                        // dispatch(region(null));
                        // dispatch(town(null));
                        // dispatch(selectedRegion(null));
                        // dispatch(selectedTown(null));
                        // navigate("/search-services");
                      }}
                      className="custom-toggle"
                    >
                      Posted
                    </ToggleButton>
                  </ButtonGroup>
                </Container>
                <div className="userProfileerrandsReceived-sortBy-container">
                  {/* <div className="d-flex align-items-center justify-content-center gap-3"> */}
                  {/* <p className="allPublicOffices-dropDownHeading">Sort By :</p>
                  <Dropdown drop="down">
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="allPublicOffices-dropdown"
                    >
                      Distance (km)
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> */}
                  {/* </div> */}

                  {/* <button
                    type="button"
                    class="btn btn-primary btn-lg businessUserView-location-whiteButton"
                    onClick={() => {
                      dispatch(modalRunErrandNewToggle());
                      dispatch(setRunErrandNewModalTrue());
                    }}
                  >
                    <img
                      src={addNoBusiness}
                      alt="addNoBusiness"
                      className="img-fluid"
                    />
                    Run Errand
                  </button> */}
                </div>
              </div>

              {/* <Button
              variant="primary"
              className="addedErrands-offCanvas-button"
              onClick={() => {
                dispatch(toggle());

                dispatch(setTrue());
              }}
            >
              Filter and Search
            </Button> */}
            </div>
          </div>
        </div>

        <div className="row">
          {isPendingFromStore ? (
            <Loader />
          ) : receivedErrandsCollection &&
            receivedErrandsCollection.length != 0 ? (
            receivedErrandsCollection.map((errands) => {
              return selected === "received" ? (
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="card card-container-userProfileErrandsReceived">
                    {/* <div className="row"> */}
                    {/* <div className="col-xl-8 col-lg-7 col-md-7 col-sm-12 col-12 open-container"> */}
                    <div className="card-body">
                      <div className="d-flex gap-3 businessUserView-image-container">
                        <img
                          className="businessPorfileUserView-pharmaciesImage"
                          src={
                            errands?.images.length != 0
                              ? `${IMAGE_BASE_URL}${errands?.images[0]?.image_path}`
                              : userErrandsFallback
                          }
                          alt="errandsReceived"
                        />

                        <div
                          className="businessUserView-name-report-container"
                          style={{
                            width: "100%",
                          }}
                        >
                          <div>
                            <div className="userProfileErrandsReceived-viewProfile-container">
                              {errands?.title}
                            </div>
                            <p className="userProfileErrandsReceived-viewProfile-para">
                              {errands?.description}
                            </p>

                            <div className="businessUserView--locationTime-container">
                              <div className="userProfileErrandsReceived-buttons">
                                <Button
                                  variant="primary"
                                  className="service-call-button"
                                  onClick={() => {
                                    dispatch(modalCallToggle());
                                    dispatch(setCallModalTrue());
                                  }}
                                >
                                  <img src={productsCall} alt="whatsappIcon" />
                                  Call Now
                                </Button>
                                <Button
                                  variant="primary"
                                  className="products-whatsAppButton-green"
                                  onClick={() => {
                                    dispatch(modalCallToggle());
                                    dispatch(setCallModalTrue());
                                  }}
                                >
                                  <img src={whatsappIcon} alt="whatsappIcon" />
                                  Whatsapp Chat
                                </Button>
                              </div>
                              <div className="userProfileErrandsRecieved-time">
                                {errands?.when}
                              </div>
                            </div>
                          </div>

                          <div className="businessUserView-report-share-container">
                            <div
                              className="userProfileErrandsReceived-report-container"
                              onClick={() => {
                                dispatch(modalReportToggle());
                                dispatch(setReportModalTrue());
                                rejectReceivedErrands(
                                  errands?.errand_received_id
                                );
                              }}
                            >
                              <img src={deleteErrands} alt="deleteErrands" />
                              <p className="userProfileErrandsReceived-reject">
                                Reject
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="businessProducts-buttons-container">
          <Button
            variant="primary"
            className="businessUserView-call-button"
            onClick={() => {
              dispatch(modalCallToggle());
              dispatch(setCallModalTrue());
            }}
          >
            <img
              src={callBusinessUserProfile}
              alt="callBusinessUserProfile"
            />
            Contact Owner{" "}
          </Button>
          <Button
            variant="primary"
            className="businessUserView-whatsAppButton"
          >
            <img src={whatsappIcon} alt="whatsappIcon" />
            Chat
          </Button>
          <button
            type="button"
            class="btn btn-primary btn-lg businessUserView-location-whiteButton"
          >
            Go There
            <img src={pharmaciesFoundLocation} />
          </button>
        </div> */}
                    </div>
                    {/* </div> */}
                    {/* </div> */}
                  </div>
                </div>
              ) : (
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="card card-container-userProfileErrandsPosted">
                    {/* <div className="row"> */}
                    {/* <div className="col-xl-8 col-lg-7 col-md-7 col-sm-12 col-12 open-container"> */}
                    <div className="card-body">
                      <div className="d-flex gap-3 businessUserView-image-container">
                        <img
                          className="businessPorfileUserView-pharmaciesImage"
                          src={
                            errands?.images.length != 0
                              ? `${IMAGE_BASE_URL}${errands?.images[0]?.image_path}`
                              : userErrandsFallback
                          }
                          alt="userProfileErrandsPostedImg"
                        />

                        <div
                          className="businessUserView-name-report-container"
                          style={{
                            width: "100%",
                            // display: "flex",
                            // flexWrap: "nowrap",
                          }}
                        >
                          <div>
                            <p className="userProfileErrandPosted-viewProfile-para">
                              {errands?.when}
                            </p>
                            <div className="userProfileErrandsPosted-viewProfile-container">
                              {errands?.title}
                            </div>
                            <p className="userProfileErrandsPosted-viewProfile-paraSecondary">
                              {errands?.description}
                            </p>
                          </div>

                          <div
                            className="userProfileErrandsPosted-dropDownContainer"
                            // onClick={() => {
                            //   dispatch(modalCallToggle());
                            //   dispatch(setCallModalTrue());
                            // }}
                          >
                            <Dropdown drop="down">
                              <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                                className="userProfileErrandsPosted businessUserView-call-button"
                              >
                                Menu
                              </Dropdown.Toggle>

                              <Dropdown.Menu className="userInfo-dropDown-container">
                                <Dropdown.Item
                                  className="userProfileBusinessFound-dropDown"
                                  onClick={() => {
                                    // setDetailSelected("EditBusinessForm");
                                    // setDetailSelected("EditErrands");
                                    dispatch(modalDeleteToggle());
                                    dispatch(setDeleteModalTrue());
                                    setErrandsId(errands?.id);
                                  }}
                                  // onClick={() => {
                                  //   console.log("1");
                                  //   dispatch(modalVerifyBusinessToggle());
                                  //   dispatch(setVerifyBusinessModalTrue());
                                  // }}
                                >
                                  <img src={editErrand} alt="editErrand" />
                                  Delete
                                </Dropdown.Item>
                                <Dropdown.Item
                                  className="userProfileBusinessFound-dropDown"
                                  onClick={() => {
                                    // console.log("1");
                                    setDetailSelected("viewErrand");
                                    setErrandDetailsId(errands?.id);
                                  }}
                                >
                                  <img src={viewErrand} at="viewErrand" />
                                  View Errand{" "}
                                </Dropdown.Item>
                                <Dropdown.Item
                                  className="userProfileBusinessFound-dropDown"
                                  onClick={() => {
                                    // console.log("1");
                                    dispatch(modalErrandsItemFoundToggle());
                                    dispatch(setErrandsItemFoundModalTrue());
                                    setErrandsId(errands?.id);
                                  }}
                                >
                                  <img
                                    src={markAsFound}
                                    alt="markAsFound"
                                    className="img-fluid"
                                  />
                                  Mark as found{" "}
                                </Dropdown.Item>
                                {/* <Dropdown.Item
                                  className="userProfileBusinessFound-dropDown"
                                  onClick={() => {
                                    // console.log("1");
                                    dispatch(modalVerifyBusinessToggle());
                                    dispatch(setVerifyBusinessModalTrue());
                                  }}
                                >
                                  <img
                                    src={viewResults}
                                    alt="viewResults"
                                    className="img-fluid"
                                  />
                                  View Results
                                </Dropdown.Item> */}
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* </div> */}
                    {/* </div> */}
                  </div>
                </div>
              );
            })
          ) : (
            <UserProfileNoErrands />
          )}
        </div>
      </div>
      <RunErrandNew />
      {/* <ToastContainer /> */}
      <DeleteReportMessage deletePostedErrands={errandsId} />
      <ErrandsItemFound errandsId={errandsId} />
    </>
  );
};

export default UserProfileErrandsReceived;
