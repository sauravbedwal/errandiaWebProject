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
import {
  modalRunErrandNewToggle,
  setRunErrandNewModalFalse,
} from "../../utils/runErrandNewModalSlice";
import {
  modalWriteReviewToggle,
  setWriteReviewModalFalse,
} from "../../utils/writeReviewModalSlice";
import userProfileErrandsPostedImg from "../../assets/userProfileErrandsPostedImg.svg";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import review_star from "../../assets/review_star.svg";
import half_star from "../../assets/half_star.svg";
import sad from "../../assets/sad.png";
import smile from "../../assets/smile.png";
import neutral from "../../assets/neutral.png";
import {
  modalThankYouForReviewToggle,
  setThankYouForReviewModalFalse,
  setThankYouForReviewModalTrue,
} from "../../utils/thankYouForReviewModalSlice";
import ThankYouForReview from "../thankYouForReview/ThankYouForReview";

const WriteReview = () => {
  const writeReviewModalBoolean = useSelector(
    (store) => store?.writeReview?.value
  );

  // console.log("writeReviewModalBoolean", writeReviewModalBoolean);

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
        size="md"
        show={writeReviewModalBoolean}
        aria-labelledby="example-modal-sizes-title-lg"
        className="featuredBusinessProfileShare-modal-Container"
      >
        <Modal.Header
          closeButton
          className="userProfileAddService-modal-header"
          onClick={() => {
            dispatch(modalWriteReviewToggle());
            dispatch(setWriteReviewModalFalse());
          }}
        >
          <Modal.Title
            id="example-modal-sizes-title-lg"
            className="featureBusinessProfileShare-heading"
          >
            Run Errand
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: " 0 25px 15px 25px" }}>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="card card-container-writeReview">
                <div className="card-body">
                  <div className="d-flex gap-3 align-items-center businessUserView-image-container">
                    <img
                      className="businessPorfileUserView-pharmaciesImage"
                      src={userProfileErrandsPostedImg}
                      alt="userProfileErrandsPostedImg"
                    />

                    <div
                      className="businessUserView-name-report-container"
                      style={{ width: "100%" }}
                    >
                      <div>
                        <div className="writeReview-viewProfile-container">
                          I need a thermal printer
                        </div>
                        <p className="writeReview-viewProfile-paraSecondary">
                          08/14/2023
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Form>
                <div className="listYourBusinessHomeForm-two-Inputs mt-3">
                  <Form.Group
                    className="mb-3 listYourBusinessHomeForm-input-tag-container"
                    controlId="formBasicEmail"
                  >
                    <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                      Please kindly specify the business where you found the
                      item?
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
                  className="mb-3 writeReview-input-tag-container"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                    Where did you find this item?
                  </Form.Label>
                  <div className="">
                    {" "}
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                      >
                        <div>
                          <FormControlLabel
                            value="else where"
                            control={<Radio />}
                            label="Else where"
                            className="writeReview-radio-text"
                          />
                          <FormControlLabel
                            value="from errandia"
                            control={<Radio />}
                            label="From Errandia"
                            className="writeReview-radio-text"
                          />
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
                  <div className="writeReview-star-smile-container">
                    <div className="writeReview-star-container">
                      <img
                        src={review_star}
                        alt="review_star"
                        className="img-fluid"
                      />
                      <img
                        src={review_star}
                        alt="review_star"
                        className="img-fluid"
                      />
                      <img
                        src={review_star}
                        alt="review_star"
                        className="img-fluid"
                      />

                      <img
                        src={review_star}
                        alt="review_star"
                        className="img-fluid"
                      />
                      <img
                        src={half_star}
                        alt="half_star"
                        className="img-fluid"
                      />
                    </div>
                    <div className="writeReview-smiley-text-container mt-4">
                      <div className="writeReview-smileys-container">
                        <img
                          src={sad}
                          alt="sad"
                          className="img-fluid"
                          style={{ width: "20px" }}
                        />
                        <div>Disappointed</div>
                      </div>

                      <div className="writeReview-smileys-container">
                        <img
                          src={sad}
                          alt="sad"
                          className="img-fluid"
                          style={{ width: "20px" }}
                        />
                        <div>Neutral</div>
                      </div>

                      <div className="writeReview-smileys-container">
                        <img
                          src={sad}
                          alt="sad"
                          className="img-fluid"
                          style={{ width: "20px" }}
                        />
                        <div>Satisfied</div>
                      </div>
                    </div>
                  </div>
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label className="runErrandPopUp-inputHeading">
                    Your thoughts about "Nishang Systems"?
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Tell others what you like (or didn't like) about this Nishang Systems"
                    rows={4}
                    className="writeReview-description"
                  />
                </Form.Group>

                {/* <div className="editErrands-uploadedImageDelete">
                  <div className="runErrandPopUp-uploadedImage">
                    <img src={runErrandPopUpUploadedImage} />
                    <p>IMG20240203.JPG</p>
                  </div>
                  <img src={runErrandPopUpDelete} />
                </div> */}

                <div className="d-flex align-items-center gap-3">
                  <Button
                    variant="primary"
                    className="writeReview-blueButton"
                    onClick={() => {
                      dispatch(modalWriteReviewToggle());
                      dispatch(setWriteReviewModalFalse());
                      dispatch(modalThankYouForReviewToggle());
                      dispatch(setThankYouForReviewModalTrue());
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <ThankYouForReview />
    </>
  );
};

export default WriteReview;
