import React, { useState } from "react";
import "../../App.css";
import ReCAPTCHA from "react-google-recaptcha";
import "react-phone-input-2/lib/style.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import whatsappIcon from "../../assets/whatsappIcon.svg";
import { isNull, isEmpty } from "lodash";
import { postApi } from "../../fetchApi/FetchAxiosApi";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
import apis, { captchaKey } from "../../Constant";
import PhoneInput from "react-phone-input-2";
import { useTranslation } from "react-i18next";
import "../../i18n";
import Loader from "../loader/Loader";
import Cookies from "js-cookie";

const Login = () => {
  const [activeTab, setActiveTab] = useState("signin");
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

  const [loader, setLoader] = useState(false);

  const [selected, setSelected] = useState("Email");

  const [showWhatsApp, setShowWhatsApp] = useState(false);

  const dispatch = useDispatch();

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

  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;

  const signInHandler = async () => {
    try {
      if (
        !input.identifier.trim() ||
        (!emailRegex.test(input.identifier) &&
          !phoneRegex.test(input.identifier))
      ) {
        setValidationError((prev) => {
          return { ...prev, identifier: true };
        });
      }
      if (input.captcha === false) {
        setValidationError((prev) => {
          return { ...prev, captcha: true };
        });
      }
      if (
        !isNull(input.identifier) &&
        !isEmpty(input.identifier) &&
        input.captcha === true &&
        (emailRegex.test(input.identifier) || phoneRegex.test(input.identifier))
      ) {
        setLoader(true);
        // console.log(apis.login);
        // sessionStorage.setItem("user", JSON.stringify(input.identifier));
        Cookies.set("user", JSON.stringify(input.identifier));

        const res = await postApi(apis.login, {
          identifier: input.identifier,
          provider: input.provider,
        });
        // console.log("resLogin", res.data);
        setLoader(false);
        dispatch(addUser(res.data));
        navigate("/login-otp");
      }
    } catch (err) {
      console.log("login", err);
      setLoader(false);

      setError((prev) => {
        if (err?.response?.status === 500 || err.message === "Network Error") {
          return { ...prev, error500: true };
        }
        return { ...prev, allError: err?.response?.data?.message };
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

  // console.log("input", input);

  // console.log("showWhatsApp", showWhatsApp);

  const { t } = useTranslation();

  return (
    <div className="container loginImage-background col-lg-8">
      <div className="tab-container">
        <div
          className={`tab ${activeTab === "signup" ? "active" : "inactive"}`}
          id="signup-tab"
          onClick={() => {
            setActiveTab("signup");
            navigate("/signup");
          }}
        >
          {t("Sign Up")}
          <div className="triangle"></div>
        </div>
        <div
          className={`tab ${activeTab === "signin" ? "active" : "inactive"}`}
          id="signin-tab"
          onClick={() => {
            setActiveTab("signin");
          }}
        >
          {t("Sign In")}
          <div className="triangle"></div>
        </div>
      </div>

      <div className="form-box">
        <Form className="form-login">
          {showWhatsApp === true ? (
            <div className="loginForm-heading">
              {t("Please enter you whatsapp number to sign in")}
            </div>
          ) : selected === "Email" ? (
            <div className="loginForm-heading">
              {t("Please enter you email to sign in")}
            </div>
          ) : (
            <div className="loginForm-heading">
              {t("Please enter you phone number to sign in")}
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
                    return { ...prev, identifier: false, captcha: false };
                  });
                  setSelected("Email");
                  setShowWhatsApp(false);
                  setInput((prev) => {
                    return { ...prev, identifier: "" };
                  });
                }}
              >
                {t("Email")}
              </button>
              <button
                className={`toggle-button ${
                  selected === "Phone" ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setValidationError((prev) => {
                    return { ...prev, identifier: false, captcha: false };
                  });
                  setSelected("Phone");
                  setInput((prev) => {
                    return { ...prev, identifier: "" };
                  });
                }}
              >
                {t("Phone")}
              </button>
            </div>
          )}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            {selected === "Email" ? (
              <>
                <Form.Label className="form-input-heading">
                  {t("Email")}
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder={t("Enter your email")}
                  className="formInput"
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
                {
                  loader && (
                    // <div style={{ width: "50px", height: "50px" }}>
                    <Loader width="50px" height="50px" />
                    // <h1>Loading.....</h1>
                  )
                  // </div>
                }
                {validationError.identifier && (
                  <p style={{ color: "red" }}>{t("Email is required")}</p>
                )}
              </>
            ) : showWhatsApp === true ? (
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="form-input-heading">
                  {t("WhatsApp Number")}
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
                    {t("WhatsApp Number is required")}
                  </p>
                )}
              </Form.Group>
            ) : (
              <>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="form-input-heading">
                    {t("Phone Number")}
                  </Form.Label>
                  <PhoneInput
                    country="cm"
                    value={input.identifier}
                    onChange={(e) => {
                      setInput((prev) => {
                        return {
                          ...prev,
                          identifier: `+${e}`,
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
                      {t("Phone Number is required")}
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
                  <ReCAPTCHA sitekey={captchaKey} onChange={handleCaptcha} />
                </div>
              </div>
            </div>
            {validationError.captcha && (
              <p style={{ color: "red" }}>{t("Check the captcha!")}</p>
            )}
          </div>
          {(error.allError && (
            <p style={{ color: "red" }}>{error.allError}</p>
          )) ||
            (error.error500 && (
              <p style={{ color: "red" }}>{t("Something went wrong!")}</p>
            ))}

          <div className="d-flex flex-column align-items-center gap-3">
            <Button
              variant="primary"
              className={loader ? "signInDisable" : "signIn-blue"}
              onClick={signInHandler}
              disabled={loader}
            >
              {t("Sign In")}
            </Button>
            <div>{t("or")}</div>
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
                  setValidationError((prev) => {
                    return { ...prev, identifier: "", captcha: false };
                  });
                }}
              >
                <img src={whatsappIcon} alt="whatsappIcon" />
                {t("Sign in with WhatsApp")}
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
                  setValidationError((prev) => {
                    return { ...prev, identifier: "", captcha: false };
                  });
                }}
              >
                {t("Sign in with Email or Phone")}
              </Button>
            )}
          </div>
        </Form>{" "}
      </div>
    </div>
  );
};

export default Login;
