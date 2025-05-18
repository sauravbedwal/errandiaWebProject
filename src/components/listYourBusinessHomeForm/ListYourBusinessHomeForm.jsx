import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import PhoneInput from "react-phone-input-2";
import Button from "react-bootstrap/Button";
import runErrandPopUpimageUploader from "../../assets/runErrandPopUpimageUploader.svg";
import runErrandPopUpBrowseFiles from "../../assets/runErrandPopUpBrowseFiles.svg";
import runErrandPopUpUploadedImage from "../../assets/runErrandPopUpUploadedImage.svg";
import runErrandPopUpDelete from "../../assets/runErrandPopUpDelete.svg";
import BusinessLocationIcon from "../../assets/BusinessLocationIcon.svg";
import { useNavigate } from "react-router-dom";
import "summernote/dist/summernote-lite.css";
import $ from "jquery";
import "summernote/dist/summernote-lite.js";
import { useTranslation } from "react-i18next";
import "../../i18n";

const ListYourBusinessHomeForm = () => {
  
  const { t, i18n } = useTranslation();

  const inputStyle = {
    width: "100%",
    height: "35px",
    borderRadius: "10px",
    border: "1px solid #eceff2",
    outline: "none",
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // console.log("Selected file:", file);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Summernote with a minimalist toolbar
    $("#summernote").summernote({
      placeholder: "Type your message here...",
      height: 200,
      toolbar: [
        ["style", ["style"]],
        ["font", ["bold", "underline", "clear"]],
        ["fontname", ["fontname"]],
        ["para", ["ul", "ol", "paragraph"]],
        ["table", ["table"]],
        ["insert", ["link", "picture", "video"]],
        ["view", ["fullscreen", "codeview"]],
      ],
    });
  });
  return (
    <>
      <Form>
        <div className="listYourBusinessHomeForm-signUpForm-heading">
          List Your Business{" "}
        </div>
        <div className="runErrandPopUpSignUpFormTab-signUpForm-heading">
          Grow your business with Errandia. Register Now
        </div>

        <div className="listYourBusinessHomeForm-two-Inputs">
          <Form.Group
            className="mb-3 listYourBusinessHomeForm-input-tag-container"
            controlId="formBasicEmail"
          >
            <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
              Business Name *
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your business name"
              className="runErrandPopUpSignUpFormTab-formInput"
            />
          </Form.Group>

          <Form.Group
            className="mb-3 listYourBusinessHomeForm-input-tag-container"
            controlId="formBasicEmail"
          >
            <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
              Business Category *
            </Form.Label>
            <select
              className="form-select"
              aria-label="Default select example"
              style={{ color: "#526277", border: "1px solid #ECEFF2" }}
            >
              <option selected>select business category</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </Form.Group>
        </div>

        <div className="mb-3">
          <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
            Business Description *
          </Form.Label>
          <textarea id="summernote"></textarea>
        </div>

        <div className="listYourBusinessHomeForm-two-Inputs">
          <Form.Group
            className="mb-3 listYourBusinessHomeForm-input-tag-container"
            controlId="formBasicEmail"
          >
            <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
              Business Slogan{" "}
              <span style={{ color: "#677A90" }}>(optional)</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="select preferred region for errand"
              className="runErrandPopUpSignUpFormTab-formInput"
            />
          </Form.Group>

          <Form.Group
            className="mb-3 listYourBusinessHomeForm-input-tag-container"
            controlId="formBasicEmail"
          >
            <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
              Web Address <span style={{ color: "#677A90" }}>(optional)</span>
            </Form.Label>
            <select
              className="form-select"
              aria-label="Default select example"
              style={{ color: "#526277", border: "1px solid #ECEFF2" }}
            >
              <option selected>select business category</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </Form.Group>
        </div>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="runErrandPopUp-inputHeading">
            Upload Business Logo{" "}
            <span style={{ color: "#677A90" }}>(optional)</span>
          </Form.Label>

          {/* Hidden File Input */}
          <input
            type="file"
            id="file-input"
            accept=".jpg,.jpeg,.png"
            style={{ display: "none" }}
            //   onChange={(e) => {
            //     console.log(e.target.files[0]);
            //   }} // Handle file selection
            onChange={handleFileChange}
          />

          {/* Custom File Input UI */}
          <label
            htmlFor="file-input"
            className="listYourBusinessHomeForm-custom-file-input-container"
          >
            <div className="listYourBusinessHomeForm-custom-file-content">
              <img
                src={runErrandPopUpimageUploader}
                alt="Upload Icon"
                className="img-fluid"
              />
              <div>
                <div className="runErrandPopUp-imageTagHeading">
                  Choose a file or drag and drop it here
                </div>
                <p className="runErrandPopUp-imageTag-SubHeading">
                  jpg, jpeg, or png of up to 2mb
                </p>
              </div>
            </div>
            <Button
              variant="primary"
              className="runErrandPopUp-browseFilesButton"
              onClick={handleFileButtonClick}
            >
              <img src={runErrandPopUpBrowseFiles} alt="Browse Files Icon" />
              Browse Files
            </Button>
          </label>
        </Form.Group>

        <div className="listYourBusinessHomeForm-uploadedImageDelete">
          <div className="listYourBusinessHomeForm-uploadedImage">
            <img src={runErrandPopUpUploadedImage} />
            <p>IMG20240203.JPG</p>
          </div>
          <img src={runErrandPopUpDelete} />
        </div>

        <hr />

        <div className="listYourBusinessHomeForm-two-Inputs">
          <Form.Group
            className="mb-3 listYourBusinessHomeForm-input-tag-container"
            controlId="formBasicEmail"
          >
            <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
              Phone Number *
            </Form.Label>
            <PhoneInput country="cm" inputStyle={inputStyle} />
          </Form.Group>

          <Form.Group
            className="mb-3 listYourBusinessHomeForm-input-tag-container"
            controlId="formBasicEmail"
          >
            <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
              Alternative Phone Number{" "}
              <span style={{ color: "#677A90" }}>(optional)</span>
            </Form.Label>
            <PhoneInput country="cm" inputStyle={inputStyle} />
          </Form.Group>
        </div>

        <div className="listYourBusinessHomeForm-two-Inputs">
          <Form.Group
            className="mb-3 listYourBusinessHomeForm-input-tag-container"
            controlId="formBasicEmail"
          >
            <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
              Whatsapp Number{" "}
              <span style={{ color: "#677A90" }}>(optional)</span>
            </Form.Label>
            <PhoneInput country="cm" inputStyle={inputStyle} />
          </Form.Group>

          <Form.Group
            className="mb-3 listYourBusinessHomeForm-input-tag-container"
            controlId="formBasicEmail"
          >
            <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
              Email Address <span style={{ color: "#677A90" }}>(optional)</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your business name"
              className="runErrandPopUpSignUpFormTab-formInput"
            />
          </Form.Group>
        </div>

        <hr />

        <h6 className="listYourBusinessHomeForm-inputs-heading">
          Business Location
        </h6>
        <div className="listYourBusinessHomeForm-two-Inputs">
          <Form.Group
            className="mb-3 listYourBusinessHomeForm-input-tag-container"
            controlId="formBasicEmail"
          >
            <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
              Region Category *
            </Form.Label>
            <select
              className="form-select"
              aria-label="Default select example"
              style={{ color: "#526277", border: "1px solid #ECEFF2" }}
            >
              <option selected>select region</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </Form.Group>
          <Form.Group
            className="mb-3 listYourBusinessHomeForm-input-tag-container"
            controlId="formBasicEmail"
          >
            <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
              Town <span style={{ color: "#677A90" }}>(optional)</span>
            </Form.Label>
            <select
              className="form-select"
              aria-label="Default select example"
              style={{ color: "#526277", border: "1px solid #ECEFF2" }}
            >
              <option selected>select town</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </Form.Group>
        </div>

        <div className="listYourBusinessHomeForm-two-Inputs">
          <Form.Group
            className="mb-3 listYourBusinessHomeForm-input-tag-container"
            controlId="formBasicEmail"
          >
            <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
              Location <span style={{ color: "#677A90" }}>(optional)</span>
            </Form.Label>
            <div className="listYourBusinessHomeForm-location-container">
              <select
                className="form-select"
                aria-label="Default select example"
                style={{ color: "#526277", border: "1px solid #ECEFF2" }}
              >
                <option selected>select location</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <div className="listYourBusinessHomeForm-location-button">
                <Button
                  variant="primary"
                  className={"listYourBusinessHomeForm-goBack"}
                >
                  <img src={BusinessLocationIcon} alt="BusinessLocationIcon" />
                  Get My Address
                </Button>
              </div>
            </div>
          </Form.Group>
        </div>

        <hr />

        <h6 className="listYourBusinessHomeForm-inputs-agent-Heading">Agent</h6>
        <div className="runErrandPopUpSignUpFormTab-signUpForm-heading">
          If you're an agent, please enter your referral code
        </div>

        <Form.Group
          className="mb-3 listYourBusinessHomeForm-input-tag-container"
          controlId="formBasicEmail"
        >
          <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
            Referral Code
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the referral code"
            className="listYourBusinessHomeForm-formInput-refferalInput"
          />
        </Form.Group>

        <div
          className="d-flex flex-column align-items-center gap-3"
          onClick={() => {
            navigate("/list-your-business-signup");
          }}
        >
          <Button
            variant="primary"
            className="listYourBusinessHomeForm-signIn-blue"
          >
            Continue
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ListYourBusinessHomeForm;
