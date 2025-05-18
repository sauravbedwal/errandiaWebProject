import React from "react";
import "../../App.css";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import whatsappIcon from "../../assets/whatsappIcon.svg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import apis, { captchaKey } from "../../Constant";
import Modal from "react-bootstrap/Modal";
import RunErrandPopUpSignUpFormImage from "../../assets/RunErrandPopUpSignUpFormImage.svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import runErrandPopUpSignUpFormBackArrow from "../../assets/runErrandPopUpSignUpFormBackArrow.svg";
import modalCross from "../../assets/modalCross.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setSignUpModalFalse,
  signUpModalToggle,
} from "../../utils/signUpModalSlice";
import Loader from "../loader/Loader";

const RunErrandPopUpSignUpFormSignUpForm = () => {
  const signUpModalBoolean = useSelector((store) => store.signUpModal.value);

  // console.log("signUpModalBoolean", signUpModalBoolean);
  const dispatch = useDispatch();

  const inputStyle = {
    width: "100%",
    height: "35px",
    borderRadius: "10px",
    border: "1px solid #eceff2",
    outline: "none",
  };

  const [activeTab, setActiveTab] = useState("signup");

  const [selected, setSelected] = useState("Email");
  const [loader, setLoader] = useState(false);

  const [showWhatsApp, setShowWhatsApp] = useState(false);

  const handleCaptcha = (e) => {
    setValidationError((prev) => {
      return { ...prev, captcha: false };
    });

    if (e.length > 0) {
      setInput((prev) => {
        return { ...prev, captcha: true };
      });
    }
  };

  const [input, setInput] = useState({
    identifier: "",
    provider: "",
    captcha: false,
  });

  const [error, setError] = useState({
    allError: false,
    error500: false,
  });

  const [validationError, setValidationError] = useState({
    identifier: false,
    captcha: false,
  });

  return (
    <>
      <Modal show={signUpModalBoolean} size="xl">
        <div className="container runErrandPopUp-modal">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 runErrandPopUpSignUpForm-imageContainer mb-3">
              <div className="runErrandPopUpSignUpForm-cross-mobileScreen">
                <h3 className="modal-header-heading">Run an Errand</h3>
                <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 runErrandPopUpSignUpForm-cross">
                  <img
                    src={modalCross}
                    className="img-fluid"
                    onClick={() => {
                      dispatch(signUpModalToggle());
                      dispatch(setSignUpModalFalse());
                    }}
                  />
                </div>
              </div>
              <img
                src={RunErrandPopUpSignUpFormImage}
                alt="RunErrandPopUpSignUpFormImage"
                className="img-fluid runErrandPopUp-modal-image"
              />
            </div>
            <div className="col-xl-7 col-lg-7 col-md-11 col-sm-11 col-11 mb-3">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="runErrandPopUpSignUpFormTab-container">
                  {/* Sign Up Tab */}
                  <div
                    className={`tab ${
                      activeTab === "signup" ? "active" : "inactive"
                    }`}
                    id="signup-tab"
                    onClick={() => setActiveTab("signup")}
                  >
                    Sign Up
                    <div className="runErrandPopUpSignUpFormTabTriangle"></div>
                  </div>

                  {/* Sign In Tab */}
                  <div
                    className={`tab ${
                      activeTab === "signin" ? "active" : "inactive"
                    }`}
                    id="signin-tab"
                    onClick={() => setActiveTab("signin")}
                  >
                    Sign In
                    <div className="runErrandPopUpSignUpFormTabTriangle"></div>
                  </div>
                </div>
              </div>

              <div className="form-background">
                <Modal.Body>
                  <Form>
                    {/* Conditional Rendering for Forms */}
                    {activeTab === "signup" ? (
                      <>
                        <div className="runErrandPopUpSignUpFormTab-signUpForm-heading">
                          Create your account to run an errand
                        </div>

                        <Form.Group className="mb-3">
                          <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                            Full Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            className="runErrandPopUpSignUpFormTab-formInput"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                            Email
                          </Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            className="runErrandPopUpSignUpFormTab-formInput"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                            Phone Number
                          </Form.Label>
                          <PhoneInput country="us" inputStyle={inputStyle} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                            WhatsApp Number
                          </Form.Label>
                          <PhoneInput country="us" inputStyle={inputStyle} />
                        </Form.Group>

                        <Form.Group className="mb-3 mt-2">
                          <Form.Check
                            type="checkbox"
                            className="runErrandPopUpSignUpFormTab-checkbox-line"
                            label={
                              <p>
                                By Signing up you agree to our{" "}
                                <span style={{ color: "#1B81DC" }}>
                                  terms and conditions.
                                </span>
                              </p>
                            }
                          />
                        </Form.Group>

                        <div className="runErrandPopUpSignUpForm-buttons">
                          <div className="d-flex flex-column align-items-center gap-3">
                            <Button
                              variant="primary"
                              className={"runErrandPopUpSignUpForm-goBack"}
                              onClick={() => {
                                dispatch(signUpModalToggle());
                                dispatch(setSignUpModalFalse());
                              }}
                            >
                              <img
                                src={runErrandPopUpSignUpFormBackArrow}
                                alt="runErrandPopUpSignUpFormBackArrow"
                              />
                              Go Back
                            </Button>
                          </div>
                          <div className="d-flex flex-column align-items-center gap-3">
                            <Button
                              variant="primary"
                              className="runErrandPopUpSignUpForm-signIn-blue"
                            >
                              Sign Up
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {showWhatsApp === true ? (
                          <div className="loginForm-heading">
                            Please enter you whatsapp number to sign in
                          </div>
                        ) : selected === "Email" ? (
                          <div className="loginForm-heading">
                            Please enter you email to sign in
                          </div>
                        ) : (
                          <div className="loginForm-heading">
                            Please enter you phone number to sign in
                          </div>
                        )}

                        {!showWhatsApp && (
                          <div className="toggle-switch">
                            <button
                              className={`toggle-button ${
                                selected === "Email" ? "active" : ""
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                setValidationError((prev) => {
                                  return {
                                    ...prev,
                                    identifier: false,
                                    captcha: false,
                                  };
                                });
                                setSelected("Email");
                                setShowWhatsApp(false);
                                setInput((prev) => {
                                  return { ...prev, identifier: "" };
                                });
                              }}
                            >
                              Email
                            </button>
                            <button
                              className={`toggle-button ${
                                selected === "Phone" ? "active" : ""
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                setValidationError((prev) => {
                                  return {
                                    ...prev,
                                    identifier: false,
                                    captcha: false,
                                  };
                                });
                                setSelected("Phone");
                                setInput((prev) => {
                                  return { ...prev, identifier: "" };
                                });
                              }}
                            >
                              Phone
                            </button>
                          </div>
                        )}

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          {selected === "Email" ? (
                            <>
                              <Form.Label className="form-input-heading">
                                Email
                              </Form.Label>
                              <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={input.identifier.toLowerCase()}
                                onChange={(e) => {
                                  setInput((prev) => {
                                    return {
                                      ...prev,
                                      identifier: e.target.value,
                                      provider: "phoneOrEmail",
                                    };
                                  });
                                  setError(false);
                                  setValidationError((prev) => {
                                    return { ...prev, identifier: false };
                                  });
                                }}
                              />

                              {validationError.identifier && (
                                <p style={{ color: "red" }}>
                                  Email is required
                                </p>
                              )}
                            </>
                          ) : showWhatsApp === true ? (
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label className="form-input-heading">
                                WhatsApp Number
                              </Form.Label>
                              <PhoneInput
                                country="cm"
                                value={input.identifier}
                                onChange={(e) => {
                                  setInput((prev) => {
                                    return {
                                      ...prev,
                                      identifier: `+${e}`,
                                      provider: "whatsapp",
                                    };
                                  });
                                  setError(false);
                                  setValidationError((prev) => {
                                    return { ...prev, identifier: false };
                                  });
                                }}
                                inputStyle={inputStyle}
                                inputProps={{ required: true }}
                              />
                              {validationError.identifier && (
                                <p style={{ color: "red" }}>
                                  WhatsApp Number is required
                                </p>
                              )}
                            </Form.Group>
                          ) : (
                            <>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                              >
                                <Form.Label className="form-input-heading">
                                  Phone Number
                                </Form.Label>
                                <PhoneInput
                                  country="cm"
                                  value={input.identifier}
                                  onChange={(e) => {
                                    setInput((prev) => {
                                      return {
                                        ...prev,
                                        identifier: e,
                                        provider: "phoneOrEmail",
                                      };
                                    });
                                    setError(false);
                                    setValidationError((prev) => {
                                      return { ...prev, identifier: false };
                                    });
                                  }}
                                  inputStyle={inputStyle}
                                  inputProps={{ required: true }}
                                  onlyCountries={["cm"]}
                                />
                                {validationError.identifier && (
                                  <p style={{ color: "red" }}>
                                    Phone Number is required
                                  </p>
                                )}
                              </Form.Group>
                            </>
                          )}
                        </Form.Group>

                        <div className="container mt-3 mb-4">
                          <div className="row justify-content-start">
                            <div
                              className="col-12 col-md-6 text-center"
                              style={{ paddingLeft: "0px" }}
                            >
                              <div className="recaptcha-container">
                                <ReCAPTCHA
                                  sitekey={captchaKey}
                                  onChange={handleCaptcha}
                                />
                              </div>
                            </div>
                          </div>
                          {validationError.captcha && (
                            <p style={{ color: "red" }}>Check the captcha!</p>
                          )}
                        </div>
                        {(error.allError && (
                          <p style={{ color: "red" }}>{error.allError}</p>
                        )) ||
                          (error.error500 && (
                            <p style={{ color: "red" }}>
                              Something went wrong!
                            </p>
                          ))}
                        {loader && <Loader />}
                        <div className="d-flex flex-column align-items-center gap-3">
                          <Button
                            variant="primary"
                            className={loader ? "signInDisable" : "signIn-blue"}
                          >
                            Sign in
                          </Button>
                          <div>OR</div>
                          {showWhatsApp === false ? (
                            <Button
                              variant="primary"
                              className="whatsAppButton-green"
                              onClick={() => {
                                setSelected("Phone");
                                setShowWhatsApp(true);
                                // setInput((prev) => {
                                //   return { ...prev, identifier: "", provider: "" };
                                // });
                              }}
                            >
                              <img src={whatsappIcon} alt="whatsappIcon" />
                              Sign in with WhatsApp
                            </Button>
                          ) : (
                            <Button
                              variant="primary"
                              className="whatsAppButton-green"
                              onClick={() => {
                                setSelected("Phone");
                                setShowWhatsApp(false);
                                // setInput((prev) => {
                                //   return { ...prev, identifier: "", provider: "" };
                                // });
                              }}
                            >
                              Sign in with email or phone
                            </Button>
                          )}
                        </div>
                      </>
                    )}
                  </Form>
                </Modal.Body>
              </div>
              <Modal.Footer className="runErrandPopUpSignUpForm-modalFooter"></Modal.Footer>
            </div>
            <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 runErrandPopUpSignUp-image">
              <img
                src={modalCross}
                className="img-fluid"
                onClick={() => {
                  dispatch(signUpModalToggle());
                  dispatch(setSignUpModalFalse());
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RunErrandPopUpSignUpFormSignUpForm;
