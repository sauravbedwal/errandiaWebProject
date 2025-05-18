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

import {
  modalUserProfileAddServiceToggle,
  setUserProfileAddServiceModalFalse,
} from "../../utils/userProfileAddServiceModalSlice";
import {
  modalRunErrandNewToggle,
  setRunErrandNewModalFalse,
} from "../../utils/runErrandNewModalSlice";

const RunErrandNew = () => {
  const runErrandNewModalBoolean = useSelector(
    (store) => store?.runErrandNew?.value
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

  return (
    <>
      <Modal
        size="lg"
        show={runErrandNewModalBoolean}
        aria-labelledby="example-modal-sizes-title-lg"
        className="featuredBusinessProfileShare-modal-Container"
      >
        <Modal.Header
          closeButton
          className="userProfileAddService-modal-header"
          onClick={() => {
            dispatch(modalRunErrandNewToggle());
            dispatch(setRunErrandNewModalFalse());
          }}
        >
          <Modal.Title
            id="example-modal-sizes-title-lg"
            className="featureBusinessProfileShare-heading"
          >
            Run Errand
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "30px 60px" }}>
          <Form>
            <div className="runErrandPopUp-FormHeading">
              Kindly provide details of this errand and we'll run it for you.
            </div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="runErrandPopUp-inputHeading">
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
              <Form.Label className="runErrandPopUp-inputHeading">
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
                <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                  Region <span style={{ color: "#677A90" }}>(optional)</span>
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
                <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
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

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label
                style={{ color: "#677A90" }}
                className="editErrands-inputHeading"
              >
                Sample images (optional)
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
                className="runErrandNew-custom-file-input-container"
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

            {/* <div className="editErrands-uploadedImageDelete">
              <div className="runErrandPopUp-uploadedImage">
                <img src={runErrandPopUpUploadedImage} />
                <p>IMG20240203.JPG</p>
              </div>
              <img src={runErrandPopUpDelete} />
            </div> */}

            <div className="d-flex align-items-center gap-3">
              <Button variant="primary" className="runErrandNew-blueButton">
                Publish
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RunErrandNew;
