import React from "react";
import "../../App.css";
import { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import runErrandPopUpImage from "../../assets/images/runErrandPopUpImage.svg";
import runErrandPopUpimageUploader from "../../assets/runErrandPopUpimageUploader.svg";
import runErrandPopUpBrowseFiles from "../../assets/runErrandPopUpBrowseFiles.svg";
import runErrandPopUpUploadedImage from "../../assets/runErrandPopUpUploadedImage.svg";
import runErrandPopUpDelete from "../../assets/runErrandPopUpDelete.svg";
import modalCross from "../../assets/modalCross.svg";
import { useDispatch, useSelector } from "react-redux";
import { modalToggle, setModalFalse } from "../../utils/modalSlice";
import { useNavigate } from "react-router-dom";
import {
  setSignUpModalTrue,
  signUpModalToggle,
} from "../../utils/signUpModalSlice";
import goBackArrow from "../../assets/goBackArrow.svg";

const EditErrands = ({ detailSelected, setDetailSelected }) => {
  const modalBoolean = useSelector((store) => store.modal.value);

  const dispatch = useDispatch();

  const fileInputRef = useRef(null);

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
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 productsFromTheBusiness-productServiceButtons">
          <div className="productsBusinessUserProfile-goBack-container">
            <img
              style={{ cursor: "pointer" }}
              className="img-fluid"
              src={goBackArrow}
              alt="goBackArrow"
              onClick={() => {
                // navigate("/user-profile");
                setDetailSelected("ErrandsPosted");
              }}
            />
            <p className="productsBusinessUserProfile-goBack">
              Back to businesses
            </p>
          </div>
          <h6 className="editBusinessForm-section-heading">Edit Business</h6>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="editErrands-inputHeading">
                  Item
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g laptop charger. smart tv screen"
                  autoFocus
                  className="runErrandPopUp-inputTag"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="editErrands-inputHeading">
                  Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="E,g I'm looking for a 15inch smart screen TV remote, preferably second hand"
                  rows={4}
                  className="runErrandPopUp-description"
                />
              </Form.Group>
              <div className="listYourBusinessHomeForm-two-Inputs">
                <Form.Group
                  className="mb-3 listYourBusinessHomeForm-input-tag-container"
                  controlId="formBasicEmail"
                >
                  <Form.Label
                    className="runErrandPopUpSignUpFormTab-form-input-heading"
                    style={{ color: "#677A90" }}
                  >
                    Region Category *
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

                <Form.Group
                  className="mb-3 listYourBusinessHomeForm-input-tag-container"
                  controlId="formBasicEmail"
                >
                  <Form.Label
                    className="runErrandPopUpSignUpFormTab-form-input-heading"
                    style={{ color: "#677A90" }}
                  >
                    Town <span style={{ color: "#677A90" }}>(optional)</span>
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
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="runErrandPopUp-inputHeading">
                  Sample images{" "}
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
                  className="editErrands-custom-file-input-container"
                >
                  <div className="runErrand-popUp-custom-file-content">
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

              <div className="editErrands-uploadedImageDelete">
                <div className="runErrandPopUp-uploadedImage">
                  <img src={runErrandPopUpUploadedImage} />
                  <p>IMG20240203.JPG</p>
                </div>
                <img src={runErrandPopUpDelete} />
              </div>

              <div className="d-flex align-items-center gap-3">
                <Button variant="primary" className="editErrands-blueButton">
                  Save Changes
                </Button>
                <button
                  type="button"
                  class="btn btn-primary btn-lg editBusiness-location-whiteButton"
                >
                  Cancel{" "}
                </button>
              </div>
            </Form>
          </Modal.Body>
        </div>
      </div>
    </div>
  );
};

export default EditErrands;
