import React, { useState } from "react";
import "../../App.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const ListYourBusinessSignUp = () => {
  const [activeTab, setActiveTab] = useState("signup");

  const navigate = useNavigate();

  const inputStyle = {
    width: "100%",
    height: "35px",
    borderRadius: "10px",
    border: "1px solid #eceff2",
    outline: "none",
  };

  return (
    <div className="container listYourBusinessSignUp-loginImage-background col-lg-8">
      <div className="tab-container">
        <div
          className={`tab ${activeTab === "signup" ? "active" : "inactive"}`}
          id="signup-tab"
          onClick={() => setActiveTab("signup")}
        >
          Sign Up
          <div className="triangle"></div>
        </div>
        <div
          className={`tab ${activeTab === "signin" ? "active" : "inactive"}`}
          id="signin-tab"
          onClick={() => {
            setActiveTab("signin");
            navigate("/list-your-business-signin");
          }}
        >
          Sign In
          <div className="triangle"></div>
        </div>
      </div>
      <div className="form-box">
        <Form className="form-login">
          <div className="listYourBusinessSignUp-signUpForm-heading">
            Create your account
          </div>
          <p className="listYourBusinessSignUp-signUpForm-subHeading">
            Register in order to list your business
          </p>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-input-heading">Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              className="formInput"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-input-heading">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              className="formInput"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-input-heading">Phone Number</Form.Label>
            <PhoneInput
              country="cm"
              inputStyle={inputStyle}
              inputProps={{ required: true }}
            />
          </Form.Group>
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
          <div className="d-flex align-items-center">
            <Form.Group className="mb-3 mt-2" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                className="checkbox-line"
                label={
                  <p>
                    By Signing up you agree to our{" "}
                    <span style={{ color: "rgba(22, 7, 250, 1)" }}>
                      terms and conditions.
                    </span>
                  </p>
                }
              />
            </Form.Group>
          </div>

          <div className="d-flex flex-column align-items-center gap-3">
            <Button variant="primary" className="signIn-blue">
              Sign Up
            </Button>
          </div>
        </Form>{" "}
      </div>
    </div>
  );
};

export default ListYourBusinessSignUp;
