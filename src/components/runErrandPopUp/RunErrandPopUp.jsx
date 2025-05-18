import React, { useEffect, useState } from "react";
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
import { useTranslation } from "react-i18next";
import "../../i18n";
import {
  setSignUpModalTrue,
  signUpModalToggle,
} from "../../utils/signUpModalSlice";
import { notifyError, notifySuccess, token } from "../../utils/utils";
import { getApi, postApi } from "../../fetchApi/FetchAxiosApi";
import apis from "../../Constant";
import { addRegions } from "../../utils/regionsSlice";
import { addTownsByRegion } from "../../utils/townsByRegionSlice";
import { recentErrandsList } from "../../utils/recentErrandsSlice";

const RunErrandPopUp = () => {
  const modalBoolean = useSelector((store) => store.modal.value);

  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const [uploadedImage, setUploadedImage] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    region_id: "",
    town_id: "",
  });

  console.log("formDataaaa", formData);

  const fileInputRef = useRef(null);

  // const handleFileButtonClick = () => {
  //   fileInputRef.current.click();
  // };

  const handleFileButtonClick = () => {
    document.getElementById("file-input").click();
  };
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     // console.log("Selected file:", file);
  //   }
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      notifyError("Invalid file type. Only JPG, JPEG, and PNG are allowed.");
      return;
    }

    if (file.size > maxSize) {
      notifyError("File size exceeds 2MB limit.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setUploadedImage(imageUrl);
  };

  const navigate = useNavigate();

  const regionsFromStore = useSelector((store) => store?.regions);
  // console.log("regionsFromStore pop", regionsFromStore);

  useEffect(() => {
    if (!regionsFromStore) {
      const fetchRegions = async () => {
        try {
          const res = await getApi(apis.regions);
          dispatch(addRegions(res.data.data));
        } catch (err) {
          console.log("fetchRegions", err);
          notifyError("Oops! The request was not found.");
        }
      };
      fetchRegions();
    }
  }, []);

  const townsByRegionFromStore = useSelector((store) => store.townsByRegion);
  // console.log("townsByRegionFromStore", townsByRegionFromStore);

  // if (!townsByRegionFromStore) {
  const fetchTowns = async (id) => {
    try {
      console.log("fetchTowns", id);
      const params = new URLSearchParams({
        region_id: id,
      });

      // dispatch(region(id));

      // console.log("api", apis.townsByRegion + `?${params.toString()}`);
      const res = await getApi(apis.townsByRegion + `?${params.toString()}`);
      // console.log("fetchTowns", res.data.data);
      dispatch(addTownsByRegion(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (formData?.region_id) {
      console.log("check");
      fetchTowns(formData?.region_id);
    }
  }, [formData?.region_id]);

  const postErrandHandler = async () => {
    if (formData.title && formData.description) {
      dispatch(modalToggle());
      dispatch(setModalFalse());
    }
    if (!formData.title || !formData.description) {
      notifyError("Please fill all required fields.");
      return;
    }

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("region_id", formData.region_id);
      form.append("town_id", formData.town_id);
      form.append("featured_image", selectedFile);

      const res = await postApi(apis.runAnErrand, form, token(), true);

      if (res.status === 200) {
        notifySuccess(res.data.message);

        setFormData(() => {
          return {
            title: "",
            description: "",
            region_id: "",
            town_id: "",
          };
        });
        setUploadedImage(null);
        setSelectedFile(null);
        const resErrands = await getApi(apis.recentErrands, token());
        dispatch(recentErrandsList(resErrands.data.data.items));
      }
    } catch (err) {
      console.log(err);
      notifyError("Oops! The request was not found.");
    }
  };

  return (
    <>
      <Modal show={modalBoolean} size="xl">
        <div className="container runErrandPopUp-modal">
          <div className="row runErand-popUp-form-mobile">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 runErrandPopUpSignUpForm-imageContainer mb-3">
              <div className="runErand-popUp-form-cross-mobile">
                <h3 className="modal-header-heading">{t("Run an Errand")}</h3>

                <div
                  className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 runErand-cross"
                  onClick={() => {
                    dispatch(modalToggle());
                    dispatch(setModalFalse());
                  }}
                >
                  <img src={modalCross} className="img-fluid" />
                </div>
              </div>
              <img
                src={runErrandPopUpImage}
                alt="runErrandPopUpImage"
                className="img-fluid runErrandPopUp-modal-image"
              />
            </div>
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-10 col-10  mb-3">
              <div className="runErrand-popUp-form-background">
                <Modal.Body>
                  <Form>
                    <div className="runErrandPopUp-FormHeading">
                      {t(
                        "Kindly provide details of this errand and we'll run it for you."
                      )}
                    </div>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="runErrandPopUp-inputHeading">
                        {t("Item")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g laptop charger. smart tv screen"
                        autoFocus
                        className="runErrandPopUp-inputTag"
                        value={formData?.title}
                        onChange={(e) => {
                          setFormData((prev) => {
                            return {
                              ...prev,
                              title: e.target.value,
                            };
                          });
                        }}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label className="runErrandPopUp-inputHeading">
                        {t("Description")}
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="E,g I'm looking for a 15inch smart screen TV remote, preferably second hand"
                        rows={4}
                        className="runErrandPopUp-description"
                        value={formData?.description}
                        onChange={(e) => {
                          setFormData((prev) => {
                            return {
                              ...prev,
                              description: e.target.value,
                            };
                          });
                        }}
                      />
                    </Form.Group>

                    {/* <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="runErrandPopUp-inputHeading">
                      {t("Region")}
                        <span style={{ color: "#677A90" }}>(optional)</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="select preferred region for errand"
                        autoFocus
                        className="runErrandPopUp-inputTag"
                      />
                    </Form.Group> */}

                    <Form.Group
                      className="mb-3 userProfileAddProduct-input-tag-container"
                      controlId="formBasicEmail"
                    >
                      <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                        Region{" "}
                      </Form.Label>
                      <select
                        className="form-select"
                        name="category_id"
                        aria-label="Default select example"
                        style={{
                          color: "#526277",
                          border: "1px solid #ECEFF2",
                        }}
                        value={formData.region_id}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            region_id: e.target.value,
                          }));
                          console.log("asas", formData?.region_id);
                        }}
                        required
                      >
                        <option value="">Select Region</option>

                        {regionsFromStore &&
                          regionsFromStore.map((region) => {
                            return (
                              <option key={region.id} value={region.id}>
                                {region.name}
                              </option>
                            );
                          })}
                      </select>
                    </Form.Group>

                    {/* <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="runErrandPopUp-inputHeading">
                      {t("Town")}
                        <span style={{ color: "#677A90" }}>(optional)</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="select preferred town for errand"
                        autoFocus
                        className="runErrandPopUp-inputTag"
                      />
                    </Form.Group> */}

                    <Form.Group
                      className="mb-3 userProfileAddProduct-input-tag-container"
                      controlId="formBasicEmail"
                    >
                      <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                        Town{" "}
                      </Form.Label>
                      <select
                        className="form-select"
                        name="category_id"
                        aria-label="Default select example"
                        style={{
                          color: "#526277",
                          border: "1px solid #ECEFF2",
                        }}
                        value={formData.town_id}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            town_id: e.target.value,
                          }));
                        }}
                        required
                      >
                        <option value="">Select Town</option>

                        {townsByRegionFromStore &&
                          townsByRegionFromStore.map((town) => {
                            return (
                              <option key={town.id} value={town.id}>
                                {town.name}
                              </option>
                            );
                          })}
                      </select>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label
                        style={{ color: "#677A90" }}
                        className="runErrandPopUp-inputHeading"
                      >
                        {t("Sample images")} (optional)
                      </Form.Label>

                      {/* Hidden File Input */}
                      {/* <input
                        type="file"
                        id="file-input"
                        accept=".jpg,.jpeg,.png"
                        style={{ display: "none" }}
                        //   onChange={(e) => {
                        //     console.log(e.target.files[0]);
                        //   }} // Handle file selection
                        onChange={handleFileChange}
                      />

                      <label
                        htmlFor="file-input"
                        className="runErrand-popUp-custom-file-input-container"
                      >
                        <div className="runErrand-popUp-custom-file-content">
                          <img
                            src={runErrandPopUpimageUploader}
                            alt="Upload Icon"
                            className="img-fluid"
                          />
                          <div>
                            <div className="runErrandPopUp-imageTagHeading">
                            {t("Choose a file or drag and drop it here")}
                            </div>
                            <p className="runErrandPopUp-imageTag-SubHeading">
                            {t("jpg, jpeg, or png of up to 10mb")}
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
                          {t("Browse Files")}
                        </Button>
                      </label> */}

                      <Form.Group>
                        <input
                          type="file"
                          id="file-input"
                          accept=".jpg,.jpeg,.png"
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />

                        {/* Custom File Input UI */}
                        <label
                          htmlFor="file-input"
                          className="userProfileAddProduct-custom-file-input-container"
                          style={{ width: "100%" }}
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
                                jpg, jpeg, or png of up to 2MB
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

                        {uploadedImage && (
                          <div className="listYourBusinessHomeForm-uploadedImageDelete mt-3">
                            <div className="listYourBusinessHomeForm-uploadedImage">
                              <img
                                src={uploadedImage}
                                alt="Uploaded"
                                className="img-fluid"
                                style={{
                                  width: "44px",
                                  height: "44px",
                                  borderRadius: "10px",
                                  border: "1px solid #D5DAE2",
                                  padding: "2px",
                                }}
                              />
                              <p>{uploadedImage.name || "Uploaded Image"}</p>
                            </div>
                            <img
                              src={runErrandPopUpDelete}
                              alt="Delete"
                              onClick={() => setUploadedImage(null)}
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                        )}
                      </Form.Group>
                    </Form.Group>

                    {/* <div className="runErrandPopUp-uploadedImageDelete">
                      <div className="runErrandPopUp-uploadedImage">
                        <img src={runErrandPopUpUploadedImage} />
                        <p>IMG20240203.JPG</p>
                      </div>
                      <img src={runErrandPopUpDelete} />
                    </div> */}

                    <div className="d-flex flex-column align-items-center gap-3">
                      <Button
                        variant="primary"
                        className="runErrandPopUp-blueButton"
                        onClick={() => {
                          // dispatch(signUpModalToggle());
                          // dispatch(setSignUpModalTrue());
                          postErrandHandler();
                        }}
                      >
                        {t("Continue")}
                      </Button>
                    </div>
                  </Form>
                </Modal.Body>
              </div>
              <Modal.Footer className="runErrandPopUp-modalFooter"></Modal.Footer>
            </div>
            <div className="col-xl-1 col-lg-1 col-md-1 col-sm-2 col-2 runErand-popUp-cross">
              <img
                src={modalCross}
                className="img-fluid"
                onClick={() => {
                  dispatch(modalToggle());
                  dispatch(setModalFalse());
                  setFormData(() => {
                    return {
                      title: "",
                      description: "",
                      region_id: "",
                      town_id: "",
                    };
                  });
                  setUploadedImage(null);
                  setSelectedFile(null);
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RunErrandPopUp;
