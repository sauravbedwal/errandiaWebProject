import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import {
  modalAddBusinessToggle,
  setAddBusinessModalFalse,
} from "../../utils/addBusinessModalSlice";
import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import runErrandPopUpimageUploader from "../../assets/runErrandPopUpimageUploader.svg";
import runErrandPopUpBrowseFiles from "../../assets/runErrandPopUpBrowseFiles.svg";
import runErrandPopUpUploadedImage from "../../assets/runErrandPopUpUploadedImage.svg";
import runErrandPopUpDelete from "../../assets/runErrandPopUpDelete.svg";
import { useNavigate } from "react-router-dom";
import "summernote/dist/summernote-lite.css";
import $ from "jquery";
import "summernote/dist/summernote-lite.js";
import {
  modalUserProfileAddServiceToggle,
  setUserProfileAddServiceModalFalse,
} from "../../utils/userProfileAddServiceModalSlice";

const UserProfileAddService = () => {
  const userProfileAddServiceModalBoolean = useSelector(
    (store) => store?.userProfileAddService?.value
  );

  const dispatch = useDispatch();

  const inputStyle = {
    width: "100%",
    height: "35px",
    borderRadius: "10px",
    border: "1px solid #eceff2",
    outline: "none",
    boxShadow: "none",
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
      <Modal
        size="lg"
        show={userProfileAddServiceModalBoolean}
        aria-labelledby="example-modal-sizes-title-lg"
        className="featuredBusinessProfileShare-modal-Container"
      >
        <Modal.Header
          closeButton
          className="userProfileAddServiceOnly-modal-header"
          onClick={() => {
            dispatch(modalUserProfileAddServiceToggle());
            dispatch(setUserProfileAddServiceModalFalse());
          }}
        >
          <Modal.Title
            id="example-modal-sizes-title-lg"
            className="featureBusinessProfileShare-heading"
          >
            Add Service{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="userProfileAddProduct-social-Handles-container">
            <Form>
              <div className="listYourBusinessHomeForm-two-Inputs">
                <Form.Group
                  className="mb-3 listYourBusinessHomeForm-input-tag-container"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                    Service Name *
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
                    Select Business *
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

              <Form.Group
                className="mb-3 userProfileAddProduct-input-tag-container"
                controlId="formBasicEmail"
              >
                <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                  Category *{" "}
                </Form.Label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  style={{ color: "#526277", border: "1px solid #ECEFF2" }}
                >
                  <option selected>
                    select <a href=""></a> category
                  </option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </Form.Group>

              <div className="mb-3">
                <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                  Product Description *
                </Form.Label>
                <textarea id="summernote"></textarea>
              </div>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="runErrandPopUp-inputHeading">
                  Cover Image *
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
                  className="userProfileAddProduct-custom-file-input-container"
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
                    <img
                      src={runErrandPopUpBrowseFiles}
                      alt="Browse Files Icon"
                    />
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

              <Form.Group
                className="mb-3 listYourBusinessHomeForm-input-tag-container mt-3"
                controlId="formBasicEmail"
              >
                <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                  Service Tags{" "}
                  <span style={{ color: "#677A90" }}>(optional)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the referral code"
                  className="userProfileAddProduct-formInput-refferalInput"
                />
                <p className="userProfileAddProduct-productTag-line">
                  enter words related to product separated by comma
                </p>
              </Form.Group>

              <div
                className="d-flex align-items-start gap-3 mt-5"
                onClick={() => {
                  dispatch(modalAddBusinessToggle());
                  dispatch(setAddBusinessModalFalse());
                }}
              >
                <Button
                  variant="primary"
                  className="listYourBusinessHomeForm-signIn-blue"
                >
                  Publish
                </Button>
                <button
                  type="button"
                  class="btn btn-primary btn-lg userProfileAddProduct-location-whiteButton"
                >
                  Publish and Add New
                </button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserProfileAddService;
