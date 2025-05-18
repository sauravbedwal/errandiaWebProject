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

const ListYourBusinessSignIn = () => {
  const [activeTab, setActiveTab] = useState("signin");

  const [showWhatsApp, setShowWhatsApp] = useState(false);

  const [selected, setSelected] = useState("Email");

  const navigate = useNavigate();

  const inputStyle = {
    width: "100%",
    height: "35px",
    borderRadius: "10px",
    border: "1px solid #eceff2",
    outline: "none",
  };

  // console.log("showWhatsApp", showWhatsApp);
  return (
    <div className="container loginImage-background col-lg-8">
      <div className="tab-container">
        <div
          className={`tab ${activeTab === "signup" ? "active" : "inactive"}`}
          id="signup-tab"
          onClick={() => {
            setActiveTab("signup");
            navigate("/list-your-business-signup");
          }}
        >
          Sign Up
          <div className="triangle"></div>
        </div>
        <div
          className={`tab ${activeTab === "signin" ? "active" : "inactive"}`}
          id="signin-tab"
          onClick={() => {
            setActiveTab("signin");
          }}
        >
          Sign In
          <div className="triangle"></div>
        </div>
      </div>

      <div className="form-box">
        <Form className="form-login">
          <div className="loginForm-heading">
            Please enter you email or phone number to sign in
          </div>

          <div className="toggle-switch">
            <button
              className={`toggle-button ${
                selected === "Email" ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setSelected("Email");
                setShowWhatsApp(false);
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
                setSelected("Phone");
              }}
            >
              Phone
            </button>
          </div>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            {selected === "Email" ? (
              <>
                <Form.Label className="form-input-heading">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  className="formInput"
                />
              </>
            ) : showWhatsApp === true ? (
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="form-input-heading">
                  WhatsApp Number
                </Form.Label>
                <PhoneInput
                  country="cm"
                  inputStyle={inputStyle}
                  inputProps={{ required: true }}
                />
              </Form.Group>
            ) : (
              <>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="form-input-heading">
                    Phone Number
                  </Form.Label>
                  <PhoneInput
                    country="cm"
                    inputStyle={inputStyle}
                    inputProps={{ required: true }}
                    onlyCountries={["cm"]}
                  />
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
                  <ReCAPTCHA sitekey={captchaKey} />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column align-items-center gap-3">
            <Button variant="primary" className="signIn-blue">
              Sign in
            </Button>
            <div>OR</div>
            <Button
              variant="primary"
              className="whatsAppButton-green"
              onClick={() => {
                setSelected("Phone");
                setShowWhatsApp(true);
              }}
            >
              <img src={whatsappIcon} alt="whatsappIcon" />
              Sign in with WhatsApp
            </Button>
          </div>
        </Form>{" "}
      </div>
    </div>
  );
};

export default ListYourBusinessSignIn;
