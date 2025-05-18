import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";

import Button from "react-bootstrap/Button";
import {
  modalAddBusinessToggle,
  setAddBusinessModalFalse,
} from "../../utils/addBusinessModalSlice";
import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import PhoneInput from "react-phone-input-2";
import runErrandPopUpimageUploader from "../../assets/runErrandPopUpimageUploader.svg";
import runErrandPopUpBrowseFiles from "../../assets/runErrandPopUpBrowseFiles.svg";
import runErrandPopUpUploadedImage from "../../assets/runErrandPopUpUploadedImage.svg";
import runErrandPopUpDelete from "../../assets/runErrandPopUpDelete.svg";
import BusinessLocationIcon from "../../assets/BusinessLocationIcon.svg";
import { useNavigate } from "react-router-dom";
import "summernote/dist/summernote-lite.css";
import $ from "jquery";
import "summernote/dist/summernote-lite.js";
import {
  modalUserprofileAddProductToggle,
  setUserprofileAddProductModalFalse,
} from "../../utils/userprofileAddProductModalSlice";

const EditReport = () => {
  const userprofileAddProductModalBoolean = useSelector(
    (store) => store?.userprofileAddProduct?.value
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
    $("#summernote2").summernote({
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
        show={userprofileAddProductModalBoolean}
        aria-labelledby="example-modal-sizes-title-lg"
        className="featuredBusinessProfileShare-modal-Container"
      >
        <Modal.Header
          closeButton
          className="userProfileAddService-modal-header"
          onClick={() => {
            dispatch(modalUserprofileAddProductToggle());
            dispatch(setUserprofileAddProductModalFalse());
          }}
        >
          <Modal.Title
            id="example-modal-sizes-title-lg"
            className="featureBusinessProfileShare-heading"
          >
            Edit Report{" "}
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
                    Business Name
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
                    Branch
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
                  Briefly tell us your concern about this business{" "}
                </Form.Label>
                <textarea id="summernote2"></textarea>
              </div>

              <div
                className="d-flex align-items-start gap-3 mt-5"
                onClick={() => {
                  dispatch(modalUserprofileAddProductToggle());
                  dispatch(setUserprofileAddProductModalFalse());
                }}
              >
                <Button variant="primary" className="editReport-signIn-blue">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditReport;
