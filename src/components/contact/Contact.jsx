import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import { setIsPending } from "../../utils/searchProductSlice";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import apis from "../../Constant";
import { notifyError } from "../../utils/utils";
import Loader from "../loader/Loader";
import { useTranslation } from "react-i18next";
import "../../i18n";

const Contact = () => {
  const [activeTab, setActiveTab] = useState("Announcements");

  const { t, i18n } = useTranslation();

  const [contactData, setContactData] = useState(null);

  const notifications = [
    {
      title: "Hello Errandians!",
      message: "Errandia version 2 is here 😎",
      time: "30 mins",
    },
    {
      title: "Hello Errandians!",
      message: "Errandia version 2 is here 😎",
      time: "1 day",
    },
    {
      title: "Hello Errandians!",
      message: "Errandia version 2 is here 😎",
      time: "2 days",
    },
    {
      title: "Hello Errandians!",
      message: "Errandia version 2 is here 😎",
      time: "1 week",
    },
    {
      title: "Hello Errandians!",
      message: "Errandia version 2 is here 😎",
      time: "2 weeks",
    },
    {
      title: "Hello Errandians!",
      message: "Errandia version 2 is here 😎",
      time: "1 month",
    },
  ];

  const dispatch = useDispatch();

  const fetchContactInfo = async () => {
    try {
      dispatch(setIsPending(true));
      const res = await getApi(apis.contact);
      dispatch(setIsPending(false));
      setContactData(res.data.data.item);
      console.log("fetchContactInfo", res);
    } catch (err) {
      console.log(err);
      dispatch(setIsPending(false));
      notifyError("Oops! The request was not found.");
    }
  };

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const isPendingFromStore = useSelector(
    (store) => store?.searchProduct?.isPending
  );

  return (
    <>
      {isPendingFromStore ? (
        <Loader />
      ) : (
        <div className="container privacy-content mt-5 mb-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6 mb-2">
              <div className="card-left-contact mt-2 mb-2">
                <h4>{t("Contact Info")}</h4>
                <p>{t("You can reach us here for any inquiries")}</p>
                <div className="d-flex gap-2 mt-5 align-items-center card-left-contact-icons">
                  <p
                    className="mb-0"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {/* Render SVG only once, before the first number */}
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ marginRight: "8px" }}
                    >
                      <circle cx="30" cy="30" r="30" fill="white" />
                      <path
                        d="M22.1296 16.0703C21.5687 16.0703 21.0163 16.2712 20.5559 16.6395L20.4889 16.673L20.4555 16.7065L17.1073 20.1551L17.1407 20.1886C16.107 21.1429 15.7889 22.57 16.2367 23.8047C16.2409 23.8131 16.2325 23.8298 16.2367 23.8382C17.1449 26.4372 19.4677 31.4554 24.0046 35.9922C28.5581 40.5458 33.6432 42.7765 36.1586 43.76H36.1921C37.4937 44.1953 38.9041 43.8856 39.9086 43.0234L43.2903 39.6417C44.1776 38.7545 44.1776 37.2143 43.2903 36.327L38.9376 31.9743L38.9041 31.9074C38.0169 31.0201 36.4432 31.0201 35.5559 31.9074L33.4131 34.0502C32.6388 33.6777 30.7931 32.7235 29.0269 31.0368C27.2733 29.3627 26.3776 27.4375 26.047 26.6842L28.1898 24.5413C29.0897 23.6415 29.1064 22.1431 28.1564 21.26L28.1898 21.2266L28.0894 21.1261L23.8037 16.7065L23.7702 16.673L23.7032 16.6395C23.2429 16.2712 22.6904 16.0703 22.1296 16.0703ZM22.1296 18.2132C22.2091 18.2132 22.2886 18.2508 22.3639 18.3136L26.6497 22.6998L26.7501 22.8002C26.7417 22.7919 26.8129 22.9049 26.6831 23.0346L24.0046 25.7132L23.5023 26.1819L23.7367 26.8516C23.7367 26.8516 24.9672 30.1454 27.5537 32.6105L27.7881 32.8114C30.2783 35.084 33.2122 36.327 33.2122 36.327L33.8818 36.6283L37.0626 33.4475C37.2468 33.2634 37.2133 33.2634 37.3974 33.4475L41.7836 37.8337C41.9677 38.0179 41.9677 37.9509 41.7836 38.135L38.5023 41.4163C38.0085 41.839 37.4853 41.9269 36.8617 41.7176C34.4343 40.7634 29.7175 38.6917 25.5113 34.4855C21.2716 30.2458 19.0576 25.4369 18.2456 23.1016C18.0824 22.6663 18.1996 22.0218 18.5805 21.6953L18.6474 21.6283L21.8952 18.3136C21.9705 18.2508 22.0501 18.2132 22.1296 18.2132Z"
                        fill="#379AE6"
                      />
                    </svg>

                    {/* Join all numbers with comma and add functionality */}
                    <span>
                      {contactData?.phone
                        .split(",")
                        .map((number, index, arr) => {
                          const trimmedNumber = number.trim();
                          const isWhatsApp = trimmedNumber
                            .toLowerCase()
                            .includes("whatsapp");
                          const cleanNumber = trimmedNumber.replace(
                            /[^0-9+]/g,
                            ""
                          ); // Extract only numbers

                          return (
                            <span
                              key={index}
                              onClick={() => {
                                if (isWhatsApp) {
                                  const whatsappNumber = cleanNumber.replace(
                                    /^Whatsapp:\s*/,
                                    ""
                                  );
                                  window.open(
                                    `https://wa.me/${whatsappNumber}`,
                                    "_blank"
                                  );
                                } else {
                                  alert(
                                    `Cannot place a call on web. Please use: ${cleanNumber}`
                                  );
                                }
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              {trimmedNumber}
                              {index !== arr.length - 1 ? ", " : ""}
                            </span>
                          );
                        })}
                    </span>
                  </p>
                </div>
                <div className="d-flex gap-2 mt-3 align-items-center card-left-contact-icons">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="30" cy="30" r="30" fill="white" />
                    <path
                      d="M18.5681 18.5703C16.9895 18.5703 15.7109 19.8489 15.7109 21.4275V38.5703C15.7109 40.1489 16.9895 41.4275 18.5681 41.4275H41.4252C43.0038 41.4275 44.2824 40.1489 44.2824 38.5703V21.4275C44.2824 19.8489 43.0038 18.5703 41.4252 18.5703H18.5681ZM18.5681 21.4275H41.4252V22.8588L29.9967 29.9989L18.5681 22.8588V21.4275ZM18.5681 25.716L29.9967 32.856L41.4252 25.716V38.5703H18.5681V25.716Z"
                      fill="#379AE6"
                    />
                  </svg>

                  <p
                    className="mb-0"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      (window.location.href = `mailto:${contactData?.email}`)
                    }
                  >
                    {contactData?.email}
                  </p>
                </div>
                <div className="d-flex gap-2 mt-3 align-items-center card-left-contact-icons">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="30" cy="30" r="30" fill="white" />
                    <path
                      d="M29.9983 15.7109C23.3049 15.7109 17.8555 21.1604 17.8555 27.8538C17.8555 30.8586 18.9578 33.6144 20.7684 35.7333L20.774 35.7388L20.7782 35.7444C20.7782 35.7444 25.9438 41.6388 27.7829 43.3937C29.0144 44.5678 30.9808 44.5678 32.2123 43.3937C34.3086 41.3943 39.2199 35.7416 39.2199 35.7416L39.2227 35.7374L39.2268 35.7333C41.039 33.6144 42.1412 30.8586 42.1412 27.8538C42.1412 21.1604 36.6917 15.7109 29.9983 15.7109ZM29.9983 17.8538C35.5335 17.8538 39.9983 22.3186 39.9983 27.8538C39.9983 30.3361 39.0937 32.5914 37.5974 34.341C37.5876 34.3521 32.5626 40.0992 30.7335 41.8437C30.3093 42.2482 29.6859 42.2482 29.2617 41.8437C27.733 40.385 22.4134 34.3585 22.3979 34.341L22.3965 34.3396C20.9021 32.5901 19.9983 30.3354 19.9983 27.8538C19.9983 22.3186 24.4631 17.8538 29.9983 17.8538ZM29.9983 23.5681C28.659 23.5681 27.5189 24.1089 26.7868 24.9325C26.0548 25.7561 25.7126 26.8121 25.7126 27.8538C25.7126 28.8955 26.0548 29.9515 26.7868 30.7751C27.5189 31.5987 28.659 32.1395 29.9983 32.1395C31.3376 32.1395 32.4777 31.5987 33.2098 30.7751C33.9419 29.9515 34.284 28.8955 34.284 27.8538C34.284 26.8121 33.9419 25.7561 33.2098 24.9325C32.4777 24.1089 31.3376 23.5681 29.9983 23.5681ZM29.9983 25.7109C30.8019 25.7109 31.2689 25.9737 31.6083 26.3555C31.9476 26.7372 32.1412 27.2883 32.1412 27.8538C32.1412 28.4193 31.9476 28.9704 31.6083 29.3521C31.2689 29.7339 30.8019 29.9967 29.9983 29.9967C29.1948 29.9967 28.7277 29.7339 28.3884 29.3521C28.049 28.9704 27.8555 28.4193 27.8555 27.8538C27.8555 27.2883 28.049 26.7372 28.3884 26.3555C28.7277 25.9737 29.1948 25.7109 29.9983 25.7109Z"
                      fill="#379AE6"
                    />
                  </svg>
                  <p
                    className="mb-0"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          contactData?.location
                        )}`,
                        "_blank"
                      )
                    }
                  >
                    {contactData?.location}
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="col-md-6 mb-2">
            <div className="card-right-contact mt-2 mb-2">
              <h4>Would like to leave us a message?</h4>
              <Form className="mt-3">
                <Form.Group
                  className="mb-3 listYourBusinessHomeForm-input-tag-container"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                    Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    className="runErrandPopUpSignUpFormTab-formInput"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 listYourBusinessHomeForm-input-tag-container"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                    Phone
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your phone number"
                    className="runErrandPopUpSignUpFormTab-formInput"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 listYourBusinessHomeForm-input-tag-container"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                    Subject
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the subject of your message"
                    className="runErrandPopUpSignUpFormTab-formInput"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 listYourBusinessHomeForm-input-tag-container"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                    Message
                  </Form.Label>

                  <textarea
                    rows={4}
                    className="form-control"
                    placeholder="Write a message"
                  ></textarea>
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="primary"
                    className="listYourBusinessHomeForm-signIn-blue w-50"
                  >
                    Send
                  </Button>
                </div>
              </Form>
            </div>
          </div> */}
          </div>
        </div>
      )}

      <div className="mt-3">
        <iframe
          width="100%"
          height="400"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=Cameroon&output=embed"
        ></iframe>
      </div>
    </>
  );
};

export default Contact;
