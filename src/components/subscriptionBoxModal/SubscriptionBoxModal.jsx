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
import Form from "react-bootstrap/Form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  modalSubscriptionToggle,
  setSubscriptionModalFalse,
} from "../../utils/subscriptionSlice";
import { getApi, postApi } from "../../fetchApi/FetchAxiosApi";
import apis from "../../Constant";
import { setIsPending } from "../../utils/searchProductSlice";
import Loader from "../loader/Loader";
import { notifyError, notifySuccess, token } from "../../utils/utils";
import parse from "html-react-parser";

const SubscriptionBoxModal = () => {
  const { t, i18n } = useTranslation();
  const subscription = useSelector((store) => store?.subscription?.value);

  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [plans, setPlans] = useState(null);
  const [makePlan, setMakePlan] = useState({
    name: null,
    unit_price: null,
    currency: null,
  });

  const [subscribe, setSubscribe] = useState({
    plan_id: null,
    phone_number: null,
  });
  const [isPaymentFailed, setIsPaymentFailed] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentId, setPaymentId] = useState(null);

  console.log("checking subscribe", makePlan, subscribe);
  const steps = ["Select Plan", "Confirm Payment"];

  const [isModalLoader, setIsModalLoader] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setMakePlan((prev) => {
      return {
        ...prev,
        name: null,
        unit_price: null,
        currency: null,
      };
    });
    setSubscribe({
      plan_id: null,
      phone_number: null,
    });
    setIsPaymentFailed(false);
  };

  const handleReset = () => {
    setActiveStep(0);
    setLoading(true);
    setMessage("");
    setIsPaymentFailed(false);
    setMakePlan((prev) => {
      return {
        ...prev,
        name: null,
        unit_price: null,
        currency: null,
      };
    });
    setSubscribe({
      plan_id: null,
      phone_number: null,
    });
    dispatch(modalSubscriptionToggle());
    dispatch(setSubscriptionModalFalse());
  };

  // useEffect(() => {
  //   if (activeStep === steps.length && !loading) {
  //     const timer = setTimeout(() => {
  //       handleReset();
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [activeStep, loading]);

  const inputStyle = {
    width: "100%",
    height: "35px",
    borderRadius: "10px",
    border: "1px solid #eceff2",
    outline: "none",
  };

  const fetchAllPlans = async () => {
    try {
      const params = new URLSearchParams({
        type: "package",
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
      console.log(err);
      notifyError("Oops! The request was not found.");
    }
  };

  const purchasePlan = async () => {
    if (!subscribe?.phone_number) {
      notifyError("Phone Number is required for subscription!");
      return;
    }

    setIsPaymentFailed(false);
    setLoading(true);
    handleNext();

    try {
      // dispatch(setIsPending(true));
      setIsModalLoader(true);
      const res = await postApi(apis.subscribePlan, subscribe, token());

      if (res.data.message === "Payment request done") {
        setPaymentId(res.data.data.id); // Store the Payment ID
        setPaymentStatus("PENDING"); // Start polling
      }
    } catch (err) {
      console.log(err);
      if (
        err.response?.data?.message ===
        "You are already under a subscription plan"
      ) {
        notifyError("You are already under a subscription plan");

        // Reset and close modal immediately
        setActiveStep(0);
        setLoading(false);
        setMakePlan({ name: null, unit_price: null, currency: null });
        setSubscribe({ plan_id: null, phone_number: null });
        dispatch(modalSubscriptionToggle());
        dispatch(setSubscriptionModalFalse());

        return; // Exit early, so no further screens open
      }

      // Default error handling
      notifyError("Oops! The request was not found.");
      // dispatch(setIsPending(false));
      setIsModalLoader(false);
      setMessage(
        t(
          "Payment Unsuccessful. An error occurred while processing your payment. You can try again."
        )
      );
      setLoading(false);
      setIsPaymentFailed(true);
    }
  };

  useEffect(() => {
    if (paymentStatus !== "PENDING" || !paymentId) return; // Only run if status is pending

    const interval = setInterval(async () => {
      try {
        const resStatus = await getApi(
          apis.subscriptionStatus + `/${paymentId}/check-status`,
          token()
        );

        const status = resStatus?.data?.data?.item?.status?.trim(); // Trim to avoid space issues
        console.log("Polling status:", status);

        if (status === "FAILED" || status === "SUCCESS") {
          clearInterval(interval);
          // dispatch(setIsPending(false));
          setIsModalLoader(false);
          setLoading(false);
          setPaymentStatus(status);

          if (status === "FAILED") {
            setIsPaymentFailed(true);
            setMessage(t("Payment Unsuccessful. Please try again."));
          } else {
            setIsPaymentFailed(false);
            setMessage(
              t("You can now access unlimited errands with your current plan")
            );
          }
        } else {
          // dispatch(setIsPending(true)); // Keep loader active while status is PENDING
          setIsModalLoader(true);
        }
      } catch (err) {
        console.log("Error checking payment status:", err);
        clearInterval(interval);
        setIsPaymentFailed(true);
        setMessage(
          t(
            "Payment Unsuccessful. An error occurred while processing your payment. You can try again."
          )
        );
        setLoading(false);
      }
    }, 10000); // Poll every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [paymentStatus, paymentId]);

  useEffect(() => {
    if (subscription === true) {
      fetchAllPlans();
    }
  }, [subscription]);

  // const isPendingFromStore = useSelector(
  //   (store) => store?.searchProduct?.isPending
  // );

  return (
    <>
      <Modal
        size="lg"
        show={subscription}
        aria-labelledby="example-modal-sizes-title-lg"
        className="featuredBusinessProfileShare-modal-Container subscription-modal"
      >
        <Modal.Header
          closeButton
          className="featureBusinessProfileShare-modal-header"
          onClick={() => {
            dispatch(modalSubscriptionToggle());
            dispatch(setSubscriptionModalFalse());
            setActiveStep(0);
            setMakePlan((prev) => {
              return {
                ...prev,
                name: null,
                unit_price: null,
                currency: null,
              };
            });
            setSubscribe({
              plan_id: null,
              phone_number: null,
            });
          }}
        >
          <Modal.Title
            id="example-modal-sizes-title-lg"
            className="featureBusinessProfileShare-heading"
          >
            {t("Subscription")}
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
              {activeStep === steps.length ? (
                <>
                  {loading ? (
                    <>
                      <div className="mt-5 text-center">
                        <Loader />
                        <h2 className="mt-4">{t("Processing Payments")}</h2>
                        <p className="mt-2">
                          A mobile money alert will be sent to you shortly to
                          confirm your <b>{makePlan?.name}</b> subscription of
                          {` ${makePlan?.unit_price} ${makePlan?.currency}`}
                        </p>
                        <p className="mt-4">
                          If you have questions or need support, contact us at{" "}
                          <a href="#">admin@errandia.com</a>
                        </p>
                        {/* <Button
                          variant="contained"
                          className="w-50 header-button-blue mt-4  text-center"
                          onClick={handleClose}
                        >
                          {t("Close")}
                        </Button> */}
                      </div>
                    </>
                  ) : (
                    <>
                      {isPaymentFailed ? (
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
                          <p className="mt-2">{message}</p>
                          <div className="mt-4 d-flex justify-content-center gap-4">
                            <Button
                              onClick={() => {
                                setActiveStep(0);
                                setSubscribe((prev) => {
                                  return {
                                    plan_id: null,
                                    phone_number: null,
                                  };
                                });
                              }}
                              className="w-25 header-button-blue "
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
                      ) : (
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
                          <p className="mt-2">{message}</p>
                          <Button
                            variant="contained"
                            className="w-50 header-button-blue mt-4  text-center"
                            onClick={handleReset}
                          >
                            {t("Okay")}
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                <div className="mt-4">
                  {activeStep === 0 && (
                    <>
                      <div className="text-center">
                        <h2 className=" mt-4">
                          {t("Get a Subscription Plan")}
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
                          plans?.map((plan) => {
                            return (
                              <Card
                                className="card-subscription border rounded-lg"
                                style={{ marginTop: "50px" }}
                              >
                                {plan?.name === "YEARLY" && (
                                  <p className="popular-sec">{t("Popular")}</p>
                                )}
                                <CardContent className="p-5">
                                  <h4 className="text-lg font-bold">
                                    {/* {t("Monthly")} */}
                                    {plan?.name}
                                  </h4>
                                  <h2
                                    className="text-2xl font-bold"
                                    style={{ color: "#1607FA" }}
                                  >
                                    {`${plan?.unit_price}${plan?.currency}`}
                                  </h2>
                                  <p className="">{t("per business")}</p>
                                  <h5 className="text-lg font-semibold mt-3">
                                    {t("Packages")}
                                  </h5>
                                  <div className="d-flex justify-content-center mt-4 gap-2">
                                    <svg
                                      width="25"
                                      height="24"
                                      viewBox="0 0 25 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M9.50039 16.2016L5.30039 12.0016L3.90039 13.4016L9.50039 19.0016L21.5004 7.00156L20.1004 5.60156L9.50039 16.2016Z"
                                        fill="#2718FF"
                                      />
                                    </svg>
                                    <p
                                      style={{
                                        width: "100%",
                                        // textAlign: "left",
                                      }}
                                    >
                                      {parse(plan?.description)}
                                    </p>
                                  </div>
                                  <Button
                                    variant="contained"
                                    className="w-full header-button-blue mt-3"
                                    onClick={() => {
                                      handleNext();
                                      setMakePlan((prev) => {
                                        return {
                                          ...prev,
                                          name: plan?.name,
                                          unit_price: plan?.unit_price,
                                          currency: plan?.currency,
                                        };
                                      });
                                      setSubscribe((prev) => {
                                        return {
                                          ...prev,
                                          plan_id: plan?.id,
                                        };
                                      });
                                    }}
                                  >
                                    {t("Select Plan")}
                                  </Button>
                                </CardContent>
                              </Card>
                            );
                          })
                        )}
                      </div>
                    </>
                  )}
                  {activeStep === 1 && (
                    <div className="text-center">
                      <div className="text-center">
                        <h2 className=" mt-4">{t("Make Payment")}</h2>
                        <p className="mt-2">
                          {t("how will you like to pay for your subscription")}
                        </p>
                      </div>
                      <div className="d-flex justify-content-center">
                        <div className="amount-card">
                          <div className="d-flex" style={{ zIndex: "1" }}>
                            <svg
                              width="51"
                              height="51"
                              viewBox="0 0 51 51"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 6.00001C0 2.6863 2.68629 0 6 0H45C48.3137 0 51 2.68629 51 6V44.2105C51 47.5242 48.3137 50.2105 45 50.2105H6C2.68629 50.2105 0 47.5242 0 44.2105V6.00001Z"
                                fill="white"
                                fill-opacity="0.1"
                              />
                              <path
                                d="M37.5384 7.00249C37.3581 7.01023 37.1761 7.03672 36.9945 7.08217L5.05776 15.1017C3.60375 15.4674 2.71632 16.9478 3.0825 18.4018L7.01309 34.0146C7.19006 34.7158 7.63146 35.3077 8.25621 35.681C8.68563 35.9396 9.16518 36.0705 9.65274 36.0705C9.87357 36.0705 10.0963 36.0424 10.3151 35.9868L22.6229 32.8959C22.145 33.8535 21.8698 34.9292 21.8698 36.0705C21.8698 40.0072 25.0731 43.2105 29.0098 43.2105C32.9486 43.2105 36.1498 40.0072 36.1498 36.0705C36.1498 33.6713 34.9584 31.5504 33.1396 30.2553L34.3041 29.9634C35.4556 32.3644 37.9042 34.0305 40.7398 34.0305C44.6786 34.0305 47.8798 30.8272 47.8798 26.8905C47.8798 23.7763 45.8753 21.1303 43.0906 20.1559L40.2966 9.05444C39.9762 7.7853 38.8004 6.94827 37.5384 7.00249ZM37.5812 8.02049C38.3699 7.98696 39.1063 8.50935 39.3084 9.30545L41.967 19.864C41.5674 19.7945 41.1591 19.7505 40.7398 19.7505C40.5197 19.7505 40.3025 19.7638 40.0874 19.7834L38.3273 12.7918C38.2916 12.6566 38.1547 12.5754 38.0175 12.6075C37.0011 12.8656 35.9412 12.1742 35.6627 11.0675C35.6291 10.9324 35.4896 10.8496 35.3539 10.8833L15.2627 15.9295C15.1255 15.9631 15.0438 16.1021 15.0775 16.2373C15.1111 16.3724 15.2501 16.4552 15.3853 16.4215L35.2404 11.4351C35.6464 12.5831 36.7634 13.3003 37.891 13.1494L39.5784 19.8531C36.4094 20.3746 33.9368 22.9823 33.6337 26.2201L12.0693 31.6349C11.8724 31.0769 11.5064 30.6049 11.0194 30.2892C10.5282 29.9714 9.96996 29.8467 9.41865 29.9206L7.14059 20.8711C8.21057 20.4718 8.85127 19.3115 8.66461 18.1099L10.858 17.5601C10.9932 17.5244 11.0769 17.3875 11.0433 17.2503C11.0076 17.1151 10.8727 17.0314 10.7335 17.065L8.30403 17.6746C8.16683 17.7083 8.08509 17.8472 8.11875 17.9844C8.39721 19.0891 7.79254 20.1982 6.77203 20.4547C6.70624 20.4705 6.65035 20.5116 6.61465 20.5713C6.58099 20.6289 6.56891 20.6987 6.58676 20.7645L8.98137 30.2782C8.99718 30.344 9.03924 30.3999 9.09891 30.4336C9.15654 30.4693 9.22687 30.4793 9.29215 30.4635C9.78175 30.3401 10.2968 30.4303 10.7405 30.7185C11.1898 31.0087 11.5113 31.4653 11.6469 32.0054C11.677 32.1207 11.7802 32.1957 11.8939 32.1957C11.9138 32.1957 11.9358 32.1938 11.9557 32.1877L33.6068 26.753C33.6059 26.7992 33.5998 26.8441 33.5998 26.8905C33.5998 27.6286 33.7126 28.3409 33.9216 29.0112L31.8616 29.5282C30.9874 29.1458 30.0239 28.9305 29.0098 28.9305C26.7416 28.9305 24.7216 29.9966 23.4128 31.6508L10.0671 35.0017C9.62902 35.1129 9.17135 35.043 8.77916 34.8084C8.38748 34.5738 8.11035 34.2046 8.00121 33.7655L4.06863 18.1528C3.95949 17.7136 4.02728 17.257 4.26188 16.8658C4.49648 16.4746 4.86616 16.2 5.30578 16.0889L37.2415 8.0693C37.355 8.041 37.4685 8.02529 37.5812 8.02049ZM14.4569 16.1506C14.4241 16.1454 14.3901 16.1462 14.3553 16.1546L13.9021 16.2682C13.7669 16.3023 13.6831 16.4407 13.7168 16.5779C13.7469 16.6932 13.8501 16.7682 13.9648 16.7682C13.9847 16.7682 14.0047 16.7663 14.0266 16.7622L14.4798 16.6467C14.615 16.613 14.6987 16.474 14.6651 16.3389C14.6383 16.2375 14.5553 16.1661 14.4569 16.1506ZM23.7096 17.2055C23.4052 17.2187 23.098 17.262 22.7912 17.339C21.6039 17.6378 20.6016 18.3816 19.9723 19.4337C19.3429 20.4859 19.1614 21.7208 19.4603 22.9081C19.9846 24.9879 21.8591 26.3805 23.9108 26.3805C24.2816 26.3805 24.6551 26.3344 25.0294 26.241C27.4836 25.6234 28.978 23.1255 28.3604 20.6709C27.82 18.5249 25.8403 17.1126 23.7096 17.2055ZM23.9098 17.7095C25.7346 17.7095 27.4022 18.9466 27.8663 20.7954C28.414 22.9751 27.0872 25.1972 24.9039 25.745C22.7247 26.2953 20.5031 24.9654 19.9553 22.7836C19.6886 21.7279 19.8506 20.63 20.4105 19.6957C20.9705 18.7593 21.861 18.0982 22.9167 17.833C23.2492 17.7494 23.5819 17.7095 23.9098 17.7095ZM31.7381 17.7125C31.6196 17.7178 31.5001 17.7351 31.3805 17.7653C30.4263 18.006 29.8444 18.9756 30.0836 19.9298C30.2891 20.7387 31.0152 21.2805 31.8138 21.2805C31.9576 21.2805 32.1058 21.2624 32.2511 21.2267C32.7132 21.1094 33.102 20.8214 33.3468 20.4129C33.5921 20.0023 33.6618 19.5223 33.546 19.0602C33.3367 18.2253 32.5677 17.6753 31.7381 17.7125ZM31.8138 18.2215C32.3835 18.2215 32.9056 18.6079 33.051 19.1857C33.1326 19.5162 33.083 19.8582 32.9075 20.1489C32.7341 20.4417 32.4551 20.649 32.1246 20.7306C31.7962 20.8143 31.4541 20.7646 31.1614 20.5892C30.8686 20.4138 30.6613 20.1368 30.5797 19.8063C30.4083 19.1249 30.8227 18.4317 31.504 18.2603C31.6076 18.2328 31.7123 18.221 31.8138 18.2215ZM40.7398 20.7705C44.1145 20.7705 46.8598 23.5158 46.8598 26.8905C46.8598 30.2652 44.1145 33.0105 40.7398 33.0105C37.3652 33.0105 34.6198 30.2652 34.6198 26.8905C34.6198 23.5158 37.3652 20.7705 40.7398 20.7705ZM15.4181 21.7925C15.2996 21.7978 15.1801 21.8151 15.0605 21.8453C14.1063 22.086 13.5244 23.0556 13.7636 24.0098C13.9691 24.8187 14.6952 25.3605 15.4938 25.3605C15.6371 25.3605 15.7848 25.3424 15.9301 25.3067C16.8843 25.066 17.4663 24.0944 17.225 23.1402C17.0162 22.3053 16.2477 21.7553 15.4181 21.7925ZM40.7398 22.3005C38.2097 22.3005 36.1498 24.3583 36.1498 26.8905C36.1498 29.4206 38.2097 31.4805 40.7398 31.4805C43.272 31.4805 45.3298 29.4206 45.3298 26.8905C45.3298 24.3583 43.272 22.3005 40.7398 22.3005ZM15.4938 22.3015C16.0635 22.3015 16.5856 22.6869 16.731 23.2647C16.9023 23.9461 16.486 24.6393 15.8046 24.8106C15.4762 24.8943 15.1321 24.8426 14.8414 24.6692C14.5486 24.4938 14.3413 24.2168 14.2597 23.8863C14.0883 23.2049 14.5027 22.5117 15.184 22.3403C15.2876 22.3128 15.3923 22.3015 15.4938 22.3015ZM40.7398 22.8105C42.9889 22.8105 44.8198 24.6414 44.8198 26.8905C44.8198 29.1396 42.9889 30.9705 40.7398 30.9705C38.4907 30.9705 36.6598 29.1396 36.6598 26.8905C36.6598 24.6414 38.4907 22.8105 40.7398 22.8105ZM29.0098 29.9505C32.3845 29.9505 35.1298 32.6958 35.1298 36.0705C35.1298 39.4452 32.3845 42.1905 29.0098 42.1905C25.6352 42.1905 22.8898 39.4452 22.8898 36.0705C22.8898 32.6958 25.6352 29.9505 29.0098 29.9505ZM29.0098 31.4805C26.4797 31.4805 24.4198 33.5383 24.4198 36.0705C24.4198 38.6006 26.4797 40.6605 29.0098 40.6605C31.542 40.6605 33.5998 38.6006 33.5998 36.0705C33.5998 33.5383 31.542 31.4805 29.0098 31.4805ZM29.0098 31.9905C31.2589 31.9905 33.0898 33.8214 33.0898 36.0705C33.0898 38.3196 31.2589 40.1505 29.0098 40.1505C26.7607 40.1505 24.9298 38.3196 24.9298 36.0705C24.9298 33.8214 26.7607 31.9905 29.0098 31.9905Z"
                                fill="#CED4FF"
                              />
                            </svg>
                            <div className="ms-2 text-left">
                              <p>{t("Subscribe to:")}</p>
                              <h5>
                                {`${makePlan?.name} `}
                                {t("Plan")}
                              </h5>
                            </div>
                          </div>
                          <div style={{ zIndex: "1" }} className="text-end">
                            <h5>{`${makePlan?.unit_price}${makePlan?.currency}`}</h5>
                            <p> per business</p>
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
                                setSubscribe((prev) => {
                                  return {
                                    ...prev,
                                    phone_number: `+${e}`,
                                  };
                                });
                              }}
                            />
                          </Form.Group>
                        </div>
                      </div>
                      <div className="mt-4 d-flex justify-content-center gap-4">
                        <Button
                          onClick={handleBack}
                          className="w-full btn-back"
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
                              fill="#1006AC"
                            />
                          </svg>
                          {t("Go Back")}
                        </Button>
                        <Button
                          variant="contained"
                          className="w-full header-button-blue"
                          onClick={purchasePlan}
                        >
                          {t("Pay and Subscribe")}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SubscriptionBoxModal;
