import React, { useState } from "react";
import "../../App.css";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { isEmpty, isNull } from "lodash";
import { postApi } from "../../fetchApi/FetchAxiosApi";
import apis, { captchaKey } from "../../Constant";
import { useTranslation } from "react-i18next";
import Loader from "../loader/Loader";

const SignUp = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const [inputInfo, setInputInfo] = useState({
    name: "",
    phone: "",
    email: "",
    whatsapp: "",
    signupCheck: false,
    captcha: false,
  });

  const [error, setError] = useState({
    allError: false,
    error500: false,
  });

  const [validationError, setValidationError] = useState({
    name: false,
    phone: false,
    email: false,
    whatsapp: false,
    signupCheck: false,
    captcha: false,
  });

  const [loader, setLoader] = useState(false);

  const [existedUser, setExistedUser] = useState({
    emailValid: false,
    existedMessage: "",
  });
  console.log("existedUser.emailValid", existedUser.emailValid);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;

  const signUpHandler = async () => {
    try {
      if (!inputInfo.name.trim()) {
        setValidationError((prev) => {
          return { ...prev, name: true };
        });
      }
      if (!inputInfo.phone.trim() || !phoneRegex.test(inputInfo.phone)) {
        setValidationError((prev) => {
          return { ...prev, phone: true };
        });
      }
      if (!inputInfo.email.trim() || !emailRegex.test(inputInfo.email)) {
        setValidationError((prev) => {
          return { ...prev, email: true };
        });
      }
      if (!inputInfo.whatsapp.trim() || !phoneRegex.test(inputInfo.whatsapp)) {
        setValidationError((prev) => {
          return { ...prev, whatsapp: true };
        });
      }
      if (inputInfo.signupCheck === false) {
        setValidationError((prev) => {
          return { ...prev, signupCheck: true };
        });
      }
      if (inputInfo.captcha === false) {
        setValidationError((prev) => {
          return { ...prev, captcha: true };
        });
      }

      if (
        !isNull(inputInfo.name) &&
        !isEmpty(inputInfo.name) &&
        !isNull(inputInfo.phone) &&
        !isEmpty(inputInfo.phone) &&
        !isNull(inputInfo.email) &&
        !isEmpty(inputInfo.email) &&
        !isNull(inputInfo.whatsapp) &&
        !isEmpty(inputInfo.whatsapp) &&
        inputInfo.signupCheck === true &&
        inputInfo.captcha === true
      ) {
        setLoader(true);
        const res = await postApi(apis.signup, {
          name: inputInfo.name,
          phone: inputInfo.phone,
          email: inputInfo.email,
          whatsapp_number: inputInfo.whatsapp,
        });
        console.log("res-signUp", res);
        setLoader(false);
        setInputInfo((prev) => {
          return {
            ...prev,
            name: "",
            phone: "",
            email: "",
            whatsapp: "",
            signupCheck: false,
            captcha: false,
          };
        });
        navigate("/login");
      }
    } catch (err) {
      console.log("signUperror", err);

      console.log("signUperror", err?.response?.data?.message);
      // const errMsg = err?.response?.data?.message;
      setLoader(false);

      if (
        err.status == 400 &&
        (err.response.data.message === "Email address already exists" ||
          err.response.data.message === "Adresse E-mail déjà existante" ||
          err.response.data.message === "WhatsApp number already taken" ||
          err.response.data.message === "Numéro WhatsApp déjà existant" ||
          err.response.data.message === "Phone already exists" ||
          err.response.data.message === "Téléphone déjà existant")
      ) {
        setExistedUser((prev) => {
          return {
            ...prev,
            emailValid: true,
            existedMessage: err?.response?.data?.message,
          };
        });
      }

      if (err?.response?.status === 500 || err?.message === "Network Error") {
        setError((prev) => {
          return { ...prev, error500: true };
        });
      } else if (err) {
        setError((prev) => {
          return { ...prev, allError: true };
        });
      }
    }
  };

  const navigate = useNavigate();

  const handleCaptcha = (e) => {
    setValidationError((prev) => {
      return { ...prev, captcha: false };
    });

    if (e.length > 0) {
      setInputInfo((prev) => {
        return { ...prev, captcha: true };
      });
    }
  };

  const inputStyle = {
    width: "100%",
    height: "35px",
    borderRadius: "10px",
    border: "1px solid #eceff2",
    outline: "none",
  };

  const { t } = useTranslation();
  return (
    <div className="container loginImage-background col-lg-8">
      <div className="tab-container">
        <div
          className={`tab ${activeTab === "signup" ? "active" : "inactive"}`}
          id="signup-tab"
          onClick={() => setActiveTab("signup")}
        >
          {t("Sign Up")}
          <div className="triangle"></div>
        </div>
        <div
          className={`tab ${activeTab === "signin" ? "active" : "inactive"}`}
          id="signin-tab"
          onClick={() => {
            setActiveTab("signin");
            navigate("/login");
          }}
        >
          {t("Sign In")}
          <div className="triangle"></div>
        </div>
      </div>
      <div className="form-box">
        <Form className="form-login">
          <div className="signUpForm-heading">{t("Create your account")}</div>

          {existedUser.emailValid && (
            <div className="redirectLogin">
              <div className="redirect-btn">
                <p>
                  {t(
                    "This account is already registered. Would you like to log in instead?"
                  )}
                </p>

                <button
                  className="col-4 "
                  onClick={() => {
                    setActiveTab("signin");
                    navigate("/login");
                  }}
                >
                  {t("Sign In")}
                </button>
              </div>
              <p>
                {t("Need help?")} <span>{t("Contact us.")}</span>
              </p>
            </div>
          )}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-input-heading">
              {t("Full Name")}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={t("Enter your name")}
              className="formInput"
              value={inputInfo.name}
              onChange={(e) => {
                setError((prev) => {
                  return { ...prev, allError: false, error500: false };
                });
                setInputInfo((prev) => {
                  return { ...prev, name: e.target.value };
                });
                setValidationError((prev) => {
                  return { ...prev, name: false };
                });
              }}
            />
            {validationError.name && (
              <p style={{ color: "red" }}>{t("Full Name is required")}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-input-heading">{t("Email")}</Form.Label>
            <Form.Control
              type="email"
              placeholder={t("Enter your email")}
              className="formInput"
              value={inputInfo.email.toLowerCase()}
              onChange={(e) => {
                setError((prev) => {
                  return { ...prev, allError: false, error500: false };
                });
                setInputInfo((prev) => {
                  return { ...prev, email: e.target.value };
                });
                setValidationError((prev) => {
                  return { ...prev, email: false };
                });
              }}
            />
            {validationError.email && (
              <p style={{ color: "red" }}>{t("Email is required")}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-input-heading">
              {t("Phone Number")}
            </Form.Label>
            <PhoneInput
              country="cm"
              value={inputInfo.phone}
              onChange={(e) => {
                setError((prev) => {
                  return { ...prev, allError: false, error500: false };
                });
                setInputInfo((prev) => {
                  return { ...prev, phone: `+${e}` };
                });
                setValidationError((prev) => {
                  return { ...prev, phone: false };
                });
              }}
              inputStyle={inputStyle}
              inputProps={{ required: true }}
              onlyCountries={["cm"]}
            />
            {validationError.phone && (
              <p style={{ color: "red" }}>{t("Phone Number is required")}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-input-heading">
              {t("WhatsApp Number")}
            </Form.Label>
            <PhoneInput
              country="cm"
              value={inputInfo.whatsapp}
              onChange={(e) => {
                setError((prev) => {
                  return { ...prev, allError: false, error500: false };
                });
                setInputInfo((prev) => {
                  return { ...prev, whatsapp: `+${e}` };
                });
                setValidationError((prev) => {
                  return { ...prev, whatsapp: false };
                });
              }}
              inputStyle={inputStyle}
              inputProps={{ required: true }}
            />
            {validationError.whatsapp && (
              <p style={{ color: "red" }}>{t("WhatsApp Number is required")}</p>
            )}
          </Form.Group>
          <div className="d-flex align-items-center">
            <Form.Group className="mb-3 mt-2" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                className="checkbox-line"
                label={
                  <p>
                    {t("By Signing up you agree to our")}{" "}
                    <span style={{ color: "rgba(22, 7, 250, 1)" }}>
                      {t("terms and conditions.")}
                    </span>
                  </p>
                }
                value={inputInfo}
                onChange={(e) => {
                  setInputInfo((prev) => {
                    return { ...prev, signupCheck: e.target.checked };
                  });
                  setValidationError((prev) => {
                    return { ...prev, signupCheck: false };
                  });
                }}
              />
              {validationError.signupCheck && (
                <p style={{ color: "red" }}>
                  {t("Check all the terms and conditions")}
                </p>
              )}
            </Form.Group>
          </div>
          <div className="container mt-3 mb-4">
            <div className="row justify-content-start">
              <div
                className="col-12 col-md-6 text-center"
                style={{ paddingLeft: "0px" }}
              >
                <div className="signUp-recaptcha-container">
                  <ReCAPTCHA sitekey={captchaKey} onChange={handleCaptcha} />
                </div>
              </div>
            </div>
            {validationError.captcha && (
              <p style={{ color: "red" }}>{t("Check the captcha!")}</p>
            )}
          </div>
          {existedUser.emailValid && (
            <p style={{ color: "red" }}>{existedUser.existedMessage}</p>
          )}

          {/* {apiError && <p style={{ color: "red" }}>{apiError}</p>} */}
          {(!existedUser.emailValid && error.allError && (
            <p style={{ color: "red" }}>{t("Invalid Credentials")}</p>
          )) ||
            (error.error500 && (
              <p style={{ color: "red" }}>{t("Something went wrong!")}</p>
            ))}
          {
            loader && (
              // <div style={{ width: "50px", height: "50px" }}>
              <Loader width="50px" height="50px" />
              // <h1>Loading.....</h1>
            )
            // </div>
          }

          <div className="d-flex flex-column align-items-center gap-3">
            <Button
              variant="primary"
              className={loader ? "signUpDisable" : "signIn-blue"}
              onClick={signUpHandler}
              disabled={loader}
            >
              {t("Sign Up")}
            </Button>
          </div>
        </Form>{" "}
      </div>
    </div>
  );
};
export default SignUp;
