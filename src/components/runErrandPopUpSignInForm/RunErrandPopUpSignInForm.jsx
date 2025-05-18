import React from "react";
import "../../App.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
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

const RunErrandPopUpSignInForm = () => {
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

  const [activeTab, setActiveTab] = useState("signin");

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
            <div className="col-xl-7 col-lg-7 col-md-11 col-sm-11 col-11  mb-3">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="runErrandPopUpSignUpFormTab-container">
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
                    <div className="runErrandPopUpSignUpFormTab-signUpForm-heading">
                      Login
                    </div>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                        Full Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        className="runErrandPopUpSignUpFormTab-formInput"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                        Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        className="runErrandPopUpSignUpFormTab-formInput"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                        Phone Number
                      </Form.Label>
                      <PhoneInput country="us" inputStyle={inputStyle} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                        WhatsApp Number
                      </Form.Label>
                      <PhoneInput country="us" inputStyle={inputStyle} />
                    </Form.Group>

                    <div className="d-flex align-items-center">
                      <Form.Group
                        className="mb-3 mt-2"
                        controlId="formBasicCheckbox"
                      >
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
                    </div>

                    <div className="runErrandPopUpSignUpForm-buttons">
                      <div className="d-flex flex-column align-items-center gap-3">
                        <Button
                          variant="primary"
                          className={"runErrandPopUpSignUpForm-goBack"}
                          onClick={() => {
                                              dispatch(modalToggle());
                                              dispatch(setModalFalse());
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

export default RunErrandPopUpSignInForm;
