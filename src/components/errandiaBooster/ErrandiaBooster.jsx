import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import whatsapp from "../../assets/images/whatsapp.png";
import Form from "react-bootstrap/Form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Linkedin from "../../assets/Linkedin.svg";
import Facebook from "../../assets/Facebook.svg";
import x from "../../assets/x.svg";
import email from "../../assets/email.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  modalErrandiaBoosterToggle,
  setErrandiaBoosterModalFalse,
} from "../../utils/errandiaBoosterSlice";
import Loader from "../loader/Loader";
import { setIsPending } from "../../utils/searchProductSlice";
import { getApi, postApi } from "../../fetchApi/FetchAxiosApi";
import apis from "../../Constant";
import { notifyError, token } from "../../utils/utils";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";

const ErrandiaBooster = ({
  setIsOpen,
  isOpen,
  plans,
  setPlans,
  shopId,
  paymentId, // Receive paymentId as prop
  setPaymentId, // Receive setPaymentId as prop
  paymentStatus, // Receive paymentStatus as prop
  setPaymentStatus, // Receive setPaymentStatus as prop
  isModalLoader,
  setIsModalLoader,
  checkStatus,
  setCheckStatus,
  setBusinessName,
  businessName,
}) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [makePlan, setMakePlan] = useState({
    name: null,
    unit_price: null,
    currency: null,
    period: null,
  });

  const [subscribe, setSubscribe] = useState({
    plan_id: null,
    shop_id: shopId,
    phone_number: null,
  });

  console.log("asasa", makePlan, subscribe);

  const [isPaymentFailed, setIsPaymentFailed] = useState(false);

  const steps = ["Select Plan", "Confirm Payment"];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setMakePlan({
      name: null,
      unit_price: null,
      currency: null,
      period: null,
    });
    setSubscribe({
      plan_id: null,
      shop_id: shopId,
      phone_number: null,
    });
    setIsPaymentFailed(false);
  };

  const handleReset = () => {
    setActiveStep(0);
    setLoading(false);
    setMessage("");
    setIsPaymentFailed(false);
    setMakePlan({
      name: null,
      unit_price: null,
      currency: null,
      period: null,
    });
    setSubscribe({
      plan_id: null,
      shop_id: null,
      phone_number: null,
    });
    dispatch(modalErrandiaBoosterToggle());
    dispatch(setErrandiaBoosterModalFalse());
    setIsOpen(false);
    setPaymentStatus("PENDING");
    setCheckStatus(false);
    setBusinessName(null);
  };

  const inputStyle = {
    width: "100%",
    height: "35px",
    borderRadius: "10px",
    border: "1px solid #eceff2",
    outline: "none",
  };

  const purchasePlan = async () => {
    if (!subscribe?.phone_number) {
      notifyError("Phone Number is required for subscription!");
      return;
    }

    setIsPaymentFailed(false);
    setLoading(true);
    handleNext();
    // setActiveStep(2);

    try {
      setCheckStatus(true);
      setPaymentStatus("PENDING");
      const res = await postApi(apis.subscribePlan, subscribe, token());
      console.log("purchase button == only api call", res);
      if (res.data.message === "Payment request done") {
        setPaymentId(res.data.data.id); // Set paymentId in parent component
        // Set paymentStatus in parent component
      }
    } catch (err) {
      console.log(err);
      if (
        err.response?.data?.message ===
        "You are already under a subscription plan"
      ) {
        notifyError(t("You are already under a subscription plan"));
        handleReset();
        return;
      }

      notifyError("Oops! The request was not found.");
      setMessage(
        t(
          "Payment Unsuccessful. An error occurred while processing your payment."
        )
      );
      setLoading(false);
      setIsPaymentFailed(true);
    }
  };

  const isPendingFromStore = useSelector(
    (store) => store?.searchProduct?.isPending
  );

  console.log("booster loader", checkStatus, paymentStatus);
  return (
    <>
      <Modal
        size="lg"
        show={isOpen}
        aria-labelledby="example-modal-sizes-title-lg"
        className="featuredBusinessProfileShare-modal-Container errandiaBooster-modal"
      >
        <Modal.Header
          closeButton
          className="featureBusinessProfileShare-modal-header errandiaBooster-modal-header"
          onClick={handleReset}
        >
          <Modal.Title
            id="example-modal-sizes-title-lg"
            className="featureBusinessProfileShare-heading"
          >
            {t("Errandia Booster")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container p-3">
            <div className="text-center">
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                  <Step key={index}>
                    <StepLabel></StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div className="mt-4">
                {activeStep === 0 && (
                  <>
                    <div className="text-center">
                      <h2 className="mt-4">
                        {t("Buy a Booster for")} <b>{businessName}</b>
                      </h2>
                      <p className="mt-2">
                        {t(
                          "Get a plan now and enjoy premium features on Errandia"
                        )}
                      </p>
                    </div>
                    <div className="d-flex gap-4 justify-content-center flex-wrap mt-5">
                      {isModalLoader ? (
                        <Loader />
                      ) : (
                        plans?.map((plan) => (
                          <Card
                            className="card-subscription border rounded-lg"
                            key={plan.id}
                          >
                            <p className="popular-sec-errandiaBooster">
                              {t("Popular")}
                            </p>
                            <CardContent className="p-4">
                              <h4 className="text-lg font-bold">
                                {plan?.name}
                              </h4>
                              <h2 className="text-2xl font-bold">{`${plan?.unit_price}${plan?.currency}`}</h2>
                              <p className="">{t("per month")}</p>
                              <p className="time-errandiaBooster">
                                {t("Free for")} {plan?.duration_time} month
                              </p>
                              <div className="d-flex justify-content-center mt-4">
                                <svg
                                  width="25"
                                  height="24"
                                  viewBox="0 0 25 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M9.50039 16.2016L5.30039 12.0016L3.90039 13.4016L9.50039 19.0016L21.5004 7.00156L20.1004 5.60156L9.50039 16.2016Z"
                                    fill="#2718FF"
                                  />
                                </svg>
                                <p>{parse(plan?.description)}</p>
                              </div>

                              <Button
                                variant="contained"
                                className="w-full mt-3"
                                style={{ backgroundColor: "#171A1F" }}
                                onClick={() => {
                                  handleNext();
                                  setMakePlan({
                                    name: plan?.name,
                                    unit_price: plan?.unit_price,
                                    currency: plan?.currency,
                                    period: plan?.period,
                                  });
                                  setSubscribe((prev) => ({
                                    ...prev,
                                    plan_id: plan?.id,
                                  }));
                                }}
                              >
                                {t("Subscribe now")}
                              </Button>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  </>
                )}
                {activeStep === 1 && (
                  <div className="text-center">
                    <div className="text-center">
                      <h2 className="mt-4">{t("Make Payment")}</h2>
                      <p className="mt-2">
                        {t("how will you like to pay for your subscription")}
                      </p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <div className="amount-card-errandia">
                        <div className="d-flex" style={{ zIndex: "1" }}>
                          <div className="ms-2" style={{ textAlign: "left" }}>
                            <p className="text-left">{t("Subscribe to:")}</p>
                            <h5>{makePlan?.name}</h5>
                          </div>
                        </div>
                        <div style={{ zIndex: "1" }} className="text-end">
                          <h5>{`${makePlan?.unit_price}${makePlan?.currency}`}</h5>
                          <p>
                            {t("per")} {makePlan?.period}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <div className="phone-input-sub">
                        <Form.Group className="" controlId="formBasicEmail">
                          <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                            {t("Phone Number")} *
                          </Form.Label>
                          <PhoneInput
                            country="cm"
                            inputStyle={inputStyle}
                            onlyCountries={["cm"]}
                            value={subscribe?.phone_number}
                            onChange={(e) => {
                              setSubscribe((prev) => ({
                                ...prev,
                                phone_number: `+${e}`,
                              }));
                            }}
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="mt-4 d-flex justify-content-center gap-4">
                      <Button
                        onClick={handleBack}
                        className="w-full btn-back-erra"
                      >
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 17 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.71602 9.16797L9.44935 12.9013L8.49935 13.8346L3.16602 8.5013L8.49935 3.16797L9.44935 4.1013L5.71602 7.83464H13.8327V9.16797H5.71602Z"
                            fill="#171A1F"
                          />
                        </svg>
                        {t("Go Back")}
                      </Button>
                      <Button
                        variant="contained"
                        className="w-full"
                        style={{ backgroundColor: "#171A1F" }}
                        onClick={purchasePlan}
                      >
                        {t("Pay and Subscribe")}
                      </Button>
                    </div>
                  </div>
                )}
                {activeStep === 2 && (
                  <>
                    {paymentStatus === "PENDING" && checkStatus === true && (
                      <div className="mt-5 text-center">
                        <Loader />
                        <h2 className="mt-4">{t("Processing Payments")}</h2>
                        <p className="mt-2">
                          {t(
                            "A mobile money alert will be sent to you shortly to confirm your"
                          )}
                          <b> {makePlan?.name}</b> {t("subscription of")}{" "}
                          {`${makePlan?.unit_price} ${makePlan?.currency}`}
                        </p>
                        <p className="mt-4">
                          {t(
                            "If you have questions or need support, contact us at"
                          )}{" "}
                          <a href="#">admin@errandia.com</a>
                        </p>
                      </div>
                    )}
                    {paymentStatus === "SUCCESS" && (
                      <div className="success-message">
                        <svg
                          width="209"
                          height="210"
                          viewBox="0 0 209 210"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            y="0.5"
                            width="209"
                            height="209"
                            rx="12"
                            fill="#F1F4FF"
                          />
                          <path
                            d="M162 56.5H48V170.5H162V56.5Z"
                            fill="#A7AFFF"
                          />
                          <path
                            d="M143.136 101.554L130.254 89.1435L166.908 51.3398L179.787 63.75L143.136 101.554Z"
                            fill="#2718FF"
                          />
                          <path
                            d="M162.001 56.5H161.938L88.4551 132.772L101.337 145.183L162.001 82.2165V56.5Z"
                            fill="#020053"
                          />
                          <path
                            d="M75.2044 95.3453L62.8203 108.254L101.34 145.209L113.725 132.3L75.2044 95.3453Z"
                            fill="#020053"
                          />
                        </svg>

                        <h2 className="mt-4">{t("Payment Successful")}</h2>
                        <p className="mt-2">
                          {t(
                            "You can now access unlimited errands with your current plan."
                          )}
                        </p>
                        <Button
                          variant="contained"
                          className="w-50 header-button-blue mt-4 text-center"
                          onClick={handleReset}
                        >
                          {t("Okay")}
                        </Button>
                      </div>
                    )}
                    {paymentStatus === "FAILED" && (
                      <div className="failure-message">
                        <svg
                          width="191"
                          height="191"
                          viewBox="0 0 191 191"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.5"
                            y="0.5"
                            width="190"
                            height="190"
                            rx="12"
                            fill="#F1F4FF"
                          />
                          <path
                            d="M147.773 51.4102H44.1367V155.047H147.773V51.4102Z"
                            fill="#A7AFFF"
                          />
                          <path
                            d="M132 77.5038L133.061 76.4432L132 75.3825L125.057 68.4393L123.996 67.3787L122.936 68.4393L96.4697 94.9052L70.0038 68.4393L68.9432 67.3787L67.8825 68.4393L60.9393 75.3825L59.8787 76.4432L60.9393 77.5038L87.4052 103.97L60.9393 130.436L59.8787 131.496L60.9393 132.557L67.8825 139.5L68.9432 140.561L70.0038 139.5L96.4697 113.034L122.936 139.5L123.996 140.561L125.057 139.5L132 132.557L133.061 131.496L132 130.436L105.534 103.97L132 77.5038Z"
                            fill="#1006AC"
                            stroke="#1006AC"
                            strokeWidth="3"
                          />
                        </svg>

                        <h2 className="mt-4">{t("Payment Unsuccessful")}</h2>
                        <p className="mt-2">
                          {t("Payment Unsuccessful. Please try again.")}
                        </p>
                        <div className="mt-4 d-flex justify-content-center gap-4">
                          <Button
                            onClick={() => {
                              setActiveStep(0);
                              setPaymentStatus("PENDING");
                              setSubscribe((prev) => {
                                return {
                                  plan_id: null,
                                  shop_id: shopId,
                                  phone_number: null,
                                };
                              });
                            }}
                            className="w-25 header-button-blue"
                          >
                            {t("Retry")}
                          </Button>
                          <Button
                            className="w-25 btn-back"
                            onClick={handleReset}
                          >
                            {t("Close")}
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ErrandiaBooster;
